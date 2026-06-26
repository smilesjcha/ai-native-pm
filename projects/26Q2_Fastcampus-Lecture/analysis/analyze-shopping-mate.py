"""
Shopping Mate mock 분석 — 코호트 재구매 리텐션 + 구매 퍼널.
실습 Step 2 참고/백업 스크립트. (강의에서는 Claude Code로 이 분석을 함께 작성)

실행: python3 analyze-shopping-mate.py
입력: data/mock-events.csv   출력: outputs/cohort.png, outputs/funnel.png + 콘솔 요약
"""
import os
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
# 한글 폰트 (macOS) — 없으면 무시
for f in ["AppleGothic", "NanumGothic", "Apple SD Gothic Neo"]:
    try:
        matplotlib.rcParams["font.family"] = f; break
    except Exception:
        pass
matplotlib.rcParams["axes.unicode_minus"] = False

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, "outputs")
os.makedirs(OUT, exist_ok=True)
ACTION = "#0066cc"

df = pd.read_csv(os.path.join(BASE, "data", "mock-events.csv"))
df["ts"] = pd.to_datetime(df["ts"], utc=True).dt.tz_localize(None)  # tz-naive로 통일
df["signup_week"] = pd.to_datetime(df["signup_week"])

# ── 1) 퍼널 (open → checkout 잔존율) ──
FUNNEL = ["agent_open", "intent_submit", "candidates_view", "compare_view", "add_to_cart", "checkout"]
LABELS = ["Agent 진입", "의도 입력", "후보 조회", "비교/상세", "장바구니", "결제"]
users = df.groupby("event")["user_id"].nunique()
base = users["agent_open"]
ret = [users.get(e, 0) / base * 100 for e in FUNNEL]

print("== 구매 퍼널 (open 기준 잔존율) ==")
prev = 100.0
for lab, r in zip(LABELS, ret):
    drop = r - prev
    print(f"  {lab:8s} {r:5.1f}%   ({drop:+.1f}%p)")
    prev = r
max_drop_i = min(range(1, len(ret)), key=lambda i: ret[i] - ret[i-1])
print(f"  → 최대 이탈 구간: {LABELS[max_drop_i-1]} → {LABELS[max_drop_i]} ({ret[max_drop_i]-ret[max_drop_i-1]:+.1f}%p)")

plt.figure(figsize=(7, 4))
bars = plt.barh(range(len(ret))[::-1], ret, color=[ACTION]*4 + ["#1f883d", "#0a3d82"])
plt.yticks(range(len(ret))[::-1], LABELS)
for i, r in enumerate(ret):
    plt.text(r + 1, len(ret)-1-i, f"{r:.0f}%", va="center", fontsize=9)
plt.title("Shopping Mate 구매 퍼널 (mock)")
plt.xlim(0, 110); plt.tight_layout()
plt.savefig(os.path.join(OUT, "funnel.png"), dpi=150)

# ── 2) 코호트 재구매 리텐션 (가입 주차 × W1~W4) ──
rep = df[df["event"] == "repurchase"].copy()
rep["week_offset"] = ((rep["ts"] - rep["signup_week"]).dt.days // 7).clip(lower=1, upper=4)
cohort_size = df.groupby("signup_week")["user_id"].nunique()
ret_users = rep.groupby(["signup_week", "week_offset"])["user_id"].nunique().unstack(fill_value=0)
cohort = (ret_users.div(cohort_size, axis=0) * 100).round(1)

print("\n== 코호트 재구매 리텐션 (%) ==")
print(cohort.to_string())

plt.figure(figsize=(6, 4))
plt.imshow(cohort.values, cmap="Blues", aspect="auto", vmin=0, vmax=55)
plt.xticks(range(cohort.shape[1]), [f"W{c}" for c in cohort.columns])
plt.yticks(range(cohort.shape[0]), [d.strftime("%m/%d") for d in cohort.index])
for i in range(cohort.shape[0]):
    for j in range(cohort.shape[1]):
        v = cohort.values[i, j]
        if v > 0:
            plt.text(j, i, f"{v:.0f}", ha="center", va="center",
                     color="white" if v > 30 else "#1d1d1f", fontsize=9)
plt.title("가입 주차별 재구매 리텐션 (mock)")
plt.colorbar(label="%"); plt.tight_layout()
plt.savefig(os.path.join(OUT, "cohort.png"), dpi=150)

print(f"\n저장: {OUT}/funnel.png, {OUT}/cohort.png")
