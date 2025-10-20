
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;


    const isLoginPage = path.endsWith('/index.html') || path.endsWith('/velora-shopping2/') || path === '/velora-shopping2/';


    if (sessionStorage.getItem('isLoggedIn') !== 'true' && !isLoginPage) {
        window.location.href = '/velora-shopping2/index.html';
    }

    if (sessionStorage.getItem('isLoggedIn') === 'true' && isLoginPage) {
        window.location.href = '/velora-shopping2/home.html';
    }
});
