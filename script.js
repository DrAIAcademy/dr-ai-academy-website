document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Smooth Scrolling (Aapka purana code)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      // AI Shop link ko chhodkar baki sab par smooth scroll chalega
      if (id.length > 1 && !a.classList.contains('js-shop-link')) {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Reveal on Scroll Animation (Iske na hone se website blank thi)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // CSS mein '.reveal.visible' ko opacity 1 milti hai
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Page Switching Logic (Home Page <-> AI Shop)
  const homePage = document.getElementById('homePage');
  const aiShopPage = document.getElementById('ai-shop');

  function showPage(pageToShow, pageToHide) {
    if (pageToShow && pageToHide) {
      pageToHide.classList.remove('active-page');
      pageToShow.classList.add('active-page');
      window.scrollTo({ top: 0 });
    }
  }

  // AI Shop kholne ke liye
  document.querySelectorAll('.js-shop-link, .js-shop-button').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(aiShopPage, homePage);
    });
  });

  // Wapas Home Page par aane ke liye
  document.querySelectorAll('.js-back-home, .js-home-link').forEach(element => {
    element.addEventListener('click', (e) => {
      if (aiShopPage.classList.contains('active-page')) {
        e.preventDefault();
        showPage(homePage, aiShopPage);
      }
    });
  });

  // Navbar ke links par click karne par agar shop khuli ho toh pehle home par bheje
  document.querySelectorAll('.js-home-section').forEach(link => {
    link.addEventListener('click', () => {
      if (aiShopPage.classList.contains('active-page')) {
        showPage(homePage, aiShopPage);
        // Thoda sa delay taaki page switch hone ke baad scroll sahi jagah jaye
        setTimeout(() => {
          const id = link.getAttribute('href');
          document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  });

  // 4. Mobile Menu Toggle (Aapke navbar ke hamburger button ke liye)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active'); // Mobile menu kholne/band karne ke liye
    });
  }
});
