#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
교육용 가상 데이터 생성 스크립트 — 머니핏(MoneyFit) / 가상 회사 핀트리(FinTree)

- KMAC 기획자 과정 M5 「생성형 AI를 활용한 기획자 업무생산성 향상」 Session 3 실습용
- 표준 라이브러리(csv, random, datetime)만 사용. pandas 불필요.
- random.seed(20260919) 고정 → 누가 실행해도 같은 파일이 나온다.
- 실제 기업·인물·거래와 무관한 가상 데이터. 개인정보 컬럼 없음.

실행:
    python3 generate-sample-data.py
출력(같은 폴더):
    moneyfit-events.csv          약 1,500행 — 가입 → 계좌 연동 → 목표 설정 → 첫 저축 → 30일 활성 퍼널 이벤트
    moneyfit-transactions.csv    약 600행  — 2026-08 가상 소비·저축 거래
    (moneyfit-kickoff-meeting-notes.md, README.md 는 수작업 문서 — 이 스크립트가 덮어쓰지 않음)
"""
import csv
import os
import random
from datetime import date, timedelta

SEED = 20260919
random.seed(SEED)

HERE = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------------------
# 1. 이벤트 퍼널 데이터
# ---------------------------------------------------------------------------
N_USERS = 500  # 500명 × 평균 약 2.98 이벤트 ≈ 1,490행

FUNNEL = ["signup", "link_account", "set_goal", "first_saving", "d30_active"]

# 설계 잔존율(전체 기준): 100 → 78 → 55 → 38 → 27 %
# 단계 전환율로 환산: 78%, 70.5%, 69.1%, 71.1%
BASE_STEP_CONV = {
    "link_account": 0.78,
    "set_goal": 0.705,
    "first_saving": 0.691,
    "d30_active": 0.711,
}

CHANNELS = ["app_store", "play_store", "referral", "ad"]
CHANNEL_WEIGHTS = [0.40, 0.35, 0.10, 0.15]
AGE_BANDS = ["25-29", "30-34", "35-39"]
AGE_WEIGHTS = [0.40, 0.38, 0.22]

# 채널·연령대별 전환 배수 (교육용 패턴: 추천 가입은 연동·목표 설정이 높고, 광고 유입은 연동이 낮다)
CHANNEL_MULT = {
    "app_store": {"link_account": 1.00, "set_goal": 1.00, "first_saving": 1.00, "d30_active": 1.00},
    "play_store": {"link_account": 0.98, "set_goal": 0.98, "first_saving": 1.00, "d30_active": 0.98},
    "referral": {"link_account": 1.15, "set_goal": 1.12, "first_saving": 1.08, "d30_active": 1.10},
    "ad": {"link_account": 0.84, "set_goal": 0.88, "first_saving": 0.94, "d30_active": 0.92},
}
AGE_MULT = {
    "25-29": {"link_account": 1.00, "set_goal": 0.95, "first_saving": 0.90, "d30_active": 0.95},
    "30-34": {"link_account": 1.00, "set_goal": 1.02, "first_saving": 1.04, "d30_active": 1.02},
    "35-39": {"link_account": 0.98, "set_goal": 1.05, "first_saving": 1.10, "d30_active": 1.06},
}

SIGNUP_START = date(2026, 6, 1)
SIGNUP_END = date(2026, 8, 31)
SIGNUP_DAYS = (SIGNUP_END - SIGNUP_START).days


def rand_signup_date():
    # 8월에 가입이 조금 더 많은 완만한 증가 패턴
    r = random.random()
    if r < 0.28:
        d = random.randint(0, 29)          # 6월
    elif r < 0.62:
        d = random.randint(30, 60)         # 7월
    else:
        d = random.randint(61, SIGNUP_DAYS)  # 8월
    return SIGNUP_START + timedelta(days=d)


def gen_events():
    rows = []
    users = []
    for i in range(1, N_USERS + 1):
        uid = "U{:04d}".format(i)
        signup = rand_signup_date()
        channel = random.choices(CHANNELS, weights=CHANNEL_WEIGHTS, k=1)[0]
        age = random.choices(AGE_BANDS, weights=AGE_WEIGHTS, k=1)[0]
        users.append((uid, signup, age, channel))

        rows.append([uid, signup.isoformat(), age, channel, "signup", signup.isoformat()])
        prev_date = signup
        reached = ["signup"]
        for step in FUNNEL[1:]:
            p = BASE_STEP_CONV[step] * CHANNEL_MULT[channel][step] * AGE_MULT[age][step]
            p = min(p, 0.97)
            if random.random() >= p:
                break
            if step == "link_account":
                ev = prev_date + timedelta(days=random.choice([0, 0, 0, 1, 1, 2, 3]))
            elif step == "set_goal":
                ev = prev_date + timedelta(days=random.choice([0, 0, 1, 1, 2, 3, 5, 7]))
            elif step == "first_saving":
                ev = prev_date + timedelta(days=random.choice([1, 2, 3, 5, 7, 10, 14]))
            else:  # d30_active: 가입 후 30~34일 사이 활성
                ev = signup + timedelta(days=random.randint(30, 34))
            rows.append([uid, signup.isoformat(), age, channel, step, ev.isoformat()])
            prev_date = ev
            reached.append(step)

    # ---- 의도적 데이터 품질 이슈 3종 (교육용, README에 정답 공개) ----
    # (a) 이벤트 날짜가 가입일보다 앞선 행 3건 (시계 오류 재현)
    for uid in ["U0042", "U0187", "U0333"]:
        base = [r for r in rows if r[0] == uid and r[4] == "signup"][0]
        signup = date.fromisoformat(base[1])
        rows.append([uid, base[1], base[2], base[3], "link_account", (signup - timedelta(days=2)).isoformat()])
    # (b) 완전 중복 행 2건 (중복 적재 재현)
    for uid in ["U0105", "U0260"]:
        dup = [r for r in rows if r[0] == uid and r[4] == "signup"][0]
        rows.append(list(dup))
    # (c) 선행 단계 없이 후행 단계만 있는 행 2건 (누락 적재 재현: link_account 없이 set_goal)
    for uid in ["U0077", "U0412"]:
        base = [r for r in rows if r[0] == uid and r[4] == "signup"][0]
        has_link = any(r[0] == uid and r[4] == "link_account" for r in rows)
        if not has_link:
            signup = date.fromisoformat(base[1])
            rows.append([uid, base[1], base[2], base[3], "set_goal", (signup + timedelta(days=4)).isoformat()])

    random.shuffle(rows)
    # 정렬: user_id, event 순서 → 읽기 쉬운 파일
    order = {e: i for i, e in enumerate(FUNNEL)}
    rows.sort(key=lambda r: (r[0], order[r[4]], r[5]))
    return rows, users


# ---------------------------------------------------------------------------
# 2. 거래 데이터 (2026-08)
# ---------------------------------------------------------------------------
CATEGORY_SPEC = {
    # category: (가중치, (최소, 최대) 원, 1,000원 단위 반올림 여부, merchant_type 후보)
    "식비": (0.30, (4500, 42000), 100, ["편의점형", "카페형", "배달앱형", "일반음식점형", "마트형"]),
    "교통": (0.15, (1250, 28000), 50, ["대중교통형", "택시형", "공유모빌리티형", "주유형"]),
    "구독": (0.10, (4900, 24900), 100, ["OTT구독형", "음악구독형", "클라우드구독형", "생산성앱구독형"]),
    "쇼핑": (0.15, (9800, 189000), 100, ["온라인쇼핑형", "패션형", "생활용품형", "전자기기형"]),
    "저축": (0.12, (50000, 500000), 10000, ["자동이체저축형", "수시입금저축형"]),
    "공과금": (0.08, (18000, 120000), 100, ["통신요금형", "전기요금형", "가스요금형", "관리비형"]),
    "여가": (0.10, (8000, 95000), 100, ["영화관형", "헬스장형", "공연형", "취미클래스형"]),
}
N_TXN = 600


def round_to(x, unit):
    return int(round(x / unit) * unit)


def gen_transactions(users):
    # 거래는 계좌를 연동한 사용자(퍼널 2단계 이상)에게서만 발생한다는 가정
    linked = [u for u in users if u[4]]
    cats = list(CATEGORY_SPEC.keys())
    weights = [CATEGORY_SPEC[c][0] for c in cats]
    rows = []
    for i in range(1, N_TXN + 1):
        u = random.choice(linked)
        cat = random.choices(cats, weights=weights, k=1)[0]
        _, (lo, hi), unit, merchants = CATEGORY_SPEC[cat]
        # 오른쪽으로 긴 꼬리를 흉내낸 금액 분포
        amt = lo + (hi - lo) * (random.random() ** 2.2)
        amt = max(lo, round_to(amt, unit))
        txn_date = date(2026, 8, random.randint(1, 31))
        rows.append(["T{:05d}".format(i), u[0], txn_date.isoformat(), cat, amt, random.choice(merchants)])

    # ---- 의도적 이상치 3종 (교육용, README에 정답 공개) ----
    # (a) 고액 쇼핑 1건 (이상치 vs 정상 대형 구매 판단 연습)
    rows.append(["T00601", linked[7][0], "2026-08-14", "쇼핑", 1850000, "전자기기형"])
    # (b) 환불로 보이는 음수 금액 1건 (부호 처리 규칙 확인 연습)
    rows.append(["T00602", linked[19][0], "2026-08-21", "쇼핑", -89000, "온라인쇼핑형"])
    # (c) 완전 중복 거래 1건 (txn_id까지 동일 → 중복 적재 재현)
    rows.append(list(rows[120]))

    rows.sort(key=lambda r: (r[2], r[0]))
    return rows


def main():
    events, users = gen_events()
    # 사용자별 계좌 연동 여부 플래그 부여 (거래 생성용)
    linked_ids = {r[0] for r in events if r[4] == "link_account"}
    users_with_flag = [(u[0], u[1], u[2], u[3], u[0] in linked_ids) for u in users]
    txns = gen_transactions(users_with_flag)

    ev_path = os.path.join(HERE, "moneyfit-events.csv")
    with open(ev_path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["user_id", "signup_date", "age_band", "channel", "event", "event_date"])
        w.writerows(events)

    tx_path = os.path.join(HERE, "moneyfit-transactions.csv")
    with open(tx_path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["txn_id", "user_id", "txn_date", "category", "amount", "merchant_type"])
        w.writerows(txns)

    # ---- 콘솔 요약 (README 작성용) ----
    print("events rows:", len(events), "| users:", len(users))
    step_users = {}
    for step in FUNNEL:
        step_users[step] = len({r[0] for r in events if r[4] == step})
    prev = None
    for step in FUNNEL:
        n = step_users[step]
        overall = n / step_users["signup"] * 100
        step_conv = (n / prev * 100) if prev else 100.0
        print("  {:<13} {:>4} users  overall {:5.1f}%  step {:5.1f}%".format(step, n, overall, step_conv))
        prev = n
    print("  by channel (link_account / set_goal conversion):")
    for ch in CHANNELS:
        s = len({r[0] for r in events if r[4] == "signup" and r[3] == ch})
        l = len({r[0] for r in events if r[4] == "link_account" and r[3] == ch})
        g = len({r[0] for r in events if r[4] == "set_goal" and r[3] == ch})
        fs = len({r[0] for r in events if r[4] == "first_saving" and r[3] == ch})
        d30 = len({r[0] for r in events if r[4] == "d30_active" and r[3] == ch})
        print("    {:<10} signup {:>3} link {:>3} ({:4.1f}%) goal {:>3} ({:4.1f}%) saving {:>3} d30 {:>3}".format(
            ch, s, l, l / s * 100 if s else 0, g, g / l * 100 if l else 0, fs, d30))
    print("  by age_band:")
    for ab in AGE_BANDS:
        s = len({r[0] for r in events if r[4] == "signup" and r[2] == ab})
        g = len({r[0] for r in events if r[4] == "set_goal" and r[2] == ab})
        fs = len({r[0] for r in events if r[4] == "first_saving" and r[2] == ab})
        print("    {:<6} signup {:>3} goal {:>3} saving {:>3} ({:4.1f}% of goal)".format(ab, s, g, fs, fs / g * 100 if g else 0))
    print("transactions rows:", len(txns))
    by_cat = {}
    for r in txns:
        by_cat.setdefault(r[3], [0, 0])
        by_cat[r[3]][0] += 1
        by_cat[r[3]][1] += r[4]
    for c, (n, s) in sorted(by_cat.items(), key=lambda kv: -kv[1][1]):
        print("  {:<4} n={:>3} sum={:>10,} avg={:>9,.0f}".format(c, n, s, s / n))


if __name__ == "__main__":
    main()
