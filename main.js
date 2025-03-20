
// Theme toggle functionality
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
  
  // Theme toggle button handler
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    
    if (isDark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const menuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!menuToggle || !menuClose || !mobileMenu) return;
  
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('header');
  
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Scroll to top button
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (!scrollToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize page animations
function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-fade-in');
  
  if (animatedElements.length === 0) return;
  
  // Using Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay based on index
        setTimeout(() => {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }, 100 * index);
        
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Set initial state and observe elements
  animatedElements.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    el.style.transitionDelay = `${0.1 * index}s`;
    observer.observe(el);
  });
  
  // Initialize left-right animations
  const rightElements = document.querySelectorAll('.animate-fade-in-right');
  const leftElements = document.querySelectorAll('.animate-fade-in-left');
  
  rightElements.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    el.style.transitionDelay = `${0.1 * index}s`;
    observer.observe(el);
  });
  
  leftElements.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = 'translateX(20px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    el.style.transitionDelay = `${0.1 * index}s`;
    observer.observe(el);
  });
}

// Initialize current page in navigation
function initCurrentPageHighlight() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  function highlightLink(links) {
    links.forEach(link => {
      const linkPath = link.getAttribute('href');
      
      // Remove .html for comparison
      const cleanLinkPath = linkPath.replace('.html', '');
      const cleanCurrentPath = currentPath.replace('.html', '');
      
      // Handle home page
      if (cleanCurrentPath === '/' || cleanCurrentPath.endsWith('/index')) {
        if (cleanLinkPath === 'index' || cleanLinkPath === '/') {
          link.classList.add('active');
        }
      } 
      // Handle other pages
      else if (cleanCurrentPath.endsWith(cleanLinkPath)) {
        link.classList.add('active');
      }
    });
  }
  
  highlightLink(navLinks);
  highlightLink(mobileNavLinks);
}

// Handle form submissions
function initFormSubmission() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData.entries());
    
    // Normally would send this data to a server
    console.log('Form data:', formObject);
    
    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Message Sent!';
    
    // Reset form and button after delay
    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      
      // Show alert
      alert('Your message has been sent successfully!');
    }, 2000);
  });
}

// Project image hover effects
function initProjectHoverEffects() {
  const projectCards = document.querySelectorAll('.project-card');
  
  if (projectCards.length === 0) return;
  
  projectCards.forEach(card => {
    const image = card.querySelector('img');
    
    card.addEventListener('mouseenter', () => {
      image.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      image.style.transform = 'scale(1)';
    });
  });
}

// Add floating animation to elements
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.animate-float');
  
  if (floatingElements.length === 0) return;
  
  floatingElements.forEach((el, index) => {
    el.style.animation = `floating 6s ease-in-out infinite`;
    el.style.animationDelay = `${index * 0.2}s`;
  });
}

// Initialize all scripts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initHeaderScroll();
  initScrollToTop();
  initAnimations();
  initCurrentPageHighlight();
  initFormSubmission();
  initProjectHoverEffects();
  initFloatingElements();
  
  // Update current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
