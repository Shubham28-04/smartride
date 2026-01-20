from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database
from app.core.database import engine, Base

# Models (important for table creation)
from app.models.booking import Booking
from app.models.driver import Driver
from app.models.autobook import AutoBook
from app.models.user import User
from app.models.location import Location

# APIs
from app.api import booking as booking_api
from app.api import autobook as autobook_api
from app.api import driver as driver_api
from app.api import realtime
from app.api import hot_area

# Scheduler
import threading
from app.services.scheduler import auto_booking_scheduler


# -----------------------------
# APP INITIALIZATION
# -----------------------------
app = FastAPI(title="SmartRide API")

# -----------------------------
# CORS CONFIGURATION
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# DATABASE TABLE CREATION
# -----------------------------
Base.metadata.create_all(bind=engine)

# -----------------------------
# ROUTER REGISTRATION
# -----------------------------
app.include_router(booking_api.router)
app.include_router(autobook_api.router)
app.include_router(driver_api.router)
app.include_router(realtime.router)
app.include_router(hot_area.router)

# -----------------------------
# START SCHEDULER ON STARTUP
# -----------------------------
@app.on_event("startup")
def start_scheduler():
    thread = threading.Thread(target=auto_booking_scheduler, daemon=True)
    thread.start()

# -----------------------------
# ROOT ENDPOINT
# -----------------------------
@app.get("/")
def root():
    return {"message": "SmartRide Backend is Running 🚕"}
