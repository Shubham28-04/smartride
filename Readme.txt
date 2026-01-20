🚕 SmartRide – Smart Taxi Booking Platform

SmartRide is a full-stack taxi booking platform inspired by apps like Rapido/Uber, built using FastAPI (Python) for the backend and HTML/CSS/JavaScript for the frontend.

It supports:

👤 Customers – manual & auto taxi booking

🚖 Drivers – live ride requests & hot demand areas

⏰ Auto-booking scheduler

🌍 Real-time style APIs

☁️ Public backend deployment (Render)

This project is designed to be:

Beginner friendly

Interview ready

Easy to run locally

Easy to deploy publicly

📌 Live Backend (Public)

The backend is deployed on Render and publicly accessible.

Example:

https://smartride-xxxx.onrender.com


Swagger API Docs:

https://smartride-xxxx.onrender.com/docs

🏗️ Tech Stack
Backend

FastAPI

Uvicorn

SQLAlchemy

SQLite

WebSockets

Python 3

Frontend

HTML

CSS

JavaScript (Vanilla JS)

Deployment

GitHub (source code)

Render (backend hosting)

📁 Project Structure
SmartRide/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── booking.py
│   │   │   ├── autobook.py
│   │   │   ├── realtime.py
│   │   │   ├── hot_area.py
│   │   │   └── driver.py
│   │   ├── models/
│   │   │   ├── booking.py
│   │   │   ├── autobook.py
│   │   │   ├── driver.py
│   │   │   ├── location.py
│   │   │   └── user.py
│   │   ├── services/
│   │   │   └── scheduler.py
│   │   ├── core/
│   │   │   └── database.py
│   │   └── main.py
│   ├── requirements.txt
│   └── smartride.db
│
├── frontend/
│   ├── customer/
│   │   ├── index.html
│   │   ├── home.html
│   │   ├── ride.html
│   │   ├── matching.html
│   │   ├── autobook.html
│   │   ├── complete.html
│   │   ├── vehicle.html
│   │   ├── css/
│   │   └── js/
│   ├── driver/
│   │   ├── driver.html
│   │   ├── index.html
│   │   ├── css/
│   │   └── js/
│
└── README.md

✨ Features
👤 Customer Features

Manual taxi booking (pickup & drop)

Auto-book taxi at fixed time

Vehicle selection

Ride matching screen

Ride completion & rating flow

🚖 Driver Features

Online / Offline status

Live ride requests

Hot area demand view (RED / YELLOW)

Real-time updates via polling/WebSocket-style APIs

⚙️ System Features

SQLite database

Auto-booking scheduler

Swagger API documentation

Public backend deployment

🚀 How to Run Locally
1️⃣ Clone Repository
git clone https://github.com/Shubham28-04/SmartRide.git
cd SmartRide

2️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate     # Windows
pip install -r requirements.txt


Run backend:

uvicorn app.main:app --reload


Backend runs at:

http://127.0.0.1:8000


Swagger:

http://127.0.0.1:8000/docs

3️⃣ Frontend Setup (Local)

Open directly in browser:

frontend/customer/index.html
frontend/driver/driver.html


⚠️ If using deployed backend, update API URL in JS files:

const API_URL = "https://smartride-xxxx.onrender.com";

🌍 Deployment (Backend on Render)

Render configuration used:

Language: Python

Root Directory: backend

Build Command:

pip install -r requirements.txt


Start Command:

uvicorn app.main:app --host 0.0.0.0 --port 10000

🧪 API Testing

Manual booking example:

POST /booking/manual?pickup=Pune%20Station&drop=Shivaji%20Nagar


Auto booking example:

POST /booking/auto?pickup=A&drop=B&time=09:30


Hot areas:

GET /hot-area

📌 Interview Talking Points

Clean FastAPI architecture

REST API design

Scheduler & background tasks

Real-time ride simulation

Frontend ↔ Backend integration

Cloud deployment experience

Git & GitHub workflow

🔮 Future Enhancements

Authentication (JWT)

Google Maps integration

Push notifications

Payment gateway

PostgreSQL database

Mobile app (React Native)

👨‍💻 Author

Shubham
B.Tech CSE (AI & ML)
Project: SmartRide 🚕

