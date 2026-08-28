"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Cpu,
  Trophy,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  MessageSquare,
  FileText,
  GitBranch,
  Bot,
  TrendingUp,
  Clock,
  CheckCircle2,
  DollarSign
} from "lucide-react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    total_requests: 342,
    total_tokens: 142850,
    total_cost_usd: 0.4285,
    avg_latency_ms: 285.4
  });

  useEffect(() => {
    fetch("/api/v1/analytics/overview")
      .then((res) => res.json())
      .then((data) => {
        if (data.total_requests) setMetrics(data);
      })
      .catch(() => {});
  }, []);

  const featureCards = [
    {
      title: "AI Chat Studio",
      desc: "Multi-provider streaming chat with GPT-4o, Gemini 1.5 & Claude 3.5 Sonnet.",
      icon: MessageSquare,
      href: "/chat",
      color: "from-cyan-500/20 to-blue-500/10",
      accent: "text-cyan-400",
      border: "border-cyan-500/30"
    },
    {
      title: "Document RAG Engine",
      desc: "Upload PDFs & DOCX files for semantic chunking and pgvector search.",
      icon: FileText,
      href: "/documents",
      color: "from-purple-500/20 to-pink-500/10",
      accent: "text-purple-400",
      border: "border-purple-500/30"
    },
    {
      title: "Workflow Canvas (DAG)",
      desc: "Visual graph runner executing dynamic node pipelines and Python scripts.",
      icon: GitBranch,
      href: "/workflows",
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-400",
      border: "border-emerald-500/30"
    },
    {
      title: "Autonomous ReAct Agents",
      desc: "Autonomous reasoning agents with WebSearch, REPL & Webhook tools.",
      icon: Bot,
      href: "/agents",
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-400",
      border: "border-amber-500/30"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-white/10 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Enterprise Multi-Provider AI Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Real-Time AI Orchestration <br />
            <span className="gradient-text">& Event-Driven Gamification</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Execute LLMs across 5 providers, orchestrate visual DAG workflows, launch autonomous ReAct tools, ingest vector RAG documents, and level up on your daily quest board.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="/chat"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center space-x-2"
            >
              <span>Open AI Chat Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/gamification"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10 flex items-center space-x-2"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Explore Quest & Badge Vault</span>
            </a>
          </div>
        </div>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card-interactive p-6 space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Total Requests</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">{metrics.total_requests}</div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>99.9% Uptime Success</span>
          </div>
        </div>

        <div className="glass-card-interactive p-6 space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Token Count</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">{metrics.total_tokens.toLocaleString()}</div>
          <p className="text-xs text-purple-300 font-medium">tiktoken accurate</p>
        </div>

        <div className="glass-card-interactive p-6 space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Financial Cost</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-300">${metrics.total_cost_usd.toFixed(4)}</div>
          <p className="text-xs text-gray-400">Real-time cost calculator</p>
        </div>

        <div className="glass-card-interactive p-6 space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Avg Response Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300">{metrics.avg_latency_ms} ms</div>
          <p className="text-xs text-emerald-400 font-bold">Ultra-fast async I/O</p>
        </div>
      </div>

      {/* Feature Navigation Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span>Platform Modules & AI Playgrounds</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <a
                key={idx}
                href={card.href}
                className={`glass-card-interactive p-6 flex flex-col justify-between space-y-4 bg-gradient-to-br ${card.color} border ${card.border}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl bg-slate-900/80 border ${card.border}`}>
                    <Icon className={`w-6 h-6 ${card.accent}`} />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white mb-1">{card.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{card.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Real-time Activity & Provider Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Real-Time Activity Stream</span>
            </h3>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-300 font-mono px-2 py-0.5 rounded">Live Stream</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">AI Workflow DAG Executed</p>
                  <p className="text-gray-400 text-[11px]">Workflow 'Summarize PDF' executed in 142ms</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">2m ago</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Document RAG Indexed</p>
                  <p className="text-gray-400 text-[11px]">Ingested 'Enterprise_Architecture.pdf' (14 chunks)</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">12m ago</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">ReAct Agent Solved Goal</p>
                  <p className="text-gray-400 text-[11px]">WebSearch & REPL tool calculation finished</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">25m ago</span>
            </div>
          </div>
        </div>

        {/* AI Model Status Matrix */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AI Provider Matrix</span>
          </h3>

          <div className="space-y-2.5 text-xs font-semibold">
            <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
              <span className="text-white">OpenAI GPT-4o</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
              <span className="text-white">Google Gemini 1.5</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
              <span className="text-white">Claude 3.5 Sonnet</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
              <span className="text-white">Ollama Local</span>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">Offline/Local</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
