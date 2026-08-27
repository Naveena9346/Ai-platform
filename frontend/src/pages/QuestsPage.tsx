import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
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
      alert(`Quest Submission Evaluated: Status = ${res.data.status}`);
      gamificationApi.listQuests().then((r) => setQuests(r.data));
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Data Science Quests & AI Challenges</h1>
        <p className="text-slate-400 text-sm">Complete benchmarking missions to earn XP, unlocks, and badges</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.map((q) => (
          <div key={q.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 glass-card-hover">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30">
                {q.category}
              </span>
              <span className="text-xs font-extrabold text-amber-400 flex items-center space-x-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                <Award className="w-3.5 h-3.5" />
                <span>+{q.xp_reward} XP</span>
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-white">{q.title}</h3>
              <p className="text-slate-400 text-xs mt-1">{q.description}</p>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300">
              <span className="font-semibold text-slate-400">Requirement: </span>
              Achieve target metric <span className="text-indigo-400 font-bold">{q.requirements_config?.metric}</span> ≥ {q.requirements_config?.threshold}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <select
                onChange={(e) => setSelectedModels({ ...selectedModels, [q.id]: e.target.value })}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select Trained Model</option>
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.algorithm})
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleSubmit(q.id)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all"
              >
                Submit Quest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
