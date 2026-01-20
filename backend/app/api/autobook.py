from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.autobook import AutoBook

router = APIRouter(prefix="/autobook", tags=["Auto Book"])

@router.post("/create")
def create_autobook(
    user: str,
    pickup: str,
    drop: str,
    vehicle: str,
    time: str
):
    db: Session = SessionLocal()

    record = AutoBook(
        user=user,
        pickup=pickup,
        drop=drop,
        vehicle=vehicle,
        time=time,
        repeat="daily"
    )

    db.add(record)
    db.commit()
    db.close()

    return {"status": "Auto booking saved"}
@router.post("/pause")
def pause_autobook(user: str):
    db: Session = SessionLocal()

    record = db.query(AutoBook).filter(
        AutoBook.user == user,
        AutoBook.active == True
    ).first()

    if not record:
        return {"status": "No active auto booking found"}

    record.active = False
    db.commit()
    db.close()

    return {"status": "Auto booking paused"}
@router.post("/resume")
def resume_autobook(user: str):
    db: Session = SessionLocal()

    record = db.query(AutoBook).filter(
        AutoBook.user == user,
        AutoBook.active == False
    ).first()

    if not record:
        return {"status": "No paused auto booking found"}

    record.active = True
    db.commit()
    db.close()

    return {"status": "Auto booking resumed"}
