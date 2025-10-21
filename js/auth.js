// js/auth.js
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Fake saving user to users.json by storing locally
        const storedUsers = JSON.parse(localStorage.getItem("veloraUsers")) || [];
        const newUser = { username, email, password };
        storedUsers.push(newUser);
        localStorage.setItem("veloraUsers", JSON.stringify(storedUsers));

        // Save active session (sessionStorage resets on browser close)
        const sessionUser = {
            username,
            email,
            loginTime: new Date().toISOString(),
            isLoggedIn: true
        };
        sessionStorage.setItem("veloraUser", JSON.stringify(sessionUser));

        // Visual success
        showLoginSuccess(loginForm);
    });

    function showLoginSuccess(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Welcome! Redirecting...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

        form.classList.add('animate__animated', 'animate__pulse');

        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    }
});
