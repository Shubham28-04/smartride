/*********************************
 * DRIVER STATUS (ONLINE / OFFLINE)
 *********************************/
let isOnline = true;

const statusText = document.getElementById("driverStatus");
const toggleBtn = document.getElementById("toggleBtn");

function toggleStatus() {
    isOnline = !isOnline;

    if (isOnline) {
        statusText.innerText = "ONLINE";
        statusText.style.color = "green";
        toggleBtn.innerText = "Go OFFLINE";
    } else {
        statusText.innerText = "OFFLINE";
        statusText.style.color = "gray";
        toggleBtn.innerText = "Go ONLINE";
    }
}

/*********************************
 * LIVE RIDE DEMAND (WEBSOCKET)
 *********************************/
const ridesList = document.getElementById("rides");

// Connect to backend WebSocket
const socket = new WebSocket("ws://127.0.0.1:8000/realtime/drivers");

// When a message arrives
socket.onmessage = (event) => {
    // SAFETY: Ignore requests when driver is OFFLINE
    if (!isOnline) return;

    const data = JSON.parse(event.data);

    if (data.type === "NEW_RIDE") {
        const li = document.createElement("li");

        li.innerHTML = `
            📍 <b>${data.pickup}</b> → <b>${data.drop}</b> (${data.mode})
            <button onclick="acceptRide(this)">Accept</button>
        `;

        ridesList.appendChild(li);
    }
};

// Optional: handle connection issues
socket.onerror = () => {
    console.error("WebSocket connection error");
};

/*********************************
 * ACCEPT RIDE
 *********************************/
function acceptRide(button) {
    const rideItem = button.parentElement;

    rideItem.innerHTML = "✅ Ride Accepted";
    rideItem.style.color = "green";

    // Optional safety: prevent accepting multiple rides
    isOnline = false;
    statusText.innerText = "BUSY";
    statusText.style.color = "orange";
    toggleBtn.innerText = "Complete Ride";
    toggleBtn.onclick = completeRide;
}

/*********************************
 * COMPLETE RIDE (OPTIONAL SAFETY)
 *********************************/
function completeRide() {
    isOnline = true;
    statusText.innerText = "ONLINE";
    statusText.style.color = "green";
    toggleBtn.innerText = "Go OFFLINE";
    toggleBtn.onclick = toggleStatus;
}

/*********************************
 * HOT AREAS (DEMAND ZONES)
 *********************************/
const hotAreaList = document.getElementById("hotAreas");

function loadHotAreas() {
    fetch("http://127.0.0.1:8000/hot-area/")
        .then(res => res.json())
        .then(data => {
            hotAreaList.innerHTML = "";

            data.hot_areas.forEach(area => {
                const li = document.createElement("li");
                li.style.color = "red";
                li.innerText = `📍 ${area.location} (Demand: ${area.demand})`;
                hotAreaList.appendChild(li);
            });
        })
        .catch(err => console.error("Hot area fetch error:", err));
}

// Refresh hot areas every 20 seconds
setInterval(loadHotAreas, 20000);
loadHotAreas();
