import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EPHE_DIR = path.join(__dirname, '..', 'server', 'ephe');
const CHIRON_FILE = 'seas_18.se1';
const BASE_URL = 'https://www.astro.com/ftp/swisseph/ephe/';

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('--- ASTRA EPHEMERIS LOCALIZER ---');
  
  if (!fs.existsSync(EPHE_DIR)) {
    console.log(`Creating directory: ${EPHE_DIR}`);
    fs.mkdirSync(EPHE_DIR, { recursive: true });
  }

  const dest = path.join(EPHE_DIR, CHIRON_FILE);
  if (fs.existsSync(dest)) {
    console.log('Chiron ephemeris already exists locally.');
  } else {
    console.log(`Downloading Chiron ephemeris (${CHIRON_FILE})...`);
    try {
      await downloadFile(`${BASE_URL}${CHIRON_FILE}`, dest);
      console.log('Download complete.');
    } catch (err) {
      console.error('Error downloading Chiron ephemeris:', err.message);
      process.exit(1);
    }
  }

  console.log('\nUpdating astroEngine.js configuration...');
  const enginePath = path.join(__dirname, '..', 'server', 'astroEngine.js');
  let content = fs.readFileSync(enginePath, 'utf8');
  
  // Use a more robust check to avoid multiple imports
  if (!content.includes("import path from 'path'")) {
     content = "import path from 'path';\n" + content;
  }

  if (content.includes('sweph.set_ephe_path(null);')) {
    const newPathLine = `sweph.set_ephe_path(path.join(process.cwd(), 'server', 'ephe'));`;
    content = content.replace('sweph.set_ephe_path(null);', newPathLine);
    fs.writeFileSync(enginePath, content);
    console.log('Astra Engine updated successfully.');
  } else {
    console.log('Astra Engine already configured or marker not found.');
  }

  console.log('\nChiron localization fixed. Restart the server to apply changes.');
}

main();
