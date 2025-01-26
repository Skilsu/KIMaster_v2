import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# .env-Datei laden
load_dotenv()

# Datenbankverbindungsdetails aus Umgebungsvariablen laden
DB_HOST="swtp-database"
DB_USER="kimaster_dbuser"
DB_PASSWORD="kimasterpw123"
DB_NAME="kimaster_db"
# DB_PORT=3306

# Verbindung zur Datenbank
engine = create_engine("mysql+mysqlconnector://"+DB_USER+":"+DB_PASSWORD+"@"+DB_HOST+"/"+DB_NAME)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


try:
    engine.connect()
    print("Database connection successful!")
except Exception as e:
    print(f"Database connection failed: {e}")