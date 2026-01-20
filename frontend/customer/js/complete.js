/* ==============================
   AUTH CHECK
================================ */

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "auth.html";
}

/* ==============================
   LOAD RIDE DATA
================================ */

const driver = localStorage.getItem("driverName");
const vehicle = localStorage.getItem("vehicleType");
const fare = localStorage.getItem("vehiclePrice");

document.getElementById("driverName").innerText = driver || "-";
document.getElementById("vehicleType").innerText = vehicle ? vehicle.toUpperCase() : "-";
document.getElementById("fare").innerText = fare || "0";

/* ==============================
   RATING
================================ */

function rate(stars) {
    document.getElementById("ratingText").innerText =
        `You rated this ride ${stars} star${stars > 1 ? "s" : ""}`;

    // store rating (optional future use)
    localStorage.setItem("lastRideRating", stars);
}

/* ==============================
   FINISH RIDE
================================ */

function finishRide() {
    // Clear only ride-related data
    localStorage.removeItem("pickupLocation");
    localStorage.removeItem("dropLocation");
    localStorage.removeItem("vehicleType");
    localStorage.removeItem("vehiclePrice");
    localStorage.removeItem("vehicleETA");
    localStorage.removeItem("driverName");
    localStorage.removeItem("driverRating");

    // Keep user logged in
    window.location.href = "home.html";
}
