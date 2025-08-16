const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputIcon = path.join(__dirname, '../public/icons/logo.png');
const outputDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  console.log('Generating PWA icons...');

  for (const size of sizes) {
    try {
      await sharp(inputIcon)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));

      console.log(`✓ Generated icon-${size}x${size}.png`);
    } catch (error) {
      console.error(
        `✗ Failed to generate icon-${size}x${size}.png:`,
        error.message
      );
    }
  }

  // Apple Touch Icon (180x180)
  try {
    await sharp(inputIcon)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    console.log('✓ Generated apple-touch-icon.png');
  } catch (error) {
    console.error('✗ Failed to generate apple-touch-icon.png:', error.message);
  }

  // Favicon
  try {
    await sharp(inputIcon)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));

    console.log('✓ Generated favicon-32x32.png');
  } catch (error) {
    console.error('✗ Failed to generate favicon-32x32.png:', error.message);
  }

  // Generate favicon.ico for app directory
  try {
    const icoBuffer = await sharp(inputIcon).resize(32, 32).png().toBuffer();

    // For proper ICO format, we'll use PNG format but save as .ico
    // Most browsers accept PNG data in .ico files
    fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), icoBuffer);

    console.log('✓ Generated favicon.ico for app directory');
  } catch (error) {
    console.error(
      '✗ Failed to generate favicon.ico for app directory:',
      error.message
    );
  }

  // Also copy to public root for fallback
  try {
    const icoBuffer = await sharp(inputIcon).resize(32, 32).png().toBuffer();

    fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);

    console.log('✓ Generated favicon.ico for public directory');
  } catch (error) {
    console.error(
      '✗ Failed to generate favicon.ico for public directory:',
      error.message
    );
  }

  console.log('Icon generation completed!');
}

if (require.main === module) {
  generateIcons().catch(console.error);
}

module.exports = { generateIcons };
