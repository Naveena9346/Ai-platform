from pathlib import Path
from typing import Any
import pandas as pd
import numpy as np

from app.utils.pandas_helpers import read_dataset_file
from app.utils.math_stats import compute_descriptive_stats, compute_correlation_matrix, test_normality_shapiro


class EDAService:
    @staticmethod
    def generate_full_eda_report(file_path: str | Path) -> dict[str, Any]:
        df = read_dataset_file(file_path)

        total_rows = len(df)
        total_columns = len(df.columns)
        num_cols = list(df.select_dtypes(include=[np.number]).columns)
        cat_cols = list(df.select_dtypes(exclude=[np.number]).columns)

        missing_summary = {col: int(df[col].isna().sum()) for col in df.columns}

        stats_dict = {}
        for col in df.columns:
            stats_dict[col] = compute_descriptive_stats(df[col])

        correlations = compute_correlation_matrix(df, method="pearson")

        distributions = {}
        for col in df.columns:
            if col in num_cols:
                clean_s = df[col].dropna()
                if not clean_s.empty:
                    counts, bin_edges = np.histogram(clean_s, bins=10)
                    normality = test_normality_shapiro(clean_s)
                    distributions[col] = {
                        "column": col,
                        "is_numeric": True,
                        "histogram_bins": [float(round(b, 4)) for b in bin_edges],
                        "histogram_counts": [int(c) for c in counts],
                        "shapiro_p_value": normality["shapiro_p_value"],
                        "is_normal": normality["is_normal"]
                    }
            else:
                top_cats = df[col].astype(str).value_counts().head(10).to_dict()
                distributions[col] = {
                    "column": col,
                    "is_numeric": False,
                    "category_counts": top_cats
                }

        return {
            "total_rows": total_rows,
            "total_columns": total_columns,
            "numerical_columns": num_cols,
            "categorical_columns": cat_cols,
            "missing_data_summary": missing_summary,
            "stats": stats_dict,
            "correlations": correlations,
            "distributions": distributions
        }
