/* ===================================================
   COVENANT INTERNATIONAL SCHOOL – DAWHENYA BRANCH
   JavaScript – Interactivity & Animations
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });
  // Fallback: hide after 3 seconds no matter what
  setTimeout(() => preloader.classList.add('hidden'), 3000);


  // ===== STICKY NAVBAR – scroll class =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });


  // ===== ACTIVE NAV LINK on scroll =====
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 75; // height of fixed navbar
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ===== SCROLL REVEAL ANIMATION =====
  // Add reveal class to elements we want to animate
  const revealTargets = document.querySelectorAll(
    '.about-card, .value-item, .leader-card, .academic-card, .achievement-item, ' +
    '.club-card, .step-item, .news-item, .event-item, .gallery-item, ' +
    '.download-item, .resource-item, .policy-item, .contact-card-item'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  // Stagger sibling cards
  document.querySelectorAll('.about-grid, .academics-grid, .clubs-grid, .values-grid, .achievements-grid, .leadership-grid').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((card, i) => {
      card.style.transitionDelay = `${i * 80}ms`;
    });
  });


  // ===== CLUBS & ACTIVITIES TABS =====
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = document.getElementById(`tab-${tabId}`);
      if (content) content.classList.add('active');
    });
  });


  // ===== GALLERY FILTER =====
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const cat = item.dataset.cat;
        if (filter === 'all' || cat === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 350);
        }
      });
    });
  });


  // ===== CONTACT FORM =====
  const contactForm   = document.getElementById('contact-form');
  const formSuccess   = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = contactForm.querySelector('#name').value.trim();
      const email   = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields (Name, Email, Message).');
        return;
      }

      // Basic email validation
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Simulate form submission (replace with real backend/EmailJS if needed)
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 6000);
      }, 1500);
    });
  }


  // ===== SCROLL TO TOP =====
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ===== SET CURRENT YEAR IN FOOTER =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // ===== HERO LOGO PARALLAX (subtle) =====
  const heroLogo = document.querySelector('.hero-logo');
  if (heroLogo) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroLogo.style.transform = `scale(1) translateY(${scrolled * 0.12}px)`;
      }
    }, { passive: true });
  }


  // ===== COUNTER ANIMATION for hero stats =====
  const statNums = document.querySelectorAll('.stat-num');
  let counted = false;

  const countUp = (el) => {
    const target   = el.textContent;
    const isPercent = target.includes('%');
    const isPlus    = target.includes('+');
    const num       = parseFloat(target.replace(/[^0-9.]/g, ''));

    if (isNaN(num)) return;

    let current = 0;
    const step  = num / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= num) {
        current = num;
        clearInterval(timer);
      }
      const val = Number.isInteger(num) ? Math.floor(current) : current.toFixed(0);
      el.textContent = val + (isPercent ? '%' : '') + (isPlus ? '+' : '');
    }, 35);
  };

  const heroSection = document.querySelector('.hero');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNums.forEach(el => countUp(el));
        statObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (heroSection) statObserver.observe(heroSection);


  // ===== NAVBAR COLOR STRIPE ANIMATION on hover =====
  // Animate the border stripe on scroll position
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress  = Math.min(window.scrollY / maxScroll, 1);
        // Subtle hue rotation on gradient
        navbar.style.setProperty('--scroll-progress', progress);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });


  // ===== KEYBOARD ACCESSIBILITY: close mobile menu on Escape =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });


  // ===== LOG welcome message =====
  console.log('%c Covenant International School – Dawhenya Branch', 'color:#c0392b;font-size:1.2rem;font-weight:bold;');
  console.log('%c Work and Pray 🙏', 'color:#f39c12;font-size:1rem;');

});
