from sqlalchemy import Column, Integer, String, Boolean
from app.core.database import Base

class AutoBook(Base):
    __tablename__ = "autobook"

    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, index=True)
    pickup = Column(String)
    drop = Column(String)
    vehicle = Column(String)
    time = Column(String)        # HH:MM format
    repeat = Column(String)      # daily
    active = Column(Boolean, default=True)
