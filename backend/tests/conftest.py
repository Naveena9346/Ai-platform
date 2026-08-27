import asyncio
import pytest
import pandas as pd
import numpy as np

@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
def sample_numeric_df():
    np.random.seed(42)
    df = pd.DataFrame({
        "feature_a": np.random.normal(10, 2, 100),
        "feature_b": np.random.uniform(0, 50, 100),
        "feature_c": np.random.normal(5, 1, 100),
        "target": np.random.choice([0, 1], size=100)
    })
    # Inject missing values
    df.loc[5:10, "feature_a"] = np.nan
    df.loc[15:20, "feature_b"] = np.nan
    # Inject outliers
    df.loc[0, "feature_a"] = 999.0
    return df
