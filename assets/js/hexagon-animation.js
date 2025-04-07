/**
 * Hexagon Animation - Interactividad con alineación al hacer hover
 * 
 * Este script hace que los hexágonos se alineen suavemente en su posición
 * inicial cuando el mouse está sobre ellos.
 */

// Función principal
function initHexagonAnimation() {
    console.log('Inicializando animación de hexágonos con alineación al hover...');
    
    // Obtener el contenedor
    const container = document.querySelector('.logo-animation');
    if (!container) {
        console.error('No se encontró el contenedor .logo-animation');
        return;
    }
    
    // Obtener todos los hexágonos
    const hexagons = container.querySelectorAll('.hexagon');
    if (hexagons.length === 0) {
        console.error('No se encontraron hexágonos');
        return;
    }
    
    console.log(`Encontrados ${hexagons.length} hexágonos`);
    
    // Guardar las clases de animación originales
    const originalClasses = Array.from(hexagons).map(hex => {
        // Extraer las clases de rotación
        const classes = hex.className.split(' ');
        return classes.find(cls => cls.startsWith('rotate-')) || '';
    });
    
    // Bandera para controlar si estamos en hover o en interacción
    let isInteracting = false;
    
    // Manejar el evento mouseenter (cuando el mouse entra en el área)
    container.addEventListener('mouseenter', function() {
        if (isInteracting) return;
        
        // Aplicar clase de reset con transición suave a cada hexágono
        hexagons.forEach((hex, index) => {
            // Añadir retraso escalonado para efecto más interesante
            setTimeout(() => {
                hex.classList.add('hex-reset');
            }, index * 50); // Retraso progresivo por hexágono
        });
    });
    
    // Manejar el evento mouseleave (cuando el mouse sale del área)
    container.addEventListener('mouseleave', function() {
        // Restaurar animaciones originales correctamente
        hexagons.forEach((hex, index) => {
            // Primero quitar la clase de reset
            hex.classList.remove('hex-reset');
            
            // Asegurarse de que la transformación base esté restaurada
            hex.style.transform = 'translate(-50%, -50%)';
            
            // Forzar un reflow para reiniciar correctamente la animación
            void hex.offsetWidth;
            
            // Asegurarse de que la animación esté activa
            hex.style.animationPlayState = 'running';
            
            // Verificar si tiene la clase de rotación original, si no, restaurarla
            const rotateClass = originalClasses[index];
            if (rotateClass && !hex.classList.contains(rotateClass)) {
                hex.classList.add(rotateClass);
            }
        });
        
        isInteracting = false;
    });
    
    // Eventos para interacción de parallax
    container.addEventListener('mousemove', handleMouseMove);
    
    // Soporte para dispositivos táctiles
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', function() {
        resetHexagons();
        // Después de resetear, forzar la reanudación de animaciones
        setTimeout(() => {
            hexagons.forEach((hex, index) => {
                hex.style.animationPlayState = 'running';
                // Restaurar clase de animación si es necesario
                const rotateClass = originalClasses[index];
                if (rotateClass && !hex.classList.contains(rotateClass)) {
                    hex.classList.add(rotateClass);
                }
            });
        }, 50);
    });
    
    // Función para manejar el movimiento del mouse
    function handleMouseMove(e) {
        isInteracting = true;
        
        // Eliminar la clase hex-reset de cada hexágono
        hexagons.forEach(hex => {
            hex.classList.remove('hex-reset');
        });
        
        // Calcular la posición relativa al centro
        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;
        
        // Aplicar el efecto parallax
        hexagons.forEach((hex, index) => {
            // Pausar la animación automática
            hex.style.animationPlayState = 'paused';
            
            // Calcular factor de desplazamiento
            const reversedIndex = hexagons.length - 1 - index;
            const factor = 0.01 * (reversedIndex + 1);
            
            const moveX = mouseX * factor;
            const moveY = mouseY * factor;
            
            // Aplicar la transformación
            hex.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    }
    
    // Función para manejar eventos táctiles
    function handleTouchMove(e) {
        isInteracting = true;
        e.preventDefault();
        
        if (e.touches.length !== 1) return;
        
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const touchX = touch.clientX - rect.left - centerX;
        const touchY = touch.clientY - rect.top - centerY;
        
        hexagons.forEach((hex, index) => {
            hex.classList.remove('hex-reset');
            hex.style.animationPlayState = 'paused';
            
            const reversedIndex = hexagons.length - 1 - index;
            const factor = 0.015 * (reversedIndex + 1);
            
            const moveX = touchX * factor;
            const moveY = touchY * factor;
            
            hex.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    }
    
    // Función para resetear los hexágonos
    function resetHexagons() {
        hexagons.forEach((hex, index) => {
            // Restaurar posición base
            hex.style.transform = 'translate(-50%, -50%)';
            
            // Quitar la clase de reset si existe
            hex.classList.remove('hex-reset');
            
            // Forzar un reflow para reiniciar animaciones
            void hex.offsetWidth;
            
            // Asegurar que la animación se reanude
            hex.style.animationPlayState = 'running';
            
            // Verificar y restaurar la clase de rotación original
            const rotateClass = originalClasses[index];
            if (rotateClass && !hex.classList.contains(rotateClass)) {
                hex.classList.add(rotateClass);
            }
        });
        
        isInteracting = false;
    }
    
    // También restaurar animaciones cuando se hace clic
    container.addEventListener('click', function() {
        // Aplicar efecto visual de clic
        hexagons.forEach(hex => {
            hex.style.transform = 'translate(-50%, -50%) scale(1.1)';
            setTimeout(() => {
                hex.style.transform = 'translate(-50%, -50%)';
            }, 200);
        });
        
        // Después del efecto, restaurar animaciones
        setTimeout(resetHexagons, 300);
    });
    
    console.log('Animación de hexágonos inicializada correctamente');
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initHexagonAnimation, 100);
});

// Inicialización de respaldo
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initHexagonAnimation, 100);
}