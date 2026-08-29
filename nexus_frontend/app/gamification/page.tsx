"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Award, Flame, CheckCircle, Sparkles } from "lucide-react";

export default function GamificationHub() {
  const [summary, setSummary] = useState({
    xp_points: 1250,
    current_level: 4,
    reward_coins: 450,
    current_streak_days: 5,
    next_level_xp: 1600,
  });

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, email: "alex@nexus.ai", xp_points: 4850, level: 7 },
    { rank: 2, email: "dev_master@nexus.ai", xp_points: 3200, level: 6 },
    { rank: 3, email: "demo@nexus.ai", xp_points: 1250, level: 4 },
  ]);

  useEffect(() => {
    fetch("/api/v1/gamification/summary")
      .then((res) => res.json())
      .then((data) => {
        if (data.current_level) setSummary(data);
      })
      .catch(() => {});

    fetch("/api/v1/gamification/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.rankings && data.rankings.length > 0) {
          setLeaderboard(data.rankings);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Gamification Vault & Quests</h1>
        <p className="text-gray-400 text-sm">Earn XP points, level up, unlock achievement badges, and climb the leaderboard.</p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-400 uppercase">Current Tier</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">Level {summary.current_level}</div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full w-[78%]" />
          </div>
          <p className="text-xs text-gray-400">1,250 / 1,600 XP to Level 5</p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 uppercase">Coins Balance</span>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300">{summary.reward_coins} Coins</div>
          <p className="text-xs text-gray-400">Claim quest rewards to earn coins</p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-400 uppercase">Daily Streak</span>
            <Flame className="w-5 h-5 text-rose-400 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-rose-300">{summary.current_streak_days} Days Active</div>
          <p className="text-xs text-emerald-400">1.5x XP Boost active!</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Global Leaderboard</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase bg-white/5 text-gray-400">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">User</th>
                <th className="p-3">Level</th>
                <th className="p-3">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaderboard.map((u) => (
                <tr key={u.rank} className="hover:bg-white/5">
                  <td className="p-3 font-bold text-cyan-400">#{u.rank}</td>
                  <td className="p-3 font-medium text-white">{u.email}</td>
                  <td className="p-3 text-purple-400 font-bold">Lvl {u.level}</td>
                  <td className="p-3 font-bold text-amber-300">{u.xp_points} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
