// language.js - Manejo de traducciones e idiomas

// Variable para almacenar las traducciones cargadas
let translations = {};
let currentLanguage = 'en'; // Idioma por defecto: inglés

// En language.js - Convertir a una promesa para mejor control
let translationsLoaded = false;
let translationsPromise = null;

function loadTranslations() {
    console.log('Cargando traducciones...');
    
    if (translationsPromise) {
        return translationsPromise;
    }
    
    translationsPromise = new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('./assets/data/languages.json');
            if (!response.ok) {
                throw new Error(`Error al cargar traducciones: ${response.status}`);
            }
            translations = await response.json();
            console.log('Traducciones cargadas correctamente');
            translationsLoaded = true;
            
            // Inicializar con el idioma guardado o el predeterminado
            initializeLanguage();
            resolve(translations);
        } catch (error) {
            console.error('Error cargando traducciones:', error);
            reject(error);
        }
    });
    
    return translationsPromise;
}

// Inicializar idioma
function initializeLanguage() {
    // Comprobar si hay un idioma guardado en localStorage
    const savedLanguage = localStorage.getItem('hexesLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    
    // Exponer la variable currentLanguage globalmente
    window.currentLanguage = currentLanguage;
    
    // Actualizar el selector de idioma
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
    }
    
    // Aplicar traducciones al cargar la página
    applyTranslations();
}

// Cambiar de idioma
function changeLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('hexesLanguage', lang);
        
        // Exponer la variable currentLanguage globalmente
        window.currentLanguage = currentLanguage;
        
        // Aplicar traducciones
        applyTranslations();
        
        // Disparar un evento personalizado para que otros componentes puedan reaccionar
        const event = new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        });
        document.dispatchEvent(event);
        
        console.log(`Idioma cambiado a: ${lang}`);
    } else {
        console.error(`Idioma no disponible: ${lang}`);
    }
}

// Aplicar traducciones a la página
function applyTranslations() {
    const language = translations[currentLanguage];
    if (!language) return;
    
    // Navegación
    document.querySelectorAll('.nav-links a, .footer-nav a').forEach(link => {
        const key = link.getAttribute('href').replace('#', '');
        if (key && language.nav[key]) {
            link.textContent = language.nav[key];
        }
    });
    
    // Hero section
    const tagline = document.querySelector('.tagline');
    if (tagline && language.hero.tagline) {
        tagline.textContent = language.hero.tagline;
    }
    
    const heroButton = document.querySelector('#hero .cta-button');
    if (heroButton && language.hero.cta) {
        heroButton.textContent = language.hero.cta;
    }
    
    // About section
    const aboutTitle = document.querySelector('#about .section-title');
    if (aboutTitle && language.about.title) {
        aboutTitle.textContent = language.about.title;
    }
    
    const bandTitle = document.querySelector('.about-content h3');
    if (bandTitle && language.about.bandTitle) {
        bandTitle.textContent = language.about.bandTitle;
    }
    
    // Textos de historia de la banda
    const storyParagraphs = document.querySelectorAll('.about-content > p');
    if (storyParagraphs.length > 0 && language.about.story) {
        language.about.story.forEach((text, index) => {
            if (storyParagraphs[index]) {
                storyParagraphs[index].textContent = text;
            }
        });
    }
    
    // Miembros de la banda
    for (const role in language.about.members) {
        const powerElement = document.querySelector(`.hex-item[data-member="${role}"] .hex-power`);
        if (powerElement) {
            // Actualizar el poder
            powerElement.textContent = language.about.members[role].power;
            
            // Actualizar el tooltip
            powerElement.setAttribute('data-tooltip', language.about.members[role].tooltip);
        }
    }
    
    // Sección Oráculo
    const oracleTitle = document.querySelector('#oracle .section-title');
    if (oracleTitle && language.oracle.title) {
        oracleTitle.textContent = language.oracle.title;
    }
    
    const oracleDescription = document.querySelector('.oracle-description p');
    if (oracleDescription && language.oracle.description) {
        oracleDescription.textContent = language.oracle.description;
    }
    
    const oracleButton = document.querySelector('.random-button');
    if (oracleButton && language.oracle.button) {
        oracleButton.textContent = language.oracle.button;
    }
    
    // Footer
    const followTitle = document.querySelector('.social-title');
    if (followTitle && language.footer.follow) {
        followTitle.textContent = language.footer.follow;
    }
    
    const copyright = document.querySelector('.copyright');
    if (copyright && language.footer.copyright) {
        copyright.textContent = language.footer.copyright;
    }
}

// Event listener para el selector de idioma
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language-selector');
    
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    // Cargar traducciones
    loadTranslations();
});