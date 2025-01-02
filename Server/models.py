from sqlalchemy import Column, String, Text, TIMESTAMP, func
from db import Base

class User(Base):
    __tablename__ = "users"

    email = Column(String(255), primary_key=True, nullable=False)
    password = Column(Text, nullable=False)
    sessionKey = Column(Text, nullable=False)
    createdAt = Column(TIMESTAMP, server_default=func.now(), nullable=True)
    lastSeenAt = Column(TIMESTAMP, server_default=func.now(), nullable=True, onupdate=func.now())
