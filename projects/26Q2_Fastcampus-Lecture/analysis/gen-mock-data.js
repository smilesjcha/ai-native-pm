// Shopping Mate mock 이벤트 로그 생성 (결정론적). 실습 Step 2 입력.
const fs = require('fs');
const COHORTS = [
  { wk: '2026-06-01', n: 1000, w1: 0.42 },
  { wk: '2026-06-08', n: 1250, w1: 0.45 },
  { wk: '2026-06-15', n: 1480, w1: 0.48 },
  { wk: '2026-06-22', n: 1610, w1: 0.51 },
];
// 퍼널 단계별(per-step) 잔존율 → 누적 ≈ open100·intent86·cand78·compare61·cart48·checkout31
const FUNNEL = [
  ['agent_open', 1.00], ['intent_submit', 0.86], ['candidates_view', 0.907],
  ['compare_view', 0.782], ['add_to_cart', 0.787], ['checkout', 0.646],
];
// 시드 PRNG (mulberry32)
let seed = 20260626; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const rows = [['user_id','signup_week','event','ts','surface']];
let uid = 1;
const surfaceOf = e => ({agent_open:'home',intent_submit:'srp',candidates_view:'plp',compare_view:'plp',add_to_cart:'pdp',checkout:'checkout'}[e]||'app');
for (const c of COHORTS) {
  for (let i = 0; i < c.n; i++) {
    const u = `u${String(uid++).padStart(6,'0')}`;
    const base = new Date(c.wk + 'T10:00:00Z').getTime();
    // funnel: 각 단계 잔존 확률만큼 진행
    let t = base + Math.floor(rnd()*6*3600*1000);
    for (const [ev, keep] of FUNNEL) {
      if (rnd() > keep) break;
      t += Math.floor(rnd()*180*1000);
      rows.push([u, c.wk, ev, new Date(t).toISOString(), surfaceOf(ev)]);
    }
    // 재구매(W1~W4): 코호트별 w1에서 매주 감쇠
    let p = c.w1;
    for (let wk = 1; wk <= 4; wk++) {
      if (rnd() < p) {
        const rt = base + wk*7*24*3600*1000 + Math.floor(rnd()*5*24*3600*1000);
        rows.push([u, c.wk, 'repurchase', new Date(rt).toISOString(), 'pdp']);
      }
      p *= 0.74;
    }
  }
}
fs.writeFileSync('data/mock-events.csv', rows.map(r=>r.join(',')).join('\n')+'\n');
console.log('rows:', rows.length-1, '→ analysis/data/mock-events.csv');
