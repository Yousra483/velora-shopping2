// Products JavaScript - One Model Per Category
document.addEventListener('DOMContentLoaded', function() {
    console.log('Products page loaded');
    loadProducts();
    setupSearch();
    updateCartCount();
});

// Load products data - One model per category
function loadProducts() {
    const products = [
        // Only ONE iPhone Model
        {
            id: "1",
            name: "iPhone 15 Pro Max",
            category: "mobile",
            price: 1199,
            rating: 4.8,
            description: "Latest Apple smartphone with titanium design and advanced camera",
            images: ["images/iphone 1.jpg", "images/iphone 2.jpg", "images/iphone 3.jpg"]
        },
        // Only ONE Perfume Model
        {
            id: "2",
            name: "Chanel No. 5",
            category: "perfume",
            price: 299,
            rating: 4.7,
            description: "Iconic floral fragrance with timeless elegance",
            images: ["images/chanel 3.jpg", "images/chanel 2.jpg", "images/chanel 1.jpg"]
        },
        // Only ONE Skincare Model
        {
            id: "3",
            name: "La Mer Cream",
            category: "skincare",
            price: 399,
            rating: 4.8,
            description: "Luxury moisturizing cream with miracle broth",
            images: ["images/la mer 1.jpg", "images/la mer 2.jpg", "images/la mer 3.jpg"]
        },
        // Only ONE Laptop Model
        {
            id: "4",
            name: "MacBook Pro 16 inch",
            category: "laptop",
            price: 2399,
            rating: 4.9,
            description: "Professional laptop with M3 chip for ultimate performance",
            images: ["images/macbook 1.jpg", "images/macbook 2.jpg", "images/macbook 3.jpg"]
        },
        // Only ONE Watch Model
        {
            id: "5",
            name: "Apple Watch Ultra",
            category: "watch",
            price: 799,
            rating: 4.7,
            description: "Advanced smartwatch for adventure and fitness",
            images: ["images/apple watch 1.jpg", "images/apple watch 2.jpg", "images/apple watch 3.jpg"]
        }
    ];

    showProducts(products);
}

// Display products
function showProducts(products) {
    const container = document.getElementById('productsContainer');
    
    if (!container) {
        console.error('Products container not found');
        return;
    }

    let html = '';
    
    products.forEach(product => {
        html += `
            <div class="col-12 col-sm-6 col-lg-4" data-category="${product.category}">
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                    </div>
                    
                    <div class="product-card-body">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        
                        <!-- Product Gallery - 3 images -->
                        <div class="product-gallery">
                            ${product.images.map((img, index) => `
                                <div class="gallery-thumb ${index === 0 ? 'active' : ''}" 
                                     data-image="${img}"
                                     onclick="changeProductImage(this, '${product.id}')">
                                    <img src="${img}" alt="${product.name}">
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="product-rating">
                            <div class="rating-stars">${getStars(product.rating)}</div>
                            <span class="rating-value">${product.rating}/5</span>
                        </div>
                        
                        <div class="product-price-action"><div class="product-price">$${product.price}</div>
                            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                                <i class="fas fa-cart-plus"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// بقیه فانکشن‌ها دقیقاً مثل قبل...
function changeProductImage(thumb, productId) {
    const card = thumb.closest('.product-card');
    const mainImage = card.querySelector('.product-image');
    const allThumbs = card.querySelectorAll('.gallery-thumb');
    
    allThumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    mainImage.src = thumb.getAttribute('data-image');
}

function getStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
}

function filterProducts() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const products = document.querySelectorAll('.col-12[data-category]');
    
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        const productName = product.querySelector('.product-title').textContent.toLowerCase();
        
        const matchesSearch = productName.includes(searchText);
        const matchesCategory = category === 'all' || productCategory === category;
        
        if (matchesSearch && matchesCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1,
            date: new Date().toISOString()
        });
    }
    
    localStorage.setItem('veloraCart', JSON.stringify(cart));
    updateCartCount();
    showCartMessage();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('veloraCart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function showCartMessage() {
    const message = document.createElement('div');
    message.textContent = 'Product added to cart!';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #d4af37;
        color: #0a0a0a;
        padding: 15px 30px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 10000;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Make functions available globally
window.addToCart = addToCart;
window.changeProductImage = changeProductImage;