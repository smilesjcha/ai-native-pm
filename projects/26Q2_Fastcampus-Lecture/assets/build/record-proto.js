// Generic prototype demo recorder → MP4 (Playwright video → ffmpeg).
// usage: node record-proto.js <proto-index.html> <out.mp4>
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [,, protoArg, outArg] = process.argv;
const PROTO = path.resolve(protoArg);
const OUT = path.resolve(outArg);
const TMP = path.join(__dirname, '.vid2');
fs.mkdirSync(TMP, { recursive: true });
const SIZE = { width: 480, height: 920 };

const b = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await b.newContext({ viewport: SIZE, deviceScaleFactor: 2, recordVideo: { dir: TMP, size: SIZE } });
const page = await ctx.newPage();
await page.goto(pathToFileURL(PROTO).href + '?demo=1', { waitUntil: 'networkidle' });
try { await page.waitForFunction('window.__DEMO_DONE__ === true', { timeout: 40000 }); }
catch { console.log('  (demo timeout — capturing what played)'); }
await page.waitForTimeout(500);
const video = page.video();
await ctx.close();
await b.close();

const webm = await video.path();
execFileSync('ffmpeg', ['-y', '-i', webm,
  '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-r', '30', '-movflags', '+faststart', OUT,
], { stdio: 'inherit' });
const poster = OUT.replace(/\.mp4$/, '-poster.png');
execFileSync('ffmpeg', ['-y', '-i', OUT, '-vf', 'select=eq(n\\,30)', '-vframes', '1', poster], { stdio: 'ignore' });
console.log(`\nMP4 → ${path.relative(process.cwd(), OUT)} (${(fs.statSync(OUT).size/1024).toFixed(0)} KB)`);
fs.rmSync(TMP, { recursive: true, force: true });
