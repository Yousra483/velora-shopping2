// js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', e => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Set session cookie (no expiry = dies when browser closes)
        document.cookie = "velora_logged_in=true; path=/";

        showLoginSuccess(loginForm);
    });

    function showLoginSuccess(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Welcome! Redirecting...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        form.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    }
});
