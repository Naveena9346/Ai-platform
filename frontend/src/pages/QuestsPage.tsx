import React, { useState, useEffect } from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { gamificationApi, mlApi } from '../services/api';
import { Quest, MLModel } from '../types';

export const QuestsPage: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [models, setModels] = useState<MLModel[]>([]);
  const [selectedModels, setSelectedModels] = useState<Record<string, string>>({});

  useEffect(() => {
    gamificationApi.listQuests().then((res) => setQuests(res.data)).catch(() => {});
    mlApi.listModels().then((res) => setModels(res.data)).catch(() => {});
  }, []);

  const handleSubmit = (questId: string) => {
    const modelId = selectedModels[questId];
    if (!modelId) return;
    gamificationApi.submitQuest(questId, modelId).then((res) => {
      alert(`Quest Evaluation Completed: Status = ${res.data.status.toUpperCase()}`);
      gamificationApi.listQuests().then((r) => setQuests(r.data));
    });
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'hard':
      case 'insane':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Benchmark Quests & Challenges</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Submit trained ML models to pass accuracy benchmarks, unlock achievements, and gain XP</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.map((q) => (
          <div key={q.id} className="card-panel p-6 space-y-5 flex flex-col justify-between card-panel-hover">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border ${getDifficultyBadge(q.difficulty)}`}>
                    {q.difficulty}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">• {q.category}</span>
                </div>

                <div className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                  <Award className="w-3.5 h-3.5" />
                  <span>+{q.xp_reward} XP</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white">{q.title}</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{q.description}</p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-slate-400">Submission Requirement: </span>
                Target metric <span className="text-indigo-400 font-bold">{q.requirements_config?.metric}</span> ≥ {q.requirements_config?.threshold}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
              <select
                onChange={(e) => setSelectedModels({ ...selectedModels, [q.id]: e.target.value })}
                className="input-field text-xs flex-1"
              >
                <option value="">Select Model from Registry</option>
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.algorithm})
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleSubmit(q.id)}
                className="btn-indigo text-xs flex items-center justify-center space-x-1.5 shrink-0"
              >
                <span>Submit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
