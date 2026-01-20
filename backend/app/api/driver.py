from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.driver import Driver

router = APIRouter(prefix="/driver", tags=["Driver"])

@router.post("/login")
def driver_login(name: str, phone: str):
    db: Session = SessionLocal()

    driver = db.query(Driver).filter(Driver.phone == phone).first()

    if not driver:
        driver = Driver(name=name, phone=phone, online=False)
        db.add(driver)
        db.commit()

    db.close()
    return {"status": "Driver logged in", "phone": phone}


@router.post("/online")
def driver_online(phone: str):
    db: Session = SessionLocal()

    driver = db.query(Driver).filter(Driver.phone == phone).first()
    if not driver:
        return {"error": "Driver not found"}

    driver.online = True
    db.commit()
    db.close()

    return {"status": "Driver is online"}


@router.post("/offline")
def driver_offline(phone: str):
    db: Session = SessionLocal()

    driver = db.query(Driver).filter(Driver.phone == phone).first()
    if not driver:
        return {"error": "Driver not found"}

    driver.online = False
    db.commit()
    db.close()

    return {"status": "Driver is offline"}
