# DataQuest AI Gamification System Architecture

## Experience Points (XP) & Progression Formula

Users earn Experience Points (XP) by executing real-world data science operations, optimizing machine learning models, and completing interactive quests.

### XP Earnings Matrix
| Action | Base XP | Complexity Bonus |
| :--- | :--- | :--- |
| **Dataset Ingestion** | +50 XP | +25 XP (if >10k rows) |
| **Data Cleaning Executed** | +100 XP | +50 XP (if >3 imputation types) |
| **EDA Report Generated** | +75 XP | +25 XP |
| **Feature Engineering Pipeline** | +125 XP | +50 XP (if PCA/RFE used) |
| **Baseline Model Trained** | +150 XP | +50 XP |
| **Hyperparameter Optimization** | +200 XP | +100 XP (if Optuna >50 trials) |
| **Quest Benchmark Passed** | +300 XP | +150 XP (Hard/Insane difficulty) |
| **Daily Streak Maintained** | +100 XP | +25 XP x Streak Count (Max 7d) |

### Level Curve Formula
The user's level is calculated non-linearly using:

$$\text{Level} = \lfloor 1 + \sqrt{\frac{\text{Total XP}}{100}} \rfloor$$

---

## Daily Streaks & Streak Shields
- **Streak Rule**: Performing at least 1 pipeline execution or quest submission within a 24-hour window increments `current_streak`.
- **Streak Freeze Shields**: Users earn 1 "Streak Saver Shield" for every 5 levels gained, protecting their active streak if they miss a single day.

---

## Live Leaderboard Architecture (Redis Sorted Sets)
- **Global All-Time Leaderboard**: Managed in Redis via key `leaderboard:global` using `ZADD` and `ZREVRANGE`.
- **Monthly Leaderboard**: Managed via `leaderboard:monthly:YYYY-MM`.
- **Quest Leaderboards**: Ranked by submission metric score and execution runtime.
