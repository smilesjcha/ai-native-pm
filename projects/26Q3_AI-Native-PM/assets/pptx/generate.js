#!/usr/bin/env node
// generate.js — KMAC M5 교안 덱 빌드 진입점
// slides-block1.js · slides-block2.js · slides-block3.js (각 module.exports = function(deck) {…})를
// 순서대로 호출해 kmac-m5-ai-pm-productivity-20260919.pptx 를 쓴다. block 파일이 없으면 건너뛰고 경고.
//
//   node generate.js                 # 기본 출력
//   node generate.js --out other.pptx
//   node generate.js --no-kind       # 유형 pill 숨김(배포용)

"use strict";

const path = require("path");
const fs = require("fs");
const { createDeck } = require("./lib");

const args = process.argv.slice(2);
const argVal = (flag, def) => { const i = args.indexOf(flag); return i >= 0 && args[i + 1] ? args[i + 1] : def; };

const OUT = path.resolve(__dirname, argVal("--out", "kmac-m5-ai-pm-productivity-20260919.pptx"));
const BLOCKS = ["slides-block1.js", "slides-block2.js", "slides-block3.js"];

async function main() {
  const deck = createDeck({
    title: "생성형 AI를 활용한 기획자 업무생산성 향상",
    footerText: "생성형 AI를 활용한 기획자 업무생산성 향상  ·  KMAC 기획자 과정 모듈5  ·  2026.09.19",
    author: "차성재",
    showKind: !args.includes("--no-kind"),
  });

  let loaded = 0;
  for (const name of BLOCKS) {
    const file = path.join(__dirname, name);
    if (!fs.existsSync(file)) {
      console.warn(`[skip] ${name} 없음 — 건너뜀`);
      continue;
    }
    const before = deck.count();
    const block = require(file);
    if (typeof block !== "function") {
      console.warn(`[skip] ${name}: module.exports 가 함수가 아님 — 건너뜀`);
      continue;
    }
    await block(deck);
    loaded += 1;
    console.log(`[block] ${name}: ${deck.count() - before}장`);
  }

  if (deck.count() === 0) {
    console.error("슬라이드 0장 — block 파일이 하나도 없습니다. slides-block1~3.js 를 작성하세요.");
    process.exit(1);
  }

  const out = await deck.save(OUT);
  const rep = deck.report();
  console.log(`\n✔ ${path.basename(out)} — 총 ${rep.slides}장 (block ${loaded}/${BLOCKS.length}) · 경고 ${rep.warnings}건 ${rep.warnings ? JSON.stringify(rep.byTag) : ""}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
