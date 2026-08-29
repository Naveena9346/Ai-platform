"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Award,
  Coins,
  Flame,
  Bell,
  Search,
  CheckCircle2,
  ChevronDown,
  ExternalLink
} from "lucide-react";

export default function Navbar() {
  const [gamData, setGamData] = useState({
    xp_points: 1250,
    current_level: 4,
    reward_coins: 450,
    current_streak_days: 5,
    next_level_xp: 1600,
  });

  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetch("/api/v1/gamification/summary")
      .then((res) => res.json())
      .then((data) => {
        if (data.current_level) setGamData(data);
      })
      .catch(() => {});
  }, []);

  const progressPercent = Math.min(100, Math.round((gamData.xp_points / gamData.next_level_xp) * 100));

  return (
    <header className="h-16 border-b border-white/10 bg-[#07090e]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-50 transition-all">
      {/* Brand Logo & Live System Status */}
      <div className="flex items-center space-x-6">
        <a href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight gradient-text">
              NexusAI Platform
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/80">
              NexusAI Studio v1.0 • Multi-Provider
            </span>
          </div>
        </a>

        {/* Live System Online Badge */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>5 Providers Online</span>
        </div>
      </div>

      {/* Global Command / Quick Search */}
      <div className="hidden md:flex items-center space-x-2 bg-slate-900/60 border border-white/10 rounded-xl px-3 py-1.5 w-64 focus-within:border-cyan-500/50 transition-all">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search tools, models, prompts..."
          className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
        />
        <span className="text-[10px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded font-mono">⌘K</span>
      </div>

      {/* Real-time Gamification Status Bar */}
      <div className="flex items-center space-x-4">
        {/* XP Level Progress Pill */}
        <div className="flex items-center space-x-3 bg-purple-500/10 border border-purple-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
          <Award className="w-4 h-4 text-purple-400" />
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-[11px] font-bold text-purple-300 space-x-2">
              <span>Lvl {gamData.current_level}</span>
              <span className="text-[10px] text-purple-400 font-mono">{gamData.xp_points} XP</span>
            </div>
            <div className="w-20 bg-slate-800 rounded-full h-1 mt-0.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Reward Coins */}
        <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full">
          <Coins className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-extrabold text-amber-300">
            {gamData.reward_coins}
          </span>
        </div>

        {/* Daily Streak */}
        <div className="flex items-center space-x-1.5 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-full">
          <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
          <span className="text-xs font-extrabold text-rose-300">
            {gamData.current_streak_days}d Streak
          </span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 relative transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 glass-card p-4 shadow-2xl z-50 border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white">Notifications</span>
                <span className="text-[10px] text-cyan-400 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/5 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Level Up! (Level 4)</p>
                    <p className="text-gray-400 text-[11px]">You unlocked Level 4 and earned +100 bonus coins!</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">5 AI Models Connected</p>
                    <p className="text-gray-400 text-[11px]">OpenAI, Gemini, Claude, Ollama & HF active.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-black text-white text-xs">
              N
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
