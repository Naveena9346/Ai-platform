# DataQuest AI Database Design & ERD

## Relational Entity-Relationship Summary

The relational database architecture is built on **PostgreSQL 15+** using UUID primary keys, JSONB columns for flexible pipeline/metric configurations, and foreign key constraints with cascade rules.

```
+------------------+         +-------------------------------+
|      users       |1       1|  user_gamification_profiles   |
|------------------|<------->|-------------------------------|
| id (PK)          |         | user_id (PK, FK)              |
| username         |         | xp, level, points             |
| email            |         | current_streak, longest_streak|
| role             |         +-------------------------------+
+------------------+
         | 1
         |
         | *
+------------------+         +-------------------------------+
|     datasets     |1       *|       dataset_versions        |
|------------------|<------->|-------------------------------|
| id (PK)          |         | id (PK)                       |
| user_id (FK)     |         | dataset_id (FK)               |
| name, format     |         | version_number, file_path     |
+------------------+         +-------------------------------+
                                             | 1
                                             |
                                             | *
                             +-------------------------------+
                             |           ml_models           |
                             |-------------------------------|
                             | id (PK)                       |
                             | dataset_version_id (FK)       |
                             | algorithm, problem_type       |
                             +-------------------------------+
                                             | 1
                                             |
                                             | *
                             +-------------------------------+
                             |       model_evaluations       |
                             |-------------------------------|
                             | id (PK)                       |
                             | model_id (FK)                 |
                             | metrics (JSONB)               |
                             +-------------------------------+
```

---

## Detailed Table Specifications

### 1. `users`
Stores user authentication credentials, role assignments, and account metadata.
- `id`: UUID (Primary Key)
- `username`: VARCHAR(50) (Unique, Indexed)
- `email`: VARCHAR(255) (Unique, Indexed)
- `hashed_password`: VARCHAR(255)
- `role`: VARCHAR(20) (Default: 'analyst')
- `is_active`: BOOLEAN
- `created_at`: TIMESTAMP WITH TIME ZONE
- `updated_at`: TIMESTAMP WITH TIME ZONE

### 2. `user_gamification_profiles`
Tracks user experience, leveling progression, points, activity streaks, and unlocked cosmetic titles.
- `user_id`: UUID (Primary Key, Foreign Key -> `users.id` ON DELETE CASCADE)
- `xp`: BIGINT (Default: 0)
- `level`: INT (Default: 1)
- `points`: INT (Default: 0)
- `current_streak`: INT (Default: 0)
- `longest_streak`: INT (Default: 0)
- `last_activity_date`: DATE
- `unlocked_titles`: JSONB
- `equipped_title`: VARCHAR(100)

### 3. `datasets` & `dataset_versions`
Manages raw uploaded datasets and versioned transformation outputs.
- `datasets.id`: UUID (Primary Key)
- `datasets.user_id`: UUID (Foreign Key -> `users.id`)
- `datasets.name`: VARCHAR(255)
- `datasets.schema_metadata`: JSONB (Inferred data types, missing counts, statistics)
- `dataset_versions.id`: UUID (Primary Key)
- `dataset_versions.dataset_id`: UUID (Foreign Key -> `datasets.id`)
- `dataset_versions.version_number`: INT
- `dataset_versions.transformation_log`: JSONB (Applied imputation, scaling, encoding steps)

### 4. `ml_models` & `model_evaluations`
Stores trained machine learning model metadata, hyperparameters, serialized artifact paths, and evaluation metrics.
- `ml_models.id`: UUID (Primary Key)
- `ml_models.dataset_version_id`: UUID (Foreign Key -> `dataset_versions.id`)
- `ml_models.algorithm`: VARCHAR(50) (e.g. 'random_forest', 'xgboost', 'knn')
- `ml_models.problem_type`: VARCHAR(30) ('regression', 'classification', 'clustering')
- `ml_models.hyperparameters`: JSONB
- `model_evaluations.metrics`: JSONB (Accuracy, Precision, Recall, F1, MSE, R2, Silhouette)
- `model_evaluations.confusion_matrix`: JSONB
- `model_evaluations.feature_importances`: JSONB
- `model_evaluations.shap_values_summary`: JSONB

### 5. `quests`, `quest_submissions`, `achievements`, `user_achievements`
Tracks active data science challenges, user challenge attempts, and badge achievements.
- `quests.requirements_config`: JSONB (Minimum target metric thresholds, e.g. `{"metric": "f1_score", "threshold": 0.85}`)
- `quest_submissions.status`: VARCHAR(20) ('passed', 'failed', 'pending')
- `user_achievements.unlocked_at`: TIMESTAMP WITH TIME ZONE
