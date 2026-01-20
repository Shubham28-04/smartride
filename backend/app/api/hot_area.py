from fastapi import APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from app.core.database import SessionLocal
from app.models.booking import Booking

router = APIRouter(prefix="/hot-area", tags=["Hot Area"])

# Threshold: minimum bookings to be hot
HOT_THRESHOLD = 3

@router.get("/")
def get_hot_areas():
    db: Session = SessionLocal()

    # Consider bookings from last 30 minutes
    time_limit = datetime.utcnow() - timedelta(minutes=30)

    results = (
        db.query(
            Booking.pickup,
            func.count(Booking.id).label("demand")
        )
        .filter(Booking.booking_time >= time_limit)
        .group_by(Booking.pickup)
        .having(func.count(Booking.id) >= HOT_THRESHOLD)
        .all()
    )

    db.close()

    hot_areas = [
        {
            "location": pickup,
            "demand": demand
        }
        for pickup, demand in results
    ]

    return {
        "hot_areas": hot_areas
    }
