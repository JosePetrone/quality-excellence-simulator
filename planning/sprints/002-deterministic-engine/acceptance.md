# Sprint 002 acceptance

1. Replay identical effective inputs and compare all outputs and next state. Inputs stay intact, quarter 6 resolves and quarter 7 is unavailable. Explanations identify disruption, scheduled, applied and immediate effects.
2. Compare all financial and KPI outputs to these independently calculated fixtures. Q1 A blocks [training, process, complaints, technology, risk] = [0,1,2,0,0], B = [1,2,0,1,1]. Both spend zero thereafter.

| Team/Q | Profit | Cash | Authority | CSAT | Margin % | On-time % | PPM | Poor quality $ | Txns/hour | QES |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| A/1 | 20000 | 120000 | 20000 | 70 | 4 | 81 | 50000 | 50000 | 2 | 56.65 |
| B/1 | 0 | 100000 | 0 | 64 | 0 | 81 | 50000 | 50000 | 2 | 51.15 |
| A/2 | 65000 | 185000 | 70000 | 73 | 13 | 87 | 35000 | 35000 | 2 | 71.80 |
| B/2 | 75000 | 175000 | 50000 | 79 | 15 | 91 | 25000 | 25000 | 2.13 | 79.41 |
| A/3 | 60000 | 245000 | 120000 | 70 | 12 | 85 | 40000 | 40000 | 2 | 68.25 |
| B/3 | 60000 | 235000 | 100000 | 70 | 12 | 85 | 40000 | 40000 | 2 | 68.25 |

3. From A Q2, spend $120,000 on [5,5,0,0,2] in Q3. Assert −$60,000 profit, $125,000 cash, $0 authority, 56.25 QES. With no Q4 spend, assert 10,000 on-time, zero nonconforming, 4,500 hours, $225,000 cash, $50,000 authority, 97.14 QES.
4. Reject $60,000 in Q1 despite sufficient cash, and $50,000 with $40,000 cash despite enough authority. Reject missing, fractional, negative and over-limit counts. Preserve input state for every rejection.
5. Check each investment separately against zero spend, including when it activates and expires. Verify normalization, full precision QES and half-away rounding with discriminating inputs. One risk block in Q1 followed by zero Q2 spend yields exact QES 69.625, displayed as 69.63. Check the engine remains independent of any session or UI layer.
