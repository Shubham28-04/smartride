/* ==============================
   AUTH & STATE CHECK
================================ */

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "auth.html";
}

const pickup = localStorage.getItem("pickupLocation");
const drop = localStorage.getItem("dropLocation");
const vehicle = localStorage.getItem("vehicleType");
const fare = localStorage.getItem("vehiclePrice");

if (!pickup || !drop || !vehicle) {
    window.location.href = "home.html";
}

/* ==============================
   DISPLAY SUMMARY
================================ */

document.getElementById("vehicleText").innerText = vehicle.toUpperCase();
document.getElementById("pickupText").innerText = pickup;
document.getElementById("dropText").innerText = drop;
document.getElementById("fareText").innerText = fare;

/* ==============================
   SIMULATE MATCHING
================================ */

// Simulate backend matching delay
setTimeout(() => {
    // Save matched driver (simulated)
    localStorage.setItem("driverName", "Rahul");
    localStorage.setItem("driverRating", "4.7");

    // Move to ride screen
    window.location.href = "ride.html";
}, 4000);
