// Hexagon Animation for logo
document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.logo-animation');
    
    if (!logoContainer) return;
    
    // Add parallax effect on mouse move
    logoContainer.addEventListener('mousemove', function(e) {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        const rect = this.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Get mouse position relative to the container center
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;
        
        // Apply parallax effect to each hexagon
        const hexagons = this.querySelectorAll('.hexagon');
        hexagons.forEach((hex, index) => {
            // Calcula un factor inverso al índice (los exteriores se mueven menos)
            // index 0-5, donde 0-1 son los nuevos hexágonos externos
            // Reduce el factor para los hexágonos exteriores
            const reversedIndex = hexagons.length - 1 - index;
            const factor = 0.007 * (reversedIndex + 1);
            
            const moveX = mouseX * factor;
            const moveY = mouseY * factor;
            
            hex.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    });
    
    // Reset position when mouse leaves
    logoContainer.addEventListener('mouseleave', function() {
        const hexagons = this.querySelectorAll('.hexagon');
        hexagons.forEach(hex => {
            // Return to center position smoothly
            hex.style.transition = 'transform 0.5s ease';
            hex.style.transform = 'translate(-50%, -50%)';
        });
    });
    
    // Add touch interactivity for mobile
    logoContainer.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Prevent scrolling
        
        if (e.touches.length !== 1) return;
        
        const touch = e.touches[0];
        const rect = this.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const touchX = touch.clientX - rect.left - centerX;
        const touchY = touch.clientY - rect.top - centerY;
        
        // Apply similar parallax effect to hexagons
        const hexagons = this.querySelectorAll('.hexagon');
        hexagons.forEach((hex, index) => {
            const reversedIndex = hexagons.length - 1 - index;
            const factor = 0.015 * (reversedIndex + 1); // Slightly stronger for touch
            
            const moveX = touchX * factor;
            const moveY = touchY * factor;
            
            hex.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    });
    
    // Reset on touch end
    logoContainer.addEventListener('touchend', function() {
        const hexagons = this.querySelectorAll('.hexagon');
        hexagons.forEach(hex => {
            hex.style.transition = 'transform 0.5s ease';
            hex.style.transform = 'translate(-50%, -50%)';
        });
    });
    
    // Add random subtle movements
    setInterval(() => {
        if (logoContainer.matches(':hover')) return; // Skip if being hovered
        
        const hexagons = logoContainer.querySelectorAll('.hexagon');
        hexagons.forEach((hex, index) => {
            // Menor movimiento para hexágonos exteriores
            const reversedIndex = hexagons.length - 1 - index;
            
            // Movimiento aleatorio, más pequeño para los hexágonos exteriores
            const randomX = (Math.random() - 0.5) * (4 + reversedIndex);
            const randomY = (Math.random() - 0.5) * (4 + reversedIndex);
            
            // Factor de movimiento más suave para hexágonos exteriores
            const factor = 0.3 * (reversedIndex + 1) / hexagons.length;
            const moveX = randomX * factor;
            const moveY = randomY * factor;
            
            // Transición más lenta para hexágonos más grandes
            const duration = 3 + (hexagons.length - index) * 0.5;
            
            // Smooth transition for random movements
            hex.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
            hex.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            
            // Reset after a brief period
            setTimeout(() => {
                if (!logoContainer.matches(':hover')) {
                    hex.style.transform = 'translate(-50%, -50%)';
                }
            }, duration * 1000);
        });
    }, 4000); // Every 4 seconds
});
