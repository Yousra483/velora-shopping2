
// document.addEventListener('DOMContentLoaded', () => {
//     const path = window.location.pathname;


//     const isLoginPage = path.endsWith('/index.html') || path.endsWith('/velora-shopping2/') || path === '/velora-shopping2/';


//     if (sessionStorage.getItem('isLoggedIn') !== 'true' && !isLoginPage) {
//         window.location.href = '/velora-shopping2/index.html';
//     }

//     if (sessionStorage.getItem('isLoggedIn') === 'true' && isLoginPage) {
//         window.location.href = '/velora-shopping2/home.html';
//     }
// });


// js/auth-check.js
document.addEventListener('DOMContentLoaded', () => {

  if (!getCookie('velora_logged_in')) {
    window.location.href = 'index.html';
  }
});

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, val] = cookie.trim().split('=');
    if (key === name) return val;
  }
  return null;
}

