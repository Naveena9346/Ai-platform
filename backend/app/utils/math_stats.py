import numpy as np
import pandas as pd
from scipy import stats


def compute_descriptive_stats(series: pd.Series) -> dict[str, float | int | None]:
    clean_s = series.dropna()
    if clean_s.empty:
        return {
            "mean": None, "median": None, "std": None, "min": None, "max": None,
            "skewness": None, "kurtosis": None, "q25": None, "q75": None,
            "missing_count": int(series.isna().sum()),
            "missing_percentage": float(round((series.isna().sum() / len(series)) * 100, 2)),
            "unique_count": int(series.nunique())
        }

    return {
        "mean": float(round(clean_s.mean(), 4)),
        "median": float(round(clean_s.median(), 4)),
        "std": float(round(clean_s.std(), 4)) if len(clean_s) > 1 else 0.0,
        "min": float(round(clean_s.min(), 4)),
        "max": float(round(clean_s.max(), 4)),
        "skewness": float(round(stats.skew(clean_s), 4)) if len(clean_s) > 2 else 0.0,
        "kurtosis": float(round(stats.kurtosis(clean_s), 4)) if len(clean_s) > 3 else 0.0,
        "q25": float(round(clean_s.quantile(0.25), 4)),
        "q75": float(round(clean_s.quantile(0.75), 4)),
        "missing_count": int(series.isna().sum()),
        "missing_percentage": float(round((series.isna().sum() / len(series)) * 100, 2)),
        "unique_count": int(series.nunique())
    }


def compute_correlation_matrix(df: pd.DataFrame, method: str = "pearson") -> dict[str, list[str] | list[list[float]]]:
    numeric_df = df.select_dtypes(include=[np.number])
    if numeric_df.empty or numeric_df.shape[1] < 2:
        return {"method": method, "columns": [], "matrix": []}

    corr_df = numeric_df.corr(method=method).fillna(0)
    cols = list(corr_df.columns)
    matrix = [[float(round(val, 4)) for val in row] for row in corr_df.values]

    return {
        "method": method,
        "columns": cols,
        "matrix": matrix
    }


def test_normality_shapiro(series: pd.Series) -> dict[str, float | bool | None]:
    clean_s = series.dropna()
    if len(clean_s) < 3 or len(clean_s) > 5000:
        return {"shapiro_p_value": None, "is_normal": None}

    stat, p_val = stats.shapiro(clean_s)
    return {
        "shapiro_p_value": float(round(p_val, 5)),
        "is_normal": bool(p_val > 0.05)
    }
