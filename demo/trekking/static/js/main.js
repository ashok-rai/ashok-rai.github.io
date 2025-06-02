// Main JavaScript for Nepal Mountain Adventures

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // Navbar scroll effect
    initNavbarScrollEffect();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Parallax effect for hero section
    initParallaxEffect();
    
    // Form validation and enhancement
    initFormEnhancements();
    
    // Gallery enhancements
    initGalleryEnhancements();
    
    // Performance optimizations
    initPerformanceOptimizations();
    
    // Loading states
    initLoadingStates();
    
    // Error handling for external content
    initErrorHandling();
    
    console.log('Nepal Mountain Adventures - Website initialized successfully');
});

/**
 * Initialize navbar scroll effect
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    let lastScrollTop = 0;
    let isScrolling = false;
    
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Add scrolled class when scrolling down
                if (scrollTop > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Hide navbar when scrolling down, show when scrolling up
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
                isScrolling = false;
            });
        }
        isScrolling = true;
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => ticking = false, 10);
        }
    }, { passive: true });
}

/**
 * Initialize smooth scrolling for navigation
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile navbar if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) navbarToggler.click();
                }
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize parallax effect for hero section
 */
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroSection) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
    
    // Use throttling for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
            setTimeout(() => ticking = false, 16); // ~60fps
        }
    }, { passive: true });
}

/**
 * Initialize form enhancements
 */
function initFormEnhancements() {
    // Add loading state to booking form
    const bookingForm = document.querySelector('#booking iframe');
    
    if (bookingForm) {
        // Show loading spinner while iframe loads
        const loadingSpinner = createLoadingSpinner();
        bookingForm.parentNode.insertBefore(loadingSpinner, bookingForm);
        
        bookingForm.addEventListener('load', () => {
            loadingSpinner.style.display = 'none';
            bookingForm.style.opacity = '1';
        });
        
        // Handle iframe load errors
        bookingForm.addEventListener('error', () => {
            showFormErrorMessage();
            loadingSpinner.style.display = 'none';
        });
    }
    
    // Enhance contact links
    enhanceContactLinks();
}

/**
 * Create loading spinner element
 */
function createLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'text-center py-5';
    spinner.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading booking form...</span>
        </div>
        <p class="mt-3 text-muted">Loading booking form...</p>
    `;
    return spinner;
}

/**
 * Show form error message
 */
function showFormErrorMessage() {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-warning text-center';
    errorMessage.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Form temporarily unavailable.</strong><br>
        Please contact us directly using the information below or try refreshing the page.
    `;
    
    const bookingSection = document.querySelector('#booking .booking-form-container');
    if (bookingSection) {
        bookingSection.insertBefore(errorMessage, bookingSection.firstChild);
    }
}

/**
 * Enhance contact links with click tracking
 */
function enhanceContactLinks() {
    // Track WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('WhatsApp contact initiated');
            // Add analytics tracking here if needed
        });
    });
    
    // Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Email contact initiated');
            // Add analytics tracking here if needed
        });
    });
    
    // Track phone clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Phone contact initiated');
            // Add analytics tracking here if needed
        });
    });
}

/**
 * Initialize gallery enhancements
 */
function initGalleryEnhancements() {
    const carousel = document.querySelector('#trekGallery');
    
    if (!carousel) return;
    
    // Pause carousel on hover
    carousel.addEventListener('mouseenter', () => {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) carouselInstance.pause();
    });
    
    carousel.addEventListener('mouseleave', () => {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) carouselInstance.cycle();
    });
    
    // Add keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (!carouselInstance) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            carouselInstance.prev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            carouselInstance.next();
        }
    });
    
    // Preload next images for better performance
    preloadCarouselImages();
}

/**
 * Preload carousel images
 */
function preloadCarouselImages() {
    const carouselImages = document.querySelectorAll('#trekGallery img');
    
    carouselImages.forEach((img, index) => {
        if (index > 0) { // Skip first image (already loaded)
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
    });
}

/**
 * Initialize performance optimizations
 */
function initPerformanceOptimizations() {
    // Lazy load images that are not immediately visible
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Optimize scroll performance
    optimizeScrollPerformance();
}

/**
 * Optimize scroll performance
 */
function optimizeScrollPerformance() {
    // Debounce scroll events for better performance
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Trigger any scroll-dependent functions here
            updateScrollProgress();
        }, 10);
    }, { passive: true });
}

/**
 * Update scroll progress indicator (if needed)
 */
function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrolled / maxScroll) * 100;
    
    // Update progress indicator if exists
    const progressIndicator = document.querySelector('.scroll-progress');
    if (progressIndicator) {
        progressIndicator.style.width = `${scrollProgress}%`;
    }
}

/**
 * Initialize loading states for external content
 */
function initLoadingStates() {
    // Add loading states for external scripts
    const externalScripts = ['Bootstrap', 'AOS', 'FontAwesome'];
    
    externalScripts.forEach(script => {
        if (window[script] || document.querySelector(`[src*="${script.toLowerCase()}"]`)) {
            console.log(`${script} loaded successfully`);
        } else {
            console.warn(`${script} may not have loaded properly`);
        }
    });
}

/**
 * Initialize error handling for external content
 */
function initErrorHandling() {
    // Handle image load errors
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder or hide
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
            
            // Show fallback message for critical images
            if (this.classList.contains('hero-image') || this.classList.contains('gallery-img')) {
                showImageFallback(this);
            }
        });
    });
    
    // Handle iframe load errors
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        iframe.addEventListener('error', function() {
            console.warn('Failed to load iframe:', this.src);
            showIframeFallback(this);
        });
    });
}

/**
 * Show image fallback
 */
function showImageFallback(img) {
    const fallback = document.createElement('div');
    fallback.className = 'image-fallback bg-light d-flex align-items-center justify-content-center';
    fallback.style.height = img.style.height || '300px';
    fallback.innerHTML = `
        <div class="text-center text-muted">
            <i class="fas fa-image fa-3x mb-3"></i>
            <p>Image temporarily unavailable</p>
        </div>
    `;
    
    img.parentNode.insertBefore(fallback, img);
}

/**
 * Show iframe fallback
 */
function showIframeFallback(iframe) {
    const fallback = document.createElement('div');
    fallback.className = 'iframe-fallback bg-light p-4 text-center';
    fallback.innerHTML = `
        <div class="text-muted">
            <i class="fas fa-exclamation-circle fa-3x mb-3"></i>
            <h5>Content temporarily unavailable</h5>
            <p>Please try refreshing the page or contact us directly.</p>
            <a href="#" class="btn btn-primary" onclick="location.reload()">
                <i class="fas fa-refresh me-2"></i>Refresh Page
            </a>
        </div>
    `;
    
    iframe.parentNode.insertBefore(fallback, iframe);
    iframe.style.display = 'none';
}

/**
 * Utility function to detect mobile devices
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Utility function to detect touch support
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Initialize mobile-specific enhancements
 */
function initMobileEnhancements() {
    if (isMobileDevice()) {
        // Reduce animation intensity on mobile for better performance
        document.body.classList.add('mobile-device');
        
        // Optimize touch interactions
        const touchElements = document.querySelectorAll('.btn, .nav-link, .card');
        touchElements.forEach(element => {
            element.style.touchAction = 'manipulation';
        });
    }
}

// Initialize mobile enhancements
initMobileEnhancements();

// Expose utility functions to global scope if needed
window.TrekSite = {
    isMobileDevice,
    isTouchDevice,
    updateScrollProgress
};
