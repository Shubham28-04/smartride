const API_URL = "http://127.0.0.1:8000";
let selectedVehicle = "bike";

/* MAP */
const map = L.map("map").setView([18.5204, 73.8567], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
let taxiMarker = L.marker([18.5204, 73.8567]).addTo(map);

/* VEHICLE SELECT */
function selectVehicle(type) {
    selectedVehicle = type;
    document.querySelectorAll(".vehicle").forEach(v => v.classList.remove("active"));
    event.currentTarget.classList.add("active");
}

/* BOOK RIDE */
function bookRide() {
    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const status = document.getElementById("statusText");

    if (!pickup || !drop) {
        status.style.color = "red";
        status.innerText = "Please enter pickup and drop";
        return;
    }

    status.style.color = "#333";
    status.innerText = "Finding nearby driver...";

    fetch(`${API_URL}/booking/manual?pickup=${pickup}&drop=${drop}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(() => {
        status.style.color = "green";
        status.innerText = `SmartRide ${selectedVehicle.toUpperCase()} booked 🚕`;
    });
}

/* REAL-TIME TRACKING */
const socket = new WebSocket("ws://127.0.0.1:8000/ws/location");
socket.onmessage = e => {
    const loc = JSON.parse(e.data);
    taxiMarker.setLatLng([loc.lat, loc.lng]);
};
