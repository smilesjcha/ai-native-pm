// Render a Markdown file as a clean "preview screen" PNG (marked + GitHub-ish CSS + Playwright).
// usage: node render-md.js <md-path> <out.png> [vw] [vh] [title]
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [,, mdPath, outPath, vw = '1100', vh = '900', title = 'PRD.md'] = process.argv;
const md = fs.readFileSync(path.resolve(mdPath), 'utf8');

// strip the collapsible Change Log / meta-quote noise for a cleaner capture
const cleaned = md;

const html = `<!doctype html><html><head><meta charset="utf-8">
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js"></script>
<style>
  :root{--ink:#1d1d1f;--blue:#0066cc;--gray:#86868b;--hair:#e8e8ed;--parch:#f5f5f7;}
  *{box-sizing:border-box;margin:0;}
  body{font-family:"NanumGothic","Apple SD Gothic Neo",system-ui,sans-serif;background:#fff;color:var(--ink);}
  .winbar{height:42px;background:var(--parch);border-bottom:1px solid var(--hair);display:flex;align-items:center;gap:8px;padding:0 16px;position:sticky;top:0;z-index:5;}
  .dot{width:11px;height:11px;border-radius:50%;}
  .r{background:#ff5f57;}.y{background:#febc2e;}.g{background:#28c840;}
  .winbar .name{margin-left:10px;font-size:13px;color:var(--gray);}
  .winbar .badge{margin-left:auto;font-size:11px;color:var(--blue);background:#eaf2fb;border:1px solid #cfe3ff;padding:3px 9px;border-radius:9999px;}
  .doc{max-width:820px;margin:0 auto;padding:30px 40px 60px;line-height:1.6;font-size:15px;}
  .doc h1{font-size:30px;font-weight:800;letter-spacing:-.5px;padding-bottom:10px;border-bottom:1px solid var(--hair);margin-bottom:14px;}
  .doc h2{font-size:21px;font-weight:800;margin:26px 0 12px;padding-bottom:6px;border-bottom:1px solid var(--hair);}
  .doc h3{font-size:17px;font-weight:700;margin:18px 0 8px;}
  .doc p,.doc li{margin:0 0 10px;}
  .doc ul,.doc ol{padding-left:24px;}
  .doc blockquote{border-left:3px solid var(--blue);background:var(--parch);padding:8px 14px;color:#333;margin:0 0 12px;border-radius:0 8px 8px 0;}
  .doc code{background:#f0f1f3;border-radius:4px;padding:1px 6px;font-size:.9em;}
  .doc table{border-collapse:collapse;width:100%;margin:0 0 14px;font-size:13.5px;}
  .doc th,.doc td{border:1px solid var(--hair);padding:7px 11px;text-align:left;}
  .doc th{background:var(--parch);font-weight:700;}
  .doc tr:nth-child(even) td{background:#fafafc;}
  .doc details{display:none;} /* hide Change Log */
  .doc strong{font-weight:700;}
  .doc a{color:var(--blue);text-decoration:none;}
</style></head>
<body>
  <div class="winbar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
    <span class="name">📄 ${title}</span><span class="badge">Markdown Preview</span></div>
  <div class="doc" id="doc"></div>
  <script>
    const src = ${JSON.stringify(cleaned)};
    document.getElementById('doc').innerHTML = marked.parse(src, { gfm:true });
  </script>
</body></html>`;

const tmp = path.join(__dirname, '.render-md.html');
fs.writeFileSync(tmp, html);

const b = await chromium.launch({ channel: 'chrome', headless: true });
const page = await b.newPage({ viewport: { width: +vw, height: +vh }, deviceScaleFactor: 2 });
await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
// offset to show §3/§11-ish content if requested via env SCROLL
const scroll = parseInt(process.env.SCROLL || '0', 10);
if (scroll) await page.evaluate((y) => window.scrollTo(0, y), scroll);
await page.waitForTimeout(300);
await page.screenshot({ path: path.resolve(outPath) }); // viewport only → "screen" look
await b.close();
fs.rmSync(tmp, { force: true });
console.log('rendered md →', outPath);
