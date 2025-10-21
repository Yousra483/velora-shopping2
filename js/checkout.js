// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    setupPaymentMethods();
    setupFormValidation();
    updateCartCount();
});

// Load order summary from cart
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    const orderItemsContainer = document.getElementById('orderItems');
    const productData = getProductData();
    
    orderItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(cartItem => {
        const product = productData.find(p => p.id === cartItem.id);
        
        if (product) {
            const itemTotal = product.price * cartItem.quantity;
            subtotal += itemTotal;
            
            const orderItemElement = document.createElement('div');
            orderItemElement.className = 'order-item';
            orderItemElement.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}" class="order-item-image">
                <div class="order-item-details">
                    <div class="order-item-name">${product.name}</div>
                    <div class="order-item-quantity">Qty: ${cartItem.quantity}</div>
                </div>
                <div class="order-item-price">$${itemTotal.toFixed(2)}</div>
            `;
            
            orderItemsContainer.appendChild(orderItemElement);
        }
    });
    
    updateOrderTotals(subtotal);
}

// Update order totals
function updateOrderTotals(subtotal) {
    const shipping = 15.00;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    document.getElementById('orderSubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('orderShipping').textContent = '$' + shipping.toFixed(2);
    document.getElementById('orderTax').textContent = '$' + tax.toFixed(2);
    document.getElementById('orderTotal').textContent = '$' + total.toFixed(2);
}

// Setup payment method toggle
function setupPaymentMethods() {
    const creditCardRadio = document.getElementById('creditCard');
    const paypalRadio = document.getElementById('paypal');
    const creditCardForm = document.getElementById('creditCardForm');
    
    creditCardRadio.addEventListener('change', function() {
        if (this.checked) {
            creditCardForm.style.display = 'block';
        }
    });
    
    paypalRadio.addEventListener('change', function() {
        if (this.checked) {
            creditCardForm.style.display = 'none';
        }
    });
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            processOrder();
        }
    });
}

// Validate form
function validateForm() {
    const form = document.getElementById('checkoutForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff6b6b';
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Process order
function processOrder() {
    const cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.checkout-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Save order to localStorage
        const order = {
            id: Date.now().toString(),
            date: new Date().toISOString(),items: cart,
            total: document.getElementById('orderTotal').textContent,
            status: 'completed'
        };
        
        // Save order history
        const orders = JSON.parse(localStorage.getItem('veloraOrders')) || [];
        orders.push(order);
        localStorage.setItem('veloraOrders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('veloraCart');
        
        // Show success message
        showSuccessMessage();
        
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    const successHTML = `
        <div class="success-message text-center">
            <i class="fas fa-check-circle fa-4x text-success mb-3"></i>
            <h2 class="text-success mb-3">Order Confirmed!</h2>
            <p class="mb-4">Thank you for your purchase. Your order has been successfully processed.</p>
            <div class="success-buttons">
                <a href="index.html" class="btn btn-gold me-3">
                    <i class="fas fa-home me-2"></i>Back to Home
                </a>
                <a href="products.html" class="btn btn-outline-gold">
                    <i class="fas fa-shopping-bag me-2"></i>Continue Shopping
                </a>
            </div>
        </div>
    `;
    
    document.querySelector('.checkout-container').innerHTML = successHTML;
}

// Get product data
function getProductData() {
    return [
        {
            id: "1",
            name: "iPhone 15 Pro Max",
            category: "mobile",
            price: 1199,
            images: ["images/iphone 1.jpg", "images/iphone 2.jpg", "images/iphone 3.jpg"]
        },
        {
            id: "2",
            name: "Chanel No. 5",
            category: "perfume",
            price: 299,
            images: ["images/chanel 1.jpg", "images/chanel 2.jpg", "images/chanel 3.jpg"]
        },
        {
            id: "3",
            name: "La Mer Cream",
            category: "skincare",
            price: 399,
            images: ["images/la mer 1.jpg", "images/la mer 2.jpg", "images/la mer 3.jpg"]
        },
        {
            id: "4",
            name: "MacBook Pro 16 inch",
            category: "laptop",
            price: 2399,
            images: ["images/macbook 1.jpg", "images/macbook 2.jpg", "images/macbook 3.jpg"]
        },
        {
            id: "5",
            name: "Apple Watch Ultra",
            category: "watch",
            price: 799,
            images: ["images/apple watch 1.jpg", "images/apple watch 2.jpg", "images/apple watch 3.jpg"]
        }
    ];
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}