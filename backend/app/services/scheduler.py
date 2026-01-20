import time
from datetime import datetime
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.autobook import AutoBook
from app.models.booking import Booking

def auto_booking_scheduler():
    print("⏱️ Auto-book scheduler started")

    while True:
        try:
            now = datetime.now().strftime("%H:%M")
            db: Session = SessionLocal()

            # ONLY active auto bookings are allowed
            records = db.query(AutoBook).filter(
                AutoBook.time == now,
                AutoBook.active == True
            ).all()

            for record in records:
                booking = Booking(
                    pickup=record.pickup,
                    drop=record.drop,
                    mode="auto"
                )
                db.add(booking)

                print(
                    f"🚕 Auto booked for {record.user} | "
                    f"{record.pickup} → {record.drop} at {now}"
                )

            db.commit()
            db.close()

        except Exception as e:
            print("❌ Scheduler error:", e)

        time.sleep(60)
