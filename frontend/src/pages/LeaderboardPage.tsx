import React, { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';
import { gamificationApi } from '../services/api';
import { LeaderboardEntry } from '../types';

export const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    gamificationApi.getLeaderboard().then((res) => setLeaderboard(res.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Global AI/ML Leaderboard</h1>
        <p className="text-slate-400 text-sm">Compete with top data scientists and machine learning engineers worldwide</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase">
              <th className="p-4">Rank</th>
              <th className="p-4">Data Scientist</th>
              <th className="p-4">Title</th>
              <th className="p-4">Level</th>
              <th className="p-4 text-right">Total XP</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.user_id} className="border-b border-slate-800/50 hover:bg-slate-900/30">
                <td className="p-4 font-extrabold">
                  {entry.rank === 1 && <Crown className="w-5 h-5 text-amber-400 inline mr-2" />}
                  {entry.rank === 2 && <Crown className="w-5 h-5 text-slate-300 inline mr-2" />}
                  {entry.rank === 3 && <Crown className="w-5 h-5 text-amber-600 inline mr-2" />}
                  #{entry.rank}
                </td>
                <td className="p-4 font-bold text-white">{entry.username}</td>
                <td className="p-4 text-xs font-semibold text-indigo-400">{entry.equipped_title}</td>
                <td className="p-4 font-bold text-slate-300">Level {entry.level}</td>
                <td className="p-4 text-right font-extrabold text-amber-400">{entry.xp} XP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
