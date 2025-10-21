// Main page functionality
document.addEventListener('DOMContentLoaded', function() {
    displayWelcomeMessage();
    initializeStatsCounter();
    initializeAnimations();
});

// Display welcome message if user is logged in
function displayWelcomeMessage() {
    const userData = JSON.parse(localStorage.getItem('veloraUser'));
    const welcomeElement = document.getElementById('welcomeMessage');
    const userSection = document.getElementById('userSection');
    
    if (userData && userData.isLoggedIn) {
        // Welcome message in hero section
        welcomeElement.innerHTML = `
            <div class="animate__animated animate__fadeInDown">
                <i class="fas fa-gem me-2"></i>
                Welcome back, <strong>${userData.username}</strong>!
            </div>
        `;
        
        // User section in navigation
        userSection.innerHTML = `
            <div class="nav-welcome">
                <span class="text-gold">Hi, ${userData.username}</span>
                <button class="btn btn-outline-gold btn-sm ms-2" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        `;
    } else {
        welcomeElement.innerHTML = `
            <div class="animate__animated animate__fadeInDown">
                <i class="fas fa-star me-2"></i>
                Discover the world of luxury
            </div>
        `;
        
        userSection.innerHTML = `
            <a href="login.html" class="btn btn-outline-gold btn-sm">
                <i class="fas fa-user me-1"></i>Login
            </a>
        `;
    }
}

// Animate stats counter
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Initialize animations
function initializeAnimations() {
    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
            }
        });
    });

    animatedElements.forEach(el => {
        el.style.visibility = 'hidden';
        observer.observe(el);
    });
}

// Logout function
function logout() {
    localStorage.removeItem('veloraUser');
    location.reload();
}