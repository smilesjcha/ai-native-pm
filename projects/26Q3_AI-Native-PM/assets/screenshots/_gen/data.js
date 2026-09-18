// 예시 화면 데이터 — 교육용 가상 사례(머니핏/핀트리)
// 수치·문장 원본: workshop/lab-1~3, workshop/sample-data/README.md, moneyfit-kickoff-meeting-notes.md
// 특정 제품 UI를 흉내 내지 않는 중립 'AI 채팅' 화면. 실캡처가 생기면 같은 파일명으로 교체한다.

const WM = '예시 화면 · 교육용 가상 사례(머니핏/핀트리)';
const BUILDER = '../../../builder/'; // _gen/html/ 기준 상대 경로

const bd = (n, cls = '') => `<span class="bd ${cls}">${n}</span>`;
const hl = (n, html, cls = '') => `<div class="hl ${cls}">${bd(n)}${html}</div>`;

function tbl(heads, rows, o = {}) {
  const hc = o.hcol ?? -1;
  const al = o.align || [];
  const w = o.widths || [];
  const th = heads.map((h, i) => `<th class="${i === hc ? 'hc' : ''} ${al[i] || ''}"${w[i] ? ` style="width:${w[i]}"` : ''}>${i === hc && o.hbadge ? bd(o.hbadge, 'in') : ''}${h}</th>`).join('');
  const tr = rows.map((r, ri) => `<tr class="${(o.hrows || []).includes(ri) ? 'hrow' : ''}">${r.map((c, i) => {
    const cell = typeof c === 'object' ? c : { v: c };
    return `<td class="${i === hc ? 'hc' : ''} ${al[i] || ''} ${cell.cls || ''}">${cell.v}</td>`;
  }).join('')}</tr>`).join('');
  return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}

function chat({ user, body, input, inputHtml, inputOn, wide, newOn, sub, noAi }) {
  const col = wide ? 'col wide' : 'col';
  return `<div class="app">
  <div class="top"><div class="tl"><span class="dot"></span>AI 채팅${sub ? `<span class="sub">${sub}</span>` : ''}</div><div><span class="nb ${newOn ? 'on' : ''}">${newOn ? bd(newOn, 'in') : ''}＋ 새 대화</span></div></div>
  <div class="main"><div class="${col}">
    ${user ? `<div class="user">${user}</div>` : ''}
    ${noAi ? body : `<div class="ai"><div class="av">AI</div><div class="ans">${body}</div></div>`}
  </div></div>
  <div class="bot"><div class="${col}"><div class="inp ${inputOn ? 'on' : ''}">${inputHtml || `<span class="ph">${input || '메시지를 입력하세요'}</span>`}<span class="send">↑</span></div><div class="wm">${WM}</div></div></div>
</div>`;
}

const MORE = '\n<span class="more">… (전문은 실습 가이드)</span>';

// ── 설정 경로 카드 (실제 제품 메뉴는 그리지 않는다) ─────────────────────────
function pathCard(tool, s1, s2, s3, d1, d2, d3) {
  return `<div class="pc">
  <div class="kick">설정 경로 카드 · 데이터 학습 옵트아웃</div>
  <div class="tool">${tool}</div>
  <div class="path">
    <div class="st"><div class="no">1</div><div class="t">${s1}</div><div class="d">${d1}</div></div>
    <div class="ar">→</div>
    <div class="st"><div class="no">2</div><div class="t">${s2}</div><div class="d">${d2}</div></div>
    <div class="ar">→</div>
    <div class="st on"><div class="no">3</div><div class="t">${s3}</div><div class="d">${d3}</div><div class="tog"><b></b>끔</div></div>
  </div>
  <div class="notes">
    <div><span class="tg">[강의 전 확인]</span> 메뉴 명칭·위치는 2026-09 기준 강사 확인</div>
    <div class="strong">옵트아웃을 켜도 실데이터는 넣지 않는다</div>
  </div>
  <div class="wm abs">${WM}</div>
</div>`;
}

// ── 덱 썸네일 ────────────────────────────────────────────────────────────
const V = {
  cover: `<div class="bodyv"><div class="ln" style="width:55%"></div><div class="ln" style="width:35%"></div></div>`,
  ask: `<div class="bodyv"><div class="cards3"><div></div><div></div></div></div>`,
  text: `<div class="bodyv"><div class="ln"></div><div class="ln" style="width:85%"></div><div class="ln" style="width:70%"></div></div>`,
  chart: `<div class="bodyv"><div class="bars"><div class="bar" style="width:100%"></div><div class="bar" style="width:77%"></div><div class="bar on" style="width:56%"></div><div class="bar" style="width:40%"></div><div class="bar" style="width:30%"></div></div><div class="mini-t">연동 385명 중 <b>106명 이탈</b></div></div>`,
  flow: `<div class="bodyv"><div class="cards3"><div></div><div></div><div></div><div></div></div><div class="cards3"><div></div><div></div></div></div>`,
  screens: `<div class="bodyv"><div class="cards3"><div></div><div></div><div></div></div></div>`,
  metric: `<div class="bodyv"><div class="rowt"><span></span><span></span><span></span><span></span></div><div class="rowt"><span></span><span></span><span></span><span></span></div><div class="mini-t">72.5% → 80% <b>[가정]</b></div></div>`,
  reg: `<div class="bodyv"><div class="rowt"><span></span><span></span><span></span></div><div class="rowt"><span></span><span></span><span></span></div><div class="mini-t"><b>컴플라이언스 확인 필요</b></div></div>`,
  gantt: `<div class="bodyv"><div class="bars"><div class="bar" style="width:45%"></div><div class="bar" style="width:45%;margin-left:45%"></div></div><div class="mini-t">10/16 내부 데모 <b>[가정]</b></div></div>`,
};
const DECK = [
  ['머니핏 v1.1은 첫 저축까지 가는 길을 줄인다', 'cover'],
  ['목표 설정 2단계 축소와 넛지 알림 착수를 요청한다', 'ask'],
  ['2030 직장인은 목표를 세워도 3개월 안에 떠난다 [가정]', 'text'],
  ['연동 사용자 385명 중 106명이 목표 설정 전에 이탈한다', 'chart'],
  ['목표 설정을 4단계에서 2단계로 줄이고 추천 카드를 준다', 'flow'],
  ['온보딩에서 추천 목표 3개를 고르면 설정이 끝난다', 'screens'],
  ['목표 설정율을 72.5%에서 80%로 올린다 [가정]', 'metric'],
  ['규제 4개 영역은 모두 컴플라이언스 확인이 필요하다', 'reg'],
  ['2주 스프린트 2개로 10/16 내부 데모까지 간다 [가정]', 'gantt'],
  ['v1.1 범위 승인과 알림 상한 정책 결정을 요청한다', 'ask'],
];
const slide = (i, on) => `<div class="sl ${on ? 'on' : ''}">${on ? bd(on) : ''}<div class="ti">${DECK[i][0]}</div>${V[DECK[i][1]]}<div class="num">${i + 1}</div></div>`;

// ── 공통 조각 ────────────────────────────────────────────────────────────
const FIRST5 = `<ol class="s19" style="list-style:none;padding-left:0">
<li><b>① 제안</b> — 소비 파악 → 목표 설정 → 첫 저축을 한 흐름으로 잇는 머니핏 P0 범위를 착수합니다.</li>
<li><b>② 문제</b> — 계좌를 연동한 사용자 4명 중 1명이 저축 목표 설정 전에 이탈합니다 [가정].</li>
<li><b>③ 지표</b> — 첫 저축 목표 설정율 72.5% → 80% · 첫 저축 실행율 71.0% → 78% [가정]</li>
<li><b>④ 요청하는 결정</b> — P0 범위 착수 승인과 컴플라이언스 사전 검토 착수</li>
<li><b>⑤ 기한·다음 단계</b> — 2026-10-02 [가정]까지 결정 → 승인 시 출시 후 8주에 지표 확인 [가정]</li>
</ol>`;
const WEAK3_ROWS = [
  ['1', '"왜 지금인가" 근거 없음', '투자 우선순위를 판단할 수 없다', '1번 결론부터에 "왜 지금인가" 1문장을 [가정]으로 추가해 주세요.'],
  ['2', '투입 인력·비용 추정 없음', '범위·일정이 현실적인지 볼 수 없다', '8번 일정 표에 역할별 인력·기간을 [가정]으로 추가해 주세요.'],
  ['3', '연동 실패 시 화면 대응 미정', '예외 상황에서 그대로 이탈한다', '3번 예외 시나리오에 화면 대응 1개를 추가해 주세요.'],
];

export const screens = [];
const add = (file, html, o = {}) => screens.push({ file, html, ...o });

// ═══ M1 설정 경로 카드 ═══
add('cap-01-m1-chatgpt-data-controls.png', pathCard('ChatGPT', '설정', '데이터 관련 항목', '모델 학습에<br>내 대화 사용 끄기', '프로필 메뉴에서 연다', '데이터·개인정보 메뉴', '토글 위치·현재 상태 확인'));
add('cap-02-m1-claude-privacy-settings.png', pathCard('Claude', '설정', '개인정보·데이터 항목', '모델 학습에<br>내 대화 사용 끄기', '프로필 메뉴에서 연다', '같은 개념의 설정', '설정 위치·현재 상태 확인'));
add('cap-03-m1-gemini-activity-settings.png', pathCard('Gemini', '활동·데이터 관리', '활동 저장 설정', '학습 사용 여부<br>확인 후 끄기', '계정 메뉴에서 연다', '별도 토글인지 활동 설정 연동인지', '화면으로 직접 확인'));

// ═══ M1 무료 한도 안내 (경로 카드) ═══
add('cap-25-m1-free-plan-limit-notice.png', `<div class="pc">
  <div class="kick">대응 카드 · 무료 플랜 사용량 한도</div>
  <div class="tool" style="font-size:76px">한도 도달 안내가 뜨면</div>
  <div class="path">
    <div class="st"><div class="no">1</div><div class="t">지금까지 결과를<br>복사해 노트에 저장</div><div class="d">이전 결과는 사라지지 않는다</div></div>
    <div class="ar">→</div>
    <div class="st on"><div class="no">2</div><div class="t">두 번째 도구에<br>같은 카드 붙여넣기</div><div class="d">ChatGPT · Claude · Gemini 중 1개</div></div>
    <div class="ar">→</div>
    <div class="st"><div class="no">3</div><div class="t">그래도 안 되면<br>강사 화면 따라쓰기</div><div class="d">옆 사람과 페어도 가능</div></div>
  </div>
  <div class="notes">
    <div><span class="tg">[강의 전 확인]</span> 안내 문구·한도는 도구·플랜별로 다르다 · 축소 모델 전환 표시도 같은 신호</div>
    <div class="strong">한도 도달은 예정된 일 — 실습은 멈추지 않는다</div>
  </div>
  <div class="wm abs">${WM}</div>
</div>`);

// ═══ M0 로그인 확인 — 새 대화 빈 화면 ═══
add('cap-26-m0-login-new-chat-3tools.png', `<div class="app">
  <div class="top"><div class="tl"><span class="dot"></span>AI 채팅</div><div><span class="nb on">${bd(2, 'in')}＋ 새 대화</span></div></div>
  <div class="empty">
    <div class="hi">무엇을 도와드릴까요?</div>
    <div class="inp on">${bd(1)}<span class="ph">메시지를 입력하세요</span><span class="send">↑</span></div>
    <div class="ok">입력창이 보이면 로그인 완료</div>
    <div class="tools">ChatGPT · Claude · Gemini 공통 — 새 대화가 열리는지만 확인</div>
  </div>
  <div class="wm abs">${WM}</div>
</div>`);

// ═══ M0 산출물 4종 합성 (1440×460) ═══
add('cap-29-m0-outputs-4-composite.png', `<div class="comp">
  <div class="doc"><div class="dt">프롬프트 템플릿 카드 v1</div>
    ${['역할', '목적', '독자', '자료', '형식', '검증'].map((k, i) => `<div class="r"><span class="lab">[${k}]</span><span class="ln" style="max-width:${[80, 95, 70, 90, 60, 85][i]}%"></span></div>`).join('')}
    <div class="r" style="margin-top:auto;color:#6E6E73;font-size:19px">v1 · 재요청 후 변화 1줄 메모</div>
  </div>
  <div class="doc"><div class="dt">PRD v2 · 리뷰 · 2-Pager</div>
    <div class="lab">결론부터</div><div class="ln" style="height:9px"></div><div class="ln" style="height:9px;width:80%"></div>
    <div class="big">목표 설정율<br>72.5% → 80% <span class="tg">[가정]</span></div>
    <div class="lab">가장 약한 3곳</div><div class="ln" style="height:9px;width:90%"></div><div class="ln" style="height:9px;width:70%"></div>
    <div class="lab">2-Pager 첫 5줄</div><div class="ln" style="height:9px;width:80%"></div>
  </div>
  <div class="doc"><div class="dt">분석 · 회의록 · 아웃라인</div>
    <div class="bars" style="gap:10px">${[[100, 500], [77, 387], [56, 279], [40, 198], [30, 150]].map(([w, n], i) => `<div style="display:flex;align-items:center;gap:8px"><div class="bar ${i === 3 ? 'on' : ''}" style="width:${w * 0.72}%;height:24px"></div><span style="font-size:22px;font-weight:700">${n}</span></div>`).join('')}</div>
    <div class="lab" style="margin-top:6px">액션아이템 · 누가 [미정]</div><div class="lab">8장 아웃라인</div>
  </div>
  <div class="doc"><div class="dt">나의 자동화 워크플로 1장</div>
    <div class="fl"><div>반복 업무 3개</div><div class="ar2">▼</div><div>붙일 템플릿</div><div class="ar2">▼</div><div style="border-color:#0066CC;color:#0066CC;background:#F2F7FD">월요일 실행 1개</div></div>
  </div>
  <div class="wm abs" style="bottom:8px">${WM}</div>
</div>`, { w: 1440, h: 460 });

// ═══ M2 템플릿 (a) 실행 결과 ═══
const U_TPL = `… [형식] 한국어 Markdown. 순서: ① 결론부터(3문장: 무엇을·왜·성공 기준) ② 문제와 타겟 ③ 솔루션 개요와 AI 활용점 ④ 성공 지표 표 ⑤ 규제·리스크 체크 표 ⑥ 확인 필요 목록 ⑦ 다음 액션. A4 1~2페이지.
[검증] 자료에 없는 숫자나 사실은 만들지 말고 [확인 필요]로 표시하세요. … 마지막 문장은 프로덕트 리드에게 요청할 결정을 한 문장으로 쓰세요.${MORE}`;

add('cap-04-m2-template-a-result-top.png', chat({
  user: U_TPL,
  body: `<h1>머니핏(MoneyFit) 서비스 기획 초안</h1>
${hl(1, `<h2 style="margin-top:0">① 결론부터</h2>
<ol><li>머니핏은 25~35세 직장인의 분산된 계좌·카드 거래를 자동 분류·요약하고 저축 목표 달성을 코칭하는 마이데이터 기반 서비스입니다.</li>
<li>"내 돈이 어디로 가는지 모른다"는 문제와 저축 목표 설정 후 3개월 내 이탈률 70% [가정]을 줄이기 위해서입니다.</li>
<li>성공 기준 후보는 첫 저축 목표 설정율·자동 저축 실행율·30일 리텐션이며, Baseline·Target은 미정입니다 [가정].</li></ol>`)}
${hl(2, `<h2 style="margin-top:0">이 문서의 순서</h2>
<p class="s19">② 문제와 타겟 &nbsp;·&nbsp; ③ 솔루션 개요와 AI 활용점 &nbsp;·&nbsp; ④ 성공 지표 표 &nbsp;·&nbsp; ⑤ 규제·리스크 체크 표 &nbsp;·&nbsp; ⑥ 확인 필요 목록 &nbsp;·&nbsp; ⑦ 다음 액션</p>`)}
<h2>② 문제와 타겟</h2>
<p>타겟은 25~35세 직장인입니다. 급여는 있으나 계좌·카드가 분산되어 소비 파악이 어렵습니다 [가정].</p>`,
}));

add('cap-05-m2-template-a-result-metrics.png', chat({
  user: U_TPL,
  body: `<h2 style="margin-top:0">④ 성공 지표</h2>
${hl(1, tbl(['지표', 'Baseline', 'Target', '측정 이벤트'], [
    ['첫 저축 목표 설정율', '미정 [가정]', '미정 [가정]', '[확인 필요]'],
    ['자동 저축 실행율', '미정 [가정]', '미정 [가정]', '[확인 필요]'],
    ['30일 리텐션', '미정 [가정]', '미정 [가정]', '[확인 필요]'],
  ], { widths: ['34%', '22%', '22%', '22%'] }), 'tight')}
<h2>⑤ 규제·리스크 체크</h2>
<div class="t17">${tbl(['항목', '우리 서비스와의 관련성', '컴플라이언스에 물어볼 질문'], [
    ['마이데이터 허가·전송요구권', '거래 내역 수집의 전제', '전송요구 목적 범위에 코칭이 포함되는가 — 컴플라이언스 확인 필요'],
    ['금융소비자보호법·자본시장법', 'AI 코칭 문구', '코칭 문구가 투자 권유·자문에 해당하는가 — 컴플라이언스 확인 필요'],
    ['개인정보보호법(가명처리)', '거래 내역의 AI 입력', '가명처리 범위와 절차는 무엇인가 — 컴플라이언스 확인 필요'],
  ], { widths: ['27%', '25%', '48%'] })}</div>
<h2>⑦ 다음 액션</h2>
${hl(2, `<p><b>프로덕트 리드께 요청드립니다: 이 방향으로 PRD를 본격 작성할지 결정해 주십시오.</b></p>`, 'tight')}`,
}));

const RE5 = '이 초안에서 근거가 가장 약한 3곳을 골라, 왜 약한지와 누구에게 무엇을 확인해야 하는지를 표(열: 문장 | 왜 약한가 | 확인 질문 | 확인 대상)로 써 주세요.';

add('cap-06-m2-rerequest-prompt.png', chat({
  body: `<h2 style="margin-top:0">⑥ 확인 필요 목록</h2>
<ul><li>저축 목표 설정 후 3개월 내 이탈률 70%의 출처와 측정 기간 [확인 필요]</li>
<li>성공 지표 3개의 Baseline·Target·측정 이벤트 [확인 필요]</li>
<li>AI 코칭 문구가 투자 권유·투자자문에 해당하는지 여부 — 컴플라이언스 확인 필요</li>
<li>시장 규모·경쟁사 기능 — 자료에 없어 본문에 쓰지 않음 [확인 필요]</li></ul>
<h2>⑦ 다음 액션</h2>
<p>컴플라이언스 담당자에게 위 질문 3개를 전달하고, 데이터 담당에게 이탈률 측정 기준을 확인합니다.</p>
<p><b>프로덕트 리드께 요청드립니다: 이 방향으로 PRD를 본격 작성할지 결정해 주십시오.</b></p>
<p class="dim s18" style="margin-top:18px">▼ 같은 대화에 재요청 문장 10선 중 5번을 그대로 붙인다</p>`,
  inputOn: true,
  inputHtml: `${bd(1)}<span class="txt" style="font-size:21px;font-weight:700;padding:8px 0">${RE5}</span>`,
}));

add('cap-07-m2-rerequest-result-weak3.png', chat({
  user: RE5,
  body: `<h2 style="margin-top:0">근거가 가장 약한 3곳</h2>
${hl(1, tbl(['문장', '왜 약한가', '확인 질문', '확인 대상'], [
    ['"저축 목표를 세워도 3개월 내 이탈률 70% [가정]"', '출처·측정 기간·표본이 자료에 없다', '어떤 데이터로 언제 측정한 값인가?', { v: '데이터 담당', cls: 'b' }],
    ['"개인화 코칭 문구, 목표 달성 시뮬레이션"', '투자 권유·자문 해당 여부가 미확인 — 컴플라이언스 확인 필요', '코칭 문구가 권유에 해당하지 않는 기준은 무엇인가?', { v: '컴플라이언스 담당자', cls: 'b' }],
    ['"성공 기준 후보 … Baseline·Target 미정 [가정]"', '현재 값과 측정 이벤트가 하나도 없다', '지표별 현재 값과 로그 이벤트 이름은 무엇인가?', { v: '프로덕트 리드 · 데이터 담당', cls: 'b' }],
  ], { widths: ['30%', '27%', '27%', '16%'] }), 'tight')}
${hl(2, `<p class="s19"><b>바뀐 점</b> — 첫 결과는 "무엇을 만들 것인가"였고, 재요청 결과는 "누구에게 무엇을 확인할 것인가"입니다. 새 숫자는 추가하지 않았습니다.</p>`, 'tight')}`,
}));

// ═══ M3 오류 초안 검수표 ═══
add('cap-08-m3-audit-result-table.png', chat({
  newOn: 1,
  sub: '· 새 대화',
  user: `[역할] 당신은 금융 서비스 기획 문서를 검수하는 팩트체크 담당자입니다. 이 문서는 다른 사람이 작성했으며, 당신은 작성 과정에 관여하지 않았습니다.
[목적] 아래 [확인된 자료]와 [검수할 문서]를 대조해, 자료로 뒷받침되지 않는 문장을 찾아 표로 정리합니다.${MORE}`,
  body: `<div class="t16">${hl(2, tbl(['문제 문장(그대로 인용)', '문제 유형', '근거 또는 누락 이유', '수정 방향'], [
    ['"자체 설문에서 응답자 92%가 소비 파악에 어려움을 겪는다고 답해 시장 필요성은 검증됐다."', { v: '숫자 불일치', cls: 'b' }, '자료는 가상 설문(n=200) 62% [가정]. 92%는 자료에 없다', '62% [가정]으로 고치고 "검증됐다" 단정 삭제'],
    ['"신용정보법 제33조의9에 따라 … 고객 동의 없이 주 1회 AI 코칭 메시지를 보낼 수 있으므로"', { v: '규제·조항 미확인', cls: 'b' }, '동의 절차와 관련 조항은 자료의 "확인 필요" 항목 — 컴플라이언스 확인 필요', '조항·단정 삭제, 컴플라이언스 질문으로 전환'],
    ['"경쟁 서비스 A는 이미 자동 저축 기능으로 3개월 이탈률을 절반으로 낮췄으므로"', { v: '경쟁사 기능 미확인', cls: 'b' }, '자료는 "자동 저축 기능의 유무와 성과는 확인되지 않음"', '문장 삭제 또는 [확인 필요]로 표시'],
  ], { widths: ['35%', '15%', '28%', '22%'] }), 'tight')}</div>
<p class="s18"><b>자료로 확인된 문장</b> — "머니핏은 25~35세 직장인을 위한 마이데이터 기반 자산관리 코칭 서비스다."(자료: 서비스·타겟)</p>
<p class="s18"><b>검수자가 확신이 낮은 항목</b> — "동일 기능을 1개월 내 출시한다": 개발 공수 미산정 — 추가 확인 필요</p>
<p class="dim s16">조항 번호는 교육용으로 임의 부여한 것 · 실제 조문과 무관</p>`,
}));

// ═══ M5 심층 리서치 ═══
const U_BRIEF = `[역할] 당신은 핀테크 시장 리서치를 수행하는 애널리스트입니다. 근거 없는 주장은 쓰지 않습니다.
[목적] 가상 서비스 '머니핏(MoneyFit)' 기획의 근거가 될 시장·경쟁 리서치 브리프를 만듭니다.
[형식] … 2. 표(5열): 주장 | 근거(수치·인용) | 출처(기관·문서명·URL) | 기준일 | 신뢰도${MORE}`;

add('cap-09-m5-deep-research-start.png', chat({
  user: U_BRIEF,
  body: `<div class="plan">
<h2 style="margin-top:0">조사 계획</h2>
<ol><li>핵심 질문 5개를 검색어로 나눈다 — 저축·소비 행태 통계 · 마이데이터 제도 · 개인 자산관리(PFM) 시장 규모 · AI 코칭 사례 · 규제 확인 질문</li>
<li>1차 자료(금융당국·통계기관·공시·공식 보도자료)를 먼저 찾는다</li>
<li>주장마다 근거·출처·기준일을 붙여 5열 표로 정리한다</li>
<li>시장 규모 수치는 산정 방식이 없으면 "산정 방식 미확인" 목록으로 뺀다</li>
<li>출처 목록(URL)과 컴플라이언스 확인 질문을 덧붙인다</li></ol>
${hl(1, `<div class="st2" style="margin-top:0"><span class="spin"></span>조사 시작 · 자료를 찾는 중 — 수 분~십수 분 소요 [강의 전 확인]</div>`, 'tight')}
</div>
<p class="dim s18" style="margin-top:14px">라이브는 여기까지 — 결과는 사전 실행본으로 본다</p>`,
  inputHtml: `<span><span class="mode">${bd(2, 'in')}심층 리서치</span><span class="ph">메시지를 입력하세요</span></span>`,
}));

add('cap-10-m5-deep-research-result-table.png', chat({
  wide: true,
  body: `<p class="s18"><b>요약</b> — 2030 직장인의 저축·소비 행태는 공식 통계로 확인할 수 있으나, 개인 자산관리(PFM) 시장 규모는 산정 방식이 공개된 수치를 찾지 못했습니다. AI 코칭의 권유 해당 여부는 컴플라이언스 확인이 필요합니다.</p>
<div class="t16">${hl(1, tbl(['주장', '근거(수치·인용)', '출처(기관·문서명·URL)', '기준일', '신뢰도'], [
    ['20~30대 직장인의 저축·소비 행태를 다룬 공식 조사가 있다', '조사 항목에 저축률·소비 구성 포함 — 수치 [확인 필요]', '가상 통계기관 「가계 금융 조사」(예시)', '[확인 필요]', '상 (1차 자료)'],
    ['마이데이터는 허가를 받은 사업자가 전송요구권에 따라 정보를 받는 구조다', '제도 안내문 인용 — 최근 변경 사항 [확인 필요]', '가상 금융당국 「제도 안내」(예시)', '[확인 필요]', '상 (1차 자료)'],
    ['자산관리 앱의 AI 코칭·자동 저축 사례가 있다', '가상 A사·B사 보도자료 — 효과 수치 [확인 필요]', '가상 A사·B사 공식 보도자료(예시)', '[확인 필요]', '중 (2차 자료)'],
    ['AI 코칭 문구의 권유 해당 여부는 기획 단계 확인 대상이다', '법률 판단 없음 — 컴플라이언스 확인 필요', '가상 금융당국 「소비자보호 안내」(예시)', '[확인 필요]', '중'],
  ], { widths: ['27%', '27%', '24%', '10%', '12%'] }), 'tight')}</div>
${hl(2, `<p class="s18"><b>산정 방식 미확인</b>(표에서 제외) — PFM 시장 규모 추정치 2건: 출처·기준일은 있으나 산정 방식 없음 → 보고서에 넣지 않는다</p>`, 'tight')}
<p class="s17 dim"><b>출처 목록</b> — ① https://example.org/household-finance-survey(가상) &nbsp; ② https://example.org/mydata-guide(가상) &nbsp; ③ https://example.org/press-a(가상)</p>`,
}));

add('cap-11-m5-source-click-verify.png', chat({
  wide: true,
  noAi: true,
  body: `<div class="two" style="margin-top:6px;align-items:stretch">
<div class="pane"><div class="ph2"><span>AI 결과 — 5열 표</span><span class="dim">사전 실행본</span></div><div class="pb" style="padding:16px 18px">
${tbl(['주장', '근거', '출처', '기준일', '신뢰도'], [
    ['20~30대 직장인의 저축·소비 행태를 다룬 공식 조사가 있다', '조사 항목 포함', '가상 통계기관', '[확인 필요]', '상'],
    [{ v: `${bd(1, 'in')}2030 직장인 중 계좌 3개 이상 보유 비율 <b>61.5%</b>(가상 수치)`, cls: 'hcell' }, { v: '조사 결과 표 인용', cls: 'hcell' }, { v: '가상 통계기관 「가계 금융 조사」 ↗', cls: 'hcell' }, { v: '<b>2025-12</b> (가상)', cls: 'hcell' }, { v: '상', cls: 'hcell' }],
    ['마이데이터는 허가 사업자가 전송요구권에 따라 정보를 받는 구조다', '제도 안내문 인용', '가상 금융당국', '[확인 필요]', '상'],
    ['자산관리 앱의 AI 코칭·자동 저축 사례가 있다', '보도자료', '가상 A사', '[확인 필요]', '중'],
  ], { widths: ['38%', '17%', '21%', '14%', '10%'] })}
<p class="dim" style="margin-top:14px;font-size:20px">① 행 1개를 골라 출처 링크(↗)를 누른다</p>
<p class="dim" style="font-size:20px">② 원문에서 주장·숫자·기준일을 찾는다</p>
<p class="dim" style="font-size:20px">③ 불일치·죽은 링크면 신뢰도 '하'로 강등</p></div></div>
<div class="pane"><div class="ph2"><span>원문 페이지 — 가상 통계기관 「가계 금융 조사」</span><span class="dim">예시 문서</span></div><div class="pb" style="font-size:23px;line-height:1.65;padding:22px 28px">
<p style="font-weight:700">3. 금융 계좌 보유 현황</p>
<p class="dim" style="font-size:19px">기준: 2025년 12월 · 가상 문서</p>
<p style="margin-top:12px">20~30대 임금 근로자의 금융 계좌 보유는 분산되는 경향을 보였다.</p>
<div class="hl" style="background:#E8F1FB;margin:16px 0 16px 6px">${bd(2)}<b>조사 대상 중 계좌를 3개 이상 보유한 비율은 61.5%였다.</b></div>
<p>카드 보유 수는 별도 항목에서 다룬다.</p>
<div class="ln" style="margin-top:16px;height:9px"></div><div class="ln" style="margin-top:12px;height:9px;width:82%"></div>
<div class="ck" style="margin-top:22px"><div>주장 일치 ✓</div><div>숫자 일치 ✓</div><div>기준일 일치 ✓</div></div>
<p class="dim" style="margin-top:14px;font-size:19px">원문은 문장 1개만 강조한다</p>
</div></div>
</div>`,
}));

// ═══ M5 벤치마킹 표 ═══
add('cap-28-m5-benchmark-table-existence-col.png', chat({
  wide: true,
  user: `[역할] 당신은 핀테크 기획팀의 벤치마킹 담당자입니다. 확인되지 않은 사실을 확인된 것처럼 쓰지 않습니다.
[자료] 비교 대상 서비스: 가상 A사, 가상 B사, 가상 C사 · '존재 확인' 열은 모두 "미확인"으로 채웁니다.${MORE}`,
  body: `<div class="t16">${tbl(['서비스', '존재 확인', '타겟', '핵심 기능', '가격·수익 모델', 'UX 강점', 'AI 활용', '규제 대응', '우리에게 시사점'], [
    [{ v: '가상 A사', cls: 'b' }, { v: '미확인', cls: 'b' }, '20대 초반 대학생·신입 [가정]', '가계부 자동 기록 [확인 필요]', '무료 + 광고 [확인 필요]', '입력 단계가 짧다 [가정]', '카테고리 자동 분류 [확인 필요]', '마이데이터 허가 여부 확인 질문', '기록 마찰을 줄이는 것이 첫 진입 장벽'],
    [{ v: '가상 B사', cls: 'b' }, { v: '미확인', cls: 'b' }, '30대 맞벌이 [가정]', '계좌 통합 조회·예산 알림 [확인 필요]', '월 구독 [확인 필요]', '예산 초과 알림 시점 [가정]', '지출 예측 [확인 필요]', '전송요구권 동의 화면 구성 확인 질문', '알림 시점 설계가 리텐션에 직결 [가정]'],
    [{ v: '가상 C사', cls: 'b' }, { v: '미확인', cls: 'b' }, '은행 기존 고객 [가정]', '자동 저축·목표 통장 [확인 필요]', '은행 내 무료 [확인 필요]', '목표별 통장 시각화 [가정]', '코칭 문구 [확인 필요]', '금융상품 권유 해당 여부 확인 질문', '자동 저축은 은행 제휴 구조 검토 필요 [확인 필요]'],
    [{ v: '머니핏(우리, 목표)', cls: 'b' }, { v: '—', cls: 'b' }, '25–35세 직장인 [가정]', '소비 분류 → 목표 → 자동 저축 → AI 코칭', '미정 [가정]', '파악 40분 → 5분 [가정]', '분류·인사이트·코칭·시뮬레이션', '5개 영역 컴플라이언스 질문 목록', '파악 비용과 실행 실패를 한 흐름에서 해결'],
  ], { hcol: 1, hbadge: 1, widths: ['8.5%', '7.5%', '11%', '12.5%', '10%', '11%', '12%', '13%', '14.5%'] })}</div>
${hl(2, `<p class="s18"><b>직접 확인해야 할 것 3개</b> — ① 각 서비스의 실제 존재·현재 기능(공식 홈페이지·앱스토어 설명) ② 요금제(공식 홈페이지) ③ 마이데이터 허가 여부(공시·보도자료) → 확인한 칸만 "확인(출처 URL, 확인일)"로 바꾼다</p>`, 'tight')}`,
}));

// ═══ M7 PRD 초안 · 리뷰 · 2-Pager ═══
add('cap-12-m7-prd-draft-bluf.png', chat({
  user: `[역할] 당신은 핀테크 스타트업의 시니어 프로덕트 매니저(PM)이자 기획서 편집자입니다. …
[자료] 이 프롬프트 맨 아래 --- 다음에 붙인 '5개 핵심 입력'만 사용합니다. 여기에 없는 것은 만들지 않습니다.${MORE}`,
  body: `<h1>머니핏(MoneyFit) PRD 초안</h1>
${hl(1, `<h2 style="margin-top:0">1. 결론부터(BLUF)</h2>
<p class="s19">머니핏은 25–35세 직장인의 흩어진 계좌·카드를 모아 소비 파악부터 첫 저축까지 이끄는 마이데이터 기반 자산관리 코칭 앱입니다. 계좌를 연동한 사용자 4명 중 1명이 목표 설정 전에, 목표를 세운 10명 중 3명이 첫 저축 전에 이탈합니다 [가정]. 핵심 지표는 첫 저축 목표 설정율 72.5% → 80%, 첫 저축 실행율 71.0% → 78% [가정]입니다. 리더십에 P0 범위 착수 승인을 요청합니다.</p>`, 'tight')}
<p class="s17 dim" style="margin:8px 0"><b>목차</b> — 1 결론부터 · 2 문제 정의 · 3 타겟과 시나리오 · 4 솔루션과 AI 활용점 · 5 기능 범위 · 6 성공 지표 · 7 규제·리스크 체크 · 8 일정과 요청 사항</p>
<h2>6. 성공 지표</h2>
<div class="t17">${hl(2, tbl(['계층', '지표', 'Baseline', 'Target', '측정 이벤트', '확인 시점'], [
    ['핵심', '첫 저축 목표 설정율(계좌 연동 사용자 대비)', { v: '72.5% [가정]', cls: 'b' }, { v: '80% [가정]', cls: 'b' }, 'set_goal', '출시 후 8주 [가정]'],
    ['핵심', '첫 저축 실행율(목표 설정자 대비)', { v: '71.0% [가정]', cls: 'b' }, { v: '78% [가정]', cls: 'b' }, 'first_saving', '출시 후 8주 [가정]'],
    ['보조', '30일 활성(가입자 대비)', { v: '30.0% [가정]', cls: 'b' }, { v: '35% [가정]', cls: 'b' }, 'd30_active', '출시 후 8주 [가정]'],
  ], { widths: ['7%', '35%', '14%', '13%', '14%', '17%'] }), 'tight')}</div>`,
}));

add('cap-13-m7-three-lens-review.png', chat({
  newOn: null,
  sub: '· 새 대화',
  user: `[역할] 당신은 핀테크 서비스 기획서(PRD)를 심사하는 리뷰 패널입니다. ① 리더십 ② 프로덕트 디자이너 ③ 개발 리드(EM)
[목적] 아래 PRD 초안의 약점을 찾아, 작성자가 다음 10분 안에 고칠 수 있는 수정 제안을 줍니다. 칭찬은 필요 없습니다.${MORE}`,
  body: `<h2 style="margin-top:0">① 리더십 — "투자할 가치가 있는가?" &nbsp;<span class="tg">14 / 25 · 미통과(17점 기준)</span></h2>
<div class="t16">${hl(1, tbl(['항목', '점수', '근거(PRD 인용)', '수정 제안'], [
    ['L1 왜 지금인가', { v: '2', cls: 'c b' }, '§1에 전략·타이밍 문장 없음', '§1에 "왜 지금인가" 1문장 추가'],
    ['L2 문제가 숫자로 보이는가', { v: '3', cls: 'c b' }, '§2 "4명 중 1명은 저축 목표 설정 전에 이탈 [가정]"', '이탈 인원(명)도 함께 표기'],
    ['L3 타겟·시장 맥락', { v: '2', cls: 'c b' }, '§3에 경쟁·차별점 서술 없음', '가상 A사 대비 차별점 1줄 [가정]'],
    ['L4 비용 대비 효과', { v: '2', cls: 'c b' }, '§8에 투입 인력·비용 수치 없음', '역할별 인력·기간 [가정] 추가'],
    ['L5 Baseline→Target→측정', { v: '5', cls: 'c b' }, '§6 "72.5% → 80% · set_goal"', '유지'],
  ], { widths: ['23%', '7%', '40%', '30%'] }), 'tight')}</div>
<p class="s16 dim">② 디자이너 15 / 25 · ③ 개발 리드(EM) 13 / 25 — 표 생략</p>
<h2>가장 약한 3곳</h2>
<div class="t16">${hl(2, tbl(['순위', '약점', '왜 위험한가', '재요청 문장(그대로 복사)'], WEAK3_ROWS.map(r => [{ v: r[0], cls: 'c' }, { v: r[1], cls: 'b' }, r[2], r[3]]), { widths: ['6%', '24%', '27%', '43%'] }), 'tight')}</div>`,
}));

add('cap-14-m7-2pager-first5.png', chat({
  user: `[역할] 당신은 임원 보고 문서를 다듬는 시니어 프로덕트 매니저(PM)입니다.
[형식] … 첫 5줄(결론): ① 한 문장 제안 ② 해결하는 문제 ③ 핵심 지표 Baseline→Target ④ 요청하는 결정 ⑤ 결정 기한과 다음 단계${MORE}`,
  body: `<h1>머니핏 2-Pager — 임원 보고용</h1>
${hl(1, FIRST5.replace('class="s19"', 'class=""'))}
<h2>문제와 근거</h2>
<p class="s19 dim">월말에 여러 앱을 오가며 소비를 파악하는 데 평균 40분이 걸립니다 [가정]. …</p>
${hl(2, `<p><b>30초 구두 설득 문장</b> — "목표 설정율 72.5%→80% [가정], P0 착수 승인을 10/2까지 요청드립니다."</p>`, 'tight')}`,
}));

add('cap-30-m8-instructor-model-result.png', chat({
  wide: true,
  sub: '· 사전 실행 결과(라이브 아님)',
  noAi: true,
  body: `<div class="two" style="margin-top:4px">
<div class="pane"><div class="ph2"><span>2-Pager 첫 5줄</span><span class="dim">머니핏 · 강사 사전 실행</span></div><div class="pb" style="padding:22px 26px 16px 30px">
${hl(1, FIRST5, 'tight')}
<p class="s18" style="margin-top:12px"><b>30초 설득 문장</b> — "목표 설정율 72.5%→80% [가정], P0 착수 승인을 10/2까지 요청드립니다."</p></div></div>
<div class="pane"><div class="ph2"><span>가장 약한 3곳 → 재요청 문장</span><span class="dim">새 대화 리뷰 결과</span></div><div class="pb t15" style="padding:22px 22px 16px 26px">
${hl(2, tbl(['순위', '약점', '왜 위험한가', '재요청 문장'], WEAK3_ROWS.map(r => [{ v: r[0], cls: 'c' }, { v: r[1], cls: 'b' }, r[2], r[3]]), { widths: ['9%', '25%', '26%', '40%'] }), 'tight')}
<p class="s17 dim" style="margin-top:10px">보완 후 PRD에는 바뀐 섹션 제목 옆에 (수정) 표시 · 보는 것은 구조 — 첫 5줄에 지표·요청이 있는가</p></div></div>
</div>`,
}));

// ═══ M9 데이터 분석 ═══
add('cap-15-m9-csv-upload.png', `<div class="app">
  <div class="top"><div class="tl"><span class="dot"></span>AI 채팅<span class="sub">· 새 대화</span></div><div><span class="nb">＋ 새 대화</span></div></div>
  <div class="empty" style="gap:18px;justify-content:flex-end;padding-bottom:26px">
    <div class="hi" style="font-size:34px;margin-bottom:8px">무엇을 도와드릴까요?</div>
    <div class="inp" style="width:1160px;border-radius:24px;flex-direction:column;align-items:stretch;padding:20px 24px 14px;gap:12px">
      <div><span class="chip" style="font-size:20px;padding:9px 16px;border:2px solid #0066CC">${bd(1, 'in')}<i>CSV</i>moneyfit-events.csv</span></div>
      <div class="txt" style="font-size:20px;line-height:1.55;white-space:pre-line"><span style="box-shadow:0 0 0 2px #0066CC;border-radius:4px;padding:1px 5px;background:#E8F1FB;font-weight:700;position:relative">${bd(2, 'in')}이 파일은 교육용 가상 데이터입니다.</span>
역할: 당신은 핀테크 서비스의 이벤트 로그를 다루는 데이터 분석가입니다.
목적: 첨부한 CSV의 구조를 파악해, 분석을 시작하기 전에 데이터가 무엇을 담고 있는지 확인합니다.
독자: 이 데이터를 처음 보는 서비스 기획자(Product Manager, PM)
자료: 첨부 파일 moneyfit-events.csv — 교육용 가상 데이터이며 실제 고객 데이터가 아닙니다.
형식: 1. 전체 행 수, 고유 user_id 수, 컬럼별 결측 수 2. signup_date와 event_date의 최소·최대 …
검증: 계산 과정(코드)을 함께 보여주세요. … 아직 해석이나 인사이트는 쓰지 마세요.<span class="ph"> … (전문은 실습 가이드)</span></div>
      <div style="display:flex;justify-content:space-between;align-items:center"><span class="ph" style="font-size:16px">＋ 파일 첨부 1개</span><span class="send">↑</span></div>
    </div>
  </div>
  <div class="wm abs">${WM}</div>
</div>`);

add('cap-16-m9-funnel-table-code.png', chat({
  wide: true,
  user: `목적: 5단계 퍼널의 전환율을 계산해 가장 큰 이탈 구간을 찾습니다.
계산 규칙: 전환율은 행 수가 아니라 단계별 고유 user_id 수로 계산합니다. 검증: 계산 과정(코드)을 함께 보여주세요.${MORE}`,
  body: `<div class="two">
<div style="flex:1.12">
<h2 style="margin-top:0">전체 퍼널 — 고유 사용자 수 기준</h2>
<div class="t17">${hl(1, tbl(['단계', '고유 사용자 수', '전체 대비', '직전 단계 대비'], [
    ['signup', '500', '100.0%', '—'],
    ['link_account', '387', '77.4%', '77.4%'],
    ['set_goal', '279', '55.8%', '72.1%'],
    ['first_saving', '198', '39.6%', { v: '71.0%', cls: 'n b' }],
    ['d30_active', '150', '30.0%', '75.8%'],
  ], { align: ['', 'n', 'n', 'n'] }), 'tight')}</div>
<p class="s16">데이터 품질 — 완전 중복 2행 · 가입일보다 앞선 이벤트 3행. 이 3행을 제외하면 link_account <b>385명(77.0%)</b>, set_goal 직전 대비 <b>72.5%</b> [확인 필요: 제외 여부]</p>
<div class="t15">${tbl(['channel', 'signup', 'link_account', '연동율', ''], [
    ['app_store', '204', '168', '82.4%', ''],
    ['referral', '43', '40', '93.0%', { v: '표본 작음, 해석 주의', cls: 'b' }],
    ['ad', '78', '50', '64.1%', ''],
  ], { align: ['', 'n', 'n', 'n', ''] })}</div>
</div>
<div style="flex:.88">
<h2 style="margin-top:0">계산 과정(코드)</h2>
${hl(2, `<pre style="border:none;padding:6px 4px;background:none">import pandas as pd

df = pd.read_csv("moneyfit-events.csv")
df = df.<span class="k">drop_duplicates()</span>

order = ["signup", "link_account", "set_goal",
         "first_saving", "d30_active"]
<span class="cm"># 행 수가 아니라 고유 user_id 수</span>
funnel = (df.groupby("event")["user_id"]
            .<span class="k">nunique()</span>.reindex(order))

total = funnel / funnel.iloc[0] * 100
step  = funnel / funnel.shift(1) * 100</pre>`, 'tight')}
<p class="s16 dim">채널별 표는 이상치 제외 후 값 · 교육용 가상 데이터 · 수치 [가정]</p>
</div>
</div>`,
}));

add('cap-17-m9-funnel-chart.png', chat({
  wide: true,
  user: `목적: 임원 보고 슬라이드 1장에 넣을 퍼널 차트 1개를 만듭니다. 차트 제목은 결론 문장으로 씁니다. 강조색은 한 가지만 씁니다.${MORE}`,
  body: `<div style="border:1px solid #D9DCE1;border-radius:12px;overflow:hidden;width:1130px"><img src="${BUILDER}moneyfit-funnel.png" style="display:block;width:100%"></div>`,
}));

// ═══ M10 회의록 · 이메일 ═══
add('cap-18-m10-minutes-4tables.png', chat({
  wide: true,
  user: `역할: 당신은 프로덕트 팀의 회의록을 정리하는 PM 보조자입니다.
검증: 메모에 없는 담당자·기한·수치를 만들지 말고 [미정]으로 표시하세요. 결정과 미결을 섞지 마세요.${MORE}`,
  body: `<div class="two">
<div class="t15" style="flex:.9">
<h2 style="margin-top:0" class="s19">2. 결정 사항 (3)</h2>
${tbl(['결정', '근거·조건'], [
    ['v1.1 범위 = 목표 설정 2단계 + 추천 목표 카드 + 첫 저축 넛지 알림', '자동이체 고도화는 v1.2'],
    ['LLM 입력은 가명처리 집계값만, 원문 전송 없음', '컴플라이언스 회신 대기 [확인 필요]'],
    ['2주 스프린트 2개, 10/16 내부 데모', '—'],
  ], { widths: ['60%', '40%'] })}
<h2 class="s19">3. 미결 사항 (2)</h2>
${tbl(['미결', '결정 방법·기한'], [
    ['넛지 알림 상한(주 1회? 2회?) [확인 필요]', '디자이너·PM이 안 제시 · 기한 [미정]'],
    ['성공 기준 숫자(55→65%? 38→45%?) 미합의 [확인 필요]', 'baseline 재확인 후 · 기한 [미정]'],
  ], { widths: ['60%', '40%'] })}
<h2 class="s19">4. 이슈·리스크 (2)</h2>
${tbl(['이슈', '영향'], [
    ['알림 증가 → 스팸 신고 리스크', '과거 이탈 수치 미확인 [확인 필요]'],
    ['데이터팀 9월 말까지 타 프로젝트와 겹침', '대시보드 갱신 지연 가능'],
  ], { widths: ['60%', '40%'] })}
</div>
<div class="t16" style="flex:1.1">
<h2 style="margin-top:0">5. 액션아이템</h2>
${hl(1, tbl(['무엇', '누가(역할명)', '언제', '확인 방법'], [
    ['목표 설정 2단계 와이어프레임', '디자이너', { v: '[미정]', cls: 'hcell' }, '다음 회의(9/21)에서 화면 공유'],
    ['추천 룰 초안', '백엔드', { v: '[미정]', cls: 'hcell' }, '룰 문서 공유'],
    ['채널별 퍼널 + baseline 재확인', '데이터', '이번 주', '채널별 표 공유'],
    ['가명처리·전송요구 목적 범위 회신', '컴플라이언스', '다음 주', '회신 메일'],
    ['PRD v1.1 갱신 + 임원 보고 자료', 'PM', '9/25 예정 [확인 필요]', '문서 링크 공유'],
    ['지난 이벤트 알림 이탈 수치 확인', { v: '[미정]', cls: 'hcell' }, { v: '[미정]', cls: 'hcell' }, '수치와 출처 공유'],
  ], { widths: ['36%', '18%', '19%', '27%'] }), 'tight')}
${hl(2, `<p class="s17"><b>[미정]</b>은 메모에 담당자·기한이 없다는 표시 — 지어낸 이름·날짜 0건</p>`, 'tight')}
<p class="s16 dim">다음 회의 9/21(월) 10:00 · 임원 보고 9/25 예정(미확정) [확인 필요]</p>
</div>
</div>`,
}));

add('cap-19-m10-email-exec.png', chat({
  user: `목적: 위 회의록을 바탕으로 독자 1명에게 보내는 이메일 초안 1통을 씁니다.
[x] A. 임원 — 결정 사항 요약과 결정이 필요한 것 1개 (10줄 이내, 숫자는 근거와 함께)
형식: 첫 문장은 "무엇을 요청하는지"로 시작하고, 마지막 문장은 "기한과 결정·회신이 필요한 사항"으로 끝냅니다.${MORE}`,
  body: `<p class="s18 dim">수신: 임원(역할명) &nbsp;·&nbsp; 발신: PM</p>
<p><b>제목: [머니핏 v1.1] 범위 확정 보고 및 넛지 알림 상한 결정 요청</b></p>
${hl(1, `<p><b>머니핏 v1.1 첫 저축 넛지 알림의 횟수 상한(주 1회 또는 2회)에 대한 결정을 요청드립니다.</b></p>`, 'tight')}
<p class="s19">9/14 킥오프에서 v1.1 범위를 목표 설정 2단계 축소 · 추천 목표 카드 3개 · 첫 저축 넛지 알림으로 확정했습니다.<br>
LLM 입력은 가명처리 집계값만 사용하고 거래 원문은 전송하지 않습니다(컴플라이언스 회신 대기 [확인 필요]).<br>
일정은 2주 스프린트 2개, 10/16 내부 데모입니다.<br>
성공 기준 숫자는 미합의 상태이며 baseline 재확인 후 보고드리겠습니다 [확인 필요].<br>
리스크는 알림 증가 시 스팸 신고 가능성(수치 미확인 [확인 필요])과 데이터팀 리소스 중복(9월 말까지)입니다.</p>
${hl(2, `<p><b>임원 보고(9/25 예정, 미확정 [확인 필요]) 전까지 알림 상한에 대한 결정을 회신 부탁드립니다.</b></p>`, 'tight')}
<p class="s17 dim">자체 확인 — 첫 문장 = 요청 ✓ · 마지막 문장 = 기한·결정 필요 사항 ✓ · 본문 7줄</p>`,
}));

// ═══ M11 아웃라인 · 덱 ═══
const VIS = ['—', '요청 2개 카드', '타겟 페르소나 1장', '퍼널 막대 차트', 'Before → After 흐름도', '화면 예시 3컷', '지표 표', '규제 체크 표', '스프린트 일정표', '결정 사항 카드'];
const PTS = ['머니핏 · 핀트리(가상) · 교육용', '결론 1문장 · 요청 2개 · 기한', '계좌·카드 분산 · 3개월 내 이탈 [가정]', '500 → 385 → 279 · 106명 이탈', '2단계 축소 · 추천 카드 3 · 넛지', '온보딩 → 추천 → 설정 완료', 'set_goal · first_saving · d30_active', '4개 영역 · 질문 형태 · [확인 필요]', '스프린트 2개 · 데이터팀 리소스', '범위 승인 · 알림 상한(주 1회 vs 2회)'];
add('cap-20-m11-outline-table.png', chat({
  wide: true,
  body: `<div class="t18x">${tbl(['#', '제목(결론 문장)', '요점 3개(축약)', '시각 요소'], DECK.map((d, i) => [{ v: String(i + 1), cls: 'c' }, { v: d[0], cls: 'b' }, PTS[i], VIS[i]]), { hcol: 1, hbadge: 1, widths: ['4%', '45%', '32%', '19%'] })}</div>
${hl(2, `<p class="s19"><b>제목만 읽은 요약</b> — 머니핏 v1.1은 첫 저축까지 가는 길을 줄인다. 연동 뒤 106명 이탈이 문제이고, 2단계 축소·추천 카드·넛지로 푼다. 목표 설정율 72.5% → 80% [가정]을 걸고 범위 승인과 알림 상한 결정을 요청한다.</p>`, 'tight')}`,
}));

add('cap-21-m11-generated-deck.png', `<div class="deck">
  <div class="top"><div class="tl"><span class="dot"></span>슬라이드 보기<span class="sub">· 머니핏 v1.1 임원 보고 · 10장 · 생성 결과 예시</span></div><div><span class="nb">격자 보기</span></div></div>
  <div class="grid">${DECK.map((_, i) => slide(i, i === 3 ? 1 : i === 7 ? 2 : 0)).join('')}</div>
  <div class="wm abs">${WM}</div>
</div>`);

add('cap-31-m11-prebuilt-deck-thumbs.png', `<div class="deck">
  <div class="top"><div class="tl"><span class="dot"></span>슬라이드 보기<span class="sub">· 사전 제작 덱 · 2 · 4 · 8장</span></div><div><span class="nb">3컷 보기</span></div></div>
  <div class="grid three">${[1, 3, 7].map((i, k) => slide(i, k === 0 ? 0 : k)).join('')}</div>
  <div class="wm abs">${WM}</div>
</div>`, { w: 1440, h: 470 });

// ═══ M12 규칙 파일 · 프로토타입 ═══
const RULES = [
  ['h', '# 머니핏 프로토타입 시연 — 작업 규칙 (교육용 가상 사례)'],
  ['', ''],
  ['h', '## 범위'],
  ['', '- 이 폴더 안의 파일만 읽고 쓴다. context/는 읽기 전용, 결과는 outputs/에만 저장한다.'],
  ['', '- 실제 개인정보·기업 정보·금융상품명·기관명을 넣지 않는다.'],
  ['', '- 화면 하단에 "교육용 가상 프로토타입"을 표시한다.'],
  ['', ''],
  ['h', '## 작성 규칙'],
  ['', '- 기능은 context/prd.md에 있는 것만 만든다.'],
  ['', '- 없는 기능은 만들지 말고 파일 끝 주석에 "[확인 필요] 제안"으로 남긴다.'],
  ['', '- 숫자는 PRD의 [가정] 값만 쓰고 화면에도 [가정] 표시를 유지한다.'],
  ['', '- 외부 라이브러리·네트워크 호출 없이 단일 HTML 파일로 만든다.'],
  ['', ''],
  ['h', '## 완료 기준'],
  ['', '- outputs/prototype.html이 브라우저에서 열리고 화면 4개가 버튼으로 전환된다.'],
  ['', '- PRD 섹션 ↔ 화면 대응표를 마지막 메시지에 남긴다.'],
];
add('cap-24-m12-rules-file-agents-md.png', `<div class="ed">
  <div class="tab"><span>AGENTS.md</span></div>
  <div class="code"><div class="gut">${RULES.map((_, i) => i + 1).join('<br>')}</div><div class="src">${RULES.map(([k, t]) => k === 'h' ? `<span class="h">${t}</span>` : t).join('\n')}</div></div>
  <div class="wm abs">코드 한 줄 없음 · ${WM}</div>
</div>`);

add('cap-23-m12-claude-code-prototype.png', `<div class="app" style="background:#F5F5F7">
  <div class="top" style="background:#fff"><div class="tl"><span class="dot"></span>코딩 에이전트 작업 화면<span class="sub">· 선실행 결과 · 도구 명칭·플랜 [강의 전 확인]</span></div><div><span class="nb">outputs/prototype.html</span></div></div>
  <div style="flex:1;display:flex;gap:26px;padding:22px 30px 34px;align-items:flex-start;overflow:hidden">
    <div style="flex:1;min-width:0">
      <div class="term"><span class="p">&gt;</span> context/prd.md를 읽고 규칙 파일대로 프로토타입을 만들어줘

<span class="d">·</span> 규칙 파일 읽음 — 범위: 이 폴더만 · 실제 개인정보 금지
<span class="d">·</span> context/prd.md 읽음 — §3 핵심 시나리오 3개 · §5 기능 범위(P0)
<span class="d">·</span> outputs/prototype.html 생성 — 화면 4개, 버튼 전환
  온보딩 → 추천 목표 카드 3 → 목표 설정 2단계 → 첫 저축 넛지
<span class="box">${bd(1, 'in')}<span class="w">파일 끝 주석 — [확인 필요] 제안 3건</span>
  - 동의 문구: 컴플라이언스 확인 필요
  - 넛지 알림 횟수 상한 [미정] — PRD에 없음
  - 목표 금액 기본값 — PRD에 없어 만들지 않음</span><span class="ok">✓ 완료</span> — 브라우저에서 outputs/prototype.html 열기</div>
      <div class="t15" style="margin-top:14px;background:#fff;border-radius:10px">${tbl(['PRD 섹션', '화면'], [
    ['§3 시나리오 1 — 가입 직후 계좌 연동', '온보딩'],
    ['§5 P0 — 추천 목표 카드 3개(룰 기반)', '추천 목표 카드 3'],
    ['§5 P0 — 목표 설정 4단계 → 2단계', '목표 설정 2단계'],
    ['§5 P0 — 첫 저축 넛지 알림', '첫 저축 넛지'],
  ], { widths: ['62%', '38%'] })}</div>
    </div>
    <div style="flex:none;position:relative">${bd(2)}<div class="phone" style="outline:2px solid #0066CC;outline-offset:4px"><img src="${BUILDER}moneyfit-proto-03-goal.png"></div></div>
  </div>
  <div class="wm abs">${WM}</div>
</div>`);

// [가정]·[확인 필요]·[미정]·[강의 전 확인] 태그 강조
const TAG = /\[(가정|확인 필요|미정|강의 전 확인)(:[^\]]*)?\]/g;
for (const s of screens) s.html = s.html.replace(TAG, (m) => `<span class="tg">${m}</span>`).replace(/<span class="tg"><span class="tg">(.*?)<\/span><\/span>/g, '<span class="tg">$1</span>');
