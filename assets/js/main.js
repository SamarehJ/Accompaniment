/* ============================================
   PROFESSIONAL ACCOMPANIMENT - MAIN JAVASCRIPT
   ============================================
   
   This file handles:
   - Scroll-triggered animations (fade-in on scroll)
   - Mobile sticky CTA (slides up after scrolling)
   - Smooth scrolling enhancements
   - General site interactions
   
   All animations respect user's motion preferences
   (prefers-reduced-motion handled in CSS)
   
   ============================================ */


/* ============================================
   SCROLL-TRIGGERED ANIMATIONS
   Elements fade in when scrolled into view
   ============================================ */

const initScrollAnimations = () => {
  // Find all elements marked for scroll animation
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // If no elements found, exit early
  if (animatedElements.length === 0) return;
  
  // Create Intersection Observer
  // This watches when elements enter the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When element is 10% visible, add 'is-visible' class
      // CSS handles the actual animation via this class
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,  // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px'  // Trigger slightly before element fully in view
  });
  
  // Start observing each element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
};


/* ============================================
   MOBILE STICKY CTA
   Shows "Schedule a Fit Check" button at bottom
   on mobile after user scrolls past hero
   ============================================ */

const initMobileCTA = () => {
  // Only run on mobile/tablet screens
  if (window.innerWidth >= 1024) return;
  
  const mobileCTA = document.getElementById('mobile-cta');
  if (!mobileCTA) return;  // Exit if CTA element doesn't exist
  
  const dismissButton = mobileCTA.querySelector('.mobile-cta-dismiss');
  let isVisible = false;
  let isDismissed = false;
  
  // ===== SHOW/HIDE BASED ON SCROLL =====
  const handleScroll = () => {
    // Don't show if user dismissed it
    if (isDismissed) return;
    
    // Show CTA after scrolling 300px down the page
    const scrollPosition = window.scrollY;
    const shouldShow = scrollPosition > 300;
    
    if (shouldShow && !isVisible) {
      mobileCTA.classList.add('is-visible');
      isVisible = true;
    } else if (!shouldShow && isVisible) {
      mobileCTA.classList.remove('is-visible');
      isVisible = false;
    }
  };
  
  // ===== DISMISS BUTTON =====
  if (dismissButton) {
    dismissButton.addEventListener('click', () => {
      mobileCTA.classList.remove('is-visible');
      isDismissed = true;
      isVisible = false;
      
      // Store dismissal in session (won't show again this visit)
      sessionStorage.setItem('mobileCTADismissed', 'true');
    });
  }
  
  // ===== CHECK IF PREVIOUSLY DISMISSED =====
  if (sessionStorage.getItem('mobileCTADismissed') === 'true') {
    isDismissed = true;
  }
  
  // ===== LISTEN FOR SCROLL =====
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Run once on load in case page loads scrolled down
  handleScroll();
};


/* ============================================
   SMOOTH SCROLL TO ANCHOR LINKS
   Enhances anchor link behavior
   ============================================ */

const initSmoothScroll = () => {
  // Find all anchor links that point to sections on same page
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Skip if href is just "#"
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Scroll to target element
        // Offset by 80px to account for sticky nav
        const targetPosition = targetElement.offsetTop - 80;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
};


/* ============================================
   SCROLL TO TOP ON PAGE LOAD
   If URL has anchor, scroll there after content loads
   ============================================ */

const handleAnchorOnLoad = () => {
  // Check if URL has an anchor (e.g., services.html#fit-check)
  const hash = window.location.hash;
  
  if (hash) {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - 80;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
};


/* ============================================
   EXTERNAL LINK HANDLING
   Open external links in new tab
   ============================================ */

const initExternalLinks = () => {
  const links = document.querySelectorAll('a[href^="http"]');
  
  links.forEach(link => {
    // Skip if it's a link to own domain
    if (link.hostname === window.location.hostname) return;
    
    // Add target="_blank" and security attributes
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
};


/* ============================================
   FOCUS VISIBLE POLYFILL
   Better keyboard focus indicators
   ============================================ */

const initFocusVisible = () => {
  // Track if user is using keyboard
  let isUsingKeyboard = false;
  
  // Detect keyboard usage
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      isUsingKeyboard = true;
      document.body.classList.add('user-is-tabbing');
    }
  });
  
  // Detect mouse usage
  document.addEventListener('mousedown', () => {
    isUsingKeyboard = false;
    document.body.classList.remove('user-is-tabbing');
  });
};


/* ============================================
   INITIALIZE ALL FUNCTIONS
   Run when page is fully loaded
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize mobile sticky CTA
  initMobileCTA();
  
  // Initialize smooth scrolling for anchor links
  initSmoothScroll();
  
  // Handle anchor links on page load
  handleAnchorOnLoad();
  
  // Initialize external link handling
  initExternalLinks();
  
  // Initialize focus visible
  initFocusVisible();
  
});


/* ============================================
   HANDLE WINDOW RESIZE
   Re-initialize mobile CTA if screen size changes
   ============================================ */

let resizeTimer;
window.addEventListener('resize', () => {
  // Debounce resize events (only run after resizing stops)
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-check if mobile CTA should be shown/hidden
    const mobileCTA = document.getElementById('mobile-cta');
    if (mobileCTA) {
      if (window.innerWidth >= 1024) {
        // Hide on desktop
        mobileCTA.classList.remove('is-visible');
      }
    }
  }, 250);
});


/* ============================================
   UTILITY FUNCTIONS
   Helper functions used throughout the site
   ============================================ */

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get scroll position
const getScrollPosition = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

// Check if element is in viewport
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/* ============================================
   QUOTE ROTATOR
   Homepage testimonial quote rotation
   ============================================ */

const initQuoteRotator = () => {
  const stage = document.getElementById('quoteRotatorStage');
  const dotsEl = document.getElementById('qrDots');
  if (!stage || !dotsEl) return;

  const quotes = [
    "There\u2019s a profound sense that my obstacle is, in fact, surmountable.",
    "She came to our meeting with a generous handful of ideas for how to chip away at my larger-than-life challenge.",
    "Simply a delight to be around — the person you want accompanying you during hard moments.",
    "I like the way she — from day one — was my champion.",
    "The daily reminder of \u2018I\u2019m here\u2019 helped me become a different person.",
    "She made me feel so seen and understood.",
    "The range of possible solutions she can come up with is simply larger than what I could manage on my own.",
    "Total joy, totally would recommend, and genuinely life-changing.",
    "She\u2019s present, focused, devoted to finding flow, willing to work with you as a whole person.",
    "Anyone can give advice — it\u2019s unique to have someone willing to sit in the muck with you.",
    "The profundity of her presence, compassion, cleverness, and creativity was genuinely life-changing.",
  ];

  let cur = 0;
  let busy = false;

  const dots = quotes.map((_, i) => {
    const d = document.createElement('div');
    d.className = 'qr-dot' + (i === 0 ? ' on' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
    return d;
  });

  function makeSlide(q) {
    const slide = document.createElement('div');
    slide.className = 'qr-slide';
    slide.innerHTML = `
      <span class="qr-mark qr-mark-left" aria-hidden="true">&#8220;</span>
      <div class="qr-text"><p>${q}</p></div>
      <span class="qr-mark qr-mark-right" aria-hidden="true">&#8221;</span>
    `;
    return slide;
  }

  const first = makeSlide(quotes[0]);
  first.style.opacity = '1';
  stage.appendChild(first);

  function goTo(index) {
    if (busy || index === cur) return;
    busy = true;

    const leaving = stage.querySelector('.qr-slide');
    leaving.classList.add('leaving');

    dots[cur].classList.remove('on');
    cur = index;
    dots[cur].classList.add('on');

    setTimeout(() => {
      leaving.remove();
      const entering = makeSlide(quotes[cur]);
      entering.classList.add('entering');
      stage.appendChild(entering);

      entering.addEventListener('animationend', () => {
        entering.classList.remove('entering');
        entering.style.opacity = '1';
        busy = false;
      }, { once: true });
    }, 550);
  }

  function advance() {
    goTo((cur + 1) % quotes.length);
  }

  setInterval(advance, 8000);
};

document.addEventListener('DOMContentLoaded', initQuoteRotator);