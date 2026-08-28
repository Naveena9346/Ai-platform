"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Award, Coins, Flame, Bell, User } from "lucide-react";

export default function Navbar() {
  const [gamData, setGamData] = useState({
    xp_points: 1250,
    current_level: 4,
    reward_coins: 450,
    current_streak_days: 5,
  });

  useEffect(() => {
    fetch("/api/v1/gamification/summary")
      .then((res) => res.json())
      .then((data) => {
        if (data.current_level) setGamData(data);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="h-16 border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-extrabold tracking-tight gradient-text">
          NexusAI Platform
        </span>
      </div>

      {/* Gamification Bar */}
      <div className="flex items-center space-x-4">
        {/* Level Badge */}
        <div className="flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-full">
          <Award className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-purple-300">
            Lvl {gamData.current_level} ({gamData.xp_points} XP)
          </span>
        </div>

        {/* Reward Coins */}
        <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full">
          <Coins className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-300">
            {gamData.reward_coins} Coins
          </span>
        </div>

        {/* Daily Streak */}
        <div className="flex items-center space-x-1.5 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-full">
          <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
          <span className="text-xs font-bold text-rose-300">
            {gamData.current_streak_days}d Streak
          </span>
        </div>

        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300">
          <Bell className="w-4 h-4" />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
          A
        </div>
      </div>
    </header>
  );
}
