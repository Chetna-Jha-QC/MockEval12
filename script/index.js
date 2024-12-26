document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "emher@gmail.com" && password === "emher@123") {
        alert("Login Sucess, you are redirecting to the quiz page");
        window.location.href = "quiz.html";
    } else {
        alert("Invalid Email or Password. Please try again.");
    }
});