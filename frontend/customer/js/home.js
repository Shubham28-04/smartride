/* ==============================
   AUTH CHECK (VERY IMPORTANT)
================================ */

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "auth.html";
}

/* ==============================
   LOAD USER DATA
================================ */

const userMobile = localStorage.getItem("smartRideUser");
document.getElementById("userInfo").innerText = `Hi, ${userMobile}`;

/* ==============================
   MAP INITIALIZATION
================================ */

const map = L.map("map").setView([18.5204, 73.8567], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

// Simulated nearby driver
L.marker([18.5204, 73.8567])
    .addTo(map)
    .bindPopup("🚕 Driver nearby");

/* ==============================
   SAVE PICKUP & DROP (STATE)
================================ */

function goToVehicleSelection() {
    const pickup = document.getElementById("pickup").value.trim();
    const drop = document.getElementById("drop").value.trim();

    if (!pickup || !drop) {
        alert("Please enter pickup and drop locations");
        return;
    }

    // Save for next screens
    localStorage.setItem("pickupLocation", pickup);
    localStorage.setItem("dropLocation", drop);

    // Next screen (to be built)
    window.location.href = "vehicle.html";
}
