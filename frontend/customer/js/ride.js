/* ==============================
   AUTH & STATE CHECK
================================ */

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "auth.html";
}

const driver = localStorage.getItem("driverName");
const rating = localStorage.getItem("driverRating");
const vehicle = localStorage.getItem("vehicleType");
const fare = localStorage.getItem("vehiclePrice");

if (!driver || !vehicle) {
    window.location.href = "home.html";
}

/* ==============================
   DISPLAY DRIVER DATA
================================ */

document.getElementById("driverName").innerText = driver;
document.getElementById("driverRating").innerText = rating;
document.getElementById("vehicleType").innerText = vehicle.toUpperCase();
document.getElementById("fare").innerText = fare;

/* ==============================
   MAP & REAL-TIME TRACKING
================================ */

const map = L.map("map").setView([18.5204, 73.8567], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let driverMarker = L.marker([18.5204, 73.8567]).addTo(map);

/* WebSocket real-time location */
const socket = new WebSocket("ws://127.0.0.1:8000/ws/location");

socket.onmessage = (event) => {
    const loc = JSON.parse(event.data);
    driverMarker.setLatLng([loc.lat, loc.lng]);
};

/* ==============================
   ACTIONS
================================ */

function callDriver() {
    alert("Calling driver (simulated)");
}

function cancelRide() {
    if (confirm("Cancel this ride?")) {
        window.location.href = "home.html";
    }
}

/* ==============================
   AUTO COMPLETE RIDE (SIMULATED)
================================ */

setTimeout(() => {
    window.location.href = "complete.html";
}, 20000); // ride ends in 20 sec
