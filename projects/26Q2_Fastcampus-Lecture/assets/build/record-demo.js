// Record the prototype auto-demo to a seamless MP4 (via Playwright video → ffmpeg).
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO = path.resolve(__dirname, '../../workshop/prototype/index.html');
const OUTDIR = path.resolve(__dirname, '../../workshop/prototype');
const TMP = path.resolve(__dirname, '.vid');
fs.mkdirSync(TMP, { recursive: true });

const SIZE = { width: 480, height: 920 };

const b = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await b.newContext({
  viewport: SIZE,
  deviceScaleFactor: 2,
  recordVideo: { dir: TMP, size: SIZE },
});
const page = await ctx.newPage();
await page.goto(pathToFileURL(PROTO).href + '?demo=1', { waitUntil: 'networkidle' });

// wait for the demo director to finish (sets window.__DEMO_DONE__)
try {
  await page.waitForFunction('window.__DEMO_DONE__ === true', { timeout: 40000 });
} catch { console.log('  (demo timeout — capturing what played)'); }
await page.waitForTimeout(500);

const video = page.video();
await ctx.close();   // finalizes the webm
await b.close();

const webm = await video.path();
console.log('webm:', path.relative(OUTDIR, webm));

const mp4 = path.join(OUTDIR, 'demo-todays-lunch-mate.mp4');
// Convert to widely-compatible H.264 mp4; pad to even dims; 30fps.
execFileSync('ffmpeg', [
  '-y', '-i', webm,
  '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-r', '30', '-movflags', '+faststart',
  mp4,
], { stdio: 'inherit' });

// also a poster frame
const poster = path.join(OUTDIR, 'demo-poster.png');
execFileSync('ffmpeg', ['-y', '-i', mp4, '-vf', 'select=eq(n\\,30)', '-vframes', '1', poster], { stdio: 'ignore' });

const kb = (fs.statSync(mp4).size/1024).toFixed(0);
console.log(`\nMP4 → ${path.relative(process.cwd(), mp4)} (${kb} KB)`);
fs.rmSync(TMP, { recursive: true, force: true });
