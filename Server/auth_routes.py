from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal
from models import User
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime
from ldap3 import Server, Connection, ALL

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


# Überprüfe, ob Mail THM Mail ist
def getLDAPthmMail(email: str):
    ldap_server = 'ldap://ldap.fh-giessen.de'  # LDAP-Server-Adresse
    user_dn = 'LDAP_USER_DN'
    user_password = 'LDAP_PASSWORD'
    # Basis-DN für die Suche
    base_dn = 'dc=fh-giessen-friedberg,dc=de'

    # Suchfilter und Attribute
    search_filter = f'(mail={email})' if "@" in email else f'(uid={email})' # Filter für die gewünschte E-Mail
    attributes = ['cn', 'mail']  # Attribute, die abgefragt werden sollen

    try:
        # Verbindung zum LDAP-Server herstellen
        server = Server(ldap_server, get_info=ALL)
        conn = Connection(server, user=user_dn, password=user_password)

        conn.open()  # Öffnet eine Verbindung zum LDAP-Server
        conn.start_tls()  # StartTLS aktiviert für verschlüsselte Verbindung
        conn.bind()  # Sendet die Benutzeranmeldedaten und authentifiziert den Benutzer
        print("Erfolgreich verbunden!")

        # Abfrage durchführen
        conn.search(search_base=base_dn, search_filter=search_filter, attributes=attributes)

        if conn.entries:  # Wenn Ergebnisse gefunden wurden
            return conn.entries[0].mail.value
        else:
            return None

    except Exception as e:
        return None

    finally:
        if 'conn' in locals() and conn:
            conn.unbind()  # Verbindung schließen




# Registrierung
@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    # THM Mail?
    if not getLDAPthmMail(request.email):
        raise HTTPException(status_code=400, detail="Not THM Mail") 

    requestedMail = request.email

    # Prüfen, ob `requestedMail` eine gültige E-Mail ist
    if "@" not in requestedMail:
        # E-Mail aus LDAP ableiten
        ldap_email = getLDAPthmMail(request.email)
        if not ldap_email:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        requestedMail = ldap_email

    # Prüfen, ob der Benutzer bereits existiert
    existing_user = db.query(User).filter(User.email == requestedMail).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    # Passwort hashen
    hashed_password = pwd_context.hash(request.password)
    
    # Benutzer erstellen
    user = User(email=requestedMail, password=hashed_password, sessionKey="")
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully"}


# Login
@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Benutzer nach Email suchen

    # search_filter = f'(mail={email})' if "@" in email else f'(uid={email})' # Filter für die gewünschte E-Mail
 
    requestedMail = request.email

    # Prüfen, ob `requestedMail` eine gültige E-Mail ist
    if "@" not in requestedMail:
        # E-Mail aus LDAP ableiten
        ldap_email = getLDAPthmMail(request.email)
        if not ldap_email:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        requestedMail = ldap_email

    user = db.query(User).filter(User.email == requestedMail).first()
    if not user or not pwd_context.verify(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
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


