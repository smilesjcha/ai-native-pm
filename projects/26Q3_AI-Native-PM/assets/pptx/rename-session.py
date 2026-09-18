#!/usr/bin/env python3
"""화면 표현 '블록/오후 1부·2부' → 'Session 1·2·3' 일괄 교체(코드 블록·결론부터 블록·토큰 블록 등 다른 뜻은 유지)."""
import re, sys, pathlib
RULES = [
 (r'오후 2부 마지막 블록', 'Session 3 마지막'), (r'오후 마지막 블록', 'Session 3'), (r'오전 환각 방지 블록', 'Session 1 환각 방지 파트'),
 (r'리서치 블록', '리서치 파트'), (r'블록별', 'Session별'), (r'100분 블록', '100분 Session'), (r'각 블록', '각 Session'), (r'세 블록', '세 Session'),
 (r'"블록"', '"Session"'), (r'블록\s*([123])', r'Session \1'),
 (r'오후 1부', 'Session 2'), (r'오후 2부', 'Session 3'),
]
for f in sys.argv[1:]:
    p = pathlib.Path(f); s = p.read_text(encoding='utf-8'); n = 0
    out = []
    for line in s.splitlines(keepends=True):
        if re.match(r'\s*//', line) and 'B' in line[:12]:   # 장표 ID 주석은 유지
            out.append(line); continue
        new = line
        for pat, rep in RULES:
            new, k = re.subn(pat, rep, new); n += k
        out.append(new)
    p.write_text(''.join(out), encoding='utf-8'); print(f"{f}: {n} replacements")
