/* ============================================
   PROFESSIONAL ACCOMPANIMENT - SHARED COMPONENTS
   ============================================
   
   This file contains reusable HTML components that appear
   on every page (navigation, footer).
   
   BENEFIT: Change the nav or footer ONCE here, and it
   updates across all pages automatically.
   
   HOW IT WORKS:
   - Each page has placeholder divs with IDs
   - This script runs on page load and injects HTML
   - No need to copy/paste nav/footer to every page
   
   ============================================ */


/* ============================================
   NAVIGATION COMPONENT
   Sticky header with logo and main nav links
   Includes mobile hamburger menu
   ============================================ */

const Navigation = () => `
  <nav class="site-nav">
    <div class="nav-container">
      <!-- Brand/Logo - links to homepage -->
      <a href="/index.html" class="nav-brand">Professional Accompaniment</a>
      
      <!-- Hamburger button (mobile only) -->
      <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      
      <!-- Main navigation links -->
      <div class="nav-links">
        <a href="/index.html">Home</a>
        <a href="/how-it-works.html">How It Works</a>
        <a href="/services.html">Services & Pricing</a>
        <a href="/about.html">About</a>
        <a href="/faq.html">FAQ</a>
      </div>
    </div>
  </nav>
`;


/* ============================================
   FOOTER COMPONENT
   Site footer with copyright and policy links
   ============================================ */

const Footer = () => `
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Copyright notice -->
      <p>&copy; 2025 Professional Accompaniment</p>
      
      <!-- Footer navigation links -->
      <div class="footer-links">
        <a href="/contact.html">Contact</a>
        <a href="/policies/cancellation.html">Cancellation Policy</a>
        <a href="/policies/privacy.html">Privacy</a>
        <a href="/policies/scope.html">Scope & Boundaries</a>
        <a href="/policies/terms.html">Terms of Service</a>
      </div>
    </div>
  </footer>
`;


/* ============================================
   COMPONENT INJECTION
   Runs when page loads and inserts components
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== INJECT NAVIGATION =====
  // Looks for element with id="nav-placeholder"
  // If found, replaces it with navigation HTML
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.innerHTML = Navigation();
  }
  
  // ===== INJECT FOOTER =====
  // Looks for element with id="footer-placeholder"
  // If found, replaces it with footer HTML
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = Footer();
  }
  
});


/* ============================================
   ACTIVE NAV LINK HIGHLIGHTING
   Highlights current page in navigation
   ============================================ */

// Add this after components are injected
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure nav is injected first
  setTimeout(() => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.style.color = 'var(--color-accent-text)';
        link.style.fontWeight = 'var(--font-weight-medium)';
      }
    });
  }, 10);
});

/* ============================================
   MOBILE MENU TOGGLE
   Hamburger menu functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        // Toggle aria-expanded
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle active classes
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
      
      // Close menu when clicking a link
      const links = navLinks.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navLinks.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navToggle.classList.remove('active');
          navLinks.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }, 10);
});