# DataQuest AI ML Pipeline & Algorithms Architecture

## Supported Algorithm Zoo

### 1. Supervised Regression
- **Linear Regression**: Ordinary Least Squares baseline.
- **Ridge & Lasso Regression**: L2 and L1 regularization for feature shrinkage.
- **ElasticNet**: Combined L1 + L2 penalty tuning.
- **Decision Tree Regressor**: Non-linear tree splitting with MSE/MAE criteria.
- **Random Forest Regressor**: Ensemble bagging with bootstrap aggregating.
- **KNN Regressor**: Instance-based Euclidean/Manhattan distance weighting.
- **XGBoost Regressor**: Optimized gradient boosted decision trees.

### 2. Supervised Classification
- **Logistic Regression**: Sigmoid probability estimation with L1/L2 penalties.
- **Decision Tree Classifier**: Gini impurity and Information Gain splits.
- **Random Forest Classifier**: Multi-tree majority voting ensemble.
- **K-Nearest Neighbors (KNN)**: Distance-weighted k-neighbor voting.
- **Gaussian & Multinomial Naive Bayes**: Probabilistic Naive Bayes classifier.
- **XGBoost Classifier**: Gradient boosted decision tree classifier.
- **Support Vector Classifier (SVC)**: RBF/Polynomial kernel margin maximization.

### 3. Unsupervised Clustering
- **K-Means Clustering**: K-centroid optimization with Elbow method curve and Silhouette analysis.
- **DBSCAN**: Density-based spatial clustering of applications with noise detection.
- **Agglomerative Clustering**: Hierarchical bottom-up dendrogram clustering.

---

## Model Evaluation Matrix

```
                          +-----------------------------------+
                          |      Model Evaluation Engine      |
                          +-----------------------------------+
                                            |
         +----------------------------------+----------------------------------+
         |                                  |                                  |
         v                                  v                                  v
+------------------+              +------------------+              +------------------+
|  Classification  |              |    Regression    |              |    Clustering    |
|------------------|              |------------------|              |------------------|
| Accuracy         |              | Mean Squared Err |              | Silhouette Score |
| Precision/Recall |              | Root Mean Sq Err |              | Davies-Bouldin   |
| F1 Macro/Micro   |              | Mean Absolute Err|              | Calinski-Harabasz|
| ROC-AUC & Curves |              | R-Squared (R²)   |              | Centroid Visual  |
| Confusion Matrix |              | Adjusted R²      |              +------------------+
+------------------+              | Residual Plots   |
                                  +------------------+
```

---

## Model Explainability (SHAP Integrations)
DataQuest AI computes **SHAP (SHapley Additive exPlanations)** values for every trained supervised model:
- **Global Summary Plots**: Ranks feature importance by mean absolute SHAP value.
- **Local Waterfall Plots**: Explains individual prediction probabilities by showing feature push values toward or away from baseline expected values.
