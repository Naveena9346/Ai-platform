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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview Dashboard", href: "/", icon: LayoutDashboard },
    { name: "AI Chat Studio", href: "/chat", icon: MessageSquare },
    { name: "Prompt Templates", href: "/prompts", icon: Sparkles },
    { name: "Document Analysis (RAG)", href: "/documents", icon: FileText },
    { name: "Workflow Canvas (DAG)", href: "/workflows", icon: GitBranch },
    { name: "Agent Studio", href: "/agents", icon: Bot },
    { name: "Quest & Badge Vault", href: "/gamification", icon: Trophy },
    { name: "Usage & Financials", href: "/analytics", icon: BarChart3 },
    { name: "Admin Governance", href: "/admin", icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-slate-900/40 p-4 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Platform Workspace
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : ""}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-500/20 text-xs text-purple-300">
        <p className="font-semibold mb-1">Nexus Pro Active</p>
        <p className="text-gray-400">Multi-provider router and agent tools enabled.</p>
      </div>
    </aside>
  );
}
