// main.js - Versión actualizada para usar la configuración centralizada

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply configuration
    applyConfiguration();
    
    // Initialize animations (only if enabled in config)
    if (CONFIG.animations.enabled) {
        initAnimations();
    }
    
    // Initialize loading of images
    initImageLoading();
    
    // Ensure fade-in elements are visible
    ensureFadeInVisibility();
    
    // Initialize tooltips
    initTooltips();
    
    // La inicialización de hexágonos ahora ocurre en su propio archivo
    // No es necesario llamarlo desde aquí para evitar inicialización duplicada
});

// Apply configuration to DOM elements
function applyConfiguration() {
    // Update site title and meta
    document.title = `${CONFIG.site.name} - Modern Metal`;
    
    // Actualizar tagline solo si no hay sistema de idiomas activo
    if (!window.currentLanguage) {
        const tagline = document.querySelector('.tagline');
        if (tagline) {
            tagline.textContent = CONFIG.site.tagline;
        }
    }
    
    // Actualizar copyright solo si no hay sistema de idiomas activo
    if (!window.currentLanguage) {
        const copyright = document.querySelector('.copyright');
        if (copyright) {
            copyright.textContent = CONFIG.site.copyright;
        }
    }
    
    // Actualizar información de la banda solo si no hay sistema de idiomas activo
    if (!window.currentLanguage) {
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            const paragraphs = aboutContent.querySelectorAll('p');
            CONFIG.band.history.forEach((text, index) => {
                if (paragraphs[index]) {
                    paragraphs[index].textContent = text;
                }
            });
        }
    }
    
    // Actualizar información de miembros solo si no hay sistema de idiomas activo
    if (!window.currentLanguage) {
        for (const [role, member] of Object.entries(CONFIG.band.members)) {
            const memberEl = document.querySelector(`.hex-item[data-member="${role}"]`);
            if (memberEl) {
                const titleEl = memberEl.querySelector('.hex-title');
                const nameEl = memberEl.querySelector('.hex-subtitle');
                
                if (titleEl) titleEl.textContent = member.title;
                if (nameEl) nameEl.textContent = member.name;
            }
        }
    }

    // Actualizar enlaces de redes sociales en el footer
    updateFooterSocialLinks();
    
    // Apply theme colors
    document.documentElement.style.setProperty('--primary-color', CONFIG.theme.primaryColor);
    document.documentElement.style.setProperty('--accent-color', CONFIG.theme.accentColor);
    document.documentElement.style.setProperty('--secondary-accent', CONFIG.theme.secondaryAccent);
    document.documentElement.style.setProperty('--text-color', CONFIG.theme.textColor);
    document.documentElement.style.setProperty('--dark-shadow', CONFIG.theme.darkShadow);
}

// Nueva función para actualizar enlaces del footer
function updateFooterSocialLinks() {
    // Iterar sobre las plataformas sociales en la configuración
    for (const [platform, info] of Object.entries(CONFIG.social)) {
        // Seleccionar el enlace correspondiente usando el atributo data-platform
        const link = document.querySelector(`.footer-social a[data-platform="${platform}"]`);
        
        // Si encontramos el enlace, actualizar su URL
        if (link) {
            link.href = info.url;
            console.log(`Updated ${platform} link to ${info.url}`);
        }
    }
    
    // Mensaje de depuración para verificar ejecución
    console.log("Footer social links updated");
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

// Asegurar que las secciones con fade-in sean visibles
function ensureFadeInVisibility() {
    // Solución de respaldo para asegurarse de que los elementos fade-in son visibles 
    // incluso si las animaciones fallan
    setTimeout(function() {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (window.getComputedStyle(el).opacity < 0.1) {
                console.log('Corrigiendo visibilidad para elemento fade-in', el);
                el.classList.add('force-visible');
            }
        });
        
        // Asegurarse específicamente de que las secciones críticas sean visibles
        document.querySelectorAll('#about, #oracle').forEach(section => {
            section.classList.add('force-visible');
            section.querySelectorAll('.container, .about-container, .oracle-container').forEach(container => {
                container.classList.add('force-visible');
            });
        });
    }, 1000);
    
    // También verificar después de un tiempo más largo por si acaso
    setTimeout(function() {
        document.querySelectorAll('#about, #oracle').forEach(section => {
            if (window.getComputedStyle(section).opacity < 0.9) {
                section.classList.add('force-visible');
                section.querySelectorAll('*').forEach(el => {
                    el.classList.add('force-visible');
                });
                console.log('Forzando visibilidad en sección crítica:', section.id);
            }
        });
    }, 3000);
}

// Initialize image loading
// En main.js, función initImageLoading()
function initImageLoading() {
        
    // Verificar que las imágenes existan antes de configurarlas
    function setBackgroundIfExists(property, imgPath) {
        const img = new Image();
        img.onload = function() {
            document.documentElement.style.setProperty(property, `url(${imgPath})`);
        };
        img.onerror = function() {
            console.warn(`Background image not found: ${imgPath}`);
        };
        img.src = imgPath;
    }
    
    setBackgroundIfExists('--hero-bg-image', CONFIG.media.heroBg);
    setBackgroundIfExists('--about-image', CONFIG.media.aboutImage);
    setBackgroundIfExists('--card-back-image', CONFIG.media.cardBack);
}

// Helper function to find element by text content
Element.prototype.containsText = function(text) {
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

// Tooltip functionality optimized for both desktop and mobile
function initTooltips() {
    const powerElements = document.querySelectorAll('.hex-power[data-tooltip]');
    
    // Variable para rastrear el tooltip activo en móvil
    let activeMobileTooltip = null;
    
    powerElements.forEach(element => {
        // Manejo de hover para desktop
        element.addEventListener('mouseenter', function(e) {
            const tooltip = this.getAttribute('data-tooltip');
            
            // Crear tooltip
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip-popup';
            tooltipEl.textContent = tooltip;
            document.body.appendChild(tooltipEl);
            
            // Posicionar tooltip
            const updatePosition = (e) => {
                tooltipEl.style.left = (e.clientX + 10) + 'px';
                tooltipEl.style.top = (e.clientY - tooltipEl.offsetHeight - 10) + 'px';
            };
            
            updatePosition(e);
            this.addEventListener('mousemove', updatePosition);
            
            // Eliminar al salir
            this.addEventListener('mouseleave', function() {
                document.body.removeChild(tooltipEl);
                this.removeEventListener('mousemove', updatePosition);
            }, { once: true });
        });
        
        // Manejo de eventos táctiles específico para móviles
        element.addEventListener('touchstart', function(e) {
            // Importante: Prevenir el comportamiento predeterminado
            e.preventDefault();
            
            // Eliminar cualquier tooltip activo
            if (activeMobileTooltip) {
                document.body.removeChild(activeMobileTooltip);
                activeMobileTooltip = null;
            }
            
            // Obtener el texto del tooltip
            const tooltip = this.getAttribute('data-tooltip');
            
            // Crear el tooltip
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip-popup mobile-tooltip';
            tooltipEl.textContent = tooltip;
            document.body.appendChild(tooltipEl);
            
            // Guardar referencia al tooltip activo
            activeMobileTooltip = tooltipEl;
            
            // Posicionar el tooltip a un lugar visible cerca del elemento
            const rect = this.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            tooltipEl.style.left = centerX - (tooltipEl.offsetWidth / 2) + 'px';
            tooltipEl.style.top = centerY - (tooltipEl.offsetHeight / 2) + 'px';
            
            // Añadir un botón de cierre explícito para móviles
            const closeButton = document.createElement('button');
            closeButton.textContent = '×';
            closeButton.className = 'tooltip-close-btn';
            tooltipEl.appendChild(closeButton);
            
            closeButton.addEventListener('touchstart', function(e) {
                e.stopPropagation();
                if (activeMobileTooltip) {
                    document.body.removeChild(activeMobileTooltip);
                    activeMobileTooltip = null;
                }
            });
            
            // También cerrar al tocar fuera (con delay para evitar cierre inmediato)
            setTimeout(() => {
                document.addEventListener('touchstart', function handleTouch(e) {
                    // No cerrar si se toca el tooltip
                    if (e.target === tooltipEl || tooltipEl.contains(e.target)) {
                        return;
                    }
                    
                    if (activeMobileTooltip) {
                        document.body.removeChild(activeMobileTooltip);
                        activeMobileTooltip = null;
                    }
                    
                    document.removeEventListener('touchstart', handleTouch);
                });
            }, 100);
        });
    });
}