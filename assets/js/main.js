// main.js - Main JavaScript functionality

document.documentElement.classList.add('js-enabled');

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hexes website loaded');
    
    // Initialize animations
    initAnimations();
    
    // Initialize loading of images (lazy loading)
    initImageLoading();
});

// Initialize animations
function initAnimations() {
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Add the fade-in class to certain elements
    const sectionsToAnimate = document.querySelectorAll('section > .container');
    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-in');
    });
}

// Initialize image loading
function initImageLoading() {
    // Lazy load background images
    document.querySelectorAll('.hex-bg').forEach(bg => {
        const member = bg.parentElement.getAttribute('data-member');
        if (member) {
            // The CSS already handles this with data attributes, but this is just an example
            // of how we could lazy load images with JavaScript if needed
            console.log(`Loading image for ${member}`);
        }
    });
}

// Helper function for smooth scrolling
function scrollToElement(element) {
    window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
    });
}

// Export functions that might be used by other modules
window.hexesApp = {
    scrollToElement: scrollToElement
};