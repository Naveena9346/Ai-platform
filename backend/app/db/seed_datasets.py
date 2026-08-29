import uuid
from pathlib import Path
import pandas as pd
import numpy as np
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.models.dataset import Dataset, DatasetVersion
from app.utils.pandas_helpers import infer_schema_metadata, save_dataset_file


def create_sample_csv_files(storage_dir: Path) -> dict[str, Path]:
    uploads_dir = storage_dir / "uploads"
    uploads_dir.mkdir(parents=True, exist_ok=True)
    
    datasets_files = {}

    # 1. Iris Species Classification Dataset
    np.random.seed(42)
    iris_data = []
    species_list = ["setosa", "versicolor", "virginica"]
    for i in range(150):
        sp = species_list[i // 50]
        if sp == "setosa":
            sl, sw = np.random.normal(5.0, 0.35), np.random.normal(3.4, 0.38)
            pl, pw = np.random.normal(1.46, 0.17), np.random.normal(0.24, 0.1)
        elif sp == "versicolor":
            sl, sw = np.random.normal(5.9, 0.5), np.random.normal(2.7, 0.3)
            pl, pw = np.random.normal(4.2, 0.4), np.random.normal(1.3, 0.2)
        else:
            sl, sw = np.random.normal(6.5, 0.6), np.random.normal(2.9, 0.3)
            pl, pw = np.random.normal(5.5, 0.5), np.random.normal(2.0, 0.2)
        iris_data.append({
            "sepal_length": round(float(sl), 2),
            "sepal_width": round(float(sw), 2),
            "petal_length": round(float(pl), 2),
            "petal_width": round(float(pw), 2),
            "species": sp
        })
    df_iris = pd.DataFrame(iris_data)
    p_iris = uploads_dir / "iris_species_benchmark.csv"
    save_dataset_file(df_iris, p_iris)
    datasets_files["Iris Species Benchmark"] = p_iris

    # 2. Customer Churn Analysis Dataset
    churn_data = []
    contracts = ["Month-to-month", "One year", "Two year"]
    payments = ["Electronic check", "Mailed check", "Bank transfer", "Credit card"]
    for i in range(200):
        tenure = int(np.random.randint(1, 72))
        monthly = round(float(np.random.uniform(20.0, 115.0)), 2)
        total = round(tenure * monthly + float(np.random.normal(0, 10)), 2)
        contract = str(np.random.choice(contracts))
        tech = str(np.random.choice(["Yes", "No"]))
        paperless = str(np.random.choice(["Yes", "No"]))
        payment = str(np.random.choice(payments))
        churn_prob = 0.6 if contract == "Month-to-month" and tenure < 12 else 0.15
        churn = 1 if np.random.random() < churn_prob else 0
        churn_data.append({
            "tenure_months": tenure,
            "monthly_charges": monthly,
            "total_charges": total,
            "contract_type": contract,
            "tech_support": tech,
            "paperless_billing": paperless,
            "payment_method": payment,
            "churn": churn
        })
    df_churn = pd.DataFrame(churn_data)
    p_churn = uploads_dir / "customer_churn_analysis.csv"
    save_dataset_file(df_churn, p_churn)
    datasets_files["Customer Churn Analysis"] = p_churn

    # 3. House Prices Regression Dataset
    house_data = []
    for i in range(160):
        sqft = int(np.random.randint(850, 4200))
        beds = int(np.random.randint(2, 6))
        baths = round(float(np.random.choice([1.0, 1.5, 2.0, 2.5, 3.0, 3.5])), 1)
        yr = int(np.random.randint(1970, 2024))
        garage = int(np.random.randint(0, 4))
        rating = round(float(np.random.uniform(3.0, 9.5)), 1)
        price = round(sqft * 180 + beds * 15000 + baths * 12000 + (yr - 1970) * 1200 + rating * 25000, 2)
        house_data.append({
            "square_feet": sqft,
            "bedrooms": beds,
            "bathrooms": baths,
            "year_built": yr,
            "garage_cars": garage,
            "neighborhood_rating": rating,
            "price": price
        })
    df_house = pd.DataFrame(house_data)
    p_house = uploads_dir / "house_prices_regression.csv"
    save_dataset_file(df_house, p_house)
    datasets_files["House Prices Regression"] = p_house

    # 4. Heart Disease Risk Predictor Dataset
    heart_data = []
    cp_types = ["Typical Angina", "Atypical Angina", "Non-anginal", "Asymptomatic"]
    for i in range(180):
        age = int(np.random.randint(29, 78))
        sex = int(np.random.choice([0, 1]))
        cp = str(np.random.choice(cp_types))
        bp = int(np.random.randint(94, 200))
        chol = int(np.random.randint(126, 564))
        max_hr = int(np.random.randint(71, 202))
        disease = 1 if (age > 55 and chol > 240) or cp == "Asymptomatic" else 0
        heart_data.append({
            "age": age,
            "sex": sex,
            "chest_pain_type": cp,
            "resting_bp": bp,
            "cholesterol": chol,
            "max_hr": max_hr,
            "heart_disease": disease
        })
    df_heart = pd.DataFrame(heart_data)
    p_heart = uploads_dir / "heart_disease_predictor.csv"
    save_dataset_file(df_heart, p_heart)
    datasets_files["Heart Disease Risk Predictor"] = p_heart

    return datasets_files


async def seed_user_datasets(db: AsyncSession, user_id: uuid.UUID | str) -> list[Dataset]:
    if isinstance(user_id, str):
        try:
            user_id = uuid.UUID(user_id)
        except ValueError:
            pass

    # Check existing datasets
    result = await db.execute(select(Dataset).where(Dataset.user_id == user_id))
    existing = result.scalars().all()
    if existing:
        return list(existing)

    dataset_paths = create_sample_csv_files(settings.STORAGE_DIR)
    created_datasets = []

    for name, file_path in dataset_paths.items():
        df = pd.read_csv(file_path)
        schema = infer_schema_metadata(df)
        file_size = file_path.stat().st_size

        ds_id = uuid.uuid4()
        ds = Dataset(
            id=ds_id,
            user_id=user_id,
            name=name,
            file_path=str(file_path),
            file_size_bytes=file_size,
            file_format="csv",
            row_count=len(df),
            column_count=len(df.columns),
            schema_metadata=schema
        )
        db.add(ds)
        await db.flush()

        v1 = DatasetVersion(
            dataset_id=ds.id,
            version_number=1,
            transformation_log={"action": "initial_seed", "name": name},
            file_path=str(file_path),
            row_count=len(df),
            column_count=len(df.columns)
        )
        db.add(v1)
        created_datasets.append(ds)

    await db.commit()

    # Re-query datasets with versions loaded
    res = await db.execute(select(Dataset).options(selectinload(Dataset.versions)).where(Dataset.user_id == user_id))
    return list(res.scalars().all())
