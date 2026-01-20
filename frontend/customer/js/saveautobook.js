function saveAutoBook() {
    const time = document.getElementById("time").value;
    const vehicle = document.getElementById("vehicle").value;
    const status = document.getElementById("status");

    if (!time) {
        status.innerText = "Please select time";
        status.style.color = "red";
        return;
    }

    fetch("http://127.0.0.1:8000/autobook/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: localStorage.getItem("smartRideUser"),
            pickup: localStorage.getItem("pickupLocation"),
            drop: localStorage.getItem("dropLocation"),
            vehicle: vehicle,
            time: time
        })
    })
    .then(res => res.json())
    .then(data => {
        status.style.color = "green";
        status.innerText = data.status;
    })
    .catch(err => {
        console.error(err);
        status.style.color = "red";
        status.innerText = "Failed to save auto booking";
    });
}
status.innerText = "Saving...";
status.style.color = "#555";
const user = localStorage.getItem("smartRideUser");
const statusText = document.getElementById("autoStatus");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");

/* ==============================
   CHECK CURRENT STATUS (ON LOAD)
================================ */

window.onload = () => {
    // default assumption after creation
    statusText.innerText = "Active";
    statusText.style.color = "green";
};

/* ==============================
   PAUSE AUTO BOOK
================================ */

function pauseAutoBook() {
    fetch(`http://127.0.0.1:8000/autobook/pause?user=${user}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(data => {
        statusText.innerText = "Paused";
        statusText.style.color = "red";

        pauseBtn.style.display = "none";
        resumeBtn.style.display = "block";
    });
}

/* ==============================
   RESUME AUTO BOOK
================================ */

function resumeAutoBook() {
    fetch(`http://127.0.0.1:8000/autobook/resume?user=${user}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(data => {
        statusText.innerText = "Active";
        statusText.style.color = "green";

        resumeBtn.style.display = "none";
        pauseBtn.style.display = "block";
    });
}
