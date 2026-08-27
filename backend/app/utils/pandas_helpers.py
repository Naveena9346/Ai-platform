from pathlib import Path
from typing import Any
import pandas as pd
import numpy as np


def read_dataset_file(file_path: str | Path, nrows: int | None = None) -> pd.DataFrame:
    path = Path(file_path)
    suffix = path.suffix.lower()

    if suffix == ".csv":
        return pd.read_csv(path, nrows=nrows)
    elif suffix in [".tsv", ".txt"]:
        return pd.read_csv(path, sep="\t", nrows=nrows)
    elif suffix == ".json":
        return pd.read_json(path)
    elif suffix == ".parquet":
        df = pd.read_parquet(path)
        if nrows:
            return df.head(nrows)
        return df
    elif suffix in [".xlsx", ".xls"]:
        return pd.read_excel(path, nrows=nrows)
    else:
        raise ValueError(f"Unsupported file format: {suffix}")


def save_dataset_file(df: pd.DataFrame, file_path: str | Path) -> None:
    path = Path(file_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    suffix = path.suffix.lower()

    if suffix == ".csv":
        df.to_csv(path, index=False)
    elif suffix == ".parquet":
        df.to_parquet(path, index=False)
    elif suffix == ".json":
        df.to_json(path, orient="records")
    else:
        df.to_csv(path, index=False)


def infer_schema_metadata(df: pd.DataFrame) -> dict[str, Any]:
    column_metadata = {}
    total_rows = len(df)

    for col in df.columns:
        dtype = str(df[col].dtype)
        missing_count = int(df[col].isna().sum())
        unique_count = int(df[col].nunique())

        if pd.api.types.is_numeric_dtype(df[col]):
            col_type = "numeric"
            min_val = float(df[col].min()) if not df[col].dropna().empty else None
            max_val = float(df[col].max()) if not df[col].dropna().empty else None
        elif pd.api.types.is_datetime64_any_dtype(df[col]):
            col_type = "datetime"
            min_val = None
            max_val = None
        elif pd.api.types.is_bool_dtype(df[col]):
            col_type = "boolean"
            min_val = None
            max_val = None
        else:
            col_type = "categorical"
            min_val = None
            max_val = None

        column_metadata[col] = {
            "dtype": dtype,
            "col_type": col_type,
            "missing_count": missing_count,
            "missing_percentage": round((missing_count / total_rows) * 100, 2) if total_rows > 0 else 0,
            "unique_count": unique_count,
            "min_val": min_val,
            "max_val": max_val,
        }

    return {
        "columns": column_metadata,
        "total_rows": total_rows,
        "total_columns": len(df.columns)
    }
