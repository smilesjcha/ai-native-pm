#!/usr/bin/env python3
"""배포용 PPTX 만들기 — 발표자 노트(강사 발화)를 제거한 사본을 생성한다.

사용: python3 strip-notes.py <in.pptx> [<out.pptx>]
  기본 출력: <in>-dist.pptx  (F2 결정: 배포용은 강사 노트 제외)
python-pptx 필요: python3 -m pip install python-pptx
"""
import sys, pathlib
try:
    from pptx import Presentation
except ImportError:
    sys.exit("python-pptx가 없습니다: python3 -m pip install python-pptx")

src = pathlib.Path(sys.argv[1])
dst = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else src.with_name(src.stem + "-dist.pptx")
prs = Presentation(str(src))
n = 0
for slide in prs.slides:
    if slide.has_notes_slide:
        tf = slide.notes_slide.notes_text_frame
        if tf is not None and tf.text.strip():
            tf.clear(); n += 1
prs.save(str(dst))
print(f"notes cleared on {n} slides → {dst}")
