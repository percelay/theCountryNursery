import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
// Scroll through page to trigger all intersection observers
for (let i = 0; i <= 10; i++) {
    await page.evaluate(y => window.scrollTo(0, y), i * 1000);
    await new Promise(r => setTimeout(r, 200));
}
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 500));
const footer = await page.$('footer');
await footer.screenshot({ path: 'temporary screenshots/footer-only.png' });
console.log('Done');
await browser.close();
