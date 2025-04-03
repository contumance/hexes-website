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
            // Different intensity for each hexagon
            const factor = 0.01 * (index + 1);
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
            const factor = 0.02 * (index + 1); // Slightly stronger for touch
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
            // Different random movement for each hexagon
            const randomX = (Math.random() - 0.5) * 8;
            const randomY = (Math.random() - 0.5) * 8;
            
            // Scale movement based on hexagon size
            const factor = 0.5 * (4 - index);
            const moveX = randomX * factor;
            const moveY = randomY * factor;
            
            // Smooth transition for random movements
            hex.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            hex.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            
            // Reset after a brief period
            setTimeout(() => {
                if (!logoContainer.matches(':hover')) {
                    hex.style.transform = 'translate(-50%, -50%)';
                }
            }, 3000);
        });
    }, 4000); // Every 4 seconds
});
