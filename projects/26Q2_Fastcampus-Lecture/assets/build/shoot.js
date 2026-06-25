// Generic full-page screenshot helper.
// usage: node shoot.js <file.html> <out.png> [width] [fullPage|viewport] [height]
import { chromium } from 'playwright';
import path from 'path';
import { pathToFileURL } from 'url';

const [,, htmlPath, outPath, w = '1480', mode = 'fullPage', h = '900'] = process.argv;
const b = await chromium.launch({ channel: 'chrome', headless: true });
const page = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(path.resolve(htmlPath)).href, { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
await page.screenshot({ path: path.resolve(outPath), fullPage: mode === 'fullPage' });
await b.close();
console.log('shot →', outPath);
