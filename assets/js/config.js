// Archivo: assets/js/config.js

// Configuración global del sitio web Hexes
const CONFIG = {
    // Información general del sitio
    site: {
        name: "HEXES",
        tagline: "modern metal cult",
        copyright: "© 2025 HEXES. All rights reserved.",
        language: "en" // 'en' para inglés, 'es' para español
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
            url: "https://instagram.com/hexesband",
            title: "Instagram",
            description: "Exclusive images, daily stories, and visual content from the world of HEXES."
        },
        youtube: {
            url: "https://youtube.com/hexesband",
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
            "Born from the darkness of the underground scene, HEXES emerges as a force that fuses the intensity of modern metal with mystical and conceptual elements that transcend music.",
            "Each member brings their own \"hexagon\" of influences, creating a sound that is both brutal and melodic, both technical and accessible.",
            "Our mission is to create not just music, but a complete experience that envelops our followers in a world of symbolism and sonic power."
        ],
        members: {
            guitarist: {
                title: "Guitarist",
                name: "Alex Hexcraft",
                image: "assets/images/members/guitarist.jpg"
            },
            vocalist: {
                title: "Vocalist",
                name: "Morgan Shadowvoice",
                image: "assets/images/members/vocalist.jpg"
            },
            bassist: {
                title: "Bassist",
                name: "Jordan Lowend",
                image: "assets/images/members/bassist.jpg"
            },
            drummer: {
                title: "Drummer",
                name: "Taylor Thunderbeats",
                image: "assets/images/members/drummer.jpg"
            }
        }
    },
    
    // Configuración del Hexed Oracle (tarot)
    tarot: {
        title: "Hexed Oracle",
        description: "Receive your daily message through our mystical oracle. Each card contains a unique message inspired by our music and philosophy.",
        buttonText: "New Card",
        cards: [
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
            },
            {
                title: "The Ritual",
                message: "Consistency and dedication are your allies now. Establish daily practices that bring you closer to your goals.",
                quote: "Each action repeated with intention becomes power.",
                symbol: "fas fa-fire"
            },
            {
                title: "The Pact",
                message: "It's time to honor your commitments and review what you have promised. Integrity is the foundation of your personal power.",
                quote: "A promise is a chain that only you can break or strengthen.",
                symbol: "fas fa-handshake"
            },
            {
                title: "The Transformation",
                message: "You are in a process of profound change. What you let go creates space for what is yet to come.",
                quote: "From the ashes of the past, the wings of the future arise.",
                symbol: "fas fa-dragon"
            },
            {
                title: "The Communion",
                message: "Connect with those who resonate with your energy. True bonds transcend ordinary relationships and become powerful alliances.",
                quote: "In the right circle, your flame burns brighter.",
                symbol: "fas fa-users"
            },
            {
                title: "The Void",
                message: "Embrace the silence and emptiness. Within nothingness lies the potential for everything. This is a time for introspection.",
                quote: "From the void, all creation emerges.",
                symbol: "fas fa-globe"
            }
        ]
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
        logo: "assets/images/logo/hexes-logo.png",
        heroBg: "assets/images/background/hero-bg.jpg",
        aboutImage: "assets/images/background/band-image.jpg",
        cardBack: "assets/images/tarot/card-back.jpg"
    }
};

// Exportar la configuración para uso en otros scripts
if (typeof module !== 'undefined') {
    module.exports = CONFIG;
}

// Añadir al final de config.js

// Configuración de idiomas
CONFIG.translations = {
    en: {
        nav: {
            social: "Social",
            about: "About",
            tarot: "Hexed Oracle"
        },
        cta: "Discover our world",
        social: {
            follow: "Follow Us",
            instagram: {
                button: "Follow"
            },
            youtube: {
                button: "Subscribe"
            },
            spotify: {
                button: "Listen"
            }
        },
        about: {
            title: "About Us",
            historyTitle: "The Story of HEXES"
        },
        tarot: {
            title: "Hexed Oracle",
            description: "Receive your daily message through our mystical oracle. Each card contains a unique message inspired by our music and philosophy.",
            button: "New Card"
        },
        footer: {
            rights: "All rights reserved"
        }
    },
    es: {
        nav: {
            social: "Redes",
            about: "Nosotros",
            tarot: "Oráculo Hexed"
        },
        cta: "Descubre nuestro mundo",
        social: {
            follow: "Síguenos",
            instagram: {
                button: "Seguir"
            },
            youtube: {
                button: "Suscribirse"
            },
            spotify: {
                button: "Escuchar"
            }
        },
        about: {
            title: "Nosotros",
            historyTitle: "La Historia de HEXES"
        },
        tarot: {
            title: "Oráculo Hexed",
            description: "Recibe tu mensaje diario a través de nuestro oráculo místico. Cada carta contiene un mensaje único inspirado en nuestra música y filosofía.",
            button: "Nueva Carta"
        },
        footer: {
            rights: "Todos los derechos reservados"
        }
    }
};

// Función para obtener traducción
CONFIG.getTranslation = function(key, defaultValue = "") {
    const language = CONFIG.site.language;
    const keys = key.split('.');
    
    let value = CONFIG.translations[language];
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return defaultValue;
        }
    }
    
    return value;
};

// Abreviación para obtener traducción
const t = key => CONFIG.getTranslation(key, key);