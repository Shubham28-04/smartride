from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base
from datetime import datetime

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    pickup = Column(String, nullable=False)
    drop = Column(String, nullable=False)
    booking_type = Column(String, nullable=False)  # manual / auto
    booking_time = Column(DateTime, default=datetime.utcnow)
