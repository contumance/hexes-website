// main.js - Versión actualizada para usar la configuración centralizada

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log(`${CONFIG.site.name} website loaded`);
    
    // Apply configuration
    applyConfiguration();
    
    // Initialize animations (only if enabled in config)
    if (CONFIG.animations.enabled) {
        initAnimations();
    }
    
    // Initialize loading of images
    initImageLoading();
});

// Apply configuration to DOM elements
function applyConfiguration() {
    // Update site title and meta
    document.title = `${CONFIG.site.name} - Modern Metal`;
    
    // Update tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        tagline.textContent = CONFIG.site.tagline;
    }
    
    // Update copyright
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        copyright.textContent = CONFIG.site.copyright;
    }
    
    // Update band info
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        const paragraphs = aboutContent.querySelectorAll('p');
        CONFIG.band.history.forEach((text, index) => {
            if (paragraphs[index]) {
                paragraphs[index].textContent = text;
            }
        });
    }
    
    // Update member info
    for (const [role, member] of Object.entries(CONFIG.band.members)) {
        const memberEl = document.querySelector(`.hex-item[data-member="${role}"]`);
        if (memberEl) {
            const titleEl = memberEl.querySelector('.hex-title');
            const nameEl = memberEl.querySelector('.hex-subtitle');
            
            if (titleEl) titleEl.textContent = member.title;
            if (nameEl) nameEl.textContent = member.name;
        }
    }
    
    // Update social media
    for (const [platform, info] of Object.entries(CONFIG.social)) {
        const socialCard = document.querySelector(`.social-card h3:contains('${platform}')`);
        if (socialCard) {
            const container = socialCard.closest('.social-card');
            const description = container.querySelector('p');
            const button = container.querySelector('.social-button');
            
            if (description) description.textContent = info.description;
            if (button) button.href = info.url;
        }
    }
    
    // Apply theme colors
    document.documentElement.style.setProperty('--primary-color', CONFIG.theme.primaryColor);
    document.documentElement.style.setProperty('--accent-color', CONFIG.theme.accentColor);
    document.documentElement.style.setProperty('--secondary-accent', CONFIG.theme.secondaryAccent);
    document.documentElement.style.setProperty('--text-color', CONFIG.theme.textColor);
    document.documentElement.style.setProperty('--dark-shadow', CONFIG.theme.darkShadow);
}

// Initialize animations
function initAnimations() {
    // Add JS enabled class
    document.documentElement.classList.add('js-enabled');
    
    // Only run if fade-in animations are enabled
    if (!CONFIG.animations.fadeInEnabled) return;
    
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOptions = {
        threshold: CONFIG.animations.fadeInThreshold,
        rootMargin: CONFIG.animations.fadeInMargin
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
    // Update logo image
    const logoImg = document.querySelector('.logo');
    if (logoImg && CONFIG.media.logo) {
        logoImg.src = CONFIG.media.logo;
    }
    
    // Set background images via CSS custom properties
    document.documentElement.style.setProperty('--hero-bg-image', `url(${CONFIG.media.heroBg})`);
    document.documentElement.style.setProperty('--about-image', `url(${CONFIG.media.aboutImage})`);
    document.documentElement.style.setProperty('--card-back-image', `url(${CONFIG.media.cardBack})`);
}

// Helper function to find element by text content
Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
};

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

// Tooltip functionality for touch devices and better positioning
function initTooltips() {
    const powerElements = document.querySelectorAll('.hex-power[data-tooltip]');
    
    powerElements.forEach(element => {
        // Manejo de hover avanzado
        element.addEventListener('mouseenter', function(e) {
            const tooltip = this.getAttribute('data-tooltip');
            
            // Crear un elemento temporal para el tooltip
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip-popup';
            tooltipEl.textContent = tooltip;
            document.body.appendChild(tooltipEl);
            
            // Posicionar el tooltip cerca del cursor pero sin superponerse
            const updatePosition = (e) => {
                tooltipEl.style.left = (e.clientX + 10) + 'px';
                tooltipEl.style.top = (e.clientY - tooltipEl.offsetHeight - 10) + 'px';
            };
            
            // Posición inicial
            updatePosition(e);
            
            // Actualizar posición al mover el ratón
            this.addEventListener('mousemove', updatePosition);
            
            // Limpiar al salir
            this.addEventListener('mouseleave', function() {
                document.body.removeChild(tooltipEl);
                this.removeEventListener('mousemove', updatePosition);
            }, { once: true });
        });
        
        // Manejo táctil
        element.addEventListener('touchstart', function(e) {
            e.preventDefault();
            
            const tooltip = this.getAttribute('data-tooltip');
            
            // Remover cualquier tooltip existente
            const existingTooltips = document.querySelectorAll('.tooltip-popup');
            existingTooltips.forEach(el => el.remove());
            
            // Crear nuevo tooltip
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip-popup';
            tooltipEl.textContent = tooltip;
            document.body.appendChild(tooltipEl);
            
            // Posicionar el tooltip
            const rect = this.getBoundingClientRect();
            tooltipEl.style.left = rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2) + 'px';
            tooltipEl.style.top = rect.top - tooltipEl.offsetHeight - 10 + 'px';
            
            // Cerrar al tocar en cualquier parte
            document.addEventListener('touchstart', function closeTooltip() {
                tooltipEl.remove();
                document.removeEventListener('touchstart', closeTooltip);
            }, { once: true });
        });
    });
}

// Add this to your existing initialization
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Initialize tooltips
    initTooltips();
});