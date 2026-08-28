"use client";

import React from "react";
import {
  Sparkles,
  Zap,
  Cpu,
  Trophy,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Flame,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-900/40 via-purple-900/40 to-slate-900 border border-white/10 p-8">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NexusAI Enterprise v1.0 Active</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome to <span className="gradient-text">NexusAI Workspace</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Manage multi-provider LLMs, build visual DAG workflows, run autonomous ReAct agents, analyze PDF/DOCX knowledge bases, and earn XP badges on your daily quest board.
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="/chat"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center space-x-2"
            >
              <span>Launch AI Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/gamification"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/10 flex items-center space-x-2"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Quest & Badge Vault</span>
            </a>
          </div>
        </div>
      </div>

      {/* Stats Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase">Token Usage</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">142.8K</div>
          <p className="text-xs text-emerald-400 font-medium">↑ 12.4% this week</p>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase">Total XP Points</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">1,250 XP</div>
          <p className="text-xs text-purple-400 font-medium">Level 4 Master</p>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase">Active Streak</span>
            <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-white">5 Days</div>
          <p className="text-xs text-rose-400 font-medium">1.5x XP Multiplier</p>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase">System Status</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">99.98%</div>
          <p className="text-xs text-gray-400">5 Providers Online</p>
        </div>
      </div>
    </div>
  );
}
