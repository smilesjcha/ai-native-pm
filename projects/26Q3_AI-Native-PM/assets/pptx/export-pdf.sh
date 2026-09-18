#!/usr/bin/env bash
# PowerPoint(AppleScript)로 PPTX → PDF 내보내기 (나눔고딕 4종 임베드 — soffice는 굵기 대체가 일어나 QA 프록시로만 사용)
# 사용: ./export-pdf.sh <in.pptx> [<out.pdf>]
set -euo pipefail
IN="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
OUT="${2:-${IN%.pptx}.pdf}"
case "$OUT" in /*) ;; *) OUT="$(pwd)/$OUT";; esac
rm -f "$OUT"
osascript <<APPLESCRIPT
tell application "Microsoft PowerPoint"
  activate
  open POSIX file "$IN"
  delay 3
  save active presentation in (POSIX file "$OUT") as save as PDF
  close active presentation saving no
end tell
APPLESCRIPT
sleep 2
if [ -f "$OUT" ]; then
  echo "PDF → $OUT ($(pdfinfo "$OUT" | awk '/^Pages/{print $2}') pages)"
  pdffonts "$OUT" | awk 'NR>2{print $1}' | sed 's/^[A-Z]*+//' | sort -u | tr '\n' ' '; echo
else
  echo "export failed" >&2; exit 1
fi
