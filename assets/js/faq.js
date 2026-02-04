/* ============================================
   PROFESSIONAL ACCOMPANIMENT - FAQ PAGE SCRIPT
   ============================================
   
   This file handles FAQ-specific functionality:
   - Sticky navigation sidebar (desktop only)
   - Highlights current section based on scroll position
   - Smooth scrolling to sections when nav clicked
   
   Only runs on desktop (1024px+)
   Mobile uses simple scrolling without sidebar
   
   ============================================ */


/* ============================================
   FAQ STICKY NAVIGATION
   Shows section headings on right side (desktop)
   Highlights current section as user scrolls
   ============================================ */

const initFAQNav = () => {
  
  // ===== ONLY RUN ON DESKTOP =====
  // Mobile/tablet don't get sticky nav (too narrow)
  if (window.innerWidth < 1024) return;
  
  // ===== FIND ELEMENTS =====
  const sections = document.querySelectorAll('.faq-section');
  const navLinks = document.querySelectorAll('.faq-nav a');
  
  // Exit if FAQ elements don't exist (not on FAQ page)
  if (sections.length === 0 || navLinks.length === 0) return;
  
  
  // ===== INTERSECTION OBSERVER FOR HIGHLIGHTING =====
  // Watches which section is currently visible in viewport
  
  const observerOptions = {
    // Trigger when section is 20% visible
    threshold: 0.1,
    // Add top margin equal to sticky nav height
    // Adjust for sticky nav and trigger earlier
    rootMargin: '-120px 0px -60% 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When a section becomes visible
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        // Remove 'active' class from all nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add 'active' class to corresponding nav link
        const activeLink = document.querySelector(`.faq-nav a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  // Start observing each FAQ section
  sections.forEach(section => {
    observer.observe(section);
  });
  
  
  // ===== SMOOTH SCROLL ON NAV CLICK =====
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get target section ID from href
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Calculate scroll position
        // Offset by 100px to account for sticky main nav
        const targetPosition = targetSection.offsetTop - 100;
        
        // Smooth scroll to section
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
        
        // Manually update active state
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
        });
        link.classList.add('active');
      }
    });
  });
  
};


/* ============================================
   INITIALIZE FAQ FUNCTIONALITY
   Run when page loads
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFAQNav();
});


/* ============================================
   HANDLE WINDOW RESIZE
   Re-initialize if user resizes from mobile to desktop
   ============================================ */

let faqResizeTimer;
window.addEventListener('resize', () => {
  // Debounce resize events
  clearTimeout(faqResizeTimer);
  faqResizeTimer = setTimeout(() => {
    // Re-initialize FAQ nav if now on desktop
    if (window.innerWidth >= 1024) {
      initFAQNav();
    }
  }, 250);
});
