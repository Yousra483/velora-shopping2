// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartCount();
    setupCheckout();
});

// Load cart items from localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
    
    const productData = getProductData();
    let subtotal = 0;
    
    cart.forEach(cartItem => {
        const product = productData.find(p => p.id === cartItem.id);
        
        if (product) {
            const itemTotal = product.price * cartItem.quantity;
            subtotal += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${product.name}</h3>
                    <div class="cart-item-category">${product.category}</div>
                    <div class="cart-item-price">$${product.price}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${product.id}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${cartItem.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${product.id}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${product.id}')">
                        <i class="fas fa-trash"></i>
                        Remove
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        }
    });
    
    updateCartSummary(subtotal);
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
            images: ["images/chanel 3.jpg", "images/chanel 2.jpg", "images/chanel 1.jpg"]
         
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

// Update quantity
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += change;
        
        if (cartItem.quantity <= 0) {cart = cart.filter(item => item.id !== productId);
        }
        
        localStorage.setItem('veloraCart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('veloraCart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

// Update cart summary
function updateCartSummary(subtotal) {
    const shipping = subtotal > 0 ? 15 : 0;
    const tax = subtotal * 0.1;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('shipping').textContent = '$' + shipping.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('total').textContent = '$' + (subtotal + shipping + tax).toFixed(2);
}

// Update cart count in navigation
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Setup checkout button
function setupCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
            
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
       
            window.location.href ='checkout.html';
            
           
        });
    }
}

// Make functions global
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;




