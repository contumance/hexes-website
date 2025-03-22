// tarot.js - Versión actualizada para usar la configuración centralizada

// DOM Elements
const randomButton = document.querySelector('.random-button');
const tarotTitle = document.querySelector('.tarot-title');
const tarotMessage = document.querySelector('.tarot-message');
const tarotQuote = document.querySelector('.tarot-quote');
const tarotSymbol = document.querySelector('.tarot-symbol');
const tarotInner = document.querySelector('.tarot-inner');

// Get tarot cards from configuration
const tarotCards = CONFIG.tarot.cards;

// Check if daily card has already been selected
function checkDailyCard() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('tarotDate');
    const storedCardIndex = localStorage.getItem('tarotCardIndex');
    
    if (storedDate === today && storedCardIndex !== null) {
        // Display the stored card
        displayTarotCard(parseInt(storedCardIndex));
        return true;
    }
    
    return false;
}

// Display a specific tarot card
function displayTarotCard(index) {
    if (!tarotCards || tarotCards.length === 0) return;
    
    const card = tarotCards[index];
    
    // Update card content with animation
    tarotTitle.style.opacity = 0;
    tarotMessage.style.opacity = 0;
    tarotQuote.style.opacity = 0;
    tarotSymbol.style.opacity = 0;
    
    setTimeout(() => {
        tarotTitle.textContent = card.title;
        tarotMessage.textContent = card.message;
        tarotQuote.textContent = `"${card.quote}"`;
        tarotSymbol.innerHTML = `<i class="${card.symbol} fa-3x"></i>`;
        
        tarotTitle.style.opacity = 1;
        tarotMessage.style.opacity = 1;
        tarotQuote.style.opacity = 1;
        tarotSymbol.style.opacity = 1;
    }, 300);
}

// Get random tarot card
function getRandomTarot() {
    if (!tarotCards || tarotCards.length === 0) return;
    
    // Reset card position first
    resetCardPosition();
    
    // Generate random index
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    
    // Store today's card in localStorage
    const today = new Date().toDateString();
    localStorage.setItem('tarotDate', today);
    localStorage.setItem('tarotCardIndex', randomIndex);
    
    // Display the card
    displayTarotCard(randomIndex);
    
    // Flip the card
    setTimeout(() => {
        tarotInner.style.transform = 'rotateY(180deg)';
    }, 300);
}

// Reset card position
function resetCardPosition() {
    tarotInner.style.transform = 'rotateY(0deg)';
}

// Initialize Tarot section
function initTarot() {
    // Update button text from config
    if (randomButton) {
        randomButton.textContent = CONFIG.tarot.buttonText;
    }
    
    // Check if we have a daily card already
    if (!checkDailyCard()) {
        // If not, get a random card on page load
        getRandomTarot();
    }
}

// Event Listeners
if (randomButton) {
    randomButton.addEventListener('click', getRandomTarot);
}

// Hover on mobile devices
if (tarotInner) {
    tarotInner.addEventListener('touchstart', function() {
        this.style.transform = this.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initTarot);