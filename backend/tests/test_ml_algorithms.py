from app.services.ml_trainer_service import MLTrainerService
from app.schemas.ml import MLTrainRequest


def test_ml_classification_training_and_evaluation(tmp_path, sample_numeric_df):
    clean_df = sample_numeric_df.fillna(0)
    input_file = tmp_path / "dataset.csv"
    model_artifact = tmp_path / "rf_model.joblib"
    clean_df.to_csv(input_file, index=False)

    request = MLTrainRequest(
        dataset_version_id="00000000-0000-0000-0000-000000000000",
        model_name="RandomForestTest",
        problem_type="classification",
        algorithm="random_forest",
        target_column="target",
        feature_columns=["feature_a", "feature_b", "feature_c"],
        hyperparameters={"n_estimators": 10}
    )

    eval_result = MLTrainerService.train_model(
        file_path=input_file,
        artifact_save_path=model_artifact,
        request=request
    )

    assert "metrics" in eval_result
    assert "accuracy" in eval_result["metrics"]
    assert "f1_score" in eval_result["metrics"]
    assert eval_result["metrics"]["accuracy"] >= 0.0
    assert model_artifact.exists()


def test_ml_clustering_kmeans(tmp_path, sample_numeric_df):
    clean_df = sample_numeric_df.fillna(0)
    input_file = tmp_path / "clustering_dataset.csv"
    model_artifact = tmp_path / "kmeans.joblib"
    clean_df.to_csv(input_file, index=False)

    request = MLTrainRequest(
        dataset_version_id="00000000-0000-0000-0000-000000000000",
        model_name="KMeansTest",
        problem_type="clustering",
        algorithm="kmeans",
        feature_columns=["feature_a", "feature_b", "feature_c"],
        hyperparameters={"n_clusters": 3}
    )

    eval_result = MLTrainerService.train_model(
        file_path=input_file,
        artifact_save_path=model_artifact,
        request=request
    )

    assert "metrics" in eval_result
    assert "silhouette_score" in eval_result["metrics"]
