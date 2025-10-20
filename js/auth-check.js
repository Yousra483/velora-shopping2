// js/authGuard.js
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    // Adjust this base if needed for GitHub Pages repo name
    const isLoginPage = path.endsWith('/index.html') || path.endsWith('/velora-shopping2/') || path === '/velora-shopping2/';

    // If user not logged in and not on login page → redirect
    if (sessionStorage.getItem('isLoggedIn') !== 'true' && !isLoginPage) {
        window.location.href = '/velora-shopping2/index.html';
    }

    // If user IS logged in and tries to open login page again → send them to home
    if (sessionStorage.getItem('isLoggedIn') === 'true' && isLoginPage) {
        window.location.href = '/velora-shopping2/home.html';
    }
});
