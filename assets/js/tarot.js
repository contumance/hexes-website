// tarot.js - Tarot card functionality with JSON data loading

// DOM Elements
const randomButton = document.querySelector('.random-button');
const tarotTitle = document.querySelector('.tarot-title');
const tarotMessage = document.querySelector('.tarot-message');
const tarotQuote = document.querySelector('.tarot-quote');
const tarotSymbol = document.querySelector('.tarot-symbol');
const tarotInner = document.querySelector('.tarot-inner');

// Store tarot cards data
let tarotCards = [];

// Fetch tarot cards data
async function fetchTarotCards() {
    try {
        const response = await fetch('assets/data/tarot-cards.json');
        tarotCards = await response.json();
        initTarot();
    } catch (error) {
        console.error('Error loading tarot cards:', error);
        // Fallback to default set if loading fails
        tarotCards = [
            {
                title: "The Spell",
                message: "The energy you project to the universe returns to you multiplied. Examine your intentions and make sure they are aligned with your true self.",
                quote: "What you give, you receive in eternal echo.",
                symbol: "fas fa-skull"
            },
            {
                title: "The Shadow",
                message: "Face your fears and what you have been avoiding. In darkness, you will find answers that light cannot reveal.",
                quote: "Only when you embrace your darkness, you find your true light.",
                symbol: "fas fa-moon"
            }
        ];
        initTarot();
    }
}

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

// Load tarot cards when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchTarotCards);