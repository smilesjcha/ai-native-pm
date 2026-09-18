#!/usr/bin/env bash
# 한 번에: 강사용·배포용 빌드 → 노트 제거 → PowerPoint PDF 저장(2종) → 렌더 샘플
set -euo pipefail
cd "$(dirname "$0")"
BASE=kmac-m5-ai-pm-productivity-20260919
node generate.js 2>&1 | grep -v '^\[missing-image\]\|^\[small-font\]' | tail -5
node generate.js --no-kind --out ${BASE}-dist.pptx 2>&1 | tail -1
python3 strip-notes.py ${BASE}-dist.pptx ${BASE}-dist.pptx
./export-pdf.sh ${BASE}.pptx
./export-pdf.sh ${BASE}-dist.pptx
mkdir -p /tmp/kmac-m5-final
pdftoppm -png -r 50 ${BASE}.pdf /tmp/kmac-m5-final/p
echo "rendered: $(ls /tmp/kmac-m5-final | wc -l) pages → /tmp/kmac-m5-final"
