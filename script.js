// Splash screen
const splash = document.getElementById('initial-splash');

window.addEventListener('load', () => {
  setTimeout(() => {
    splash.classList.add('hide');
  }, 1200);
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const isOpen = !mobileMenu.classList.contains('hidden');
  menuIcon.classList.toggle('fa-bars', !isOpen);
  menuIcon.classList.toggle('fa-times', isOpen);
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active', 'text-primary-500', 'bg-white/5');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active', 'text-primary-500', 'bg-white/5');
    }
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// Animated stat counters
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = `${current}+`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

// Back to top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.remove('opacity-0', 'invisible');
    backToTop.classList.add('opacity-100', 'visible');
  } else {
    backToTop.classList.add('opacity-0', 'invisible');
    backToTop.classList.remove('opacity-100', 'visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Course syllabus toggle
function toggleSyllabus(button) {
  const syllabus = button.nextElementSibling;
  const isHidden = syllabus.classList.contains('hidden');

  syllabus.classList.toggle('hidden');
  button.innerHTML = isHidden
    ? 'Hide Syllabus <i class="fas fa-chevron-down text-xs transition-transform" style="transform: rotate(180deg)"></i>'
    : 'View Full Syllabus <i class="fas fa-chevron-down text-xs transition-transform"></i>';
}

// Lightbox for student corner
function openLightbox(figure) {
  const img = figure.querySelector('img');
  const caption = figure.querySelector('h3');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption ? caption.textContent : img.alt;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  if (event.target.id === 'lightbox' || event.target.closest('button')) {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('hidden')) {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }
});

// Apply form submission
const applyForm = document.getElementById('apply-form');
const formSuccess = document.getElementById('form-success');

applyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  applyForm.classList.add('hidden');
  formSuccess.classList.remove('hidden');

  setTimeout(() => {
    applyForm.reset();
    applyForm.classList.remove('hidden');
    formSuccess.classList.add('hidden');
  }, 5000);
});
