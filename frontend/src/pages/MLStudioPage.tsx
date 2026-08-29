import React, { useState, useEffect } from 'react';
import { Play, Award, Settings } from 'lucide-react';
import { datasetsApi, mlApi } from '../services/api';
import { Dataset, MLModel } from '../types';

export const MLStudioPage: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [modelName, setModelName] = useState('My Model Run 01');
  const [problemType, setProblemType] = useState<'classification' | 'regression' | 'clustering'>('classification');
  const [algorithm, setAlgorithm] = useState('random_forest');
  const [targetCol, setTargetCol] = useState('');
  const [featureCols, setFeatureCols] = useState<string[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [models, setModels] = useState<MLModel[]>([]);

  useEffect(() => {
    datasetsApi.list().then((res) => {
      setDatasets(res.data);
      if (res.data.length > 0) {
        onDatasetSelect(res.data[0].id);
      }
    });
    loadModels();
  }, []);

  const loadModels = () => {
    mlApi.listModels().then((res) => setModels(res.data)).catch(() => {});
  };

  const onDatasetSelect = (id: string) => {
    setSelectedDataset(id);
    datasetsApi.preview(id).then((res) => {
      if (res.data.columns.length > 1) {
        setTargetCol(res.data.columns[res.data.columns.length - 1]);
        setFeatureCols(res.data.columns.slice(0, -1));
      }
    });
  };

  const handleTrain = () => {
    if (!selectedDataset) return;
    setIsTraining(true);
    mlApi
      .train({
        dataset_version_id: selectedDataset,
        model_name: modelName,
        problem_type: problemType,
        algorithm: algorithm,
        target_column: targetCol,
        feature_columns: featureCols,
        hyperparameters: { n_estimators: 100 },
      })
      .then(() => {
        setIsTraining(false);
        loadModels();
      })
      .catch(() => setIsTraining(false));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Machine Learning Model Studio</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Train, tune, evaluate, and benchmark production machine learning models</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Model Configuration Wizard (5 Columns on Desktop) */}
        <div className="lg:col-span-5 card-panel p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-indigo-400" />
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Model Config Studio</h2>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Auto Pipeline
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Model Name</label>
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="input-field text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Input Dataset</label>
              <select
                value={selectedDataset}
                onChange={(e) => onDatasetSelect(e.target.value)}
                className="input-field text-xs"
              >
                {datasets.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.row_count} rows)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Type</label>
              <select
                value={problemType}
                onChange={(e: any) => setProblemType(e.target.value)}
                className="input-field text-xs"
              >
                <option value="classification">Supervised Classification</option>
                <option value="regression">Supervised Regression</option>
                <option value="clustering">Unsupervised Clustering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Machine Learning Algorithm</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="input-field text-xs"
              >
                {problemType === 'classification' && (
                  <>
                    <option value="random_forest">Random Forest Classifier</option>
                    <option value="logistic_regression">Logistic Regression</option>
                    <option value="decision_tree">Decision Tree Classifier</option>
                    <option value="knn">K-Nearest Neighbors (KNN)</option>
                    <option value="naive_bayes">Gaussian Naive Bayes</option>
                    <option value="xgboost">XGBoost Classifier</option>
                  </>
                )}
                {problemType === 'regression' && (
                  <>
                    <option value="linear_regression">Linear Regression</option>
                    <option value="random_forest">Random Forest Regressor</option>
                    <option value="ridge">Ridge Regression</option>
                    <option value="lasso">Lasso Regression</option>
                  </>
                )}
                {problemType === 'clustering' && (
                  <>
                    <option value="kmeans">K-Means Clustering</option>
                    <option value="dbscan">DBSCAN Clustering</option>
                  </>
                )}
              </select>
            </div>

            {problemType !== 'clustering' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Column (Y)</label>
                <input
                  type="text"
                  value={targetCol}
                  onChange={(e) => setTargetCol(e.target.value)}
                  className="input-field text-xs"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleTrain}
            disabled={isTraining}
            className="w-full btn-indigo flex items-center justify-center space-x-2 text-sm mt-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isTraining ? 'Executing Training Pipeline...' : 'Train Model (+150 XP)'}</span>
          </button>
        </div>

        {/* Trained Model Registry Cards (7 Columns on Desktop) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Trained Model Registry</h2>
            <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
              {models.length} Models Active
            </span>
          </div>

          <div className="space-y-4">
            {models.map((m) => (
              <div key={m.id} className="card-panel p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-white text-base">{m.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                        {m.algorithm}
                      </span>
                      <span className="text-xs text-slate-400">• {m.problem_type}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                    <Award className="w-3.5 h-3.5" />
                    <span>Evaluated</span>
                  </div>
                </div>

                {m.evaluations && m.evaluations.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80">
                    {Object.entries(m.evaluations[0].metrics).map(([k, v]) => (
                      <div key={k} className="text-center p-2 rounded bg-slate-950/50 border border-slate-800">
                        <span className="block text-[9px] uppercase font-bold text-slate-400">{k}</span>
                        <span className="text-sm font-extrabold text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {models.length === 0 && (
              <div className="card-panel p-10 text-center text-slate-500 text-xs">
                No trained models yet. Configure parameters on the left and click "Train Model".
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
