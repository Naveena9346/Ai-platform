import React, { useEffect, useState } from 'react';
import { Award, Flame, Database, Brain, ArrowUpRight, Plus, Sparkles, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { gamificationApi, datasetsApi, mlApi } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [overview, setOverview] = useState<any>(null);
  const [datasetsCount, setDatasetsCount] = useState<number>(0);
  const [modelsCount, setModelsCount] = useState<number>(0);

  useEffect(() => {
    gamificationApi.getOverview().then((res) => setOverview(res.data)).catch(() => {});
    datasetsApi.list().then((res) => setDatasetsCount(res.data.length)).catch(() => {});
    mlApi.listModels().then((res) => setModelsCount(res.data.length)).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Enterprise Header Banner */}
      <div className="card-panel p-6 sm:p-8 border border-indigo-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{overview?.equipped_title || 'Data Science Architect'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome Back, <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{user?.username}</span> 👋
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Execute data cleaning pipelines, engineer features, train ML models, and complete daily challenges to earn XP and level up.
          </p>
        </div>

        {/* Level Circular Gauge */}
        <div className="flex items-center space-x-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 self-start md:self-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <div className="text-center">
              <span className="block text-[9px] uppercase font-bold text-indigo-200">Level</span>
              <span className="text-2xl font-black text-white">{overview?.level || 1}</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Progression</span>
            <div className="text-sm font-bold text-white mt-0.5">{overview?.xp || 0} XP Total</div>
            <div className="w-32 bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overview?.xp_progress_percentage || 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Experience Metric Card */}
        <div className="card-panel p-5 card-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Experience Points</span>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{overview?.xp || 0}</span>
            <span className="text-xs font-bold text-amber-400">XP</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {overview?.xp_progress_percentage || 0}% toward Level {(overview?.level || 1) + 1}
          </p>
        </div>

        {/* Daily Streak Card */}
        <div className="card-panel p-5 card-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Daily Streak</span>
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 border border-orange-500/20">
              <Flame className="w-4 h-4 fill-orange-500" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{overview?.current_streak || 1}</span>
            <span className="text-xs font-bold text-orange-400">Days</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Longest streak: {overview?.longest_streak || 1} days active
          </p>
        </div>

        {/* Datasets Metric Card */}
        <div className="card-panel p-5 card-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Datasets Managed</span>
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{datasetsCount}</span>
            <span className="text-xs font-semibold text-slate-400">Files</span>
          </div>
          <p className="text-[11px] text-indigo-400 mt-2 flex items-center">
            Uploaded & Preprocessed <ArrowUpRight className="w-3 h-3 ml-1" />
          </p>
        </div>

        {/* Trained Models Card */}
        <div className="card-panel p-5 card-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Trained Models</span>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{modelsCount}</span>
            <span className="text-xs font-semibold text-slate-400">Models</span>
          </div>
          <p className="text-[11px] text-purple-400 mt-2 flex items-center">
            Evaluated & Benchmarked <ArrowUpRight className="w-3 h-3 ml-1" />
          </p>
        </div>

      </div>

      {/* Quick Launchpad Section */}
      <div className="card-panel p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Platform Quick Launchpad</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Enterprise AI Workflow</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3.5 hover:border-indigo-500/40 transition-all">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">1. Data Ingestion & Preprocessing</h3>
              <p className="text-xs text-slate-400 mt-1">Upload CSV, Parquet, or JSON datasets and execute cleaning algorithms.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3.5 hover:border-purple-500/40 transition-all">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20 shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">2. ML Model Studio</h3>
              <p className="text-xs text-slate-400 mt-1">Train Random Forest, XGBoost, KNN, or K-Means models and evaluate metrics.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3.5 hover:border-amber-500/40 transition-all">
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">3. Complete AI Quests</h3>
              <p className="text-xs text-slate-400 mt-1">Submit trained models to daily quests, unlock badges, and earn XP.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
