import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotDir = join(__dirname, 'temporary screenshots');
mkdirSync(screenshotDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();

// Mobile viewport
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

// Hero
await page.screenshot({ path: join(screenshotDir, 'mobile-hero.png'), fullPage: false });
console.log('Mobile hero captured');

// Scroll to services
await page.evaluate(() => document.getElementById('services').scrollIntoView());
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: join(screenshotDir, 'mobile-services.png'), fullPage: false });
console.log('Mobile services captured');

// Scroll to contact
await page.evaluate(() => document.getElementById('contact').scrollIntoView());
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: join(screenshotDir, 'mobile-contact.png'), fullPage: false });
console.log('Mobile contact captured');

await browser.close();
