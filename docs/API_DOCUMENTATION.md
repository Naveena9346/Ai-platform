# DataQuest AI API Specification

## Base URL & Authentication
- Base URL: `http://localhost:8000/api/v1`
- Authentication Header: `Authorization: Bearer <jwt_access_token>`

---

## Endpoint Index

### Auth & Users
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register new user account |
| `POST` | `/auth/login` | Authenticate and obtain JWT token |
| `GET` | `/users/me` | Fetch current user profile & gamification status |
| `PUT` | `/users/me/profile` | Update bio, avatar, and equipped title |

### Data Management & Preprocessing
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/datasets/upload` | Upload new dataset (CSV, Parquet, JSON, Excel) |
| `GET` | `/datasets` | List all user datasets |
| `GET` | `/datasets/{id}` | Get dataset schema & preview rows |
| `POST` | `/preprocessing/clean` | Apply missing value imputation & outlier handling |
| `POST` | `/preprocessing/encode` | Execute feature encoding & scaling transformations |

### Exploratory Data Analysis (EDA)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/eda/{dataset_id}/summary` | Compute descriptive statistical summary |
| `GET` | `/eda/{dataset_id}/correlations` | Compute Pearson/Spearman correlation matrices |
| `GET` | `/eda/{dataset_id}/distributions` | Run distribution & normality test analysis |

### Machine Learning Engine
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/ml/train` | Train ML model (10+ supported algorithms) |
| `POST` | `/ml/tune` | Hyperparameter tuning with Optuna |
| `GET` | `/ml/models/{id}/evaluation` | Fetch detailed evaluation & SHAP metrics |
| `POST` | `/ml/models/compare` | Compare multiple models side-by-side |
| `POST` | `/ml/predict/single` | Interactive single-record inference |
| `POST` | `/ml/predict/batch` | Batch inference on uploaded dataset |

### Gamification & Quests
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/gamification/overview` | Fetch XP, Level, Streak, and Badge stats |
| `GET` | `/gamification/leaderboard` | Fetch global/monthly live leaderboard |
| `GET` | `/gamification/quests` | Fetch active daily/weekly data challenges |
| `POST` | `/gamification/quests/{id}/submit` | Submit model/pipeline to quest challenge |
