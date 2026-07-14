/* ==========================================
   CyberSale - Core JavaScript Logic
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE ---
  let products = [...MOCK_PRODUCTS];
  let cart = [];
  let wishlist = [];
  let currentView = "home";
  
  // Filters
  let searchQuery = "";
  let selectedCategoryFilter = "all";
  let activeCheckCategories = [];
  let maxPrice = 300000;
  let sortOrder = "popular";

  // Active User Mock Database
  let currentUser = {
    name: "Rich Psycho",
    email: "v.viknesh1309@gmail.com",
    spent: 345990,
    orders: [
      { id: "TXN-883719", date: "2026-06-15", items: "Predator Dome Pro HMS 3110 (x1)", total: 134999, status: "delivered" },
      { id: "TXN-772910", date: "2026-06-20", items: "Neon Strike Mechanical Keyboard (x1), HoloClick CyberMouse v2 (x2)", total: 17097, status: "delivered" },
      { id: "TXN-552918", date: "2026-07-01", items: "NVIDIA RTX 5090 FE Cyber-Build (x1)", total: 189999, status: "processing" },
      { id: "TXN-221980", date: "2026-07-02", items: "RGB Cyber-Desk Pad (XL) (x1.5)", total: 3895, status: "processing" }
    ]
  };

  // --- DOM ELEMENTS ---
  const homeView = document.getElementById("homeView");
  const checkoutView = document.getElementById("checkoutView");
  const userView = document.getElementById("userView");
  const adminView = document.getElementById("adminView");

  const productsGrid = document.getElementById("productsGrid");
  const displayedCountEl = document.getElementById("displayedProductsCount");
  const totalCountEl = document.getElementById("totalProductsCount");
  const categoryIndicator = document.getElementById("activeCategoryIndicator");

  // Search & Nav Header
  const searchQueryInput = document.getElementById("searchQuery");
  const searchCategorySelect = document.getElementById("searchCategory");
  const searchBtn = document.getElementById("searchBtn");
  const logoBtn = document.getElementById("navLogoBtn");

  // Nav Counters & Profile Icons
  const cartToggleBtn = document.getElementById("cartToggleBtn");
  const wishlistToggleBtn = document.getElementById("wishlistToggleBtn");
  const cartCountEl = document.getElementById("cartCount");
  const wishlistCountEl = document.getElementById("wishlistCount");
  const profileNavBtn = document.getElementById("profileNavBtn");
  const topNavUsername = document.getElementById("topNavUsername");
  const topNavUserStatus = document.getElementById("topNavUserStatus");

  // Cart & Wishlist Sidebars
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartCloseBtn = document.getElementById("cartCloseBtn");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartSubtotalVal = document.getElementById("cartSubtotalVal");
  const cartTaxVal = document.getElementById("cartTaxVal");
  const cartTotalVal = document.getElementById("cartTotalVal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const wishlistSidebar = document.getElementById("wishlistSidebar");
  const wishlistCloseBtn = document.getElementById("wishlistCloseBtn");
  const wishlistItemsList = document.getElementById("wishlistItemsList");
  const clearWishlistBtn = document.getElementById("clearWishlistBtn");

  // Product detail modal
  const productDetailModal = document.getElementById("productDetailModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalProductContent = document.getElementById("modalProductContent");

  // Filters Sidebar
  const filterCheckboxes = document.querySelectorAll(".category-filter-check");
  const priceRangeSlider = document.getElementById("priceRange");
  const priceMaxLabel = document.getElementById("priceMaxLabel");
  const sortSelect = document.getElementById("sortSelect");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");

  // Checkout View Elements
  const checkoutSummaryItems = document.getElementById("checkoutSummaryItems");
  const checkoutSubtotal = document.getElementById("checkoutSubtotal");
  const checkoutTax = document.getElementById("checkoutTax");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const backToShopBtn = document.getElementById("backToShopBtn");
  const paymentOptionBtns = document.querySelectorAll(".payment-option-btn");
  const paymentUpiDiv = document.getElementById("paymentUpiDiv");
  const paymentCardDiv = document.getElementById("paymentCardDiv");
  const paymentCodDiv = document.getElementById("paymentCodDiv");

  // Credit Card Animation Refs
  const creditCardGraphic = document.getElementById("creditCardGraphic");
  const cardNameInput = document.getElementById("cardNameInput");
  const cardNumInput = document.getElementById("cardNumInput");
  const cardExpiryInput = document.getElementById("cardExpiryInput");
  const cardCvvInput = document.getElementById("cardCvvInput");
  const cardGraphicNum = document.getElementById("cardGraphicNum");
  const cardGraphicName = document.getElementById("cardGraphicName");
  const cardGraphicExpiry = document.getElementById("cardGraphicExpiry");
  const cardGraphicCvv = document.getElementById("cardGraphicCvv");

  // Order Complete Modal Refs
  const orderConfirmModal = document.getElementById("orderConfirmModal");
  const confirmCloseBtn = document.getElementById("confirmCloseBtn");
  const confirmGoOrdersBtn = document.getElementById("confirmGoOrdersBtn");

  // User profile dashboard
  const userProfileDiv = document.getElementById("userProfileDiv");
  const loginFormDiv = document.getElementById("loginFormDiv");
  const userOrdersTableBody = document.getElementById("userOrdersTableBody");
  const logoutBtn = document.getElementById("logoutBtn");
  const submitLoginBtn = document.getElementById("submitLoginBtn");
  const signupToggleBtn = document.getElementById("signupToggleBtn");

  // Admin panel
  const adminProductsTableBody = document.getElementById("adminProductsTableBody");
  const adminTotalOrdersVal = document.getElementById("adminTotalOrdersVal");
  const adminProductForm = document.getElementById("adminProductForm");
  const adminFormTitle = document.getElementById("adminFormTitle");
  const adminProductId = document.getElementById("adminProductId");
  const adminProdName = document.getElementById("adminProdName");
  const adminProdCategory = document.getElementById("adminProdCategory");
  const adminProdPrice = document.getElementById("adminProdPrice");
  const adminProdRating = document.getElementById("adminProdRating");
  const adminProdImage = document.getElementById("adminProdImage");
  const adminProdSpecs = document.getElementById("adminProdSpecs");
  const adminFormSubmitBtn = document.getElementById("adminFormSubmitBtn");
  const adminFormCancelBtn = document.getElementById("adminFormCancelBtn");

  // --- INITIALIZATION ---
  initApp();

  function initApp() {
    renderCategoryCounts();
    renderProducts();
    setupSlider();
    renderUserOrders();
    renderAdminProducts();
    updateCartCount();
  }

  // --- VIEW SWITCHER ---
  function switchView(view) {
    currentView = view;
    // Hide all main views
    homeView.classList.remove("active");
    checkoutView.classList.remove("active");
    userView.classList.remove("active");
    adminView.classList.remove("active");

    // Remove active state from nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
    });

    if (view === "home") {
      homeView.classList.add("active");
      document.querySelector(".nav-links li[data-view='home']").classList.add("active");
    } else if (view === "checkout") {
      checkoutView.classList.add("active");
      renderCheckoutSummary();
    } else if (view === "user") {
      userView.classList.add("active");
      // Check if logged in (for simplicity, toggle fake logged-in state)
      if (currentUser) {
        userProfileDiv.style.display = "grid";
        loginFormDiv.style.display = "none";
      } else {
        userProfileDiv.style.display = "none";
        loginFormDiv.style.display = "block";
      }
    } else if (view === "admin") {
      adminView.classList.add("active");
      document.querySelector(".nav-links li[data-view='admin']").classList.add("active");
      renderAdminProducts();
    }
    
    // Close sidebar drawers on view switch
    closeSidebars();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Bind Navigation Links
  document.querySelectorAll(".nav-links li").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetView = link.getAttribute("data-view");
      const categoryFilter = link.getAttribute("data-filter");
      const promoFilter = link.getAttribute("data-promo");

      if (targetView === "home") {
        switchView("home");
        // Apply categories filter if clicked from sub-menu
        if (categoryFilter) {
          selectedCategoryFilter = categoryFilter;
          // Sync checkboxes
          filterCheckboxes.forEach(cb => {
            cb.checked = (cb.value === categoryFilter);
          });
          activeCheckCategories = [categoryFilter];
          categoryIndicator.innerText = categoryFilter.toUpperCase();
        } else if (promoFilter === "sale") {
          // Trigger price filter reduction or filter only sale items
          maxPrice = 100000;
          priceRangeSlider.value = 100000;
          priceMaxLabel.innerText = "Max: ₹1,00,000";
          showToast("Super Sale: Displaying items under ₹1,00,000", "info");
        } else {
          // Reset categories
          selectedCategoryFilter = "all";
          filterCheckboxes.forEach(cb => cb.checked = false);
          activeCheckCategories = [];
          categoryIndicator.innerText = "All Hardware";
        }
        renderProducts();
      } else {
        switchView(targetView);
      }
    });
  });

  // Footer navigation links support
  document.querySelectorAll(".footer-nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const categoryFilter = link.getAttribute("data-filter");
      switchView("home");
      if (categoryFilter) {
        selectedCategoryFilter = categoryFilter;
        filterCheckboxes.forEach(cb => {
          cb.checked = (cb.value === categoryFilter);
        });
        activeCheckCategories = [categoryFilter];
        categoryIndicator.innerText = categoryFilter.toUpperCase();
      }
      renderProducts();
    });
  });

  logoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    switchView("home");
    // Reset filters
    resetFilters();
  });

  profileNavBtn.addEventListener("click", () => switchView("user"));
  backToShopBtn.addEventListener("click", () => switchView("home"));

  // --- HERO PROMO SLIDER ---
  function setupSlider() {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".slider-dot");
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));
      
      slides[index].classList.add("active");
      dots[index].classList.add("active");
      currentSlide = index;
    }

    function nextSlide() {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    // Auto run
    slideInterval = setInterval(nextSlide, 5000);

    // Click on dots
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        const index = parseInt(dot.getAttribute("data-index"));
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });

    // Shop now triggers
    document.querySelectorAll(".shop-now-cta").forEach(btn => {
      btn.addEventListener("click", () => {
        switchView("home");
        // Scroll to grid
        document.querySelector(".shop-section").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // Treats "new-arrivals" as a pseudo-category matching prod.newArrival, otherwise a normal category match
  function productMatchesCategory(prod, cat) {
    if (cat === "new-arrivals") return !!prod.newArrival;
    return prod.category === cat;
  }

  // --- RENDER PRODUCTS GRID ---
  function renderProducts() {
    productsGrid.innerHTML = "";

    // Apply filtering
    let filtered = products.filter(prod => {
      // 1. Live Search check
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prod.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Nav category selector check
      let matchesNavCategory = (selectedCategoryFilter === "all" || productMatchesCategory(prod, selectedCategoryFilter));

      // 3. Checkbox category filters check
      let matchesCheckCategory = true;
      if (activeCheckCategories.length > 0) {
        matchesCheckCategory = activeCheckCategories.some(cat => productMatchesCategory(prod, cat));
      }

      // 4. Max price check
      const matchesPrice = prod.price <= maxPrice;

      return matchesSearch && matchesNavCategory && matchesCheckCategory && matchesPrice;
    });

    // Sorting
    if (sortOrder === "popular") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "new") {
      // Products with odd ids or newArrival properties sorted first
      filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    }

    displayedCountEl.innerText = filtered.length;
    totalCountEl.innerText = products.length;

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: span 3; width: 100%;">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>No military-grade hardware matches your filters in local network.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.style.setProperty("--accent-neon", `var(--neon-${prod.badgeColor})`);
      card.style.setProperty("--accent-neon-glow", `var(--neon-${prod.badgeColor}-glow)`);

      // Star calculation
      let starsHTML = "";
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(prod.rating)) {
          starsHTML += '<i class="fa-solid fa-star"></i>';
        } else if (i - 0.5 <= prod.rating) {
          starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
          starsHTML += '<i class="fa-regular fa-star"></i>';
        }
      }

      const isWishlisted = wishlist.includes(prod.id) ? "active" : "";

      card.innerHTML = `
        <div class="card-badge-container">
          <span class="badge ${prod.badgeColor}">${prod.badge}</span>
        </div>
        <button class="wishlist-btn-card ${isWishlisted}" data-id="${prod.id}" title="Pin to Wishlist">
          <i class="fa-solid fa-heart"></i>
        </button>
        <div class="product-img-wrapper" data-id="${prod.id}">
          <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="product-info">
          <span class="product-category-text">${prod.category}</span>
          <h4 class="product-name" data-id="${prod.id}">${prod.name}</h4>
          <div class="rating-container">
            <span class="stars">${starsHTML}</span>
            <span class="reviews-count">(${prod.reviews} logs)</span>
          </div>
          <div class="product-bottom">
            <div class="product-price">₹${prod.price.toLocaleString("en-IN")}</div>
            <button class="add-to-cart-btn" data-id="${prod.id}">
              <i class="fa-solid fa-cart-plus"></i> ADD TO CART
            </button>
          </div>
        </div>
      `;

      // Event listener: Add to cart
      card.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(prod.id);
      });

      // Event listener: Toggle Wishlist
      card.querySelector(".wishlist-btn-card").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(prod.id);
        e.currentTarget.classList.toggle("active");
      });

      // Event listener: Open Details
      card.querySelectorAll("[data-id]").forEach(el => {
        if (!el.classList.contains("wishlist-btn-card") && !el.classList.contains("add-to-cart-btn")) {
          el.addEventListener("click", () => {
            showProductDetail(prod.id);
          });
        }
      });

      productsGrid.appendChild(card);
    });
  }

  // --- UPDATE CATEGORY LIST COUNTS ---
  function renderCategoryCounts() {
    const counts = { pc: 0, laptops: 0, handhelds: 0, monitors: 0, projectors: 0, sound: 0, accessories: 0, networking: 0, chairs: 0, emobility: 0 };
    let newArrivalsCount = 0;
    products.forEach(prod => {
      if (counts[prod.category] !== undefined) {
        counts[prod.category]++;
      }
      if (prod.newArrival) newArrivalsCount++;
    });

    for (let cat in counts) {
      const el = document.getElementById(`count-${cat}`);
      if (el) {
        el.innerText = `${counts[cat]} Hardware Options`;
      }
    }

    const newArrivalsEl = document.getElementById("count-new-arrivals");
    if (newArrivalsEl) {
      newArrivalsEl.innerText = `${newArrivalsCount} Hardware Options`;
    }
  }

  // Category card click behavior (Feature Category Grid on home page)
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.getAttribute("data-category");
      
      // Toggle selection
      if (selectedCategoryFilter === cat) {
        selectedCategoryFilter = "all";
        card.classList.remove("active");
        filterCheckboxes.forEach(cb => cb.checked = false);
        activeCheckCategories = [];
        categoryIndicator.innerText = "All Hardware";
      } else {
        document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        selectedCategoryFilter = cat;
        // Sync checkboxes
        filterCheckboxes.forEach(cb => {
          cb.checked = (cb.value === cat);
        });
        activeCheckCategories = [cat];
        categoryIndicator.innerText = cat === "new-arrivals" ? "New Products" : cat.toUpperCase();
      }
      renderProducts();
      // Scroll down to products grid slightly
      document.querySelector(".products-header").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Prev / Next category controls (Mock shifting carousel focus)
  let activeCatIndex = 0;
  const categoriesList = ["new-arrivals", "laptops", "pc", "handhelds", "monitors", "projectors", "accessories", "sound", "networking", "chairs", "emobility"];
  document.getElementById("catNextBtn").addEventListener("click", () => {
    activeCatIndex = (activeCatIndex + 1) % categoriesList.length;
    const targetCat = categoriesList[activeCatIndex];
    document.querySelector(`.category-card[data-category='${targetCat}']`).click();
  });
  document.getElementById("catPrevBtn").addEventListener("click", () => {
    activeCatIndex = (activeCatIndex - 1 + categoriesList.length) % categoriesList.length;
    const targetCat = categoriesList[activeCatIndex];
    document.querySelector(`.category-card[data-category='${targetCat}']`).click();
  });

  // --- FILTERS FUNCTIONALITIES ---
  // Live Search trigger
  searchBtn.addEventListener("click", triggerSearch);
  searchQueryInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  });

  function triggerSearch() {
    searchQuery = searchQueryInput.value.trim();
    selectedCategoryFilter = searchCategorySelect.value;
    
    // Sync category filters check list
    if (selectedCategoryFilter !== "all") {
      activeCheckCategories = [selectedCategoryFilter];
      filterCheckboxes.forEach(cb => {
        cb.checked = (cb.value === selectedCategoryFilter);
      });
      categoryIndicator.innerText = selectedCategoryFilter.toUpperCase();
    } else {
      activeCheckCategories = [];
      filterCheckboxes.forEach(cb => cb.checked = false);
      categoryIndicator.innerText = "All Search Matches";
    }

    switchView("home");
    renderProducts();
    document.querySelector(".products-header").scrollIntoView({ behavior: "smooth" });
  }

  // Sidebar checkbox filters
  filterCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      activeCheckCategories = Array.from(filterCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      
      // Update UI active category card
      document.querySelectorAll(".category-card").forEach(card => {
        const cat = card.getAttribute("data-category");
        if (activeCheckCategories.length === 1 && activeCheckCategories[0] === cat) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      });

      if (activeCheckCategories.length === 1) {
        categoryIndicator.innerText = activeCheckCategories[0].toUpperCase();
      } else if (activeCheckCategories.length > 1) {
        categoryIndicator.innerText = "Multiple Hardware Nodes";
      } else {
        categoryIndicator.innerText = "All Hardware";
      }

      selectedCategoryFilter = "all";
      renderProducts();
    });
  });

  // Price range slider live updates
  priceRangeSlider.addEventListener("input", (e) => {
    maxPrice = parseInt(e.target.value);
    priceMaxLabel.innerText = `Max: ₹${maxPrice.toLocaleString("en-IN")}`;
    renderProducts();
  });

  // Sorting selection updates
  sortSelect.addEventListener("change", (e) => {
    sortOrder = e.target.value;
    renderProducts();
  });

  // Reset filter button
  clearFiltersBtn.addEventListener("click", resetFilters);

  function resetFilters() {
    searchQuery = "";
    searchQueryInput.value = "";
    selectedCategoryFilter = "all";
    searchCategorySelect.value = "all";
    activeCheckCategories = [];
    filterCheckboxes.forEach(cb => cb.checked = false);
    document.querySelectorAll(".category-card").forEach(card => card.classList.remove("active"));
    maxPrice = 300000;
    priceRangeSlider.value = 300000;
    priceMaxLabel.innerText = "Max: ₹3,00,000";
    sortOrder = "popular";
    sortSelect.value = "popular";
    categoryIndicator.innerText = "All Hardware";
    renderProducts();
  }

  // --- WISHLIST SYSTEM ---
  function toggleWishlist(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    const index = wishlist.indexOf(id);
    if (index > -1) {
      // Remove
      wishlist.splice(index, 1);
      showToast(`Removed model ${prod.name} from Wishlist`, "info");
    } else {
      // Add
      wishlist.push(id);
      showToast(`Saved model ${prod.name} to neural Wishlist`, "success");
    }
    updateWishlistCount();
    renderWishlist();
  }

  function updateWishlistCount() {
    wishlistCountEl.innerText = wishlist.length;
    wishlistCountEl.style.display = wishlist.length > 0 ? "flex" : "none";
  }

  function renderWishlist() {
    wishlistItemsList.innerHTML = "";

    if (wishlist.length === 0) {
      wishlistItemsList.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-heart-crack"></i>
          <p>Your wishlist buffer is empty. Mark items while exploring.</p>
        </div>
      `;
      return;
    }

    wishlist.forEach(id => {
      const prod = products.find(p => p.id === id);
      if (!prod) return;

      const itemRow = document.createElement("div");
      itemRow.className = "sidebar-item-row";
      itemRow.innerHTML = `
        <div class="sidebar-item-img">
          <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="sidebar-item-details">
          <h5 class="sidebar-item-name">${prod.name}</h5>
          <div class="sidebar-item-price">₹${prod.price.toLocaleString("en-IN")}</div>
          <button class="sidebar-cta-btn secondary add-to-cart-from-wishlist" data-id="${prod.id}" style="padding: 0.3rem 0.5rem; margin-top: 0.4rem; font-size: 0.75rem;">
            TRANSFER TO CART
          </button>
        </div>
        <button class="sidebar-item-remove-btn remove-from-wishlist-sidebar" data-id="${prod.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;

      itemRow.querySelector(".add-to-cart-from-wishlist").addEventListener("click", () => {
        addToCart(prod.id);
        toggleWishlist(prod.id); // Remove from wishlist on transfer
        renderProducts(); // Refresh card states
      });

      itemRow.querySelector(".remove-from-wishlist-sidebar").addEventListener("click", () => {
        toggleWishlist(prod.id);
        renderProducts(); // Refresh card states
      });

      wishlistItemsList.appendChild(itemRow);
    });
  }

  clearWishlistBtn.addEventListener("click", () => {
    if (wishlist.length > 0) {
      wishlist = [];
      updateWishlistCount();
      renderWishlist();
      renderProducts();
      showToast("Cleared Wishlist memory block", "info");
    }
  });

  // --- ADVANCED CART SYSTEM ---
  function addToCart(id, qty = 1) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    const existing = cart.find(item => item.product.id === id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ product: prod, quantity: qty });
    }

    showToast(`Added ${prod.name} to Cart Node`, "success");
    updateCartCount();
    renderCart();
  }

  function updateCartCount() {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountEl.innerText = totalQty;
    cartCountEl.style.display = totalQty > 0 ? "flex" : "none";
  }

  function renderCart() {
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-cart-flatbed-suitcases"></i>
          <p>Cart node is currently empty. Direct hardware inputs required.</p>
        </div>
      `;
      cartSubtotalVal.innerText = "₹0";
      cartTaxVal.innerText = "₹0";
      cartTotalVal.innerText = "₹0";
      return;
    }

    let subtotal = 0;

    cart.forEach(item => {
      const prod = item.product;
      const itemSubtotal = prod.price * item.quantity;
      subtotal += itemSubtotal;

      const itemRow = document.createElement("div");
      itemRow.className = "sidebar-item-row";
      itemRow.innerHTML = `
        <div class="sidebar-item-img">
          <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="sidebar-item-details">
          <h5 class="sidebar-item-name">${prod.name}</h5>
          <div class="sidebar-item-price">₹${prod.price.toLocaleString("en-IN")}</div>
          <div class="qty-control">
            <button class="qty-btn qty-minus" data-id="${prod.id}">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn qty-plus" data-id="${prod.id}">+</button>
          </div>
        </div>
        <button class="sidebar-item-remove-btn remove-from-cart" data-id="${prod.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;

      // Qty minus
      itemRow.querySelector(".qty-minus").addEventListener("click", () => {
        adjustCartQty(prod.id, -1);
      });

      // Qty plus
      itemRow.querySelector(".qty-plus").addEventListener("click", () => {
        adjustCartQty(prod.id, 1);
      });

      // Remove item
      itemRow.querySelector(".remove-from-cart").addEventListener("click", () => {
        removeCartItem(prod.id);
      });

      cartItemsList.appendChild(itemRow);
    });

    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + tax;

    cartSubtotalVal.innerText = `₹${subtotal.toLocaleString("en-IN")}`;
    cartTaxVal.innerText = `₹${tax.toLocaleString("en-IN")}`;
    cartTotalVal.innerText = `₹${total.toLocaleString("en-IN")}`;
  }

  function adjustCartQty(id, change) {
    const item = cart.find(item => item.product.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      removeCartItem(id);
    } else {
      updateCartCount();
      renderCart();
    }
  }

  function removeCartItem(id) {
    const itemIndex = cart.findIndex(item => item.product.id === id);
    if (itemIndex > -1) {
      const name = cart[itemIndex].product.name;
      cart.splice(itemIndex, 1);
      showToast(`Removed ${name} from Cart`, "info");
      updateCartCount();
      renderCart();
    }
  }

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Direct purchase link blocked. Add hardware to Cart first.", "error");
      return;
    }
    switchView("checkout");
  });

  // --- TOAST NOTIFICATIONS SYSTEM ---
  function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconClass = "fa-solid fa-circle-check";
    if (type === "error") iconClass = "fa-solid fa-circle-xmark";
    if (type === "info") iconClass = "fa-solid fa-info-circle";

    toast.innerHTML = `
      <i class="toast-icon ${iconClass}"></i>
      <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }

  // --- PRODUCT DETAIL MODAL ---
  function showProductDetail(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    modalProductContent.innerHTML = "";

    // Specifications rows
    let specsRowsHTML = "";
    for (let key in prod.specs) {
      specsRowsHTML += `
        <tr>
          <td class="spec-name">${key}</td>
          <td class="spec-value">${prod.specs[key]}</td>
        </tr>
      `;
    }

    modalProductContent.innerHTML = `
      <div class="detail-img-showcase">
        <img src="${prod.image}" alt="${prod.name}">
      </div>
      <div class="detail-info">
        <h4 class="detail-name">${prod.name}</h4>
        <div class="rating-container" style="margin-bottom: 0.5rem;">
          <span class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
          <span class="reviews-count">(${prod.reviews} reviews / Rating: ${prod.rating} ⭐)</span>
        </div>
        <div class="detail-price">₹${prod.price.toLocaleString("en-IN")} <span>(Inc. 18% GST)</span></div>
        
        <table class="detail-specs-table">
          <tbody>
            ${specsRowsHTML}
          </tbody>
        </table>

        <div class="detail-actions">
          <button class="sidebar-cta-btn detail-action-btn" id="modalAddToCartBtn">
            <i class="fa-solid fa-cart-plus"></i> ADD TO INVENTORY
          </button>
          <button class="sidebar-cta-btn secondary detail-action-btn" id="modalBuyNowBtn">
            BUY NOW
          </button>
        </div>
      </div>
    `;

    // Modal action behaviors
    document.getElementById("modalAddToCartBtn").addEventListener("click", () => {
      addToCart(prod.id);
      productDetailModal.classList.remove("active");
    });

    document.getElementById("modalBuyNowBtn").addEventListener("click", () => {
      // Clear cart first, add this item, go checkout
      cart = [{ product: prod, quantity: 1 }];
      updateCartCount();
      renderCart();
      productDetailModal.classList.remove("active");
      switchView("checkout");
    });

    productDetailModal.classList.add("active");
  }

  // Close modals
  modalCloseBtn.addEventListener("click", () => {
    productDetailModal.classList.remove("active");
  });

  productDetailModal.addEventListener("click", (e) => {
    if (e.target === productDetailModal) {
      productDetailModal.classList.remove("active");
    }
  });

  // --- CART / WISHLIST SLIDEOUTS ---
  function closeSidebars() {
    sidebarOverlay.classList.remove("active");
    cartSidebar.classList.remove("active");
    wishlistSidebar.classList.remove("active");
  }

  cartToggleBtn.addEventListener("click", () => {
    sidebarOverlay.classList.add("active");
    cartSidebar.classList.add("active");
  });

  wishlistToggleBtn.addEventListener("click", () => {
    sidebarOverlay.classList.add("active");
    wishlistSidebar.classList.add("active");
  });

  cartCloseBtn.addEventListener("click", closeSidebars);
  wishlistCloseBtn.addEventListener("click", closeSidebars);
  sidebarOverlay.addEventListener("click", closeSidebars);

  // --- CHECKOUT PROCESS & FORM ---
  function renderCheckoutSummary() {
    checkoutSummaryItems.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
      const prod = item.product;
      const itemSubtotal = prod.price * item.quantity;
      subtotal += itemSubtotal;

      const summaryRow = document.createElement("div");
      summaryRow.className = "sidebar-item-row";
      summaryRow.innerHTML = `
        <div class="sidebar-item-img" style="width: 50px; height: 50px;">
          <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="sidebar-item-details">
          <div class="sidebar-item-name" style="font-size: 0.85rem; padding-right: 0;">${prod.name}</div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted);">
            <span>Qty: ${item.quantity}</span>
            <span style="color: var(--neon-cyan);">₹${itemSubtotal.toLocaleString("en-IN")}</span>
          </div>
        </div>
      `;
      checkoutSummaryItems.appendChild(summaryRow);
    });

    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    checkoutSubtotal.innerText = `₹${subtotal.toLocaleString("en-IN")}`;
    checkoutTax.innerText = `₹${tax.toLocaleString("en-IN")}`;
    checkoutTotal.innerText = `₹${total.toLocaleString("en-IN")}`;
  }

  // Payment Option selection toggling
  paymentOptionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      paymentOptionBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const method = btn.getAttribute("data-method");
      paymentUpiDiv.style.display = "none";
      paymentCardDiv.style.display = "none";
      paymentCodDiv.style.display = "none";

      if (method === "upi") {
        paymentUpiDiv.style.display = "flex";
      } else if (method === "card") {
        paymentCardDiv.style.display = "block";
      } else if (method === "cod") {
        paymentCodDiv.style.display = "block";
      }
    });
  });

  // Card holder name typing interactive mirroring
  cardNameInput.addEventListener("input", (e) => {
    cardGraphicName.innerText = e.target.value.trim().toUpperCase() || "VIKNESH V";
  });

  // Card details typing interactive mirroring
  cardNumInput.addEventListener("input", (e) => {
    // Add space spacing format
    let val = e.target.value.replace(/\D/g, "");
    let formatted = "";
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += " ";
      formatted += val[i];
    }
    e.target.value = formatted;
    cardGraphicNum.innerText = formatted || "•••• •••• •••• ••••";
  });

  // Trigger flip to back on CVV focus
  cardCvvInput.addEventListener("focus", () => {
    creditCardGraphic.classList.add("flipped");
  });
  cardCvvInput.addEventListener("blur", () => {
    creditCardGraphic.classList.remove("flipped");
  });
  cardCvvInput.addEventListener("input", (e) => {
    cardGraphicCvv.innerText = e.target.value || "•••";
  });

  // Expiry input slash format
  cardExpiryInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length >= 2) {
      e.target.value = val.substring(0,2) + "/" + val.substring(2,4);
    } else {
      e.target.value = val;
    }
    cardGraphicExpiry.innerText = e.target.value || "12/30";
  });

  // Submit Order logic
  placeOrderBtn.addEventListener("click", () => {
    // Basic Form validation
    const name = document.getElementById("shippingName").value.trim();
    const phone = document.getElementById("shippingPhone").value.trim();
    const email = document.getElementById("shippingEmail").value.trim();
    const address = document.getElementById("shippingAddress").value.trim();

    if (!name || !phone || !email || !address) {
      showToast("Order blocked. Please fill out shipping coordinates.", "error");
      return;
    }

    // Process order mock adding
    const newTxnId = "TXN-" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toISOString().slice(0, 10);
    
    // Total calculation
    let subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const totalVal = subtotal + tax;

    // Items list text
    const itemsText = cart.map(item => `${item.product.name} (x${item.quantity})`).join(", ");

    // Push to order history
    currentUser.orders.unshift({
      id: newTxnId,
      date: orderDate,
      items: itemsText,
      total: totalVal,
      status: "processing"
    });

    currentUser.spent += totalVal;

    // Clear Cart
    cart = [];
    updateCartCount();
    renderCart();

    // Trigger Success Overlay Modal
    orderConfirmModal.classList.add("active");
    showToast("Transaction Authorization Complete", "success");
    renderUserOrders();
  });

  // Order confirmation close buttons
  confirmCloseBtn.addEventListener("click", () => {
    orderConfirmModal.classList.remove("active");
    switchView("home");
  });

  confirmGoOrdersBtn.addEventListener("click", () => {
    orderConfirmModal.classList.remove("active");
    switchView("user");
  });

  // --- USER PROFILE SYSTEM ---
  function renderUserOrders() {
    userOrdersTableBody.innerHTML = "";
    
    if (currentUser.orders.length === 0) {
      userOrdersTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-muted);">No order transmissions on file.</td>
        </tr>
      `;
      return;
    }

    currentUser.orders.forEach(order => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="order-id">${order.id}</td>
        <td>${order.date}</td>
        <td style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${order.items}">${order.items}</td>
        <td style="font-weight: 700; color: var(--text-bright);">₹${order.total.toLocaleString("en-IN")}</td>
        <td><span class="order-status ${order.status}">${order.status}</span></td>
      `;
      userOrdersTableBody.appendChild(row);
    });

    // Update headers
    document.getElementById("profileOrdersCount").innerText = currentUser.orders.length;
    document.querySelector(".profile-stat-item .profile-stat-val").innerText = `₹${currentUser.spent.toLocaleString("en-IN")}`;
  }

  // Logout/Login controls
  logoutBtn.addEventListener("click", () => {
    currentUser = null;
    topNavUserStatus.innerHTML = `
      <i class="fa-solid fa-circle-user" style="color: var(--neon-pink);"></i>
      <span>Logged Out</span>
    `;
    switchView("user");
    showToast("User session closed.", "info");
  });

  submitLoginBtn.addEventListener("click", () => {
    // Fake login loading
    const username = document.getElementById("loginUsername").value.trim() || "Rich Psycho";
    const email = "v.viknesh1309@gmail.com";
    
    currentUser = {
      name: username,
      email: email,
      spent: 345990,
      orders: [
        { id: "TXN-883719", date: "2026-06-15", items: "Predator Dome Pro HMS 3110 (x1)", total: 134999, status: "delivered" }
      ]
    };

    topNavUserStatus.innerHTML = `
      <i class="fa-solid fa-circle-user"></i>
      <span>Signed in: <span class="highlight">${currentUser.name}</span></span>
    `;

    switchView("user");
    renderUserOrders();
    showToast(`Welcome back, ${currentUser.name}`, "success");
  });

  signupToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Clearance request sent. Standard credentials loaded in form.", "info");
  });

  // --- ADMIN PANEL CONTROL PANEL ---
  function renderAdminProducts() {
    adminProductsTableBody.innerHTML = "";
    
    products.forEach(prod => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="font-weight: 600; color: var(--text-bright);">${prod.name}</td>
        <td style="text-transform: uppercase; font-size: 0.8rem; color: var(--neon-cyan);">${prod.category}</td>
        <td style="font-family: var(--font-display); font-weight: 700;">₹${prod.price.toLocaleString("en-IN")}</td>
        <td>
          <div class="admin-action-icons">
            <button class="admin-action-btn edit" data-id="${prod.id}" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="admin-action-btn delete" data-id="${prod.id}" title="Remove"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      `;

      // Delete listener
      row.querySelector(".delete").addEventListener("click", () => {
        deleteProduct(prod.id);
      });

      // Edit listener
      row.querySelector(".edit").addEventListener("click", () => {
        loadProductToEdit(prod.id);
      });

      adminProductsTableBody.appendChild(row);
    });

    // Update global state count stats
    document.getElementById("adminTotalOrdersVal").innerText = currentUser ? currentUser.orders.length + 144 : 144;
  }

  function deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);
    if (index > -1) {
      const name = products[index].name;
      products.splice(index, 1);
      showToast(`Model ${name} deleted from catalog`, "error");
      renderAdminProducts();
      renderCategoryCounts();
      renderProducts();
    }
  }

  function loadProductToEdit(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    // Fill form
    adminProductId.value = prod.id;
    adminProdName.value = prod.name;
    adminProdCategory.value = prod.category;
    adminProdPrice.value = prod.price;
    adminProdRating.value = prod.rating;
    adminProdImage.value = prod.image;

    // Serialize specs back (semicolon-separated so spec values containing commas, e.g. "USB-C, Bluetooth", survive round-tripping)
    let specsText = "";
    for (let key in prod.specs) {
      specsText += `${key}:${prod.specs[key]}; `;
    }
    adminProdSpecs.value = specsText.replace(/;\s*$/, ""); // remove trailing semicolon

    // UI state
    adminFormTitle.innerText = "Edit Hardware Model Node";
    adminFormSubmitBtn.innerText = "UPDATE NODE";
    adminFormCancelBtn.style.display = "block";

    adminProductForm.scrollIntoView({ behavior: "smooth" });
  }

  // Cancel edit button
  adminFormCancelBtn.addEventListener("click", () => {
    resetAdminForm();
  });

  function resetAdminForm() {
    adminProductId.value = "";
    adminProdName.value = "";
    adminProdCategory.value = "pc";
    adminProdPrice.value = "";
    adminProdRating.value = "4.5";
    adminProdImage.value = "";
    adminProdSpecs.value = "";
    adminFormTitle.innerText = "Inject New Hardware Model";
    adminFormSubmitBtn.innerText = "INJECT NODE";
    adminFormCancelBtn.style.display = "none";
  }

  // Inject or Edit submission
  adminProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = adminProductId.value;
    const name = adminProdName.value.trim();
    const category = adminProdCategory.value;
    const price = parseInt(adminProdPrice.value);
    const rating = parseFloat(adminProdRating.value);
    const image = adminProdImage.value.trim();
    const specsStr = adminProdSpecs.value.trim();

    // Parse specifications (semicolon-separated pairs; only the first colon splits key from value,
    // so values containing commas or extra colons, e.g. "USB-C, Bluetooth" or "16:9", parse correctly)
    let specs = {};
    if (specsStr) {
      const parts = specsStr.split(";");
      parts.forEach(p => {
        const trimmedPair = p.trim();
        if (!trimmedPair) return;
        const colonIndex = trimmedPair.indexOf(":");
        if (colonIndex > -1) {
          const key = trimmedPair.substring(0, colonIndex).trim();
          const value = trimmedPair.substring(colonIndex + 1).trim();
          if (key && value) {
            specs[key] = value;
          }
        }
      });
    }

    if (id) {
      // Update
      const prod = products.find(p => p.id === parseInt(id));
      if (prod) {
        prod.name = name;
        prod.category = category;
        prod.price = price;
        prod.rating = rating;
        prod.image = image;
        prod.specs = specs;
        showToast(`Hardware model ${name} updated successfully`, "success");
      }
    } else {
      // Create new
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const colors = ["pink", "cyan", "purple", "green", "yellow"];
      const randColor = colors[Math.floor(Math.random() * colors.length)];
      
      products.push({
        id: newId,
        name: name,
        category: category,
        price: price,
        rating: rating,
        reviews: Math.floor(5 + Math.random() * 50),
        image: image || "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600",
        badge: "Custom Build",
        badgeColor: randColor,
        specs: specs,
        newArrival: true
      });
      showToast(`Model ${name} injected into local grid`, "success");
    }

    resetAdminForm();
    renderAdminProducts();
    renderCategoryCounts();
    renderProducts();
  });
});
