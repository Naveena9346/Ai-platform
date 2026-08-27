from pathlib import Path
import numpy as np
import pandas as pd
from sklearn.impute import KNNImputer
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, OneHotEncoder, OrdinalEncoder

from app.schemas.preprocessing import DataCleaningRequest
from app.utils.pandas_helpers import read_dataset_file, save_dataset_file, infer_schema_metadata
from app.core.config import settings


class DataCleaningService:
    @staticmethod
    def execute_cleaning_pipeline(
        input_file_path: str | Path,
        output_file_path: str | Path,
        request: DataCleaningRequest
    ) -> dict[str, Any]:
        df = read_dataset_file(input_file_path)
        applied_log = []

        # 1. Missing Value Imputation
        for step in request.imputation_steps:
            col = step.column
            if col in df.columns:
                strategy = step.strategy
                if strategy == "mean" and pd.api.types.is_numeric_dtype(df[col]):
                    mean_val = float(df[col].mean())
                    df[col] = df[col].fillna(mean_val)
                    applied_log.append(f"Imputed missing in '{col}' using Mean ({round(mean_val, 4)})")
                elif strategy == "median" and pd.api.types.is_numeric_dtype(df[col]):
                    med_val = float(df[col].median())
                    df[col] = df[col].fillna(med_val)
                    applied_log.append(f"Imputed missing in '{col}' using Median ({round(med_val, 4)})")
                elif strategy == "mode":
                    mode_val = df[col].mode()[0] if not df[col].mode().empty else "Unknown"
                    df[col] = df[col].fillna(mode_val)
                    applied_log.append(f"Imputed missing in '{col}' using Mode ({mode_val})")
                elif strategy == "constant":
                    df[col] = df[col].fillna(step.fill_value if step.fill_value is not None else 0)
                    applied_log.append(f"Imputed missing in '{col}' using Constant ({step.fill_value})")
                elif strategy in ["knn", "mice"] and pd.api.types.is_numeric_dtype(df[col]):
                    imputer = KNNImputer(n_neighbors=5)
                    col_vals = df[[col]].values
                    df[col] = imputer.fit_transform(col_vals)
                    applied_log.append(f"Imputed missing in '{col}' using KNN Imputer")

        # 2. Outlier Handling
        for step in request.outlier_steps:
            col = step.column
            if col in df.columns and pd.api.types.is_numeric_dtype(df[col]):
                if step.method == "zscore":
                    z_scores = np.abs((df[col] - df[col].mean()) / (df[col].std() + 1e-9))
                    outliers_mask = z_scores > step.threshold
                    if step.action == "clip":
                        upper = df[col].mean() + step.threshold * df[col].std()
                        lower = df[col].mean() - step.threshold * df[col].std()
                        df[col] = np.clip(df[col], lower, upper)
                        applied_log.append(f"Clipped outliers in '{col}' via Z-score threshold {step.threshold}")
                    elif step.action == "remove":
                        df = df[~outliers_mask].reset_index(drop=True)
                        applied_log.append(f"Removed {int(outliers_mask.sum())} outlier rows in '{col}' via Z-score")

                elif step.method == "iqr":
                    q25, q75 = df[col].quantile(0.25), df[col].quantile(0.75)
                    iqr = q75 - q25
                    lower, upper = q25 - 1.5 * iqr, q75 + 1.5 * iqr
                    outliers_mask = (df[col] < lower) | (df[col] > upper)
                    if step.action == "clip":
                        df[col] = np.clip(df[col], lower, upper)
                        applied_log.append(f"Clipped outliers in '{col}' via IQR bounds [{round(lower, 2)}, {round(upper, 2)}]")
                    elif step.action == "remove":
                        df = df[~outliers_mask].reset_index(drop=True)
                        applied_log.append(f"Removed {int(outliers_mask.sum())} outlier rows in '{col}' via IQR")

        # 3. Encoding Steps
        for step in request.encoding_steps:
            col = step.column
            if col in df.columns:
                if step.method == "onehot":
                    encoder = OneHotEncoder(sparse_output=False, handle_unknown="ignore")
                    encoded_arr = encoder.fit_transform(df[[col]].astype(str))
                    encoded_cols = [f"{col}_{cat}" for cat in encoder.categories_[0]]
                    encoded_df = pd.DataFrame(encoded_arr, columns=encoded_cols, index=df.index)
                    df = pd.concat([df.drop(columns=[col]), encoded_df], axis=1)
                    applied_log.append(f"One-Hot Encoded '{col}' into {len(encoded_cols)} binary columns")
                elif step.method == "ordinal":
                    encoder = OrdinalEncoder()
                    df[col] = encoder.fit_transform(df[[col]].astype(str))
                    applied_log.append(f"Ordinal Encoded '{col}' into numerical integers")

        # 4. Feature Scaling Steps
        for step in request.scaling_steps:
            cols_to_scale = [c for c in step.columns if c in df.columns and pd.api.types.is_numeric_dtype(df[c])]
            if cols_to_scale:
                if step.method == "standard":
                    scaler = StandardScaler()
                    df[cols_to_scale] = scaler.fit_transform(df[cols_to_scale])
                    applied_log.append(f"StandardScaled columns: {cols_to_scale}")
                elif step.method == "minmax":
                    scaler = MinMaxScaler()
                    df[cols_to_scale] = scaler.fit_transform(df[cols_to_scale])
                    applied_log.append(f"MinMaxScaled columns: {cols_to_scale}")
                elif step.method == "robust":
                    scaler = RobustScaler()
                    df[cols_to_scale] = scaler.fit_transform(df[cols_to_scale])
                    applied_log.append(f"RobustScaled columns: {cols_to_scale}")

        # Save output cleaned dataset
        save_dataset_file(df, output_file_path)

        schema = infer_schema_metadata(df)
        return {
            "rows_remaining": len(df),
            "columns_count": len(df.columns),
            "schema_metadata": schema,
            "applied_transformations": applied_log
        }
