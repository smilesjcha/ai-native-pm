"""Build the WORK-LIFE AX workshop deck from slides_data.SLIDES.

Usage: python3 build_pptx/build.py
Output: output/worklife-ax-workshop.pptx
"""

import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from pptx import Presentation

import theme as T
import layouts as L
from slides_data import SLIDES


TYPE_TO_FN = {
    "cover": L.make_cover,
    "navy_divider": L.make_navy_divider,
    "toc": L.make_toc,
    "profile": L.make_profile,
    "closing": L.make_closing,
    "concept": L.make_concept,
    "one_liner": L.make_one_liner,
    "process": L.make_process,
    "document": L.make_document,
    "code_demo": L.make_code_demo,
    "review": L.make_review,
    "wrap_up": L.make_wrap_up,
    "schedule": L.make_schedule,
    "card_grid": L.make_card_grid,
    "comparison": L.make_comparison,
    "tree": L.make_tree,
    "shot": L.make_shot,
}


def build():
    L.TOTAL = len(SLIDES)
    prs = Presentation()
    prs.slide_width = T.SLIDE_W
    prs.slide_height = T.SLIDE_H

    for i, data in enumerate(SLIDES, start=1):
        data["no"] = i  # 슬라이드 번호는 순서 기준 자동 부여 (수동 no는 무시)
        fn = TYPE_TO_FN.get(data.get("type"))
        if fn is None:
            raise ValueError(f"Unknown slide type {data.get('type')!r} "
                             f"(slide {i})")
        fn(prs, data)

    out_dir = os.path.abspath(os.path.join(HERE, "..", "output"))
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "worklife-ax-workshop.pptx")
    prs.save(out_path)
    print(f"Saved: {out_path}")
    print(f"Slides: {len(prs.slides)}")
    return out_path


if __name__ == "__main__":
    build()
