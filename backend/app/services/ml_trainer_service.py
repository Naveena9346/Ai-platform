from pathlib import Path
from typing import Any
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet, LogisticRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.naive_bayes import GaussianNB, MultinomialNB
from sklearn.svm import SVC, SVR
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
from xgboost import XGBClassifier, XGBRegressor

from app.schemas.ml import MLTrainRequest
from app.utils.pandas_helpers import read_dataset_file
from app.utils.model_serializers import save_trained_model_artifact
from app.services.ml_evaluator_service import MLEvaluatorService
from app.core.exceptions import ModelTrainingError


class MLTrainerService:
    @classmethod
    def train_model(
        cls,
        file_path: str | Path,
        artifact_save_path: str | Path,
        request: MLTrainRequest
    ) -> dict[str, Any]:
        df = read_dataset_file(file_path)

        # Validate feature columns
        for col in request.feature_columns:
            if col not in df.columns:
                raise ModelTrainingError(f"Feature column '{col}' not found in dataset")

        X = df[request.feature_columns].fillna(0)

        # -------------------------------------------------------------
        # Unsupervised Clustering Algorithms
        # -------------------------------------------------------------
        if request.problem_type == "clustering":
            n_clusters = int(request.hyperparameters.get("n_clusters", 3))
            if request.algorithm == "kmeans":
                model = KMeans(n_clusters=n_clusters, random_state=request.random_state, n_init=10)
            elif request.algorithm == "dbscan":
                eps = float(request.hyperparameters.get("eps", 0.5))
                min_samples = int(request.hyperparameters.get("min_samples", 5))
                model = DBSCAN(eps=eps, min_samples=min_samples)
            else:
                model = AgglomerativeClustering(n_clusters=n_clusters)

            labels = model.fit_predict(X)
            save_trained_model_artifact(model, artifact_save_path)

            metrics = MLEvaluatorService.evaluate_clustering(X, labels)
            return {
                "metrics": metrics,
                "confusion_matrix": None,
                "roc_curve_data": None,
                "feature_importances": None,
                "shap_values_summary": None
            }

        # -------------------------------------------------------------
        # Supervised Learning Algorithms (Regression / Classification)
        # -------------------------------------------------------------
        if not request.target_column or request.target_column not in df.columns:
            raise ModelTrainingError("Target column required for supervised learning")

        y = df[request.target_column].dropna()
        X = X.loc[y.index]

        # Train / Test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y,
            test_size=request.test_size,
            random_state=request.random_state
        )

        params = request.hyperparameters
        alg = request.algorithm

        # Build algorithm instance
        if request.problem_type == "regression":
            if alg == "linear_regression":
                model = LinearRegression()
            elif alg == "ridge":
                model = Ridge(alpha=float(params.get("alpha", 1.0)))
            elif alg == "lasso":
                model = Lasso(alpha=float(params.get("alpha", 1.0)))
            elif alg == "elasticnet":
                model = ElasticNet(alpha=float(params.get("alpha", 1.0)), l1_ratio=float(params.get("l1_ratio", 0.5)))
            elif alg == "decision_tree":
                model = DecisionTreeRegressor(max_depth=params.get("max_depth", None), random_state=request.random_state)
            elif alg == "random_forest":
                model = RandomForestRegressor(n_estimators=int(params.get("n_estimators", 100)), random_state=request.random_state)
            elif alg == "knn":
                model = KNeighborsRegressor(n_neighbors=int(params.get("n_neighbors", 5)))
            elif alg == "xgboost":
                model = XGBRegressor(n_estimators=int(params.get("n_estimators", 100)), random_state=request.random_state)
            else:
                model = LinearRegression()

        elif request.problem_type == "classification":
            if alg == "logistic_regression":
                model = LogisticRegression(max_iter=1000, random_state=request.random_state)
            elif alg == "decision_tree":
                model = DecisionTreeClassifier(max_depth=params.get("max_depth", None), random_state=request.random_state)
            elif alg == "random_forest":
                model = RandomForestClassifier(n_estimators=int(params.get("n_estimators", 100)), random_state=request.random_state)
            elif alg == "knn":
                model = KNeighborsClassifier(n_neighbors=int(params.get("n_neighbors", 5)))
            elif alg == "naive_bayes":
                model = GaussianNB()
            elif alg == "xgboost":
                model = XGBClassifier(n_estimators=int(params.get("n_estimators", 100)), random_state=request.random_state)
            elif alg == "svm":
                model = SVC(probability=True, random_state=request.random_state)
            else:
                model = LogisticRegression(max_iter=1000)

        # Fit model
        try:
            model.fit(X_train, y_train)
        except Exception as e:
            raise ModelTrainingError(f"Failed to fit model: {str(e)}")

        # Save binary artifact
        save_trained_model_artifact(model, artifact_save_path)

        # Predict & Evaluate
        y_pred = model.predict(X_test)

        if request.problem_type == "classification":
            y_prob = model.predict_proba(X_test) if hasattr(model, "predict_proba") else None
            eval_results = MLEvaluatorService.evaluate_classification(y_test, y_pred, y_prob, request.feature_columns, model)
        else:
            eval_results = MLEvaluatorService.evaluate_regression(y_test, y_pred, request.feature_columns, model)

        return eval_results
