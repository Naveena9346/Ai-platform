"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  FileText,
  GitBranch,
  Bot,
  Trophy,
  BarChart3,
  ShieldCheck,
  Zap,
  Activity,
  Layers
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const mainNav = [
    { name: "Overview Dashboard", href: "/", icon: LayoutDashboard, badge: "Live" },
    { name: "AI Chat Studio", href: "/chat", icon: MessageSquare, badge: "Streaming" },
    { name: "Prompt Templates", href: "/prompts", icon: Sparkles },
    { name: "Document RAG Engine", href: "/documents", icon: FileText, badge: "pgvector" },
  ];

  const orchestrateNav = [
    { name: "Workflow Canvas (DAG)", href: "/workflows", icon: GitBranch, badge: "Visual" },
    { name: "Agent Studio (ReAct)", href: "/agents", icon: Bot, badge: "Autonomous" },
    { name: "Quest & Badge Vault", href: "/gamification", icon: Trophy, badge: "XP Tier" },
  ];

  const manageNav = [
    { name: "Usage & Financials", href: "/analytics", icon: BarChart3 },
    { name: "Admin Governance", href: "/admin", icon: ShieldCheck },
  ];

  const renderSection = (title: string, items: typeof mainNav) => (
    <div className="space-y-1 mb-6">
      <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
        {title}
      </div>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
              isActive
                ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/10 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                : "text-gray-400 hover:text-gray-100 hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
                }`}
              />
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "bg-white/5 text-gray-400"
                }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside className="w-64 border-r border-white/10 bg-[#07090e]/60 p-4 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="custom-scrollbar overflow-y-auto pr-1">
        {renderSection("CORE AI PLATFORM", mainNav)}
        {renderSection("ORCHESTRATION & GAMIFICATION", orchestrateNav)}
        {renderSection("GOVERNANCE & ANALYTICS", manageNav)}
      </div>

      {/* Real-time AI Providers Health Widget */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/40 border border-purple-500/20 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold text-white">Active AI Drivers</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            100% Health
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px] font-semibold text-gray-300">
          <div className="flex items-center space-x-1.5 bg-white/5 px-2 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>OpenAI GPT-4o</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white/5 px-2 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Gemini 1.5</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white/5 px-2 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Claude 3.5</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white/5 px-2 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Ollama Offline</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
