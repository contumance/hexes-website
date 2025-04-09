// oracle.js - Versión actualizada para usar la configuración centralizada e incluir soporte de idiomas

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

// Función para cargar las cartas desde el JSON
async function loadOracleCards() {
    try {
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
    if (window.currentLanguage === 'es' && oracleCardsES.length > 0) {
        return oracleCardsES;
    } else {
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
        if (window.translations && window.currentLanguage && window.translations[window.currentLanguage]) {
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
    // Solo actualizar si la carta ya está mostrada (girada)
    if (oracleInner && oracleInner.style.transform === 'rotateY(180deg)') {
        const index = parseInt(localStorage.getItem('oracleCardIndex')) || 0;
        displayOracleCard(index);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Cargar las cartas primero
    loadOracleCards();
});