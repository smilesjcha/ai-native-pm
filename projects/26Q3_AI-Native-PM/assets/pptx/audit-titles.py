#!/usr/bin/env python3
"""블록 파일의 제목·부제·카드 제목을 검사한다 — 문장형·수사·과도한 길이·단일 강조 옵션 잔존 여부.
사용: python3 audit-titles.py [--all]"""
import re, sys, pathlib
HERE = pathlib.Path(__file__).resolve().parent
SENT_END = re.compile(r'(다|요|까|자|죠|네|음)[.?!]?$')
BAD_PAT = [(re.compile(r'아니라|아닌,|가 아니다'), '대조 수사'), (re.compile(r'\s[—–]\s'), '— 꼬리'), (re.compile(r"^['\"‘“]"), '인용문'),
           (re.compile(r'금융의 차이|금융에서는|금융권이라'), '금융 전제 수사'), (re.compile(r'\?$'), '의문문')]
KEYS = ('title', 'subtitle', 'label')
total = flagged = 0
for f in ['slides-block1.js', 'slides-block2.js', 'slides-block3.js']:
    src = (HERE / f).read_text(encoding='utf-8')
    acc = len(re.findall(r'\baccentIndex\b|\baccentLast\b|\baccent:\s*true', src))
    cur = '?'
    out = []
    for ln, line in enumerate(src.splitlines(), 1):
        m = re.match(r'\s*//\s*(B\d-\d+)', line)
        if m: cur = m.group(1)
        m = re.match(r'\s*(title|subtitle)\s*:\s*"((?:[^"\\]|\\.)*)"', line)
        if not m: continue
        key, text = m.group(1), m.group(2).replace('\\n', ' ')
        if key != 'title' and '--all' not in sys.argv: continue
        total += 1
        plain = re.sub(r'\[[^\]]*\]|\([^)]*\)', '', text).strip()
        why = []
        if SENT_END.search(plain) and not re.search(r'(체크|메모|개요|요소|단계|종|개|표|도|안|선|법|형|본|화|값|율|수|명|장)$', plain): why.append('문장형 종결')
        for pat, name in BAD_PAT:
            if pat.search(text): why.append(name)
        n = len(re.sub(r'\s', '', plain))
        if key == 'title' and n > 28: why.append(f'{n}자')
        if why:
            flagged += 1; out.append(f"  {cur} L{ln} [{', '.join(why)}] {text[:70]}")
    print(f"== {f}: accent 옵션 {acc}건, 제목 경고 {len(out)}건")
    for o in out[:400]: print(o)
print(f"\nTOTAL titles {total}, flagged {flagged}")
