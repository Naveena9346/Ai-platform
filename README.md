# DataQuest AI: Gamified Enterprise AI/ML & Data Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Python Version](https://img.shields.io/badge/python-3.11%2B-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.0%2B-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![LOC](https://img.shields.io/badge/LOC-50K%2B-orange)

**DataQuest AI** is a production-grade, large-scale, full-stack enterprise data science and machine learning platform powered by a real-time gamification engine. It enables users—from aspiring data analysts to seasoned machine learning engineers—to perform end-to-end data processing, exploratory data analysis (EDA), feature engineering, model training, evaluation, SHAP explainability, and deployment while earning XP, leveling up, maintaining activity streaks, unlocking badges, and competing on global leaderboards.

---

## 🌟 Key Features

### 📊 Data Engineering & Analytics Studio
- **Multi-Format Ingestion**: Streaming upload support for CSV, JSON, TSV, Parquet, and Excel files with automated schema inferencing.
- **Data Cleaning & Imputation**: Automated handling of missing values (Mean/Median fill, KNN Imputation, MICE Iterative Imputer) and outlier remediation (Z-Score, IQR, Isolation Forest).
- **Categorical & Numeric Preprocessing**: One-Hot, Ordinal, Target, Frequency encoding, StandardScaler, MinMaxScaler, RobustScaler.
- **Exploratory Data Analysis (EDA)**: Interactive Pearson/Spearman correlation matrices, Shapiro-Wilk normality tests, missingness diagnostics, and one-click summary PDF/JSON reports.
- **Feature Engineering & Selection**: Custom mathematical feature expression builder, Polynomial Features generator, Recursive Feature Elimination (RFE), Mutual Information, PCA dimensionality reduction.

### 🤖 Machine Learning & AI Model Zoo
- **Supervised Regression**: Linear Regression, Ridge, Lasso, ElasticNet, Decision Tree Regressor, Random Forest Regressor, KNN Regressor, XGBoost Regressor, Gradient Boosting.
- **Supervised Classification**: Logistic Regression, Decision Tree Classifier, Random Forest Classifier, K-Nearest Neighbors (KNN), Gaussian Naive Bayes, Multinomial Naive Bayes, XGBoost Classifier, Support Vector Classifier (SVC).
- **Unsupervised Clustering**: K-Means Clustering (Elbow method & Silhouette visualization), DBSCAN, Agglomerative Hierarchical Clustering.
- **Automated Hyperparameter Tuning**: Bayesian optimization via Optuna & GridSearchCV.
- **Model Explainability & Evaluation Suite**: ROC-AUC curves, Precision-Recall curves, Confusion Matrices, Residual Plots, SHAP (SHapley Additive exPlanations) feature attribution.
- **Model Deployment & Inference**: REST API single-instance and batch prediction endpoints, ONNX/Joblib model exports.

### 🎮 Gamification Engine
- **XP & Level Progression**: Dynamic XP formulas based on pipeline complexity and model performance.
- **Streaks & Shields**: Activity streak tracking with unlockable streak-freeze shields.
- **Quests & Missions**: Daily missions, weekly domain challenges, and campaign story mode quests.
- **Badges & Achievements**: 30+ unlockable achievement tiers across 5 data science disciplines.
- **Real-Time Leaderboards**: Redis-backed global, monthly, and challenge-specific live leaderboards.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI** | React 18, TypeScript 5, Vite, Tailwind CSS, Recharts, D3.js, Chart.js, Monaco Code Editor |
| **Backend API** | Python 3.11, FastAPI, Pydantic v2, Async SQLAlchemy 2.0, Alembic, Uvicorn, Celery |
| **Data & ML Stack** | Pandas, Polars, NumPy, SciPy, Statsmodels, Scikit-Learn, XGBoost, LightGBM, Optuna, SHAP, Joblib, ONNX |
| **Database & Cache** | PostgreSQL 15+, Redis 7+ (Sorted Sets, WebSockets Pub/Sub) |
| **DevOps & QA** | Docker, Docker Compose, GitHub Actions CI/CD, PyTest, Vitest, Playwright, Ruff, Mypy |

---

## 🏗️ Architecture & Directory Layout

```
dataquest-ai/
├── backend/                  # Python FastAPI Backend & ML Engine
│   ├── app/
│   │   ├── api/              # REST & WebSocket API Routers (v1)
│   │   ├── core/             # Database, Security, Config, Middleware
│   │   ├── models/           # SQLAlchemy Relational Models
│   │   ├── schemas/          # Pydantic v2 Request/Response Schemas
│   │   ├── services/         # Business Logic, Data Transformers & ML Trainers
│   │   └── utils/            # Math, Stats, Serializers & Helpers
│   └── alembic/              # Database Migration Scripts
├── frontend/                 # React 18 + TypeScript + Vite SPA
│   ├── src/
│   │   ├── components/       # Design System & UI Components
│   │   ├── pages/            # Dashboard, ML Studio & Gamification Pages
│   │   ├── services/         # Axios API Clients & WebSockets
│   │   ├── store/            # Zustand State Stores
│   │   └── types/            # TypeScript Interface Definitions
├── tests/                    # Backend & Frontend Automated Tests
└── docs/                     # Architectural, API & Schema Documentation
```

---

## 🚀 Quick Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+ & Redis 7+

### Local Setup with Docker Compose
```bash
# 1. Clone the repository
git clone https://github.com/your-username/dataquest-ai.git
cd dataquest-ai

# 2. Start PostgreSQL, Redis, Backend, and Frontend containers
docker-compose up -d --build

# 3. Access the application
# Frontend: http://localhost:5173
# API Docs (Swagger): http://localhost:8000/docs
```

---

## 🧪 Running Automated Tests

```bash
# Backend PyTest Suite
cd backend
pytest -v --cov=app

# Frontend Vitest Suite
cd frontend
npm run test
```

---

## 📜 Documentation

- [Architecture Guide](docs/ARCHITECTURE.md)
- [Database Schema Design](docs/DATABASE_DESIGN.md)
- [API Specification](docs/API_DOCUMENTATION.md)
- [ML Pipeline Architecture](docs/ML_PIPELINE.md)
- [Gamification System Docs](docs/GAMIFICATION_SYSTEM.md)
- [Local Setup Guide](docs/SETUP_GUIDE.md)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
