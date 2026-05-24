  // THEME
  const themeStorageKey = 'flyTheme';
  const themeToggle = document.getElementById('themeToggle');

  function readThemePreference() {
    try {
      return localStorage.getItem(themeStorageKey);
    } catch {
      return null;
    }
  }

  function saveThemePreference(theme) {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      // Theme still applies for this page view if storage is unavailable.
    }
  }

  function getSystemTheme() {
    const themeQuery = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;
    return themeQuery?.matches ? 'dark' : 'light';
  }

  function updateThemeToggle(theme) {
    if (!themeToggle) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeToggle.title = `Switch to ${nextTheme} mode`;
  }

  function applyTheme(theme, persist = false) {
    const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = normalizedTheme;
    updateThemeToggle(normalizedTheme);
    if (persist) saveThemePreference(normalizedTheme);
  }

  applyTheme(document.documentElement.dataset.theme || readThemePreference() || getSystemTheme());

  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });

  const systemThemeQuery = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
  const handleSystemThemeChange = event => {
    if (!readThemePreference()) applyTheme(event.matches ? 'dark' : 'light');
  };
  if (systemThemeQuery?.addEventListener) {
    systemThemeQuery.addEventListener('change', handleSystemThemeChange);
  } else {
    systemThemeQuery?.addListener?.(handleSystemThemeChange);
  }

  // CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  function bindCursorTargets(root = document) {
    root.querySelectorAll('a, button, .product-card, .collection-card, .filter-tab').forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = 'true';
      el.addEventListener('mouseenter', () => { cursor.classList.add('active'); ring.classList.add('active'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); ring.classList.remove('active'); });
    });
  }
  bindCursorTargets();

  // MARQUEE
  const marqueeItems = ['Free Shipping Above ₹999', 'New SS\'26 Drop', '30-Day Returns', 'Pan-India Delivery', 'Made for Real Life', 'Premium Fabrics', 'Wear the Air', 'New SS\'26 Drop'];
  const track = document.getElementById('marqueeTrack');
  const html = marqueeItems.map(t => `<span class="marquee-item">${t} <span class="marquee-dot">✦</span></span>`).join('');
  track.innerHTML = html + html; // duplicate for seamless loop

  // PRODUCTS DATA
  const products = [
    { id:1, name:'Fly Essential Tee', desc:'Supima Cotton · Oversized', price: 899, oldPrice: 1199, badge:'New', badgeClass:'new', emoji:'👕', category:'tees', colors:['#0a0a0a','#d4c4aa','#4a5568','#5a6040'] },
    { id:2, name:'Cloud Polo', desc:'Pique Cotton · Slim Fit', price: 1099, oldPrice: null, badge:'Hot', badgeClass:'hot', emoji:'👔', category:'tees', colors:['#e8e4dc','#0a0a0a','#c4623a'] },
    { id:3, name:'All-Day Jogger', desc:'Brushed French Terry', price: 1499, oldPrice: 1999, badge:'New', badgeClass:'new', emoji:'👖', category:'pants', colors:['#2a2a28','#8b7355','#4a5568'] },
    { id:4, name:'Fly Hoodie', desc:'320 GSM Fleece · Unisex', price: 1999, oldPrice: null, badge:null, badgeClass:'', emoji:'🧥', category:'hoodies', colors:['#0a0a0a','#d4c4aa','#4a5568'] },
    { id:5, name:'Oversized Graphic Tee', desc:'100% Organic Cotton', price: 999, oldPrice: 1299, badge:'Sale', badgeClass:'', emoji:'👕', category:'tees', colors:['#e8e4dc','#5a6040','#0a0a0a'] },
    { id:6, name:'Fly Cargo Pant', desc:'Ripstop · 6 Pocket', price: 1799, oldPrice: null, badge:'New', badgeClass:'new', emoji:'👖', category:'pants', colors:['#5a6040','#0a0a0a','#8b7355'] },
    { id:7, name:'Zip-Up Hoodie', desc:'French Terry · Relaxed', price: 1899, oldPrice: 2499, badge:null, badgeClass:'', emoji:'🧥', category:'hoodies', colors:['#0a0a0a','#4a5568'] },
    { id:8, name:'Everyday Polo', desc:'Double-knit Pique', price: 1199, oldPrice: null, badge:null, badgeClass:'', emoji:'👔', category:'tees', colors:['#d4c4aa','#c4623a','#0a0a0a','#5a6040'] },
  ];
  const productImages = {
    1: 'assets/product-photo-1-web.jpg',
    2: 'assets/product-photo-2-web.jpg',
    3: 'assets/product-photo-3-web.jpg',
    4: 'assets/product-photo-4-web.jpg',
    5: 'assets/product-photo-1-web.jpg',
    6: 'assets/product-photo-2-web.jpg',
    7: 'assets/product-photo-3-web.jpg',
    8: 'assets/product-photo-4-web.jpg',
  };
  const productDetails = {
    tees: {
      story: 'Soft, breathable cotton built for everyday rotation without losing shape.',
      fit: 'Easy through the chest with a clean shoulder drop.',
      care: 'Machine wash cold. Dry flat for longest life.',
      ship: 'Ships in 24 hours. Free returns for 30 days.',
    },
    pants: {
      story: 'Structured enough for the day, relaxed enough for the weekend.',
      fit: 'Mid-rise waist with room through the thigh and a tapered leg.',
      care: 'Wash inside out with similar colors.',
      ship: 'Ships in 24 hours. Free returns for 30 days.',
    },
    hoodies: {
      story: 'A warm layer with a soft handfeel and an easy all-day drape.',
      fit: 'Relaxed unisex fit designed for layering.',
      care: 'Machine wash cold. Do not bleach.',
      ship: 'Ships in 24 hours. Free returns for 30 days.',
    },
  };
  const colorClasses = {
    '#0a0a0a': 'swatch-black',
    '#d4c4aa': 'swatch-sand',
    '#4a5568': 'swatch-slate',
    '#5a6040': 'swatch-olive',
    '#e8e4dc': 'swatch-light',
    '#c4623a': 'swatch-rust',
    '#2a2a28': 'swatch-charcoal',
    '#8b7355': 'swatch-taupe',
  };

  let cart = [];
  let currentFilter = 'all';
  let activeProductId = null;
  let activeOfferPopup = false;
  let activeAuthModal = false;
  const userStorageKey = 'flyUser';
  const sessionStorageKey = 'flySession';

  function getColorClass(color) {
    return colorClasses[color] || '';
  }

  function renderProducts(filter) {
    const grid = document.getElementById('productsGrid');
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    grid.innerHTML = filtered.map((p, i) => `
      <div class="product-card reveal reveal-delay-${(i%4)+1}" data-id="${p.id}" role="button" tabindex="0" aria-label="View details for ${p.name}">
        <div class="product-img">
          <div class="product-img-inner">
            <img class="product-photo" src="${productImages[p.id]}" alt="${p.name}" loading="lazy">
          </div>
          ${p.badge ? `<div class="product-badge ${p.badgeClass}">${p.badge}</div>` : ''}
          <div class="product-quick-add" data-add-to-cart="${p.id}">+ Quick Add</div>
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-colors">
            ${p.colors.map((c,ci) => `<div class="color-dot ${ci===0?'active':''} ${getColorClass(c)}" data-color="${c}"></div>`).join('')}
          </div>
          <div class="product-price-row">
            <div class="product-price">${formatPrice(p.price)}</div>
            ${p.oldPrice ? `<div class="product-old-price">${formatPrice(p.oldPrice)}</div>` : ''}
          </div>
        </div>
      </div>
    `).join('');
    initReveal();
    bindCursorTargets(grid);
  }

  function filterProducts(cat, btn) {
    currentFilter = cat;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(cat);
  }

  // CART
  function addToCart(id) {
    const p = products.find(x => x.id === id);
    const existing = cart.find(x => x.id === id);
    if (existing) existing.qty++;
    else cart.push({ ...p, qty: 1 });
    updateCartUI();
    showToast(p.name);
    openCart();
  }

  function updateCartUI() {
    const count = cart.reduce((s, x) => s + x.qty, 0);
    document.getElementById('navBadge').textContent = count;
    document.getElementById('cartCount').textContent = `(${count})`;
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    if (cart.length === 0) {
      body.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛍</div><div class="cart-empty-text">Your bag is empty</div></div>';
      footer.classList.remove('visible');
    } else {
      body.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img"><img src="${productImages[item.id]}" alt="${item.name}"></div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-variant">${item.desc} · M</div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-qty">
              <button class="qty-btn" data-product-id="${item.id}" data-change-qty="-1">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" data-product-id="${item.id}" data-change-qty="1">+</button>
            </div>
          </div>
        </div>
      `).join('');
      const total = cart.reduce((s,x) => s + x.price * x.qty, 0);
      document.getElementById('cartTotal').textContent = formatPrice(total);
      footer.classList.add('visible');
    }
  }

  function changeQty(id, delta) {
    const item = cart.find(x => x.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
    updateCartUI();
  }

  function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
  }
  function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
  }

  function formatPrice(price) {
    return '₹' + price.toLocaleString();
  }

  function openProductModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    activeProductId = id;
    closeCart();

    const details = productDetails[p.category];
    const modal = document.getElementById('productModal');
    const content = document.getElementById('productModalContent');
    const overlay = document.getElementById('productModalOverlay');
    const oldPrice = p.oldPrice ? `<span class="product-modal-old-price">${formatPrice(p.oldPrice)}</span>` : '';

    content.innerHTML = `
      <div class="product-modal-gallery">
        <div class="product-modal-img">
          <img class="product-modal-photo" src="${productImages[p.id]}" alt="${p.name}">
        </div>
        <div class="product-modal-thumbs" aria-label="Product previews">
          <div class="product-modal-thumb active"><img src="${productImages[p.id]}" alt=""></div>
          <div class="product-modal-thumb">${p.name.split(' ')[0]}</div>
          <div class="product-modal-thumb">FLY</div>
        </div>
      </div>
      <div class="product-modal-details">
        <div class="product-modal-kicker">${p.badge || 'Bestseller'}</div>
        <h2 class="product-modal-title" id="productModalTitle">${p.name}</h2>
        <p class="product-modal-desc">${p.desc}. ${details.story}</p>

        <div class="product-modal-price-row">
          <span class="product-modal-price">${formatPrice(p.price)}</span>
          ${oldPrice}
        </div>

        <div class="product-modal-block">
          <div class="product-modal-label">Color</div>
          <div class="product-modal-colors">
            ${p.colors.map((c,ci) => `<button class="color-dot ${ci===0?'active':''} ${getColorClass(c)}" data-color="${c}" aria-label="Select color ${ci + 1}"></button>`).join('')}
          </div>
        </div>

        <div class="product-modal-block">
          <div class="product-modal-label">Size</div>
          <div class="size-options">
            ${['S','M','L','XL'].map(size => `<button class="size-option ${size === 'M' ? 'active' : ''}" data-size="${size}">${size}</button>`).join('')}
          </div>
        </div>

        <div class="product-modal-actions">
          <button class="modal-add-btn" data-add-to-cart="${p.id}">Add to Bag - ${formatPrice(p.price)}</button>
          <button class="modal-ghost-btn" data-product-close>Keep Shopping</button>
        </div>

        <div class="product-modal-info-grid">
          <div>
            <span>Fit</span>
            <p>${details.fit}</p>
          </div>
          <div>
            <span>Care</span>
            <p>${details.care}</p>
          </div>
          <div>
            <span>Shipping</span>
            <p>${details.ship}</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    overlay.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    bindCursorTargets(modal);
    modal.querySelector('.product-modal-close').focus();
  }

  function closeProductModal() {
    activeProductId = null;
    document.getElementById('productModal').classList.remove('open');
    document.getElementById('productModalOverlay').classList.remove('open');
    document.getElementById('productModal').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function openOfferPopup() {
    activeOfferPopup = true;
    document.getElementById('offerPopup').classList.add('open');
    document.getElementById('offerOverlay').classList.add('open');
    document.getElementById('offerPopup').setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    bindCursorTargets(document.getElementById('offerPopup'));
  }

  function closeOfferPopup() {
    activeOfferPopup = false;
    document.getElementById('offerPopup').classList.remove('open');
    document.getElementById('offerOverlay').classList.remove('open');
    document.getElementById('offerPopup').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function readStoredJson(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }

  function getSavedUser() {
    return readStoredJson(userStorageKey);
  }

  function getSessionUser() {
    return readStoredJson(sessionStorageKey);
  }

  function saveSession(user) {
    localStorage.setItem(sessionStorageKey, JSON.stringify(user));
    updateAccountButton();
  }

  function updateAccountButton() {
    const button = document.getElementById('accountButton');
    if (!button) return;

    const session = getSessionUser();
    button.textContent = session ? `Hi, ${session.name.split(' ')[0]}` : 'Account';
    button.classList.toggle('signed-in', Boolean(session));
  }

  function setAuthMode(mode) {
    const isSignedIn = Boolean(getSessionUser());
    document.querySelectorAll('[data-auth-mode]').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.authMode === mode);
    });
    document.querySelectorAll('[data-auth-form]').forEach(form => {
      form.classList.toggle('active', form.dataset.authForm === mode && !isSignedIn);
    });
    document.getElementById('authTitle').textContent = mode === 'signup' ? 'Create your account' : 'Welcome back';
  }

  function renderAccountState() {
    const session = getSessionUser();
    const summary = document.getElementById('accountSummary');
    const tabs = document.querySelector('.auth-tabs');
    const forms = document.querySelectorAll('[data-auth-form]');

    if (session) {
      document.getElementById('authTitle').textContent = 'Your account';
      document.getElementById('accountAvatar').textContent = session.name.charAt(0).toUpperCase();
      document.getElementById('accountName').textContent = session.name;
      document.getElementById('accountEmail').textContent = session.email;
      summary.hidden = false;
      tabs.hidden = true;
      forms.forEach(form => form.classList.remove('active'));
      return;
    }

    summary.hidden = true;
    tabs.hidden = false;
    setAuthMode(document.querySelector('[data-auth-mode].active')?.dataset.authMode || 'signin');
  }

  function openAuthModal(mode = 'signin') {
    activeAuthModal = true;
    closeOfferPopup();
    closeCart();
    closeProductModal();
    document.getElementById('authModal').classList.add('open');
    document.getElementById('authOverlay').classList.add('open');
    document.getElementById('authModal').setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (!getSessionUser()) setAuthMode(mode);
    renderAccountState();
    bindCursorTargets(document.getElementById('authModal'));
    document.getElementById('authModal').querySelector('button, input')?.focus();
  }

  function closeAuthModal() {
    activeAuthModal = false;
    document.getElementById('authModal').classList.remove('open');
    document.getElementById('authOverlay').classList.remove('open');
    document.getElementById('authModal').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function handleSignUp(form) {
    const data = new FormData(form);
    const name = data.get('name').trim();
    const email = data.get('email').trim().toLowerCase();
    const password = data.get('password');

    if (!name || !email || password.length < 6) return;

    const user = { name, email };
    localStorage.setItem(userStorageKey, JSON.stringify(user));
    saveSession(user);
    form.reset();
    renderAccountState();
    showToastMessage(`Welcome, ${name}`);
  }

  function handleSignIn(form) {
    const data = new FormData(form);
    const email = data.get('email').trim().toLowerCase();
    const password = data.get('password');
    const savedUser = getSavedUser();

    if (!email || password.length < 6) return;

    if (!savedUser || savedUser.email !== email) {
      showToastMessage('Please sign up first');
      setAuthMode('signup');
      return;
    }

    saveSession(savedUser);
    form.reset();
    renderAccountState();
    showToastMessage(`Signed in as ${savedUser.name}`);
  }

  function signOut() {
    localStorage.removeItem(sessionStorageKey);
    updateAccountButton();
    renderAccountState();
    setAuthMode('signin');
    showToastMessage('Signed out');
  }

  document.addEventListener('click', e => {
    const offerClose = e.target.closest('[data-offer-close]');
    if (offerClose) {
      closeOfferPopup();
      return;
    }

    const authClose = e.target.closest('[data-auth-close]');
    if (authClose) {
      closeAuthModal();
      return;
    }

    const authOpen = e.target.closest('[data-auth-open]');
    if (authOpen) {
      openAuthModal();
      return;
    }

    const authModeButton = e.target.closest('[data-auth-mode]');
    if (authModeButton) {
      setAuthMode(authModeButton.dataset.authMode);
      return;
    }

    const authSignOut = e.target.closest('[data-auth-signout]');
    if (authSignOut) {
      signOut();
      return;
    }

    const productClose = e.target.closest('[data-product-close]');
    if (productClose) {
      closeProductModal();
      return;
    }

    const cartClose = e.target.closest('[data-cart-close]');
    if (cartClose) {
      closeCart();
      return;
    }

    const cartOpen = e.target.closest('[data-cart-open]');
    if (cartOpen) {
      openCart();
      return;
    }

    const filterButton = e.target.closest('[data-filter]');
    if (filterButton) {
      filterProducts(filterButton.dataset.filter, filterButton);
      return;
    }

    const addButton = e.target.closest('[data-add-to-cart]');
    if (addButton) {
      addToCart(Number(addButton.dataset.addToCart));
      if (addButton.closest('.product-modal')) closeProductModal();
      return;
    }

    const colorDot = e.target.closest('.color-dot');
    if (colorDot) {
      colorDot.parentElement.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('active'));
      colorDot.classList.add('active');
      return;
    }

    const qtyButton = e.target.closest('[data-change-qty]');
    if (qtyButton) {
      changeQty(Number(qtyButton.dataset.productId), Number(qtyButton.dataset.changeQty));
      return;
    }

    const sizeButton = e.target.closest('[data-size]');
    if (sizeButton) {
      sizeButton.parentElement.querySelectorAll('[data-size]').forEach(btn => btn.classList.remove('active'));
      sizeButton.classList.add('active');
      return;
    }

    const productCard = e.target.closest('.product-card');
    if (productCard) {
      openProductModal(Number(productCard.dataset.id));
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeOfferPopup) {
      closeOfferPopup();
      return;
    }

    if (e.key === 'Escape' && activeAuthModal) {
      closeAuthModal();
      return;
    }

    if (e.key === 'Escape' && activeProductId) {
      closeProductModal();
      return;
    }

    const productCard = e.target.closest('.product-card');
    if (productCard && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openProductModal(Number(productCard.dataset.id));
    }
  });

  document.querySelectorAll('[data-auth-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (form.dataset.authForm === 'signup') handleSignUp(form);
      else handleSignIn(form);
    });
  });

  document.getElementById('offerForm').addEventListener('submit', e => {
    e.preventDefault();
    closeOfferPopup();
    e.currentTarget.reset();
    showToastMessage('Offer unlocked: 10% off');
  });

  // TOAST
  function showToast(name) {
    const t = document.getElementById('toast');
    t.querySelector('.toast-accent').nextSibling.textContent = ` ${name} added`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  function showToastMessage(message) {
    const t = document.getElementById('toast');
    t.querySelector('.toast-accent').nextSibling.textContent = ` ${message}`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  // REVEAL ON SCROLL
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  // INIT
  updateAccountButton();
  renderProducts('all');
  initReveal();
  setTimeout(openOfferPopup, 700);
