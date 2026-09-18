// 예시 화면 렌더 — template.html + data.js → ../cap-NN-*.png (1440×900 @1.5x)
// 실행: cd projects/26Q2_Fastcampus-Lecture/assets/build && node <이 파일 경로> [파일명 일부 …]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, '..');
const htmlDir = path.join(here, 'html');
const pw = path.resolve(here, '../../../../26Q2_Fastcampus-Lecture/assets/build/node_modules/playwright/index.mjs');
const { chromium } = await import(pathToFileURL(pw).href);
const { screens } = await import('./data.js');

const filters = process.argv.slice(2);
const list = filters.length ? screens.filter((s) => filters.some((f) => s.file.includes(f))) : screens;
const tpl = fs.readFileSync(path.join(here, 'template.html'), 'utf8');
fs.mkdirSync(htmlDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const failed = [];
for (const s of list) {
  const w = s.w || 1440, h = s.h || 900;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1.5 });
  const page = await ctx.newPage();
  const htmlPath = path.join(htmlDir, s.file.replace(/\.png$/, '.html'));
  fs.writeFileSync(htmlPath, tpl.replace('<!--BODY-->', s.html));
  try {
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    // 넘침 점검: 본문이 보이는 영역보다 길면 경고
    const over = await page.evaluate(() => {
      const m = document.querySelector('.main'); const c = m && m.querySelector('.col');
      const o1 = m && c ? Math.round(c.getBoundingClientRect().bottom - m.getBoundingClientRect().bottom) : 0;
      const o2 = Math.round(document.documentElement.scrollHeight - window.innerHeight);
      const o3 = Math.round(document.documentElement.scrollWidth - window.innerWidth);
      const imgs = [...document.images].filter((i) => !i.naturalWidth).length;
      return { o1, o2, o3, imgs };
    });
    await page.screenshot({ path: path.join(outDir, s.file), type: 'png' });
    const flag = over.o1 > 0 || over.o2 > 0 || over.o3 > 0 || over.imgs ? `  ⚠ overflow main=${over.o1}px page=${over.o2}px x=${over.o3}px brokenImg=${over.imgs}` : '';
    console.log(`ok  ${s.file}${flag}`);
  } catch (e) {
    failed.push(s.file); console.log(`ERR ${s.file} — ${e.message}`);
  }
  await ctx.close();
}
await browser.close();
console.log(`\n${list.length - failed.length}/${list.length} rendered${failed.length ? ' · failed: ' + failed.join(', ') : ''}`);
