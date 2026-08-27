from typing import Any
import numpy as np
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score, roc_auc_score,
    confusion_matrix, mean_squared_error, mean_absolute_error, r2_score,
    silhouette_score, davies_bouldin_score, calinski_harabasz_score
)


class MLEvaluatorService:
    @staticmethod
    def evaluate_classification(
        y_true: Any,
        y_pred: Any,
        y_prob: Any = None,
        feature_names: list[str] | None = None,
        model: Any = None
    ) -> dict[str, Any]:
        acc = float(accuracy_score(y_true, y_pred))
        prec = float(precision_score(y_true, y_pred, average="weighted", zero_division=0))
        rec = float(recall_score(y_true, y_pred, average="weighted", zero_division=0))
        f1 = float(f1_score(y_true, y_pred, average="weighted", zero_division=0))

        roc_auc = None
        if y_prob is not None:
            try:
                if len(np.unique(y_true)) == 2:
                    roc_auc = float(roc_auc_score(y_true, y_prob[:, 1]))
                else:
                    roc_auc = float(roc_auc_score(y_true, y_prob, multi_class="ovr"))
            except Exception:
                roc_auc = None

        cm = confusion_matrix(y_true, y_pred)
        cm_dict = {
            "matrix": cm.tolist(),
            "labels": [str(c) for c in np.unique(y_true)]
        }

        feature_importances = None
        if model and feature_names:
            if hasattr(model, "feature_importances_"):
                imp = model.feature_importances_
                feature_importances = {name: float(val) for name, val in zip(feature_names, imp)}
            elif hasattr(model, "coef_"):
                coef = np.abs(model.coef_).ravel()
                if len(coef) == len(feature_names):
                    feature_importances = {name: float(val) for name, val in zip(feature_names, coef)}

        return {
            "metrics": {
                "accuracy": round(acc, 4),
                "precision": round(prec, 4),
                "recall": round(rec, 4),
                "f1_score": round(f1, 4),
                "roc_auc": round(roc_auc, 4) if roc_auc is not None else 0.0
            },
            "confusion_matrix": cm_dict,
            "roc_curve_data": None,
            "feature_importances": feature_importances,
            "shap_values_summary": None
        }

    @staticmethod
    def evaluate_regression(
        y_true: Any,
        y_pred: Any,
        feature_names: list[str] | None = None,
        model: Any = None
    ) -> dict[str, Any]:
        mse = float(mean_squared_error(y_true, y_pred))
        rmse = float(np.sqrt(mse))
        mae = float(mean_absolute_error(y_true, y_pred))
        r2 = float(r2_score(y_true, y_pred))

        feature_importances = None
        if model and feature_names:
            if hasattr(model, "feature_importances_"):
                imp = model.feature_importances_
                feature_importances = {name: float(val) for name, val in zip(feature_names, imp)}
            elif hasattr(model, "coef_"):
                coef = np.abs(model.coef_).ravel()
                if len(coef) == len(feature_names):
                    feature_importances = {name: float(val) for name, val in zip(feature_names, coef)}

        return {
            "metrics": {
                "mse": round(mse, 4),
                "rmse": round(rmse, 4),
                "mae": round(mae, 4),
                "r2_score": round(r2, 4)
            },
            "confusion_matrix": None,
            "roc_curve_data": None,
            "feature_importances": feature_importances,
            "shap_values_summary": None
        }

    @staticmethod
    def evaluate_clustering(X: Any, labels: Any) -> dict[str, float]:
        unique_labels = set(labels) - {-1}
        if len(unique_labels) < 2:
            return {"silhouette_score": -1.0, "davies_bouldin": 999.0, "calinski_harabasz": 0.0}

        sil = float(silhouette_score(X, labels))
        db = float(davies_bouldin_score(X, labels))
        ch = float(calinski_harabasz_score(X, labels))

        return {
            "silhouette_score": round(sil, 4),
            "davies_bouldin": round(db, 4),
            "calinski_harabasz": round(ch, 4)
        }
