// AI Doc Feedback Loop — frontend
(function () {
  'use strict';

  const state = {
    config: null,
    tree: [],
    currentFile: null,         // relative path string
    currentMd: '',
    headings: [],              // [{anchor, text, level}]
    comments: [],              // comments of current file
    selectedCategory: null,
    selectedAnchor: '',
    filterCategory: '',
    filterLevel: '',
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function toast(msg, ms = 2500) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add('hidden'), ms);
  }

  async function api(path, opts = {}) {
    const res = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      ...opts,
    });
    if (!res.ok) {
      let err;
      try { err = (await res.json()).error; } catch { err = res.statusText; }
      throw new Error(err);
    }
    const ct = res.headers.get('Content-Type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
  }

  // ─────────────────────────────────────────────
  // Init
  // ─────────────────────────────────────────────
  async function init() {
    state.config = await api('/api/config');
    document.getElementById('base-dir').textContent = state.config.baseDir;
    const aiBadge = document.getElementById('ai-badge');
    if (state.config.aiCli) {
      aiBadge.textContent = `AI: ${state.config.aiCli}`;
    } else {
      aiBadge.textContent = 'AI: off';
      aiBadge.classList.add('off');
    }
    document.getElementById('comment-author').value =
      localStorage.getItem('feedback.author') || state.config.user || '';

    renderCategoryFilter();
    renderCategoryRadio();
    bindEvents();
    await loadTree();
  }

  // ─────────────────────────────────────────────
  // File tree
  // ─────────────────────────────────────────────
  async function loadTree() {
    const data = await api('/api/tree');
    state.tree = data.items;
    renderTree();
  }

  function renderTree() {
    const root = document.getElementById('file-tree');
    root.innerHTML = '';
    root.appendChild(buildTreeUl(state.tree));
  }

  function buildTreeUl(items) {
    const ul = document.createElement('ul');
    for (const item of items) {
      const li = document.createElement('li');
      const div = document.createElement('div');
      div.className = 'tree-item ' + item.type;
      if (state.currentFile === item.path) div.classList.add('active');
      div.dataset.path = item.path;
      const icon = item.type === 'dir' ? '📁' : '📄';
      div.innerHTML = `<span class="icon">${icon}</span>${item.name}`;
      li.appendChild(div);
      if (item.type === 'file') {
        div.onclick = () => openFile(item.path);
      } else if (item.children && item.children.length) {
        const childUl = buildTreeUl(item.children);
        li.appendChild(childUl);
      }
      ul.appendChild(li);
    }
    return ul;
  }

  // ─────────────────────────────────────────────
  // Open file & render markdown
  // ─────────────────────────────────────────────
  async function openFile(relPath) {
    state.currentFile = relPath;
    document.getElementById('current-file').textContent = relPath;
    document.getElementById('btn-save-feedback').disabled = false;

    state.currentMd = await api('/api/file?path=' + encodeURIComponent(relPath));
    renderMarkdown();
    await loadComments();
    renderTree();
    updateAnchorSelect();
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s.,!?\/\\:;\(\)\[\]{}"'`~@#$%^&*=+<>|]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function renderMarkdown() {
    state.headings = [];
    marked.use({
      renderer: {
        heading(text, level) {
          // text can be raw token or string depending on marked version
          const plain = typeof text === 'string' ? text : (text.raw || text.text || '');
          const stripTags = (s) => s.replace(/<[^>]*>/g, '');
          const clean = stripTags(plain);
          const anchor = slugify(clean) || `h-${state.headings.length}`;
          state.headings.push({ anchor, text: clean, level });
          return `<h${level} id="${anchor}">${plain}<a class="anchor-mark" data-anchor="${anchor}" title="이 섹션에 코멘트">💬</a></h${level}>`;
        },
      },
    });
    const html = marked.parse(state.currentMd, { gfm: true, breaks: false });
    const safe = DOMPurify.sanitize(html, {
      ADD_ATTR: ['target', 'id', 'data-anchor', 'open'],
    });
    const target = document.getElementById('doc-render');
    target.innerHTML = safe;

    target.querySelectorAll('.anchor-mark').forEach(a => {
      a.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const anchor = a.dataset.anchor;
        switchTab('new');
        document.getElementById('comment-anchor').value = anchor;
        document.getElementById('comment-body').focus();
        toast(`'${anchor}' 섹션에 코멘트 추가 모드`);
      };
    });
  }

  function updateAnchorSelect() {
    const sel = document.getElementById('comment-anchor');
    const current = sel.value;
    sel.innerHTML = '<option value="">문서 전체</option>';
    for (const h of state.headings) {
      const opt = document.createElement('option');
      opt.value = h.anchor;
      opt.textContent = `${'  '.repeat(Math.max(0, h.level - 1))}H${h.level} ${h.text}`;
      sel.appendChild(opt);
    }
    sel.value = current || '';
  }

  // ─────────────────────────────────────────────
  // Comments
  // ─────────────────────────────────────────────
  async function loadComments() {
    state.comments = await api('/api/comments?path=' + encodeURIComponent(state.currentFile));
    renderCommentList();
    renderCommentBadges();
    document.getElementById('comment-count-pill').textContent = `코멘트 ${state.comments.length}`;
  }

  function renderCommentList() {
    const list = document.getElementById('comment-list');
    list.innerHTML = '';
    const filtered = state.comments.filter(c => {
      if (state.filterCategory && c.category !== state.filterCategory) return false;
      if (state.filterLevel && c.level !== state.filterLevel) return false;
      return true;
    });
    if (filtered.length === 0) {
      list.innerHTML = '<div class="empty muted">등록된 피드백이 없습니다.</div>';
      return;
    }
    for (const c of filtered.slice().reverse()) {
      const el = document.createElement('div');
      el.className = `comment cat-border-${c.category}`;
      const anchorLabel = c.anchor ? `#${c.anchor}` : '문서 전체';
      el.innerHTML = `
        <div class="comment-meta">
          <div>
            <span class="cat-tag cat-${c.category}">${c.category}</span>
            <span style="margin-left:6px;">${c.level}</span>
          </div>
          <div>
            <span>${c.author || 'anonymous'}</span>
            · <span>${formatDate(c.createdAt)}</span>
            · <button class="comment-delete" data-id="${c.id}">삭제</button>
          </div>
        </div>
        <div class="comment-body"></div>
        ${c.anchor ? `<a class="comment-anchor" data-anchor="${c.anchor}">→ ${anchorLabel}</a>` : ''}
      `;
      el.querySelector('.comment-body').textContent = c.body;
      el.querySelector('.comment-delete').onclick = () => deleteComment(c.id);
      const anchorEl = el.querySelector('.comment-anchor');
      if (anchorEl) {
        anchorEl.onclick = () => {
          const target = document.getElementById(c.anchor);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
      }
      list.appendChild(el);
    }
  }

  function renderCommentBadges() {
    const counts = {};
    for (const c of state.comments) {
      if (c.anchor) counts[c.anchor] = (counts[c.anchor] || 0) + 1;
    }
    document.querySelectorAll('.markdown-body [id]').forEach(el => {
      const cnt = counts[el.id];
      if (cnt) {
        el.classList.add('has-comments');
        el.setAttribute('data-comment-count', `💬 ${cnt}`);
      } else {
        el.classList.remove('has-comments');
        el.removeAttribute('data-comment-count');
      }
    });
  }

  async function deleteComment(id) {
    if (!confirm('이 코멘트를 삭제할까요?')) return;
    await api(`/api/comments/${id}?path=${encodeURIComponent(state.currentFile)}`, { method: 'DELETE' });
    await loadComments();
    toast('삭제되었습니다');
  }

  async function submitComment(e) {
    e.preventDefault();
    if (!state.currentFile) return toast('파일을 먼저 선택하세요');
    if (!state.selectedCategory) return toast('카테고리를 선택하세요');
    const body = document.getElementById('comment-body').value.trim();
    if (!body) return toast('본문을 입력하세요');
    const author = document.getElementById('comment-author').value.trim() || 'anonymous';
    localStorage.setItem('feedback.author', author);
    const anchor = document.getElementById('comment-anchor').value || null;

    await api('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        path: state.currentFile,
        category: state.selectedCategory,
        anchor, body, author,
      }),
    });
    document.getElementById('comment-body').value = '';
    await loadComments();
    switchTab('list');
    toast('코멘트가 추가되었습니다');
  }

  // ─────────────────────────────────────────────
  // Category UI
  // ─────────────────────────────────────────────
  function renderCategoryRadio() {
    const wrap = document.getElementById('category-radio');
    wrap.innerHTML = '';
    for (const cat of state.config.categories) {
      const lvl = state.config.categoryLevel[cat];
      const label = document.createElement('label');
      label.dataset.cat = cat;
      label.dataset.level = lvl;
      label.innerHTML = `
        <input type="radio" name="category" value="${cat}" />
        <span class="dot cat-${cat}"></span>
        <span>${cat}</span>
      `;
      label.querySelector('input').onchange = () => selectCategory(cat);
      label.style.borderColor = getCategoryColor(cat);
      wrap.appendChild(label);
    }
  }
  function selectCategory(cat) {
    state.selectedCategory = cat;
    const lvl = state.config.categoryLevel[cat];
    document.getElementById('level-display').textContent = `${cat} → ${lvl}-Level`;
    document.querySelectorAll('#category-radio label').forEach(l => {
      l.classList.toggle('selected', l.dataset.cat === cat);
    });
    document.getElementById('btn-submit-comment').disabled = false;
  }
  function getCategoryColor(cat) {
    const map = {
      '정책': '#8b5cf6', '컨텍스트': '#3b82f6', '문제': '#ef4444',
      '해결점': '#10b981', '기능': '#f97316', '화면': '#06b6d4',
    };
    return map[cat] || '#888';
  }

  function renderCategoryFilter() {
    const sel = document.getElementById('filter-category');
    for (const cat of state.config.categories) {
      const opt = document.createElement('option');
      opt.value = cat; opt.textContent = cat;
      sel.appendChild(opt);
    }
  }

  // ─────────────────────────────────────────────
  // Tabs
  // ─────────────────────────────────────────────
  function switchTab(name) {
    $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    $$('.tab-content').forEach(t => t.classList.toggle('active', t.id === `tab-${name}`));
  }

  // ─────────────────────────────────────────────
  // Save feedback
  // ─────────────────────────────────────────────
  async function saveFeedback() {
    if (!state.currentFile) return toast('파일을 선택하세요');
    const confirmMsg = state.comments.length === 0
      ? '코멘트가 없습니다. 그래도 두 종류 MD를 생성할까요?'
      : `코멘트 ${state.comments.length}건을 freeze하여 두 종류 MD를 생성합니다. 계속할까요?`;
    if (!confirm(confirmMsg)) return;

    const btn = document.getElementById('btn-save-feedback');
    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = '저장 중...';
    if (state.comments.length > 0 && state.config.aiCli) {
      btn.textContent = `AI(${state.config.aiCli}) 호출 중... (최대 90s)`;
    }

    try {
      const result = await api('/api/save-feedback', {
        method: 'POST',
        body: JSON.stringify({ path: state.currentFile }),
      });
      showSaveResult(result);
      // Tree might now contain new files
      await loadTree();
    } catch (e) {
      toast('저장 실패: ' + e.message, 4000);
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  }

  function showSaveResult(r) {
    const body = document.getElementById('save-result-body');
    const aiLine = r.aiUsed
      ? `<p>✅ <strong>${r.aiCli}</strong> CLI를 통해 개선안 자동 생성</p>`
      : (r.aiCli
          ? `<p>⚠️ ${r.aiCli} 호출 실패 또는 코멘트 0건 — Fallback 구조화 정리만 생성</p>`
          : `<p>⚠️ AI CLI 미연결 — Fallback 구조화 정리만 생성</p>`);
    body.innerHTML = `
      <p>총 <strong>${r.commentCount}</strong>건의 피드백을 freeze했습니다.</p>
      ${aiLine}
      <div class="file-row">
        <strong>원본 + 피드백 이력 MD</strong>
        <code>${r.feedbackFile}</code>
      </div>
      <div class="file-row improve">
        <strong>AI 개선 요약 MD</strong>
        <code>${r.improveFile}</code>
      </div>
      <p class="muted" style="margin-top:14px;">
        두 파일은 원본과 같은 디렉토리에 저장되었습니다. Claude Desktop / Codex Desktop에서 이 두 파일을 드래그하여 다음 리비전 컨텍스트로 사용하세요.
      </p>
    `;
    document.getElementById('save-result').showModal();
  }

  // ─────────────────────────────────────────────
  // Misc
  // ─────────────────────────────────────────────
  function formatDate(iso) {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getMonth()+1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function bindEvents() {
    document.getElementById('btn-refresh-tree').onclick = loadTree;
    document.getElementById('btn-save-feedback').onclick = saveFeedback;
    document.getElementById('comment-form').onsubmit = submitComment;
    document.getElementById('filter-category').onchange = (e) => {
      state.filterCategory = e.target.value; renderCommentList();
    };
    document.getElementById('filter-level').onchange = (e) => {
      state.filterLevel = e.target.value; renderCommentList();
    };
    document.getElementById('filter-high').onchange = (e) => {
      document.body.classList.toggle('highlight-high', e.target.checked);
    };
    document.body.classList.toggle('highlight-high',
      document.getElementById('filter-high').checked);
    $$('.tab').forEach(t => t.onclick = () => switchTab(t.dataset.tab));
    document.getElementById('btn-close-result').onclick =
      () => document.getElementById('save-result').close();
  }

  init().catch(err => {
    document.body.innerHTML = `<pre style="padding:20px;color:#cf222e">초기화 실패: ${err.message}</pre>`;
  });
})();
