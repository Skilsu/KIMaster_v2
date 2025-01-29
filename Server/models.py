from sqlalchemy import Column, String, Integer, Text, TIMESTAMP, func
from db import Base

class User(Base):
    __tablename__ = "users"

    userId = Column(Integer, primary_key=True, autoincrement=True)                 # Primärschlüssel
    email = Column(String(255), primary_key=True, nullable=False)
    fullname = Column(String(255), nullable=False)
    sessionKey = Column(Text, nullable=False)
    createdAt = Column(TIMESTAMP, server_default=func.now(), nullable=True)
    lastSeenAt = Column(TIMESTAMP, server_default=func.now(), nullable=True)
    mailSentAt = Column(TIMESTAMP, server_default=func.now(), nullable=True)
