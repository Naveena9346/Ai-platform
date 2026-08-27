import React, { useEffect, useState } from 'react';
import { Trophy, Award, Flame, Zap, Database, Brain, ArrowUpRight } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex items-center justify-between">
        <div>
          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30 uppercase tracking-wider mb-2">
            {overview?.equipped_title || 'Data Science Architect'}
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome Back, <span className="text-indigo-400">{user?.username}</span> 👋
          </h1>
          <p className="text-slate-400 mt-1 max-w-xl text-sm">
            Execute data cleaning pipelines, engineer features, train ML models, and complete daily challenges to climb the global leaderboard.
          </p>
        </div>

        {/* Level Circle */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-slate-900 border-4 border-indigo-500 glow-indigo">
          <div className="text-center">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Level</span>
            <span className="text-3xl font-black text-white">{overview?.level || 1}</span>
          </div>
        </div>
      </div>

      {/* Gamification Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-slate-800 glass-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-400">Total Experience</span>
            <Award className="w-6 h-6 text-amber-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-white">{overview?.xp || 0}</span>
            <span className="text-xs text-amber-400 font-semibold ml-2">XP</span>
          </div>
          {/* XP Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overview?.xp_progress_percentage || 0}%` }}
            />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-slate-800 glass-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-400">Daily Streak</span>
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-white">{overview?.current_streak || 1}</span>
            <span className="text-xs text-orange-400 font-semibold ml-2">Days</span>
          </div>
          <p className="text-xs text-slate-400 mt-4">Longest streak: {overview?.longest_streak || 1} days</p>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-slate-800 glass-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-400">Active Datasets</span>
            <Database className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-white">{datasetsCount}</span>
          </div>
          <p className="text-xs text-indigo-400 mt-4 flex items-center">
            Uploaded & Processed <ArrowUpRight className="w-3 h-3 ml-1" />
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-slate-800 glass-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-400">Trained Models</span>
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-white">{modelsCount}</span>
          </div>
          <p className="text-xs text-purple-400 mt-4 flex items-center">
            Models evaluated <ArrowUpRight className="w-3 h-3 ml-1" />
          </p>
        </div>
      </div>
    </div>
  );
};
