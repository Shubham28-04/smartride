from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    lat = Column(String)
    lng = Column(String)
