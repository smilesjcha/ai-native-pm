"""Design system constants — see docs/09-ppt-design-system.md."""

from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor


def hex_color(hex_str: str) -> RGBColor:
    h = hex_str.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


WHITE = hex_color("#FFFFFF")
BLACK = hex_color("#111111")
DEEP_BLUE = hex_color("#123C7C")
BLUE_90 = hex_color("#0D2E61")
BLUE_70 = hex_color("#2A5796")
BLUE_70_LIGHT = hex_color("#8FB0DC")
BLUE_10 = hex_color("#EAF1FB")
GRAY_80 = hex_color("#333333")
GRAY_20 = hex_color("#E5E7EB")
GRAY_5 = hex_color("#F7F8FA")

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)

MARGIN_X = Inches(0.6)
MARGIN_TOP = Inches(0.5)
MARGIN_BOTTOM = Inches(0.5)

CONTENT_LEFT = MARGIN_X
CONTENT_TOP = MARGIN_TOP
CONTENT_WIDTH = SLIDE_W - MARGIN_X - MARGIN_X
CONTENT_HEIGHT = SLIDE_H - MARGIN_TOP - MARGIN_BOTTOM

FONT_PRIMARY = "Apple SD Gothic Neo"
FONT_FALLBACK = "Pretendard"
FONT_CODE = "Menlo"

PT_COVER_TITLE = Pt(46)
PT_COVER_SUB = Pt(22)
PT_COVER_META = Pt(14)
PT_SECTION_NUM = Pt(96)
PT_SECTION_TITLE = Pt(36)
PT_TITLE = Pt(28)
PT_LEAD = Pt(22)
PT_BODY = Pt(17)
PT_BODY_SM = Pt(15)
PT_CAPTION = Pt(12)
PT_CODE = Pt(13)
PT_BADGE = Pt(13)
