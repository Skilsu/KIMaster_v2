from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from db import SessionLocal
from models import User

def anonymize_inactive_users(db: Session, months: int = 18):
    """
    Anonymisiert Benutzer, die seit einer bestimmten Anzahl von Monaten (standardmäßig 18) inaktiv sind.

    :param db: Datenbank-Session
    :param months: Anzahl der Monate, nach denen Benutzer als inaktiv betrachtet werden
    """
    # Berechnet den Stichtag (heute minus `months` Monate)
    threshold_date = datetime.now() - timedelta(days=months * 30)

    # Finde Benutzer, deren `lastSeenAt` älter als der Stichtag ist
    inactive_users = db.query(User).filter(User.lastSeenAt < threshold_date, User.email.isnot(None)).all()

    if not inactive_users:
        print("Keine inaktiven Benutzer gefunden.")
        return

    # Anonymisiere jeden inaktiven Benutzer
    for user in inactive_users:
        print(f"Anonymisiere Benutzer: {user.email}, lastSeenAt: {user.lastSeenAt}")
        user.email = None  # Setzt die E-Mail-Adresse auf NULL
        user.sessionKey = ""  # Optional: Session-Key löschen
        db.commit()

    print(f"{len(inactive_users)} Benutzer wurden anonymisiert.")

if __name__ == "__main__":
    # Erstellt eine neue Datenbank-Session
    db = SessionLocal()
    try:
        anonymize_inactive_users(db)
    finally:
        db.close()
