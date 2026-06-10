const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const cursorGlow = document.querySelector('.cursor-glow');
const homePage = document.getElementById('homePage');
const shopPage = document.getElementById('ai-shop');

function closeMobileMenu() {
  navLinks?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

function showHome(targetHash = '#home') {
  homePage?.classList.add('active-page');
  shopPage?.classList.remove('active-page');
  document.body.classList.remove('shop-open');

  const target = document.querySelector(targetHash);
  if (target) {
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  history.replaceState(null, '', targetHash);
}

function showShop() {
  homePage?.classList.remove('active-page');
  shopPage?.classList.add('active-page');
  document.body.classList.add('shop-open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#ai-shop');
}

document.querySelectorAll('.js-shop-link, .js-shop-button').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    closeMobileMenu();
    showShop();
  });
});

document.querySelectorAll('.js-home-section').forEach((item) => {
  item.addEventListener('click', (event) => {
    const hash = item.getAttribute('href') || '#home';
    if (!hash.startsWith('#')) return;
    event.preventDefault();
    closeMobileMenu();
    showHome(hash);
  });
});

document.querySelectorAll('.js-home-link, .js-back-home').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    closeMobileMenu();
    showHome('#home');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const sections = document.querySelectorAll('#homePage section[id]');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || document.body.classList.contains('shop-open')) return;
    const id = entry.target.getAttribute('id');
    navItems.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((section) => activeObserver.observe(section));

window.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

window.openProductModal = function () {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeProductModal = function () {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') window.closeProductModal();
});

document.addEventListener('click', function (event) {
  const modal = document.getElementById('productModal');
  if (modal && event.target === modal) window.closeProductModal();
});

if (window.location.hash === '#ai-shop') {
  showShop();
}
const shopProducts = [
  {
    id: "class8-science-gamified-labs",
    badge: "Digital Product",
    icon: "🔬",
    title: "NCERT Class 8th Science Gamified Labs",
    description:
      "Interactive and gamified Science labs for Class 8 students. Designed to make NCERT Science concepts visual, practical and fun.",
    price: "View Details",
    link: "https://superprofile.bio/course/400eb00a-429b-481b-8222-ebdc35437e52"
  },
  {
  id: "neet-physics-gamified-labs",
  badge: "NEET Physics",
  icon: "⚡",
  title: "Physics Gamified Concept Labs for NEET Foundation",
  description:
    "In the competitive world of NEET, every mark counts. While others are memorizing equations, you will be mastering the underlying principles through Sci-Fi Learning Games and Real-Time AI Analytics. This isn't just a course; it’s a high-tech laboratory designed to sharpen your problem-solving intuition. Missing out on this enrollment means falling behind the curve of modern, tech-driven education—now is the time to leverage the same technology shaping the future of medicine and engineering to secure your own seat.",
  price: "View Details",
  link: "https://superprofile.bio/course/AI-powered-physics-for-neet"
}
];

function renderShopProducts() {
  const grid = document.getElementById("shopProductsGrid");

  if (!grid) return;

  grid.innerHTML = shopProducts
    .map(
      (product) => `
        <div class="product-card">
          <div class="product-badge">${product.badge}</div>

          <div class="product-icon">${product.icon}</div>

          <h3>${product.title}</h3>

          <p>${product.description}</p>

          <div class="product-price">${product.price}</div>

          <a
            class="btn primary"
            href="${product.link}"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Product
          </a>
        </div>
      `
    )
    .join("");
}

renderShopProducts();
