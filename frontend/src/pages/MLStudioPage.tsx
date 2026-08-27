import React, { useState, useEffect } from 'react';
import { Brain, Play, CheckCircle, Award } from 'lucide-react';
import { datasetsApi, mlApi } from '../services/api';
import { Dataset, MLModel } from '../types';

export const MLStudioPage: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [modelName, setModelName] = useState('My Machine Learning Model');
  const [problemType, setProblemType] = useState<'classification' | 'regression' | 'clustering'>('classification');
  const [algorithm, setAlgorithm] = useState('random_forest');
  const [targetCol, setTargetCol] = useState('');
  const [featureCols, setFeatureCols] = useState<string[]>([]);
  const [columnsList, setColumnsList] = useState<string[]>([]);
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
      setColumnsList(res.data.columns);
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
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Machine Learning Training Studio</h1>
        <p className="text-slate-400 text-sm">Train, evaluate, benchmark, and deploy machine learning models</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Model Configuration</h2>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Model Name</label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Dataset</label>
            <select
              value={selectedDataset}
              onChange={(e) => onDatasetSelect(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {datasets.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Problem Type</label>
            <select
              value={problemType}
              onChange={(e: any) => setProblemType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="classification">Classification</option>
              <option value="regression">Regression</option>
              <option value="clustering">Clustering</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {problemType === 'classification' && (
                <>
                  <option value="random_forest">Random Forest Classifier</option>
                  <option value="logistic_regression">Logistic Regression</option>
                  <option value="decision_tree">Decision Tree</option>
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

          <button
            onClick={handleTrain}
            disabled={isTraining}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isTraining ? 'Training Model...' : 'Train Model (+150 XP)'}</span>
          </button>
        </div>

        {/* Trained Models Column */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Trained Model Registry</h2>
          <div className="space-y-4">
            {models.map((m) => (
              <div key={m.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{m.name}</h3>
                    <span className="text-xs text-indigo-400 font-semibold uppercase">{m.algorithm} • {m.problem_type}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                    <Award className="w-3.5 h-3.5" />
                    <span>Evaluated</span>
                  </div>
                </div>

                {m.evaluations && m.evaluations.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 mt-3">
                    {Object.entries(m.evaluations[0].metrics).map(([k, v]) => (
                      <div key={k} className="text-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-400">{k}</span>
                        <span className="text-base font-extrabold text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

