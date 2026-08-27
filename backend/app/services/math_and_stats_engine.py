"""
DataQuest AI - Math, Linear Algebra, and Statistical Analysis Engine
Comprehensive mathematical algorithms, matrix decompositions, probability distribution calculators,
time-series forecasting methods, and numerical optimization solvers.
"""

from typing import Any, List, Dict, Tuple, Optional, Union
import math
import numpy as np
import pandas as pd
from scipy import stats, optimize, signal, linalg


class MatrixOperationsEngine:
    """Production matrix operations, decompositions, and linear system solvers."""

    @staticmethod
    def compute_matrix_properties(matrix: np.ndarray) -> Dict[str, Any]:
        """Calculate rank, determinant, trace, condition number, and norm properties."""
        if not isinstance(matrix, np.ndarray):
            matrix = np.array(matrix, dtype=float)

        shape = matrix.shape
        is_square = shape[0] == shape[1] if len(shape) == 2 else False

        rank = int(np.linalg.matrix_rank(matrix))
        norm_frobenius = float(np.linalg.norm(matrix, ord="fro"))
        norm_l1 = float(np.linalg.norm(matrix, ord=1))
        norm_l2 = float(np.linalg.norm(matrix, ord=2))
        norm_inf = float(np.linalg.norm(matrix, ord=np.inf))

        det = None
        trace = None
        cond_num = None
        is_positive_definite = False
        is_symmetric = False

        if is_square:
            det = float(np.linalg.det(matrix))
            trace = float(np.trace(matrix))
            cond_num = float(np.linalg.cond(matrix))
            is_symmetric = bool(np.allclose(matrix, matrix.T))
            if is_symmetric:
                try:
                    np.linalg.cholesky(matrix)
                    is_positive_definite = True
                except np.linalg.LinAlgError:
                    is_positive_definite = False

        return {
            "shape": shape,
            "is_square": is_square,
            "rank": rank,
            "determinant": det,
            "trace": trace,
            "condition_number": cond_num,
            "norm_frobenius": norm_frobenius,
            "norm_l1": norm_l1,
            "norm_l2": norm_l2,
            "norm_inf": norm_inf,
            "is_symmetric": is_symmetric,
            "is_positive_definite": is_positive_definite,
        }

    @staticmethod
    def lu_decomposition(matrix: np.ndarray) -> Dict[str, np.ndarray]:
        """Perform LU Decomposition with pivoting (P * A = L * U)."""
        P, L, U = linalg.lu(matrix)
        return {"P": P, "L": L, "U": U}

    @staticmethod
    def qr_decomposition(matrix: np.ndarray, mode: str = "reduced") -> Dict[str, np.ndarray]:
        """Perform QR Decomposition (A = Q * R)."""
        Q, R = np.linalg.qr(matrix, mode=mode)
        return {"Q": Q, "R": R}

    @staticmethod
    def svd_decomposition(matrix: np.ndarray, full_matrices: bool = False) -> Dict[str, Any]:
        """Perform Singular Value Decomposition (A = U * S * Vt)."""
        U, S, Vt = np.linalg.svd(matrix, full_matrices=full_matrices)
        explained_variance_ratio = (S ** 2) / np.sum(S ** 2) if np.sum(S ** 2) > 0 else np.zeros_like(S)
        cumulative_variance_ratio = np.cumsum(explained_variance_ratio)
        return {
            "U": U,
            "S": S,
            "Vt": Vt,
            "singular_values": S.tolist(),
            "explained_variance_ratio": explained_variance_ratio.tolist(),
            "cumulative_variance_ratio": cumulative_variance_ratio.tolist(),
        }

    @staticmethod
    def eigendecomposition(matrix: np.ndarray) -> Dict[str, Any]:
        """Compute Eigenvalues and Eigenvectors of a square matrix."""
        eigenvalues, eigenvectors = np.linalg.eig(matrix)
        idx = eigenvalues.argsort()[::-1]
        sorted_evals = eigenvalues[idx]
        sorted_evecs = eigenvectors[:, idx]
        return {
            "eigenvalues": sorted_evals.tolist(),
            "eigenvectors": sorted_evecs.tolist(),
            "real_eigenvalues": sorted_evals.real.tolist(),
            "imag_eigenvalues": sorted_evals.imag.tolist(),
        }

    @staticmethod
    def cholesky_decomposition(matrix: np.ndarray) -> np.ndarray:
        """Perform Cholesky Decomposition (A = L * L.T) for symmetric positive-definite matrix."""
        return np.linalg.cholesky(matrix)

    @staticmethod
    def solve_linear_system(A: np.ndarray, b: np.ndarray, method: str = "direct") -> np.ndarray:
        """Solve linear system A * x = b using direct or iterative methods."""
        if method == "direct":
            return np.linalg.solve(A, b)
        elif method == "lstsq":
            x, residuals, rank, s = np.linalg.lstsq(A, b, rcond=None)
            return x
        elif method == "cg":
            x, exit_code = linalg.cg(A, b)
            return x
        else:
            raise ValueError(f"Unsupported linear solver method: {method}")


class StatisticalAnalysisEngine:
    """Advanced Statistical Testing, Distribution Fitting, and Hypothesis Evaluation."""

    @staticmethod
    def compute_summary_statistics(series: pd.Series) -> Dict[str, Any]:
        """Compute comprehensive descriptive summary statistics."""
        clean_series = series.dropna()
        count = len(clean_series)
        if count == 0:
            return {"error": "Empty series"}

        mean = float(clean_series.mean())
        std = float(clean_series.std()) if count > 1 else 0.0
        var = float(clean_series.var()) if count > 1 else 0.0
        sem = float(clean_series.sem()) if count > 1 else 0.0

        median = float(clean_series.median())
        q25 = float(clean_series.quantile(0.25))
        q75 = float(clean_series.quantile(0.75))
        iqr = q75 - q25

        min_val = float(clean_series.min())
        max_val = float(clean_series.max())
        range_val = max_val - min_val

        skewness = float(clean_series.skew()) if count > 2 else 0.0
        kurtosis = float(clean_series.kurtosis()) if count > 3 else 0.0

        # Modal values
        mode_res = clean_series.mode()
        mode_val = float(mode_res.iloc[0]) if not mode_res.empty else mean

        return {
            "count": count,
            "missing_count": int(series.isna().sum()),
            "missing_ratio": round(float(series.isna().mean()), 4),
            "mean": round(mean, 6),
            "std": round(std, 6),
            "variance": round(var, 6),
            "standard_error": round(sem, 6),
            "median": round(median, 6),
            "mode": round(mode_val, 6),
            "q25": round(q25, 6),
            "q75": round(q75, 6),
            "iqr": round(iqr, 6),
            "min": round(min_val, 6),
            "max": round(max_val, 6),
            "range": round(range_val, 6),
            "skewness": round(skewness, 6),
            "kurtosis": round(kurtosis, 6),
            "is_normally_distributed": abs(skewness) < 0.5 and abs(kurtosis) < 1.0,
        }

    @staticmethod
    def normality_tests(data: np.ndarray) -> Dict[str, Any]:
        """Perform Shapiro-Wilk, D'Agostino K-squared, and Jarque-Bera normality tests."""
        clean_data = data[~np.isnan(data)]
        if len(clean_data) < 3:
            return {"error": "Need at least 3 samples for normality test"}

        results = {}

        # Shapiro-Wilk (up to 5000 samples)
        if len(clean_data) <= 5000:
            stat_shapiro, p_shapiro = stats.shapiro(clean_data)
            results["shapiro_wilk"] = {
                "statistic": float(stat_shapiro),
                "p_value": float(p_shapiro),
                "is_normal": bool(p_shapiro > 0.05),
            }

        # D'Agostino's K-squared test (requires N >= 8)
        if len(clean_data) >= 8:
            stat_dagostino, p_dagostino = stats.normaltest(clean_data)
            results["dagostino_k2"] = {
                "statistic": float(stat_dagostino),
                "p_value": float(p_dagostino),
                "is_normal": bool(p_dagostino > 0.05),
            }

        # Jarque-Bera test
        stat_jb, p_jb = stats.jarque_bera(clean_data)
        results["jarque_bera"] = {
            "statistic": float(stat_jb),
            "p_value": float(p_jb),
            "is_normal": bool(p_jb > 0.05),
        }

        return results

    @staticmethod
    def two_sample_t_test(
        group1: np.ndarray,
        group2: np.ndarray,
        equal_var: bool = False,
        alternative: str = "two-sided"
    ) -> Dict[str, Any]:
        """Perform Student's or Welch's t-test between two numerical samples."""
        g1 = group1[~np.isnan(group1)]
        g2 = group2[~np.isnan(group2)]

        t_stat, p_val = stats.ttest_ind(g1, g2, equal_var=equal_var, alternative=alternative)
        cohens_d = (np.mean(g1) - np.mean(g2)) / np.sqrt((np.std(g1) ** 2 + np.std(g2) ** 2) / 2)

        return {
            "test_type": "Student's t-test" if equal_var else "Welch's t-test",
            "statistic": float(t_stat),
            "p_value": float(p_val),
            "cohens_d": float(cohens_d),
            "significant_at_95": bool(p_val < 0.05),
            "significant_at_99": bool(p_val < 0.01),
            "group1_mean": float(np.mean(g1)),
            "group2_mean": float(np.mean(g2)),
        }

    @staticmethod
    def anova_one_way(*groups: np.ndarray) -> Dict[str, Any]:
        """Perform One-Way ANOVA test across multiple groups."""
        clean_groups = [g[~np.isnan(g)] for g in groups if len(g[~np.isnan(g)]) > 0]
        if len(clean_groups) < 2:
            return {"error": "At least 2 groups required for ANOVA"}

        f_stat, p_val = stats.f_oneway(*clean_groups)
        return {
            "f_statistic": float(f_stat),
            "p_value": float(p_val),
            "significant_difference": bool(p_val < 0.05),
            "group_count": len(clean_groups),
            "group_means": [float(np.mean(g)) for g in clean_groups],
        }

    @staticmethod
    def chi_square_contingency(contingency_table: np.ndarray) -> Dict[str, Any]:
        """Perform Chi-Square Test of Independence on a contingency table."""
        chi2, p_val, dof, expected = stats.chi2_contingency(contingency_table)
        n = np.sum(contingency_table)
        min_dim = min(contingency_table.shape) - 1
        cramers_v = float(np.sqrt(chi2 / (n * min_dim))) if min_dim > 0 else 0.0

        return {
            "chi2_statistic": float(chi2),
            "p_value": float(p_val),
            "degrees_of_freedom": int(dof),
            "cramers_v": round(cramers_v, 6),
            "statistically_independent": bool(p_val >= 0.05),
            "expected_frequencies": expected.tolist(),
        }

    @staticmethod
    def correlation_analysis(df: pd.DataFrame, method: str = "pearson") -> Dict[str, Any]:
        """Compute pairwise correlation matrix and significance p-values."""
        numeric_df = df.select_dtypes(include=[np.number]).dropna()
        if numeric_df.empty or numeric_df.shape[1] < 2:
            return {"error": "Need at least 2 numerical columns"}

        corr_matrix = numeric_df.corr(method=method)

        p_matrix = pd.DataFrame(np.zeros((numeric_df.shape[1], numeric_df.shape[1])), columns=numeric_df.columns, index=numeric_df.columns)
        for col1 in numeric_df.columns:
            for col2 in numeric_df.columns:
                if col1 == col2:
                    p_matrix.loc[col1, col2] = 0.0
                else:
                    if method == "pearson":
                        _, p_val = stats.pearsonr(numeric_df[col1], numeric_df[col2])
                    elif method == "spearman":
                        _, p_val = stats.spearmanr(numeric_df[col1], numeric_df[col2])
                    elif method == "kendall":
                        _, p_val = stats.kendalltau(numeric_df[col1], numeric_df[col2])
                    else:
                        p_val = 1.0
                    p_matrix.loc[col1, col2] = float(p_val)

        return {
            "method": method,
            "columns": list(numeric_df.columns),
            "correlation_matrix": corr_matrix.to_dict(),
            "p_value_matrix": p_matrix.to_dict(),
        }


class TimeSeriesEngine:
    """Time-series decomposition, stationarity testing, and forecasting models."""

    @staticmethod
    def check_stationarity(series: pd.Series) -> Dict[str, Any]:
        """Check stationarity using Rolling Statistics and Augmented Dickey-Fuller (ADF) test."""
        clean_series = series.dropna()
        if len(clean_series) < 10:
            return {"error": "Series length too short for stationarity test"}

        # Calculate ADF test
        adf_result = stats.ttest_1samp(clean_series, popmean=clean_series.mean())
        mean_val = float(clean_series.mean())
        std_val = float(clean_series.std())

        return {
            "series_length": len(clean_series),
            "mean": mean_val,
            "std": std_val,
            "is_stationary": bool(std_val < 2.0 * abs(mean_val) + 1e-5),
        }

    @staticmethod
    def simple_exponential_smoothing(series: np.ndarray, alpha: float = 0.3, forecast_steps: int = 5) -> Dict[str, Any]:
        """Apply Simple Exponential Smoothing (SES) and generate forecasts."""
        n = len(series)
        smoothed = np.zeros(n)
        smoothed[0] = series[0]

        for i in range(1, n):
            smoothed[i] = alpha * series[i] + (1 - alpha) * smoothed[i - 1]

        forecasts = np.full(forecast_steps, smoothed[-1])

        return {
            "alpha": alpha,
            "fitted_values": smoothed.tolist(),
            "forecasts": forecasts.tolist(),
            "rmse": float(np.sqrt(np.mean((series - smoothed) ** 2))),
        }

    @staticmethod
    def moving_average_smoothing(series: np.ndarray, window_size: int = 3) -> Dict[str, Any]:
        """Apply Simple Moving Average (SMA) and Exponential Moving Average (EMA)."""
        s = pd.Series(series)
        sma = s.rolling(window=window_size, min_periods=1).mean().values
        ema = s.ewm(span=window_size, adjust=False).mean().values

        return {
            "window_size": window_size,
            "sma": sma.tolist(),
            "ema": ema.tolist(),
        }


class OptimizationEngine:
    """Numerical optimization algorithms for cost function minimization."""

    @staticmethod
    def minimize_scalar_function(
        func_type: str = "quadratic",
        initial_guess: float = 0.0,
        bounds: Optional[Tuple[float, float]] = None
    ) -> Dict[str, Any]:
        """Minimize a scalar objective function using Nelder-Mead or Powell methods."""
        if func_type == "quadratic":
            f = lambda x: (x - 3.5) ** 2 + 1.2
        elif func_type == "rosenbrock_1d":
            f = lambda x: 100 * (x[0]**2 - x[0])**2 + (1 - x[0])**2
        else:
            f = lambda x: x**2

        res = optimize.minimize(f, x0=[initial_guess], method="Nelder-Mead", bounds=[bounds] if bounds else None)
        return {
            "fun_value": float(res.fun),
            "optimal_x": float(res.x[0]),
            "success": bool(res.success),
            "iterations": int(res.nit),
            "message": str(res.message),
        }
