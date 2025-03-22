// Ejemplo de script Node.js para optimizar imágenes
// Guardar como 'optimize-images.js'

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminWebp = require('imagemin-webp');

(async () => {
    // Optimizar JPG y PNG
    await imagemin(['assets/images/**/*.{jpg,png}'], {
        destination: 'assets/images/',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });

    // Optimizar SVG
    await imagemin(['assets/images/**/*.svg'], {
        destination: 'assets/images/',
        plugins: [
            imageminSvgo()
        ]
    });

    // Generar WebP
    await imagemin(['assets/images/**/*.{jpg,png}'], {
        destination: 'assets/images/',
        plugins: [
            imageminWebp({quality: 75})
        ]
    });

    console.log('Images optimized successfully!');
})();