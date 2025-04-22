// Actualizar el texto del botón cuando cambia el idioma
document.addEventListener('languageChanged', function(e) {
    // Actualizar el texto del botón según el idioma
    if (randomButton && window.translations && window.currentLanguage) {
        const lang = window.currentLanguage;
        if (window.translations[lang] && window.translations[lang].oracle) {
            randomButton.textContent = window.translations[lang].oracle.button;
        }
    }
});// Función explícita para actualizar el oracle al cambiar el idioma
// Esta función puede ser llamada directamente desde language.js
function updateOracleForLanguage() {
    // Obtener el índice de carta almacenado
    const storedCardIndex = localStorage.getItem('oracleCardIndex');
    if (storedCardIndex !== null) {
        const index = parseInt(storedCardIndex);
        
        // Actualizar la carta con el nuevo idioma
        setTimeout(() => {
            displayOracleCard(index);
            
            // Si la carta está volteada, mantenerla así
            if (oracleInner && 
                (oracleInner.style.transform === 'rotateY(180deg)' || 
                 getComputedStyle(oracleInner).transform.includes('180'))) {
                // Ya está girada, no hacemos nada
            } else {
                // Si no está girada, la giramos para mostrar el contenido
                setTimeout(() => {
                    if (oracleInner) oracleInner.style.transform = 'rotateY(180deg)';
                }, 300);
            }
        }, 100);
    }
}

// Exponer la función globalmente para que language.js pueda acceder a ella
window.updateOracleForLanguage = updateOracleForLanguage;// oracle.js - Versión actualizada para usar la configuración centralizada e incluir soporte de idiomas

// DOM Elements
const randomButton = document.querySelector('.random-button');
const oracleTitle = document.querySelector('.oracle-title');
const oracleMessage = document.querySelector('.oracle-message');
const oracleQuote = document.querySelector('.oracle-quote');
const oracleSymbol = document.querySelector('.oracle-symbol');
const oracleInner = document.querySelector('.oracle-inner');

// Get oracle cards from configuration
let oracleCards = [];
let oracleCardsES = [];

// En oracle.js - Asegurarse de que las cartas se carguen después de las traducciones
async function loadOracleCards() {
    try {
        // Esperar a que las traducciones estén cargadas primero
        if (window.loadTranslations) {
            await window.loadTranslations();
        }
        
        // Cargar cartas en inglés (predeterminado)
        const response = await fetch(CONFIG.oracle.cardsPath);
        if (!response.ok) {
            throw new Error(`Error al cargar las cartas: ${response.status}`);
        }
        oracleCards = await response.json();
        
        // Cargar cartas en español
        const responseES = await fetch('./assets/data/oracle-cards-es.json');
        if (responseES.ok) {
            oracleCardsES = await responseES.json();
        }
        
        console.log('Cartas del oráculo cargadas correctamente');
        
        // Inicializar el oracle si la página ya está cargada
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initOracle();
        }
    } catch (error) {
        console.error('Error cargando cartas de oracle:', error);
    }
}

// Obtener las cartas según el idioma actual
function getCardsByLanguage() {
    // Verificar si existe la variable global currentLanguage (definida en language.js)
    const currentLang = window.currentLanguage || 'en';
    
    if (currentLang === 'es' && oracleCardsES && oracleCardsES.length > 0) {
        console.log('Usando cartas en español');
        return oracleCardsES;
    } else {
        console.log('Usando cartas en inglés');
        return oracleCards;
    }
}

// Check if daily card has already been selected
function checkDailyCard() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('oracleDate');
    const storedCardIndex = localStorage.getItem('oracleCardIndex');
    
    if (storedDate === today && storedCardIndex !== null) {
        // Display the stored card
        displayOracleCard(parseInt(storedCardIndex));
        return true;
    }
    
    return false;
}

// Display a specific oracle card
function displayOracleCard(index) {
    const cards = getCardsByLanguage();
    if (!cards || cards.length === 0) return;
    
    const card = cards[index];
    
    // Update card content with animation
    oracleTitle.style.opacity = 0;
    oracleMessage.style.opacity = 0;
    oracleQuote.style.opacity = 0;
    oracleSymbol.style.opacity = 0;
    
    setTimeout(() => {
        oracleTitle.textContent = card.title;
        oracleMessage.textContent = card.message;
        oracleQuote.textContent = `"${card.quote}"`;
        oracleSymbol.innerHTML = `<i class="${card.symbol} fa-3x"></i>`;
        
        oracleTitle.style.opacity = 1;
        oracleMessage.style.opacity = 1;
        oracleQuote.style.opacity = 1;
        oracleSymbol.style.opacity = 1;
    }, 300);
}

// Get random oracle card
function getRandomOracle() {
    const cards = getCardsByLanguage();
    if (!cards || cards.length === 0) return;
    
    // Reset card position first
    resetCardPosition();
    
    // Generate random index
    const randomIndex = Math.floor(Math.random() * cards.length);
    
    // Store today's card in localStorage
    const today = new Date().toDateString();
    localStorage.setItem('oracleDate', today);
    localStorage.setItem('oracleCardIndex', randomIndex);
    
    // Display the card
    displayOracleCard(randomIndex);
    
    // Flip the card
    setTimeout(() => {
        oracleInner.style.transform = 'rotateY(180deg)';
    }, 300);
}

// Reset card position
function resetCardPosition() {
    oracleInner.style.transform = 'rotateY(0deg)';
}

// Initialize Oracle section
function initOracle() {
    // Update button text from config or language file
    if (randomButton) {
        if (window.translations && window.currentLanguage && 
            window.translations[window.currentLanguage] && 
            window.translations[window.currentLanguage].oracle) {
            randomButton.textContent = window.translations[window.currentLanguage].oracle.button;
        } else {
            randomButton.textContent = CONFIG.oracle.buttonText;
        }
    }
    
    // Check if we have a daily card already
    if (!checkDailyCard()) {
        // If not, get a random card on page load
        getRandomOracle();
    }
}

// Event Listeners
if (randomButton) {
    randomButton.addEventListener('click', getRandomOracle);
}

// Hover on mobile devices
if (oracleInner) {
    oracleInner.addEventListener('touchstart', function() {
        this.style.transform = this.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });
}

// Forzar actualización de la carta cuando cambia el idioma
document.addEventListener('languageChanged', function(e) {
    // Siempre actualizar la carta actual cuando cambie el idioma
    const storedCardIndex = localStorage.getItem('oracleCardIndex');
    if (storedCardIndex !== null) {
        const index = parseInt(storedCardIndex);
        
        // Primero, asegurar que usamos las cartas del nuevo idioma
        const cards = getCardsByLanguage();
        
        // Solo si tenemos cartas válidas y el índice es válido
        if (cards && cards.length > 0 && index >= 0 && index < cards.length) {
            // Forzar actualización incluso si la carta no está girada
            displayOracleCard(index);
            
            // Si la carta está mostrada (girada), mantenerla así
            if (oracleInner && oracleInner.style.transform === 'rotateY(180deg)') {
                // Mantenemos la carta girada
            } else {
                // Si no está girada, la giramos para mostrar el nuevo contenido
                setTimeout(() => {
                    if (oracleInner) oracleInner.style.transform = 'rotateY(180deg)';
                }, 300);
            }
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Cargar las cartas primero
    loadOracleCards();
});