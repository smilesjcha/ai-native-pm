// AI Doc Feedback Loop — local-first Express server
// Usage:
//   BASE_DIR=/absolute/path npm start   (default: repo root, 3 levels up)
//   PORT=5174 npm start                 (default: 5174)
//   AI=claude|codex|off  npm start      (default: auto-detect, prefer claude)

const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');

const PORT = parseInt(process.env.PORT || '5174', 10);
const BASE_DIR = path.resolve(
  process.env.BASE_DIR || path.join(__dirname, '..', '..', '..')
);
const DATA_DIR = path.join(__dirname, 'data');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.json');

const CATEGORY_LEVEL = {
  '정책': 'High',
  '컨텍스트': 'High',
  '문제': 'High',
  '해결점': 'Low',
  '기능': 'Low',
  '화면': 'Low',
};
const CATEGORIES = Object.keys(CATEGORY_LEVEL);

fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(COMMENTS_FILE)) fs.writeFileSync(COMMENTS_FILE, '{}');

function loadComments() {
  try { return JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8')); }
  catch { return {}; }
}
function saveComments(data) {
  const tmp = COMMENTS_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, COMMENTS_FILE);
}

function safeAbs(relPath) {
  if (typeof relPath !== 'string' || relPath.includes('\0')) {
    throw new Error('Invalid path');
  }
  const abs = path.resolve(BASE_DIR, relPath);
  if (abs !== BASE_DIR && !abs.startsWith(BASE_DIR + path.sep)) {
    throw new Error('Path escape');
  }
  return abs;
}

function walk(dir) {
  const result = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return result; }
  for (const ent of entries) {
    if (ent.name.startsWith('.')) continue;
    if (ent.name === 'node_modules' || ent.name === 'archive') continue;
    const abs = path.join(dir, ent.name);
    const rel = path.relative(BASE_DIR, abs);
    if (ent.isDirectory()) {
      const children = walk(abs);
      if (children.length > 0) {
        result.push({ name: ent.name, path: rel, type: 'dir', children });
      }
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.md')) {
      result.push({ name: ent.name, path: rel, type: 'file' });
    }
  }
  result.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  return result;
}

function detectAi() {
  const want = (process.env.AI || 'auto').toLowerCase();
  if (want === 'off') return null;
  const which = (cmd) => {
    try {
      const out = require('child_process').execSync(`command -v ${cmd}`, { encoding: 'utf8' });
      return out.trim() || null;
    } catch { return null; }
  };
  if (want === 'claude') return which('claude') ? 'claude' : null;
  if (want === 'codex') return which('codex') ? 'codex' : null;
  return which('claude') ? 'claude' : (which('codex') ? 'codex' : null);
}
const AI_CLI = detectAi();

function pad(n) { return String(n).padStart(2, '0'); }
function stamp(d = new Date()) {
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}

function buildFeedbackMd(originalPath, original, comments) {
  const ts = new Date().toISOString();
  const grouped = {};
  for (const c of comments) {
    (grouped[c.category] = grouped[c.category] || []).push(c);
  }
  let md = `# ${path.basename(originalPath, '.md')} — 원본 + 피드백 이력\n\n`;
  md += `> Status: Feedback Snapshot\n`;
  md += `> Source: \`${originalPath}\`\n`;
  md += `> Snapshot At: ${ts}\n`;
  md += `> Comment Count: ${comments.length}\n\n`;
  md += `---\n\n`;
  md += `## 1. 원본\n\n`;
  md += original.trimEnd() + '\n\n';
  md += `---\n\n`;
  md += `## 2. 피드백 이력\n\n`;
  if (comments.length === 0) {
    md += `> (등록된 피드백 없음)\n`;
    return md;
  }
  for (const cat of CATEGORIES) {
    const arr = grouped[cat];
    if (!arr || arr.length === 0) continue;
    const level = CATEGORY_LEVEL[cat];
    md += `### ${cat} (${level}-Level) — ${arr.length}건\n\n`;
    md += `| 시각 | 작성자 | 대상 | 본문 |\n`;
    md += `|------|--------|------|------|\n`;
    for (const c of arr) {
      const target = c.anchor ? `섹션: \`#${c.anchor}\`` : '문서 전체';
      const body = (c.body || '').replace(/\|/g, '\\|').replace(/\n/g, '<br>');
      md += `| ${c.createdAt} | ${c.author || 'anonymous'} | ${target} | ${body} |\n`;
    }
    md += '\n';
  }
  return md;
}

function buildAiPrompt(originalPath, original, comments) {
  const grouped = {};
  for (const c of comments) {
    (grouped[c.category] = grouped[c.category] || []).push(c);
  }
  let prompt = `당신은 무신사 AI-Native PM 조직의 문서 개선 어시스턴트다.\n`;
  prompt += `아래 원본 MD 문서와 카테고리 태그된 피드백을 기반으로, 마크다운으로 "개선 요약 문서"를 작성한다.\n\n`;
  prompt += `## 출력 형식 (반드시 준수)\n\n`;
  prompt += `# {원본파일명} — AI 개선 요약\n\n`;
  prompt += `> 자동 생성. 모델: ${AI_CLI || 'fallback'} · 시각: {ISO}\n\n`;
  prompt += `## 1. 핵심 정리 (카테고리별 1줄)\n`;
  prompt += `- 정책: ...\n- 컨텍스트: ...\n- 문제: ...\n- 해결점: ...\n- 기능: ...\n- 화면: ...\n\n`;
  prompt += `## 2. 개선안 (카테고리별 3개)\n`;
  prompt += `### 정책 (High-Level Context)\n1. ...\n2. ...\n3. ...\n\n`;
  prompt += `(같은 형식으로 6개 카테고리 모두 작성. 피드백이 없거나 부족한 카테고리는 AI 아이디어 3개를 제시하되 "AI 제안:" 접두를 붙인다.)\n\n`;
  prompt += `## 3. 미반영/보류\n- (있을 경우만 기재. 없으면 "없음")\n\n`;
  prompt += `규칙:\n`;
  prompt += `- 한국어. 기술 용어는 영어 병기 가능.\n`;
  prompt += `- 각 개선안은 1~2문장. 구체적이고 실행 가능해야 한다.\n`;
  prompt += `- "원본 문서를 어떻게 고치면 좋겠는가"에 답하는 톤.\n\n`;
  prompt += `---\n\n# 원본 MD: ${originalPath}\n\n\`\`\`markdown\n${original}\n\`\`\`\n\n`;
  prompt += `# 피드백 (총 ${comments.length}건)\n\n`;
  for (const cat of CATEGORIES) {
    const arr = grouped[cat] || [];
    prompt += `## ${cat} (${CATEGORY_LEVEL[cat]}-Level) — ${arr.length}건\n`;
    if (arr.length === 0) {
      prompt += `- (없음 — AI 아이디어 3개로 채울 것)\n\n`;
      continue;
    }
    for (const c of arr) {
      const target = c.anchor ? `섹션 #${c.anchor}` : '문서 전체';
      prompt += `- [${target}] (${c.author || 'anonymous'}, ${c.createdAt}) ${c.body.replace(/\n/g, ' ')}\n`;
    }
    prompt += '\n';
  }
  prompt += `\n출력은 위 "출력 형식"의 마크다운 본문만 반환한다. 코드펜스나 설명 텍스트를 추가하지 말 것.\n`;
  return prompt;
}

function runAi(prompt, timeoutMs = 90_000) {
  if (!AI_CLI) return Promise.resolve(null);
  const args = AI_CLI === 'claude'
    ? ['-p', prompt]
    : ['exec', prompt]; // codex exec "<prompt>"
  return new Promise((resolve) => {
    const child = spawn(AI_CLI, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '', err = '';
    const t = setTimeout(() => { try { child.kill('SIGTERM'); } catch {} }, timeoutMs);
    child.stdout.on('data', (d) => out += d.toString());
    child.stderr.on('data', (d) => err += d.toString());
    child.on('close', (code) => {
      clearTimeout(t);
      if (code === 0 && out.trim()) resolve(out.trim());
      else resolve(null);
    });
    child.on('error', () => { clearTimeout(t); resolve(null); });
  });
}

function buildImproveFallback(originalPath, original, comments) {
  const ts = new Date().toISOString();
  const grouped = {};
  for (const c of comments) (grouped[c.category] = grouped[c.category] || []).push(c);
  let md = `# ${path.basename(originalPath, '.md')} — AI 개선 요약 (Fallback)\n\n`;
  md += `> 자동 생성. 모델: AI 미연결 (fallback) · 시각: ${ts}\n`;
  md += `> AI CLI(claude/codex)가 없거나 호출 실패. 카테고리별 구조화 정리만 제공. 개선안 3개는 수기 작성 필요.\n\n`;
  md += `## 1. 핵심 정리 (카테고리별 1줄)\n`;
  for (const cat of CATEGORIES) {
    const arr = grouped[cat] || [];
    md += `- ${cat}: ${arr.length === 0 ? '_(피드백 없음)_' : `${arr.length}건 누적 — 본문 §2 참고`}\n`;
  }
  md += `\n## 2. 개선안 (카테고리별 3개)\n`;
  for (const cat of CATEGORIES) {
    const level = CATEGORY_LEVEL[cat];
    const arr = grouped[cat] || [];
    md += `\n### ${cat} (${level}-Level)\n`;
    if (arr.length === 0) {
      md += `1. _(AI 미연결 — 수기 작성 필요)_\n2. _(수기 작성 필요)_\n3. _(수기 작성 필요)_\n`;
    } else {
      arr.slice(0, 3).forEach((c, i) => {
        md += `${i+1}. ${c.body.replace(/\n/g, ' ')} _(원피드백 by ${c.author || 'anonymous'})_\n`;
      });
      for (let i = arr.length; i < 3; i++) md += `${i+1}. _(수기 추가 필요)_\n`;
    }
  }
  md += `\n## 3. 미반영/보류\n없음\n`;
  return md;
}

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/config', (req, res) => {
  res.json({
    baseDir: BASE_DIR,
    user: process.env.USER || os.userInfo().username || 'anonymous',
    aiCli: AI_CLI,
    categories: CATEGORIES,
    categoryLevel: CATEGORY_LEVEL,
  });
});

app.get('/api/tree', (req, res) => {
  res.json({ root: BASE_DIR, items: walk(BASE_DIR) });
});

app.get('/api/file', (req, res) => {
  try {
    const abs = safeAbs(req.query.path || '');
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
      return res.status(404).json({ error: 'not found' });
    }
    res.type('text/plain; charset=utf-8').send(fs.readFileSync(abs, 'utf8'));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/api/comments', (req, res) => {
  const data = loadComments();
  res.json(data[req.query.path] || []);
});

app.post('/api/comments', (req, res) => {
  const { path: filePath, category, body, anchor, author } = req.body || {};
  if (!filePath || !category || !body) return res.status(400).json({ error: 'missing fields' });
  if (!CATEGORY_LEVEL[category]) return res.status(400).json({ error: 'invalid category' });
  try { safeAbs(filePath); } catch (e) { return res.status(400).json({ error: e.message }); }
  const data = loadComments();
  data[filePath] = data[filePath] || [];
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const comment = {
    id,
    category,
    level: CATEGORY_LEVEL[category],
    anchor: anchor || null,
    body: String(body),
    author: author || 'anonymous',
    createdAt: new Date().toISOString(),
  };
  data[filePath].push(comment);
  saveComments(data);
  res.json(comment);
});

app.delete('/api/comments/:id', (req, res) => {
  const filePath = req.query.path;
  const data = loadComments();
  if (!data[filePath]) return res.status(404).json({ error: 'not found' });
  const before = data[filePath].length;
  data[filePath] = data[filePath].filter(c => c.id !== req.params.id);
  if (data[filePath].length === before) return res.status(404).json({ error: 'not found' });
  saveComments(data);
  res.json({ ok: true });
});

app.post('/api/save-feedback', async (req, res) => {
  try {
    const { path: filePath } = req.body || {};
    if (!filePath) return res.status(400).json({ error: 'missing path' });
    const abs = safeAbs(filePath);
    if (!fs.existsSync(abs)) return res.status(404).json({ error: 'file not found' });
    const original = fs.readFileSync(abs, 'utf8');
    const data = loadComments();
    const comments = data[filePath] || [];
    const dir = path.dirname(abs);
    const baseName = path.basename(abs, '.md');
    const s = stamp();

    const feedbackPath = path.join(dir, `${baseName}-feedback-${s}.md`);
    fs.writeFileSync(feedbackPath, buildFeedbackMd(filePath, original, comments));

    let improveMd = null;
    let aiUsed = false;
    if (AI_CLI && comments.length > 0) {
      const prompt = buildAiPrompt(filePath, original, comments);
      const aiOut = await runAi(prompt);
      if (aiOut) { improveMd = aiOut; aiUsed = true; }
    }
    if (!improveMd) improveMd = buildImproveFallback(filePath, original, comments);
    const improvePath = path.join(dir, `${baseName}-improve-${s}.md`);
    fs.writeFileSync(improvePath, improveMd);

    res.json({
      feedbackFile: path.relative(BASE_DIR, feedbackPath),
      improveFile: path.relative(BASE_DIR, improvePath),
      commentCount: comments.length,
      aiUsed,
      aiCli: AI_CLI || null,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n  AI Doc Feedback Loop`);
  console.log(`  ────────────────────`);
  console.log(`  Base dir : ${BASE_DIR}`);
  console.log(`  AI CLI   : ${AI_CLI || '(none — fallback only)'}`);
  console.log(`  URL      : http://localhost:${PORT}\n`);
});
