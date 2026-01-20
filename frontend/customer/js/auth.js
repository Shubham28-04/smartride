function login() {
    const mobile = document.getElementById("mobile").value.trim();

    // Basic validation
    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Please enter a valid 10-digit mobile number");
        return;
    }

    // Store user data
    localStorage.setItem("smartRideUser", mobile);
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to home screen
    window.location.href = "home.html";
}
