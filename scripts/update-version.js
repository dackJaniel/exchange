const fs = require('fs');
const path = require('path');

// Auto-increment cache version on deployment
function updateServiceWorkerVersion() {
  const swPath = path.join(__dirname, '../public/sw.js');
  let swContent = fs.readFileSync(swPath, 'utf8');

  // Extract current version
  const versionMatch = swContent.match(/const VERSION = '(\d+)\.(\d+)\.(\d+)'/);
  if (versionMatch) {
    const [, major, minor, patch] = versionMatch;
    const newPatch = parseInt(patch) + 1;
    const newVersion = `${major}.${minor}.${newPatch}`;

    console.log(`Updating Service Worker version to: ${newVersion}`);

    // Update version in service worker
    swContent = swContent.replace(
      /const VERSION = '[\d.]+'/,
      `const VERSION = '${newVersion}'`
    );

    // Update cache names
    const cacheVersion = `v${major}_${minor}_${newPatch}`;
    swContent = swContent.replace(/v3/g, cacheVersion);

    fs.writeFileSync(swPath, swContent);

    // Update package.json version
    const packagePath = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

    console.log('✅ Service Worker and package.json updated successfully!');
    return newVersion;
  } else {
    console.error('❌ Could not find version in service worker');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateServiceWorkerVersion();
}

module.exports = { updateServiceWorkerVersion };
