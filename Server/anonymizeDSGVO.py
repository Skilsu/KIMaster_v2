from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from db import SessionLocal
from models import User
from mailservice import send_emails_bcc  # Importiere die Funktion für BCC-E-Mails

def anonymize_and_remind_users(db: Session, anonymize_days: int = 540, reminder_days: int = 510):
    """
    Anonymisiert Benutzer basierend auf dem Tagesunterschied zwischen ihrem letzten Aktivitätsdatum
    und dem aktuellen Datum. Sendet Erinnerungs-E-Mails, wenn die Frist kurz bevorsteht.

    :param db: Datenbank-Session
    :param anonymize_days: Anzahl der Tage, nach denen Benutzer anonymisiert werden
    :param reminder_days: Anzahl der Tage, nach denen Benutzer eine Erinnerung erhalten
    """
    today = datetime.now()

    # **1. Benutzer anonymisieren (Tagesunterschied >= anonymize_days)** 
    users_to_anonymize = db.query(User).filter(
        func.datediff(func.now(), User.lastSeenAt) >= anonymize_days,
        User.email.isnot(None)  # Nur Benutzer mit E-Mail-Adresse anonymisieren
    ).all()

    for user in users_to_anonymize:
        print(f"Anonymisiere Benutzer: {user.email}, lastSeenAt: {user.lastSeenAt}")
        user.email = None
        user.fullname = "__ANONYMIZED__"
        user.sessionKey = ""  # Optional: Session-Key löschen

    db.commit()  # Änderungen speichern
    print(f"{len(users_to_anonymize)} Benutzer wurden anonymisiert.")

    # **2. Erinnerungs-E-Mails senden (Tagesunterschied >= reminder_days und < anonymize_days)** 
    users_to_remind = db.query(User).filter(
        func.datediff(func.now(), User.lastSeenAt) >= reminder_days,
        func.datediff(func.now(), User.lastSeenAt) < anonymize_days,
        ((User.mailSentAt.is_(None)) | (func.datediff(func.now(), User.mailSentAt) >= 10)),
        User.email.isnot(None)  # Benutzer ist noch nicht anonymisiert
    ).all()

    if users_to_remind:
        email_list = [user.email for user in users_to_remind]
        print(f"Sende Erinnerungsmails an {len(email_list)} Benutzer.")
        print(email_list)

        try:
            # Sende Erinnerungs-E-Mails
            send_emails_bcc(email_list)

            # Aktualisiere `mailSentAt` für alle Benutzer, die eine E-Mail erhalten haben
            for user in users_to_remind:
                user.mailSentAt = today
            db.commit()
            print("mailSentAt für Benutzer aktualisiert.")
        except Exception as e:
            print(f"Fehler beim Senden der E-Mails: {e}")
    else:
        print("Keine Benutzer zum Erinnern gefunden.")


if __name__ == "__main__":
    # Erstellt eine neue Datenbank-Session
    db = SessionLocal()
    try:
        anonymize_and_remind_users(db)
    finally:
        db.close()