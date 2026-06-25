// Capture getdesign.md/apple/design-md, highlight the "Download DESIGN.md" button.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../references');
fs.mkdirSync(OUT, { recursive: true });

const URL = 'https://getdesign.md/apple/design-md';

const b = await chromium.launch({ channel: 'chrome', headless: true });
const page = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

let ok = false;
try {
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(2500);

  // Find a download control mentioning DESIGN.md / Download
  const handle = await page.evaluateHandle(() => {
    const els = Array.from(document.querySelectorAll('a,button'));
    const score = (t) => {
      t = (t || '').toLowerCase();
      let s = 0;
      if (t.includes('download')) s += 2;
      if (t.includes('design.md') || t.includes('design md')) s += 2;
      if (t.includes('.md')) s += 1;
      return s;
    };
    let best = null, bestScore = 0;
    for (const el of els) {
      const s = score(el.textContent) + score(el.getAttribute('href') || '') + score(el.getAttribute('download') || '');
      if (s > bestScore) { bestScore = s; best = el; }
    }
    return bestScore >= 2 ? best : null;
  });

  const el = handle.asElement();
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    // draw a glowing highlight ring around the button
    await el.evaluate((node) => {
      const r = node.getBoundingClientRect();
      const ring = document.createElement('div');
      ring.style.cssText = `position:fixed;left:${r.left-10}px;top:${r.top-10}px;width:${r.width+20}px;height:${r.height+20}px;
        border:3px solid #0066cc;border-radius:14px;box-shadow:0 0 0 6px rgba(0,102,204,.25),0 0 30px 6px rgba(0,113,227,.55);
        z-index:2147483647;pointer-events:none;`;
      document.body.appendChild(ring);
      const tag = document.createElement('div');
      tag.textContent = '⬇ Download DESIGN.md';
      tag.style.cssText = `position:fixed;left:${r.left-10}px;top:${r.top-46}px;background:#0066cc;color:#fff;
        font:600 13px/1 -apple-system,system-ui,sans-serif;padding:8px 12px;border-radius:9px;z-index:2147483647;pointer-events:none;`;
      document.body.appendChild(tag);
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, 'getdesignmd-download-highlight.png') });
    // cropped close-up around the button
    const box = await el.boundingBox();
    if (box) {
      const pad = 120;
      await page.screenshot({
        path: path.join(OUT, 'getdesignmd-download-closeup.png'),
        clip: {
          x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad - 30),
          width: Math.min(1440, box.width + pad * 2), height: Math.min(900, box.height + pad * 2),
        },
      });
    }
    ok = true;
    console.log('CAPTURED real site with highlighted download button.');
  } else {
    console.log('Download button not found on page.');
  }
} catch (e) {
  console.log('Capture failed:', e.message);
}

await b.close();
if (!ok) { console.log('FALLBACK_NEEDED'); process.exitCode = 3; }
