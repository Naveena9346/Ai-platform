"use client";

import React, { useState } from "react";
import { Sparkles, Download, Star, Tag, Search, ShieldCheck } from "lucide-react";

export default function PromptMarketplace() {
  const [items, setItems] = useState([
    {
      id: "mk_1",
      title: "Senior Full-Stack Code Reviewer",
      author: "NexusAI Official",
      downloads: 4820,
      rating: 4.9,
      category: "Coding",
      price_coins: 0,
      description: "Comprehensive code quality, security vulnerability, and performance refactoring prompt matrix."
    },
    {
      id: "mk_2",
      title: "SOC2 Compliance Security Auditor",
      author: "SecOps Team",
      downloads: 2150,
      rating: 4.8,
      category: "Security",
      price_coins: 300,
      description: "Audit application code for OWASP Top 10 vulnerabilities, CORS misconfigurations, and data leaks."
    },
    {
      id: "mk_3",
      title: "SQL Query Optimization Architect",
      author: "DBA Pro",
      downloads: 3410,
      rating: 4.9,
      category: "Data",
      price_coins: 150,
      description: "Analyze slow SQL execution plans, add B-Tree / GIN / HNSW indexes, and rewrite queries."
    }
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center space-x-3">
          <Sparkles className="w-7 h-7 text-cyan-400" />
          <span>Enterprise AI Prompt Marketplace</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Explore, import, and rate pre-tuned prompt templates created by AI engineers and community creators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="glass-card-interactive p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <div className="flex items-center space-x-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-mono">
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.downloads} installs</span>
              </div>
              <button className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20">
                {item.price_coins === 0 ? "Install Free" : `${item.price_coins} Coins`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
