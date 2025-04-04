// Herramienta simple de optimización de imágenes para Hexes usando Sharp
const sharp = require('sharp');
const { globSync } = require('glob');
const path = require('path');
const fs = require('fs-extra');

// Definir rutas
const IMAGES_DIR = './assets/images';

// Función principal
async function optimizeImages() {
  console.log('🖼️ Iniciando optimización de imágenes...');
  
  try {
    // Asegurar que la carpeta de imágenes existe
    fs.ensureDirSync(IMAGES_DIR);
    
    // Buscar todas las imágenes
    const jpgFiles = globSync(`${IMAGES_DIR}/**/*.{jpg,jpeg}`, { nocase: true });
    const pngFiles = globSync(`${IMAGES_DIR}/**/*.png`, { nocase: true });
    
    console.log(`Encontradas ${jpgFiles.length} imágenes JPG/JPEG y ${pngFiles.length} imágenes PNG`);
    
    // Contadores
    let processed = 0;
    let webpGenerated = 0;
    
    // Procesar JPGs
    for (const file of jpgFiles) {
      try {
        const dir = path.dirname(file);
        const name = path.basename(file, path.extname(file));
        const webpOutput = path.join(dir, `${name}.webp`);
        
        // Optimizar JPG
        await sharp(file)
          .jpeg({ quality: 85 })
          .toBuffer()
          .then(data => fs.writeFile(file, data))
          .then(() => {
            processed++;
            process.stdout.write('.');
          });
        
        // Generar WebP
        await sharp(file)
          .webp({ quality: 75 })
          .toFile(webpOutput);
        
        webpGenerated++;
      } catch (err) {
        console.error(`\nError procesando ${file}:`, err.message);
      }
    }
    
    // Procesar PNGs
    for (const file of pngFiles) {
      try {
        const dir = path.dirname(file);
        const name = path.basename(file, path.extname(file));
        const webpOutput = path.join(dir, `${name}.webp`);
        
        // Optimizar PNG
        await sharp(file)
          .png({ quality: 80 })
          .toBuffer()
          .then(data => fs.writeFile(file, data))
          .then(() => {
            processed++;
            process.stdout.write('.');
          });
        
        // Generar WebP
        await sharp(file)
          .webp({ quality: 75 })
          .toFile(webpOutput);
        
        webpGenerated++;
      } catch (err) {
        console.error(`\nError procesando ${file}:`, err.message);
      }
    }
    
    console.log('\n✅ Proceso completado:');
    console.log(`   - Imágenes optimizadas: ${processed}`);
    console.log(`   - Versiones WebP generadas: ${webpGenerated}`);
    
  } catch (error) {
    console.error('\n❌ Error general:', error.message);
    process.exit(1);
  }
}

// Ejecutar
optimizeImages();