// QA용 콘택트 시트 — 전체 PNG를 한 장으로 (scratch 출력)
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url)); const dir = path.resolve(here, '..');
const pw = path.resolve(here, '../../../../26Q2_Fastcampus-Lecture/assets/build/node_modules/playwright/index.mjs');
const { chromium } = await import(pathToFileURL(pw).href);
const files = fs.readdirSync(dir).filter((f) => /^cap-.*\.png$/.test(f)).sort();
const out = process.argv[2]; const from = +process.argv[3] || 0; const to = +process.argv[4] || files.length;
const html = `<body style="margin:0;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:8px;background:#888;font:12px sans-serif">${files.slice(from, to).map((f) => `<div style="background:#fff"><img src="../../${f}" style="width:100%;display:block"><div>${f}</div></div>`).join('')}</body>`;
const hp = path.join(here, 'html', '_sheet.html'); fs.writeFileSync(hp, html);
const b = await chromium.launch({ channel: 'chrome', headless: true }); const p = await b.newPage({ viewport: { width: 1800, height: 1000 } });
await p.goto(pathToFileURL(hp).href, { waitUntil: 'load' }); await p.screenshot({ path: out, fullPage: true }); await b.close(); fs.unlinkSync(hp);
