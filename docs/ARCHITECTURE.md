# DataQuest AI Architecture Specification

## Architectural Overview

DataQuest AI is designed following **Clean Architecture** and **Domain-Driven Design (DDD)** principles to achieve scalability, maintainability, strict separation of concerns, and high testability.

```
+-----------------------------------------------------------------------+
|                            Client Layer                               |
|          React 18 + TypeScript + Vite + Tailwind CSS + Recharts       |
+-----------------------------------------------------------------------+
                                   |
                             REST / WebSockets
                                   v
+-----------------------------------------------------------------------+
|                            API Gateway                                |
|          FastAPI + CORS Middleware + OAuth2 JWT Guard + Rate Limiter  |
+-----------------------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         |                                                   |
         v                                                   v
+-------------------------------+   +-----------------------------------+
|     Data Engineering Engine    |   |     Machine Learning Engine       |
|  - Pandas/Polars Ingestion    |   |  - Scikit-Learn Model Zoo         |
|  - KNN & MICE Imputers        |   |  - XGBoost / LightGBM Trainers    |
|  - Outlier Capping & Scalers  |   |  - Optuna Hyperparameter Tuner    |
|  - EDA & Correlation Calc     |   |  - SHAP Model Explainability      |
+-------------------------------+   +-----------------------------------+
         |                                                   |
         +-------------------------+-------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    Gamification & Progression Engine                  |
|  - XP Progression Curve & Leveling Logic                              |
|  - Streak Management & Activity Tracking                              |
|  - Redis Sorted Sets Leaderboard Engine (`ZADD`, `ZREVRANGE`)          |
|  - Quest Verifier & Achievement Unlocker                              |
+-----------------------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         |                                                   |
         v                                                   v
+-------------------------------+   +-----------------------------------+
|      PostgreSQL 15+ DB        |   |         Redis 7+ Cache            |
|  - Users, Quests, Badges      |   |  - Real-Time Leaderboards         |
|  - Dataset & Pipeline Models  |   |  - WebSocket Pub/Sub & XP Stream  |
|  - Trained Model Metadata     |   |  - Session & JWT Blacklist        |
+-------------------------------+   +-----------------------------------+
```

---

## Layer Responsibilities

### 1. Presentation Layer (`frontend/src`)
- Implements single-page user experiences using modular React components.
- Manages local UI state with React hooks and global application state with **Zustand**.
- Renders interactive data science visualizations (correlation matrices, distribution charts, ROC curves, confusion matrices, SHAP waterfall plots) using Recharts, Chart.js, and D3.js.
- Provides an embedded code editor using **Monaco Editor** for custom feature expressions.

### 2. API Gateway & Controller Layer (`backend/app/api`)
- Exposes RESTful JSON API endpoints structured under `/api/v1/`.
- Manages authentication via **OAuth2 Password Bearer** and **PyJWT**.
- Handles asynchronous WebSocket connections for streaming model training progress and real-time gamification notifications.

### 3. Business & Processing Services Layer (`backend/app/services`)
- **`data_ingestion_service.py`**: Reads raw data files in chunks, infers schemas, generates statistical data dictionaries, and versions dataset snapshots.
- **`data_cleaning_service.py`**: Executes configurable transformation pipelines (missing value imputation, outlier detection, encoding, scaling).
- **`eda_service.py`**: Computes descriptive statistics, correlation matrices (Pearson, Spearman, Cramér's V), and normality tests.
- **`ml_trainer_service.py`**: Wraps 10+ machine learning algorithms with cross-validation and hyperparameter optimization.
- **`ml_evaluator_service.py`**: Calculates comprehensive performance metrics, ROC curves, residuals, and SHAP explainability matrices.
- **`gamification_engine.py`**: Computes user XP earnings, evaluates quest submission benchmarks, updates streaks, and triggers achievement unlocks.

### 4. Data Access & Persistence Layer (`backend/app/models` & `backend/app/core`)
- Uses **SQLAlchemy 2.0 Async Engine** with `asyncpg` for PostgreSQL interactions.
- Uses **Alembic** for schema migrations.
- Interacts with **Redis** via `redis-py` async client for leaderboard caching and WebSocket event streams.
