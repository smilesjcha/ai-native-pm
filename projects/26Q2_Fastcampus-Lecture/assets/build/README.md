# Lecture Build Pipeline

강의 v03(2026-06-26) 자산을 **재현 가능하게** 생성하는 Node 파이프라인. 시스템 Chrome을 Playwright로 재사용한다 (Chromium 다운로드 없음).

## 설치

```bash
cd projects/26Q2_Fastcampus-Lecture/assets/build
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install playwright
npx playwright install ffmpeg   # 영상 녹화용 (시스템 ffmpeg와 별개)
```

## 스크립트

| 명령 | 동작 | 출력 |
|------|------|------|
| `node gen-png.js` | 디자인 시스템 SVG → PNG (앱 아이콘·로고·OG·아이콘) | `docs/design-system/assets/`, `icons/png/` |
| `node capture-getdesignmd.js` | getdesign.md/apple 캡처 + Download 버튼 하이라이트 | `../references/getdesignmd-*.png` |
| `node shoot.js <html> <out.png> [w] [mode] [h]` | 임의 HTML 전체/뷰포트 스크린샷 | 지정 경로 |
| `node record-demo.js` | 프로토타입 `?demo=1` 자동재생 녹화 → MP4 | `../../workshop/prototype/demo-todays-lunch-mate.mp4` |

## PPT / PDF

```bash
cd ../pptx
node generate.js                       # → ai-native-pm-lecture-v03-20260626.pptx (44 slides)
```

PDF는 macOS PowerPoint AppleScript로 내보낸다 (LibreOffice 불필요):

```bash
osascript -e 'tell application "Microsoft PowerPoint"
  open "…/ai-native-pm-lecture-v03-20260626.pptx"
  save active presentation in (POSIX file "…/….pdf") as save as PDF
  close active presentation saving no
end tell'
```

> `node_modules/`, `.vid/`는 커밋하지 않는다 (.gitignore). 스크립트만 추적한다.
