"use client";

import React, { useState } from "react";
import { ShieldCheck, Users, ToggleLeft, ToggleRight, Server, Activity } from "lucide-react";

export default function AdminGovernance() {
  const [providers, setProviders] = useState([
    { id: 1, name: "OpenAI Driver", type: "openai", enabled: true, status: "Healthy" },
    { id: 2, name: "Google Gemini 1.5 Driver", type: "gemini", enabled: true, status: "Healthy" },
    { id: 3, name: "Anthropic Claude Driver", type: "anthropic", enabled: true, status: "Healthy" },
    { id: 4, name: "Ollama Local Engine", type: "ollama", enabled: true, status: "Offline/Mock" },
    { id: 5, name: "HuggingFace Inference Driver", type: "huggingface", enabled: true, status: "Healthy" }
  ]);

  const toggleProvider = (id: number) => {
    setProviders(prev =>
      prev.map(p => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center space-x-3">
          <ShieldCheck className="w-7 h-7 text-emerald-400" />
          <span>Admin Portal & Platform Governance</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage system users, toggle dynamic AI provider circuit breakers, and audit security access logs.
        </p>
      </div>

      {/* AI Providers Toggle Control Matrix */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Server className="w-4 h-4 text-cyan-400" />
          <span>AI Provider Driver Control Matrix</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {providers.map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{p.name}</p>
                <span className="text-[10px] text-emerald-400 font-mono">Status: {p.status}</span>
              </div>
              <button
                onClick={() => toggleProvider(p.id)}
                className="flex items-center space-x-2 text-xs font-bold transition-all"
              >
                {p.enabled ? (
                  <ToggleRight className="w-8 h-8 text-cyan-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-gray-500" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
