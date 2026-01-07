// Main JavaScript File for Fit Nation Website

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initMobileMenu();
  initSmoothScroll();
  initBackToTop();
  initAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const hamburger = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navbarCollapse.classList.toggle("show");
    });
  }
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTopBtn.className = "btn btn-primary back-to-top";
  backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
    `;

  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });
}

// Animations on Scroll
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with animation class
  document.querySelectorAll(".card, .section-title").forEach((el) => {
    observer.observe(el);
  });
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + "+";
    }
  }, 16);
}

// Initialize counters when in viewport
function initCounters() {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".counter");
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-target"));
            animateCounter(counter, target);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    counterObserver.observe(statsSection);
  }
}

// Form Validation Helper Functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\d\s\-\(\)]{10,}$/;
  return (
    re.test(phone.replace(/[\s\-\(\)]/g, "")) &&
    phone.replace(/[\s\-\(\)]/g, "").length === 10
  );
}

// Show Alert Function
function showAlert(type, message) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  const container = document.querySelector(".container");
  if (container) {
    container.prepend(alertDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }
}

// Export functions for use in other files
window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
window.showAlert = showAlert;
