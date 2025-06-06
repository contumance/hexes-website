// Archivo: assets/js/config.js

// Configuración global del sitio web Hexes
const CONFIG = {
    // Información general del sitio
    site: {
        name: "H E X E S",
        tagline: "modern metal cult",
        copyright: "© 2025 HEXES. All rights reserved."
    },
    
    // Colores y temas
    theme: {
        primaryColor: "#0f0f0f",
        accentColor: "#9c27b0",
        secondaryAccent: "#673ab7",
        textColor: "#e0e0e0",
        darkShadow: "rgba(0, 0, 0, 0.8)"
    },
    
    // Redes sociales
    social: {
        instagram: {
            url: "https://instagram.com/hexescult",
            title: "Instagram",
            description: "Exclusive images, daily stories, and visual content from the world of HEXES."
        },
        youtube: {
            url: "https://youtube.com/hexescult",
            title: "YouTube",
            description: "Music videos, live sessions, and exclusive behind-the-scenes content."
        },
        spotify: {
            url: "https://open.spotify.com/artist/hexesband",
            title: "Spotify",
            description: "Listen to our songs, curated playlists, and exclusive previews."
        }
    },
    
    // Información de la banda
    band: {
        history: [
            "Emerging from the depths of modern metal's introspective landscape, HEXES is a dynamic project born in 2024 that weaves together existential narratives and intense sonic explorations.",
            "Blending elements of nu metal, shoegaze, and djent, the band crafts a powerful sound that critiques the contemporary world through a dark, introspective lens.", 
            "What began as a solo venture by vocalist Ale has transformed into a collaborative force pushing the boundaries of modern metal."
        ],
        members: {
            vocalist: {
                title: "Ale",
                name: "voice",
                power: "The Summoner",
                image: "assets/images/members/vocalist.jpg"
            },
            drummer: {
                title: "Edo",
                name: "drums",
                power: "Rhythm Sorcerer",
                image: "assets/images/members/drummer.jpg"
            },
            guitarist: {
                title: "Al",
                name: "guitar",
                power: "String Hexer",
                image: "assets/images/members/guitarist.jpg"
            }
        }
    },
    
    // Configuración del Hexed Oracle (tarot)
    tarot: {
        title: "oracle",
        description: "Receive your daily message through our mystical oracle. Each card contains a unique message inspired by our music and philosophy.",
        buttonText: "New Card",
        cardsPath: "./assets/data/tarot-cards.json"
    },
    
    // Opciones de animación
    animations: {
        enabled: true,           // Habilitar/deshabilitar todas las animaciones
        fadeInEnabled: true,     // Animaciones de fade-in específicas
        fadeInThreshold: 0.3,    // Umbral para IntersectionObserver
        fadeInMargin: "0px 0px -100px 0px"  // Margen para IntersectionObserver
    },
    
    // Rutas de medios
    media: {
        heroBg: "/assets/images/background/hero-bg.jpg",
        aboutImage: "/assets/images/background/band-image.jpg",
        cardBack: "/assets/images/tarot/card-back.jpg"
    }
};

// Exportar la configuración para uso en otros scripts
if (typeof module !== 'undefined') {
    module.exports = CONFIG;
}
