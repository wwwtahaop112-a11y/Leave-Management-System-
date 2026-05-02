window.login = function() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    console.log("Login Attempt:", email);

    // Ye aapka fix email aur password hai
    if(email === "wwwtahaop112@gmail.com" && pass === "taha1234") {
        localStorage.setItem("isLoggedIn", "true"); // Session save karne ke liye
        alert("Zabardast! Login Successful.");
        window.location.href = "index.html"; 
    } else {
        alert("Ghalat Email ya Password! \nEmail: wwwtahaop112@gmail.com \nPass: taha1234");
    }
};