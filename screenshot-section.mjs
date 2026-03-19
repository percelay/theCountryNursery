import puppeteer from 'puppeteer';
import { mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotDir = join(__dirname, 'temporary screenshots');
mkdirSync(screenshotDir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

// Take viewport screenshots at different scroll positions
const positions = [
    { name: 'hero', y: 0 },
    { name: 'about', y: 900 },
    { name: 'services', y: 1800 },
    { name: 'services2', y: 2700 },
    { name: 'plants', y: 3900 },
    { name: 'gallery', y: 4800 },
    { name: 'seasonal', y: 5700 },
    { name: 'contact', y: 6600 },
    { name: 'footer', y: 7500 },
];

for (const pos of positions) {
    await page.evaluate(y => window.scrollTo(0, y), pos.y);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
        path: join(screenshotDir, `section-${pos.name}.png`),
        fullPage: false
    });
    console.log(`Captured: section-${pos.name}.png`);
}

await browser.close();
console.log('Done!');
