// SVG → PNG rasterizer using system Chrome (Playwright).
// Outputs into docs/design-system/assets/ (app icons, logo, og) and icons/png/.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DS = path.resolve(__dirname, '../../../../docs/design-system');
const ASSETS = path.join(DS, 'assets');
const ICONS = path.join(DS, 'icons');
const ICONS_PNG = path.join(ICONS, 'png');
fs.mkdirSync(ICONS_PNG, { recursive: true });

async function rasterize(page, svg, w, h, outPath, bg = 'transparent') {
  const html = `<!doctype html><meta charset="utf-8">
    <style>html,body{margin:0;padding:0;background:${bg}}
    #s{width:${w}px;height:${h}px;display:block}</style>
    <div id="s">${svg}</div>`;
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: 'networkidle' });
  const el = await page.$('#s');
  await el.screenshot({ path: outPath, omitBackground: bg === 'transparent' });
  console.log('  →', path.relative(DS, outPath));
}

// Branded OG / social card (1200x630)
function ogCard() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f5f5f7"/>
    <g transform="translate(120,250)">
      <path d="M-60 -5h120a60 60 0 0 1-120 0z" fill="#0066cc"/>
      <ellipse cx="0" cy="-5" rx="60" ry="14" fill="#0071e3"/>
      <g stroke="#1d1d1f" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.85">
        <path d="M-22 -34c-7 -9 7 -16 0 -28"/><path d="M0 -38c-7 -9 7 -16 0 -28"/><path d="M22 -34c-7 -9 7 -16 0 -28"/>
      </g>
    </g>
    <text x="120" y="400" font-family="'SF Pro Display',system-ui,Inter,sans-serif" font-size="76" font-weight="600" letter-spacing="-2" fill="#1d1d1f">오늘의 점심 메이트</text>
    <text x="122" y="470" font-family="'SF Pro Text',system-ui,Inter,sans-serif" font-size="32" font-weight="400" fill="#7a7a7a">기분·예산으로 AI가 점심 메뉴 3개를 추천합니다</text>
    <text x="122" y="560" font-family="'SF Pro Text',system-ui,Inter,sans-serif" font-size="22" font-weight="400" fill="#0066cc">AI-Native PM · Apple Design System</text>
  </svg>`;
}

const b = await chromium.launch({ channel: 'chrome', headless: true });
const page = await b.newPage({ deviceScaleFactor: 2 });

console.log('App icons:');
const appIcon = fs.readFileSync(path.join(ASSETS, 'app-icon.svg'), 'utf8');
for (const size of [1024, 512, 192, 180]) {
  await rasterize(page, appIcon, size, size, path.join(ASSETS, `app-icon-${size}.png`));
}

console.log('Logo:');
const logo = fs.readFileSync(path.join(ASSETS, 'logo.svg'), 'utf8');
await rasterize(page, logo, 360, 72, path.join(ASSETS, 'logo.png'));

console.log('OG card:');
await rasterize(page, ogCard(), 1200, 630, path.join(ASSETS, 'og-image.png'), '#f5f5f7');

console.log('Icon PNGs (48px, ink on transparent):');
const manifest = JSON.parse(fs.readFileSync(path.join(ICONS, 'index.json'), 'utf8'));
for (const [name, meta] of Object.entries(manifest.icons)) {
  let svg = fs.readFileSync(path.join(ICONS, meta.file), 'utf8');
  svg = svg.replace('<svg ', '<svg style="color:#1d1d1f" ');
  await rasterize(page, svg, 48, 48, path.join(ICONS_PNG, name + '.png'));
}

await b.close();
console.log('\nDone. PNG assets generated.');
