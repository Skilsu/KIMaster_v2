from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal
from models import User
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime
from ldap3 import Server, Connection, ALL
from enum import Enum
import requests
from bs4 import BeautifulSoup

# Passwort-Hashing-Kontext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# FastAPI-Router erstellen
router = APIRouter()

# Pydantic-Modelle
class RegisterRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

# Datenbank-Session bereitstellen
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ReturnAttribute(Enum):
    FULLNAME = 'cn'
    MAIL = 'mail'
    USERNAME = 'uid'


class UserInfoField(Enum):
    EMAIL = "email"
    FULLNAME = "fullname"
    LASTSEENAT = "lastSeenAt"

# Überprüfe, ob Mail THM Mail ist
def getLDAPthmInfo(email: str, returnValue: ReturnAttribute = ReturnAttribute.MAIL):
    ldap_server = 'ldap://ldap.fh-giessen.de'  # LDAP-Server-Adresse
    user_dn = 'LDAP_USER_DN'
    user_password = 'LDAP_PASSWORD'
    base_dn = 'dc=fh-giessen-friedberg,dc=de'

    # Suchfilter und Attribute
    search_filter = f'(mail={email})' if "@" in email else f'(uid={email})'  # Filter für die gewünschte E-Mail
    attributes = [returnValue.value]  # Nur das ausgewählte Attribut wird abgefragt

    try:
        # Verbindung zum LDAP-Server herstellen
        server = Server(ldap_server, get_info=ALL)
        conn = Connection(server, user=user_dn, password=user_password)

        conn.open()  # Öffnet eine Verbindung zum LDAP-Server
        conn.start_tls()  # StartTLS aktiviert für verschlüsselte Verbindung
        conn.bind()  # Sendet die Benutzeranmeldedaten und authentifiziert den Benutzer

        # Abfrage durchführen
        conn.search(search_base=base_dn, search_filter=search_filter, attributes=attributes)

        if conn.entries:  # Wenn Ergebnisse gefunden wurden
            # Gibt den Wert des gewünschten Attributs zurück
            return getattr(conn.entries[0], returnValue.value).value
        else:
            return None

    except Exception as e:
        print(f"Fehler: {e}")
        return None

    finally:
        if 'conn' in locals() and conn:
            conn.unbind()  # Verbindung schließen

def loginTHMCas(username: str, password: str):
    if "@" in username:
        username = getLDAPthmInfo(username, ReturnAttribute.USERNAME)
    
    url = "https://cas.thm.de/cas/login"

    # Erster GET-Request, um das Login-Formular zu laden und den CSRF-Token (falls vorhanden) abzurufen
    session = requests.Session()
    response = session.get(url)

    # HTML des Formulars parsen
    soup = BeautifulSoup(response.text, 'html.parser')

    # Optional: Falls CSRF-Token oder andere versteckte Felder erforderlich sind
    hidden_inputs = soup.find_all("input", type="hidden")
    form_data = {input_tag["name"]: input_tag.get("value", "") for input_tag in hidden_inputs}

    # Benutzername und Passwort hinzufügen
    form_data["username"] = username
    form_data["password"] = password

    # POST-Request senden
    post_response = session.post(url, data=form_data) 

    return post_response.status_code == 200



# Login
@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Benutzer nach Email suchen

    requestedMail = request.email

    # # Prüfen, ob `requestedMail` eine gültige E-Mail ist
    if "@" not in requestedMail:
        # E-Mail aus LDAP ableiten
        ldap_email = getLDAPthmInfo(request.email)
        if not ldap_email:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        requestedMail = ldap_email


    if not loginTHMCas(requestedMail, request.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = db.query(User).filter(User.email == requestedMail).first()
    fullname = getLDAPthmInfo(requestedMail, ReturnAttribute.FULLNAME)
    if not user:
        # trage user in db ein
        user = User(email=requestedMail, fullname=fullname, sessionKey="")
        db.add(user)
        db.commit()
        db.refresh(user)        

    # Session-Key generieren (optional)
    now = datetime.now()

    # Session-Key generieren, einschließlich des aktuellen Datums
    sessionKey = pwd_context.hash(f"{requestedMail}{request.password}{now}")

    # Session-Key und Datum speichern
    user.sessionKey = sessionKey
    user.lastSeenAt = now
    db.commit()
    
    return {"message": "Login successful", "sessionKey": sessionKey}



@router.get("/is_authenticated")
def is_authenticated(sessionKey: str, db: Session = Depends(get_db)):
    # Überprüfe, ob der sessionKey in der Datenbank vorhanden ist
    user = db.query(User).filter(User.sessionKey == sessionKey).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    # Aktualisiere last_seen_at auf das aktuelle Datum und die aktuelle Uhrzeit
    user.lastSeenAt = datetime.now()
    db.commit()  # Änderungen speichern
    
    return {"message": "User is authenticated", "email": user.email}


@router.get("/getUserInformation")
def get_user_information(
    sessionKey: str, 
    field: UserInfoField = UserInfoField.EMAIL,  # Standardwert ist 'email'
    db: Session = Depends(get_db)
):
    # Überprüfe, ob der sessionKey in der Datenbank vorhanden ist
    user = db.query(User).filter(User.sessionKey == sessionKey).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    # Aktualisiere last_seen_at auf das aktuelle Datum und die aktuelle Uhrzeit
    user.lastSeenAt = datetime.now()
    db.commit()  # Änderungen speichern
    
    # Wähle das gewünschte Feld aus
    if field == UserInfoField.EMAIL:
        return {"message": "User is authenticated", "email": user.email}
    elif field == UserInfoField.FULLNAME:
        return {"message": "User is authenticated", "fullname": user.fullname}
    elif field == UserInfoField.LASTSEENAT:
        return {"message": "User is authenticated", "lastSeenAt": user.lastSeenAt}
    else:
        raise HTTPException(status_code=400, detail="Invalid field requested")


@router.post("/anonymizeUserInformation")
def anonymize_user_information(sessionKey: str, db: Session = Depends(get_db)):
    """
    Anonymisiert Benutzerdaten basierend auf dem übergebenen sessionKey.
    
    :param sessionKey: Der Session-Key des Benutzers.
    :param db: Die Datenbank-Session.
    :return: Erfolgsnachricht nach der Anonymisierung.
    """
    # Überprüfe, ob der Benutzer mit diesem Session-Key existiert
    user = db.query(User).filter(User.sessionKey == sessionKey).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    # Benutzer anonymisieren
    user.email = None
    user.fullname = "__ANONYMIZED__"
    user.sessionKey = ""  # Entferne den Session-Key
    user.lastSeenAt = datetime.now()  # Aktualisiere den Zeitstempel (optional)
    
    db.commit()  # Änderungen speichern
    
    return {"message": "User information anonymized successfully"}