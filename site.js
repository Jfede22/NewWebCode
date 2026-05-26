document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('siteHeader');
  const logo = document.getElementById('logoImage');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const burgerTop = document.getElementById('burgerTop');
  const burgerMiddle = document.getElementById('burgerMiddle');
  const burgerBottom = document.getElementById('burgerBottom');
  const revealElements = Array.from(document.querySelectorAll('.reveal'));
  const slideDots = document.getElementById('slideDots');
  const slides = Array.from(document.querySelectorAll('.slideshow-slide'));
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const tabButtons = Array.from(document.querySelectorAll('[data-tab]'));
  const pricingPanels = Array.from(document.querySelectorAll('.pricing-panel'));
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');

  function updateHeader() {
    const scrolled = window.scrollY > 60;
    header.classList.toggle('scrolled', scrolled);
    if (logo) {
      logo.style.filter = scrolled ? 'none' : 'brightness(0) invert(1)';
      logo.style.height = scrolled ? '44px' : '52px';
    }
  }

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  function setActiveNavLink() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href.endsWith(page) || (page === '' && href.endsWith('index.html'))) {
        link.classList.add('active');
      }
    });
  }

  if (header) {
    updateHeader();
    window.addEventListener('scroll', () => {
      updateHeader();
      revealOnScroll();
    }, { passive: true });
  }

  if (mobileMenu && menuToggle && burgerTop && burgerMiddle && burgerBottom) {
    menuToggle.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('open');
      burgerTop.style.transform = open ? 'rotate(45deg) translate(4px, 4px)' : 'none';
      burgerMiddle.style.opacity = open ? '0' : '1';
      burgerBottom.style.transform = open ? 'rotate(-45deg) translate(4px, -4px)' : 'none';
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        burgerTop.style.transform = 'none';
        burgerMiddle.style.opacity = '1';
        burgerBottom.style.transform = 'none';
      });
    });
  }

  if (slides.length && slideDots) {
    let currentSlide = 0;
    function updateSlide(index) {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === index);
      });
      slideDots.querySelectorAll('button').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === index);
      });
    }

    slides.forEach((slide, index) => {
      const button = document.createElement('button');
      button.className = index === 0 ? 'slide-dot active' : 'slide-dot';
      button.addEventListener('click', function () {
        currentSlide = index;
        updateSlide(index);
      });
      slideDots.appendChild(button);
    });

    setInterval(function () {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide(currentSlide);
    }, 4500);
  }

  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', function () {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        portfolioItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          item.classList.toggle('hidden', filter !== 'All' && category !== filter);
        });
      });
    });
  }

  if (tabButtons.length && pricingPanels.length) {
    tabButtons.forEach((button) => {
      button.addEventListener('click', function () {
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        pricingPanels.forEach((panel) => panel.classList.remove('active'));
        button.classList.add('active');
        const tab = button.getAttribute('data-tab');
        const panel = document.querySelector(`.pricing-panel[data-tab='${tab}']`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      contactForm.style.display = 'none';
      if (contactSuccess) {
        contactSuccess.style.display = 'block';
      }
    });
  }

  revealOnScroll();
  setActiveNavLink();
});
