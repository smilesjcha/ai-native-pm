#!/usr/bin/env python3
"""lab MD 파일의 코드 블록을 붙여넣기 전용 .txt로 추출한다 (MD가 원본, .txt는 사본).

사용: python3 generate-prompts-txt.py [--force]
  - 기존 lab-1 .txt 3개는 수동 제작본이므로 --force 없이는 덮어쓰지 않는다.
매핑은 (MD 파일, 헤딩에 포함된 문구, 그 헤딩 다음 n번째 코드 블록) 으로 정의한다.
"""
import re, sys, pathlib
HERE = pathlib.Path(__file__).resolve().parent
WS = HERE.parent
FORCE = '--force' in sys.argv
HEADER = "※ 교육용 가상 자료 — 실제 기업·상품·조항과 무관. 이 파일은 {src}의 코드 블록과 동일 내용(MD가 원본). 아래 줄부터 끝까지 전체 복사해 새 대화에 붙여넣기.\n\n"

MAP = [
  # (out name, md file, heading substring, nth code block after heading (1-based))
  ("lab-1-a-moneyfit-draft.txt", "lab-1-prompt-design.md", "1.3 예시 완성본", 1),
  ("lab-1-review-prompt.txt",    "lab-1-prompt-design.md", "2.2 검수 프롬프트", 1),
  ("lab-1-rerequest-10.txt",     "lab-1-prompt-design.md", "1.5 재요청 문장 10선", 1),
  ("lab-2-00-moneyfit-5-inputs.txt", "lab-2-prd-draft.md", "0-1. 머니핏 완성 예시", 1),
  ("lab-2-01-benchmark.txt",         "lab-2-prd-draft.md", "Step 1 입력 — 아래 전체를 복사", 1),
  ("lab-2-02-research-brief.txt",    "lab-2-prd-draft.md", "참고 — 리서치 브리프 프롬프트", 1),
  ("lab-2-03-prd-draft.txt",         "lab-2-prd-draft.md", "Step 2 초안 (13:30–13:40)", 1),
  ("lab-2-04-three-lens-review.txt", "lab-2-prd-draft.md", "Step 3 리뷰 (13:40–13:50)", 1),
  ("lab-2-05-2pager.txt",            "lab-2-prd-draft.md", "Step 4 요약 (13:50–14:00)", 1),
  ("lab-3-01a-analysis-A-file-upload.txt", "lab-3-automation-workflow.md", "A-1. 따라하기 3단계", 1),
  ("lab-3-01b-analysis-B-table-inline.txt","lab-3-automation-workflow.md", "A-1. 따라하기 3단계", 2),
  ("lab-3-02-meeting-minutes.txt",   "lab-3-automation-workflow.md", "B-1. Step 1 입력 — 회의록 프롬프트", 1),
  ("lab-3-03-minutes-fix-1line.txt", "lab-3-automation-workflow.md", "B-2. Step 2 결과 확인", 1),
  ("lab-3-04-email.txt",             "lab-3-automation-workflow.md", "B-3. Step 3 한 번 수정 = 이메일", 1),
  ("lab-3-05-2pager-source-moneyfit.txt", "lab-3-automation-workflow.md", "C-0.", 1),
  ("lab-3-06-slide-outline-8.txt",   "lab-3-automation-workflow.md", "C-1. 미니 실습 3단계", 1),
]

def blocks_after(lines, heading_sub):
    start = next((i for i,l in enumerate(lines) if l.startswith('#') and heading_sub in l), None)
    if start is None: raise SystemExit(f"heading not found: {heading_sub}")
    # 다음 헤딩까지 — 단, 코드 블록 안의 '#' 줄은 헤딩으로 보지 않는다
    end, fence = len(lines), False
    for i in range(start+1, len(lines)):
        if lines[i].startswith('```'): fence = not fence; continue
        if not fence and lines[i].startswith('#'): end = i; break
    out, cur, inb = [], [], False
    for l in lines[start:end]:
        if l.startswith('```'):
            if inb: out.append('\n'.join(cur)); cur=[]; inb=False
            else: inb=True
            continue
        if inb: cur.append(l)
    return out

for out, md, hsub, n in MAP:
    src = WS / md
    lines = src.read_text(encoding='utf-8').splitlines()
    bl = blocks_after(lines, hsub)
    if len(bl) < n: raise SystemExit(f"{md} / {hsub}: only {len(bl)} blocks, need {n}")
    dst = HERE / out
    if dst.exists() and not FORCE and out.startswith('lab-1-'):
        print(f"skip (exists, manual): {out}"); continue
    dst.write_text(HEADER.format(src=md) + bl[n-1].rstrip() + "\n", encoding='utf-8')
    first = bl[n-1].strip().splitlines()[0][:70] if bl[n-1].strip() else ''
    print(f"wrote {out:42s} <- {md} [{hsub[:28]}] #{n} :: {first}")
