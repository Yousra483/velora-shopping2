



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

