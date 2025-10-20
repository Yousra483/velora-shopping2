// js/products.js
document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("productsContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const loadingSpinner = document.getElementById("loadingSpinner");

  // Hide spinner when loaded
  const hideSpinner = () => (loadingSpinner.style.display = "none");

  // Product list (image filenames as seen in your folder)
  const products = [
    { name: "Apple Watch", category: "watch", price: 499, images: ["apple watch 1.jpg","apple watch 2.jpg","apple watch 3.jpg","apple watch 4.jpg"] },
    { name: "Chanel Perfume", category: "perfume", price: 299, images: ["chanel 1.jpg","chanel 2.jpg","chanel 3.jpg","chanel 4.jpg"] },
    { name: "iPhone", category: "mobile", price: 999, images: ["iphone 1.jpg","iphone 2.jpg","iphone 3.jpg","iphone 4.jpg"] },
    { name: "La Mer Skincare", category: "skincare", price: 199, images: ["la mer 1.jpg","la mer 2.jpg","la mer 3.jpg","la mer 4.jpg"] },
    { name: "MacBook", category: "laptop", price: 1499, images: ["macbook 1.jpg","macbook 2.jpg","macbook 3.jpg","macbook 4.jpg"] },
  ];

  // Flatten into one array of image entries
  const allItems = products.flatMap(p =>
    p.images.map(img => ({
      name: p.name,
      category: p.category,
      price: p.price,
      image: `images/${img}`,
    }))
  );

  function displayProducts(items) {
    productsContainer.innerHTML = "";
    if (!items.length) {
      productsContainer.innerHTML = `<p class="text-center text-light">No products found.</p>`;
      hideSpinner();
      return;
    }

    items.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4 animate__animated animate__fadeInUp";

      col.innerHTML = `
        <div class="card product-card h-100">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-muted">$${item.price}</p>
            <button class="btn btn-outline-light btn-sm add-to-cart">
              <i class="fas fa-cart-plus me-1"></i>Add to Cart
            </button>
          </div>
        </div>
      `;
      productsContainer.appendChild(col);
    });
    hideSpinner();
  }

  function filterProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = allItems.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search);
      const matchCategory = category === "all" || p.category === category;
      return matchSearch && matchCategory;
    });

    displayProducts(filtered);
  }

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  // Initial load
  setTimeout(() => displayProducts(allItems), 500);
});
