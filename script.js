/**
 * Vivekananda Computer Center — Main JavaScript
 * Handles: mobile nav, smooth scroll, active nav links, form validation
 */

(function () {
  'use strict';

  /* ==========================================================
     DOM Element References
     ========================================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');
  const contactForm = document.getElementById('contact-form');
  const sections = document.querySelectorAll('section[id]');

  /* ==========================================================
     1. Mobile Hamburger Menu Toggle
     ========================================================== */
  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);

    // Prevent body scroll when menu is open on mobile
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when a nav link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ==========================================================
     2. Smooth Scrolling for Navbar Links
     ========================================================== */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = header.offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Also handle footer and other anchor links with hash hrefs
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    if (anchor.classList.contains('nav-link')) return; // Already handled above

    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const headerOffset = header.offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================
     3. Active Nav Link on Scroll (Scroll Spy)
     ========================================================== */
  function setActiveNavLink() {
    const scrollPosition = window.scrollY + header.offsetHeight + 100;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ==========================================================
     4. Header Shadow on Scroll
     ========================================================== */
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Throttled scroll handler for performance
  let scrollTicking = false;

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        setActiveNavLink();
        handleHeaderScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // Run once on page load
  setActiveNavLink();
  handleHeaderScroll();

  /* ==========================================================
     5. Contact Form Validation
     ========================================================== */

  /**
   * Display an error message for a form field
   * @param {string} fieldId - The input element ID
   * @param {string} message - Error message to display
   */
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    field.classList.add('error');
    errorEl.textContent = message;
  }

  /**
   * Clear error state for a form field
   * @param {string} fieldId - The input element ID
   */
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    field.classList.remove('error');
    errorEl.textContent = '';
  }

  /**
   * Validate email format
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Validate phone number (basic — 10+ digits)
   * @param {string} phone
   * @returns {boolean}
   */
  function isValidPhone(phone) {
    return /^[\d\s+\-()]{10,}$/.test(phone.trim());
  }

  /**
   * Validate the entire contact form
   * @returns {boolean} True if all fields are valid
   */
  function validateForm() {
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const course = document.getElementById('course').value;

    // Clear all previous errors
    ['name', 'email', 'phone', 'course'].forEach(clearError);

    // Name validation
    if (name === '') {
      showError('name', 'Please enter your full name.');
      isValid = false;
    } else if (name.length < 2) {
      showError('name', 'Name must be at least 2 characters.');
      isValid = false;
    }

    // Email validation
    if (email === '') {
      showError('email', 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    // Phone validation
    if (phone === '') {
      showError('phone', 'Please enter your phone number.');
      isValid = false;
    } else if (!isValidPhone(phone)) {
      showError('phone', 'Please enter a valid phone number (min 10 digits).');
      isValid = false;
    }

    // Course validation
    if (course === '' || course === null) {
      showError('course', 'Please select a course of interest.');
      isValid = false;
    }

    return isValid;
  }

  // Clear errors on input
  ['name', 'email', 'phone', 'course'].forEach(function (fieldId) {
    const field = document.getElementById(fieldId);
    field.addEventListener('input', function () {
      clearError(fieldId);
    });
    field.addEventListener('change', function () {
      clearError(fieldId);
    });
  });

  // Form submission handler
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateForm()) {
      // Simulate successful submission
      alert(
        '✅ Thank you for your inquiry!\n\n' +
        'We have received your message and will get back to you within 24 hours.\n\n' +
        '— Vivekananda Computer Center'
      );

      // Reset the form
      contactForm.reset();
    }
  });

})();
