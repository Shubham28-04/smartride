from fastapi import APIRouter, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime

from app.core.database import SessionLocal
from app.models.booking import Booking
from app.api.realtime import notify_drivers

router = APIRouter(prefix="/booking", tags=["Booking"])


# -----------------------------
# MANUAL BOOKING
# -----------------------------
@router.post("/manual")
def manual_booking(
    pickup: str,
    drop: str,
    background_tasks: BackgroundTasks
):
    db: Session = SessionLocal()

    booking = Booking(
        pickup=pickup,
        drop=drop,
        booking_type="manual",
        booking_time=datetime.utcnow()
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)
    db.close()

    # ✅ SAFE background execution
    background_tasks.add_task(
        notify_drivers,
        {
            "type": "NEW_RIDE",
            "pickup": booking.pickup,
            "drop": booking.drop,
            "mode": "manual"
        }
    )

    return {
        "status": "Manual booking successful",
        "pickup": pickup,
        "drop": drop
    }


# -----------------------------
# AUTO BOOKING
# -----------------------------
@router.post("/auto")
def auto_booking(
    pickup: str,
    drop: str,
    time: str,
    background_tasks: BackgroundTasks
):
    db: Session = SessionLocal()

    booking = Booking(
        pickup=pickup,
        drop=drop,
        booking_type="auto",
        booking_time=datetime.utcnow()
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)
    db.close()

    # ✅ SAFE background execution
    background_tasks.add_task(
        notify_drivers,
        {
            "type": "NEW_RIDE",
            "pickup": booking.pickup,
            "drop": booking.drop,
            "mode": "auto"
        }
    )

    return {
        "status": "Auto booking created",
        "pickup": pickup,
        "drop": drop,
        "time": time
    }
