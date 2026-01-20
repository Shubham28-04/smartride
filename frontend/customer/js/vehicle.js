/* ==============================
   AUTH CHECK
================================ */
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "auth.html";
}

/* ==============================
   LOAD ROUTE DATA
================================ */
const pickup = localStorage.getItem("pickupLocation");
const drop = localStorage.getItem("dropLocation");

if (!pickup || !drop) {
    window.location.href = "home.html";
}

document.getElementById("pickupText").innerText = pickup;
document.getElementById("dropText").innerText = drop;

/* ==============================
   VEHICLE SELECTION STATE
================================ */
let selectedVehicle = "bike";
let selectedPrice = 39;
let selectedETA = 5;

function selectVehicle(type, price, eta) {
    selectedVehicle = type;
    selectedPrice = price;
    selectedETA = eta;

    document.querySelectorAll(".vehicle-card")
        .forEach(card => card.classList.remove("active"));

    event.currentTarget.classList.add("active");
}

/* ==============================
   CONFIRM RIDE
================================ */
function confirmRide() {
    localStorage.setItem("vehicleType", selectedVehicle);
    localStorage.setItem("vehiclePrice", selectedPrice);
    localStorage.setItem("vehicleETA", selectedETA);

    window.location.href = "matching.html";
}
