from sqlalchemy import Column, Integer, String, Boolean
from app.core.database import Base

class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String, unique=True)
    online = Column(Boolean, default=False)
