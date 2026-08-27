import pandas as pd
import numpy as np
from app.services.data_cleaning_service import DataCleaningService
from app.schemas.preprocessing import DataCleaningRequest, ImputationStep, OutlierStep, ScalingStep


def test_missing_value_imputation_and_outlier_capping(tmp_path, sample_numeric_df):
    input_file = tmp_path / "raw.csv"
    output_file = tmp_path / "cleaned.parquet"
    sample_numeric_df.to_csv(input_file, index=False)

    request = DataCleaningRequest(
        dataset_id="00000000-0000-0000-0000-000000000000",
        imputation_steps=[
            ImputationStep(column="feature_a", strategy="mean"),
            ImputationStep(column="feature_b", strategy="median")
        ],
        outlier_steps=[
            OutlierStep(column="feature_a", method="zscore", threshold=3.0, action="clip")
        ],
        scaling_steps=[
            ScalingStep(columns=["feature_a", "feature_b"], method="standard")
        ]
    )

    result = DataCleaningService.execute_cleaning_pipeline(
        input_file_path=input_file,
        output_file_path=output_file,
        request=request
    )

    assert result["rows_remaining"] == 100
    cleaned_df = pd.read_parquet(output_file)
    # Verify no missing values remaining
    assert cleaned_df["feature_a"].isna().sum() == 0
    assert cleaned_df["feature_b"].isna().sum() == 0
