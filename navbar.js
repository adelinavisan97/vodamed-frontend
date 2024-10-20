// Function to dynamically load the navigation bar
function loadNavbar() {
    const navbar = document.getElementById("navbar");

    navbar.innerHTML = `
        <div class="navbar">
            <a href="index.html" class="active">Home</a>
            <a href="about.html">About</a>
            <div class="dropdown">
                <button class="dropbtn">Services 
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                <a href="order.html">Order Prescriptions</a>
                <a href="cancel.html">Cancel Prescriptions</a>
                <a href="guidance.html">Guidance</a>
                </div>
            </div>
            <a href="contact.html">Contact</a>
            <div class="login">
            <a href="login.html">Login</a>
            </div>
        </div>
    `;
}

// Load the navbar when the page loads
document.addEventListener("DOMContentLoaded", loadNavbar);