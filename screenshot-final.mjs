import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
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

// Get page height
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
console.log('Page height:', pageHeight);

// Scroll to bottom for footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 900));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: join(screenshotDir, 'section-footer-final.png'), fullPage: false });
console.log('Footer captured');

// Also capture contact section more precisely
await page.evaluate(() => {
    document.getElementById('contact').scrollIntoView({ behavior: 'instant' });
});
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: join(screenshotDir, 'section-contact-final.png'), fullPage: false });
console.log('Contact captured');

await browser.close();
