import React, { useState, useEffect } from 'react';
import { Crown, Search, Shield, Award } from 'lucide-react';
import { gamificationApi } from '../services/api';
import { LeaderboardEntry } from '../types';

export const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    gamificationApi.getLeaderboard().then((res) => setLeaderboard(res.data)).catch(() => {});
  }, []);

  const filtered = leaderboard.filter((entry) =>
    entry.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Global AI Engineering Leaderboard</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Top data scientists ranked by XP, level, and model accuracy benchmarks</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search data scientists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 text-xs"
          />
        </div>
      </div>

      {/* Leaderboard Table Container */}
      <div className="card-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4">Rank</th>
                <th className="p-4">Engineer</th>
                <th className="p-4">Equipped Title</th>
                <th className="p-4">Level</th>
                <th className="p-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filtered.map((entry) => (
                <tr key={entry.user_id} className="hover:bg-slate-900/40 transition-colors">
                  
                  {/* Rank */}
                  <td className="p-4 font-black">
                    <div className="flex items-center space-x-2">
                      {entry.rank === 1 && <Crown className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />}
                      {entry.rank === 2 && <Crown className="w-4 h-4 text-slate-300 fill-slate-300 shrink-0" />}
                      {entry.rank === 3 && <Crown className="w-4 h-4 text-amber-600 fill-amber-600 shrink-0" />}
                      <span className={entry.rank <= 3 ? 'text-white font-extrabold' : 'text-slate-400'}>
                        #{entry.rank}
                      </span>
                    </div>
                  </td>

                  {/* Username */}
                  <td className="p-4 font-bold text-white">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs uppercase">
                        {entry.username[0]}
                      </div>
                      <span>{entry.username}</span>
                    </div>
                  </td>

                  {/* Equipped Title */}
                  <td className="p-4">
                    <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                      {entry.equipped_title || 'Data Science Novice'}
                    </span>
                  </td>

                  {/* Level */}
                  <td className="p-4 font-bold text-slate-300">
                    <div className="inline-flex items-center space-x-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-slate-300">
                      <Shield className="w-3 h-3 text-indigo-400" />
                      <span>Level {entry.level}</span>
                    </div>
                  </td>

                  {/* Total XP */}
                  <td className="p-4 text-right font-black text-amber-400">
                    <div className="inline-flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>{entry.xp} XP</span>
                    </div>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-500 text-xs">
                    No engineers found on the leaderboard.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
