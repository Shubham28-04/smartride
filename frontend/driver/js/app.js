let online = false;

function toggleStatus() {
    const btn = document.getElementById("statusBtn");
    const text = document.getElementById("statusText");
    const demand = document.getElementById("demandCount");

    online = !online;

    if (online) {
        btn.innerText = "Go Offline";
        btn.classList.add("offline");
        text.innerText = "You are Online";
        simulateDemand();
    } else {
        btn.innerText = "Go Online";
        btn.classList.remove("offline");
        text.innerText = "You are Offline";
        demand.innerText = "No active requests";
    }
}

function simulateDemand() {
    if (!online) return;
    const count = Math.floor(Math.random() * 6) + 1;
    document.getElementById("demandCount").innerText =
        `${count} ride requests nearby`;
}
