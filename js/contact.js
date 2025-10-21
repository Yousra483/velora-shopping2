// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
    setupFAQAccordion();
    updateCartCount();
});

// Setup contact form validation and submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
}

// Validate contact form
function validateContactForm() {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');
    
    let isValid = true;
    
    // Reset error styles
    [name, email, subject, message].forEach(field => {
        field.style.borderColor = '';
    });
    
    // Validate name
    if (!name.value.trim()) {
        name.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    // Validate subject
    if (!subject.value.trim()) {
        subject.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        message.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    return isValid;
}

// Submit contact form
function submitContactForm() {
    const submitBtn = document.querySelector('.contact-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    // Create success notification
    const successMsg = document.createElement('div');
    successMsg.className = 'success-notification';
    successMsg.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>Message sent successfully! We'll get back to you soon.</span>
        </div>
    `;
    
    // Add styles
    successMsg.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// Setup FAQ accordion
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.display = 'none';
                    item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current itemfaqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}