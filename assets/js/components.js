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
   ============================================ */

const Navigation = () => `
  <nav class="site-nav">
    <div class="nav-container">
      <a href="/index.html" class="nav-brand">Professional Accompaniment</a>
      
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
   ============================================ */

const Footer = () => `
  <footer class="site-footer">
    <div class="footer-container">
      <p>&copy; 2025 Professional Accompaniment</p>
      
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
