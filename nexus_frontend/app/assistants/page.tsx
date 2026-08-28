"use client";

import React, { useState } from "react";
import { Bot, Play, Shield, Code, BarChart, FileText, CheckCircle2 } from "lucide-react";

export default function AssistantsStudio() {
  const [assistants] = useState([
    {
      id: "ast_1",
      name: "Architect Core",
      role: "System & Cloud Architecture Expert",
      model: "gpt-4o",
      icon: Code,
      system_instruction: "You are Architect Core, a principal software architect guiding microservices, databases, and LLM provider integrations."
    },
    {
      id: "ast_2",
      name: "SecOps Sentinel",
      role: "Cybersecurity & Audit Specialist",
      model: "claude-3-5-sonnet-20240620",
      icon: Shield,
      system_instruction: "You are SecOps Sentinel, auditing security code, checking CORS, input sanitization, and PII protection rules."
    },
    {
      id: "ast_3",
      name: "Data Analyst Pro",
      role: "SQL & Analytics Expert",
      model: "gemini-1.5-flash",
      icon: BarChart,
      system_instruction: "You are Data Analyst Pro, writing Python pandas queries, SQL joins, and business intelligence reports."
    }
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center space-x-3">
          <Bot className="w-7 h-7 text-purple-400" />
          <span>Pre-Configured AI Assistant Personas</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Deploy specialized AI assistant personas tailored for Code Architecture, Security Auditing, and Data Analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assistants.map((ast) => {
          const Icon = ast.icon;
          return (
            <div key={ast.id} className="glass-card-interactive p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{ast.name}</h3>
                    <p className="text-[11px] text-cyan-400 font-mono">{ast.model}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-300 font-semibold">{ast.role}</p>
                <p className="text-[11px] text-gray-400 font-mono bg-slate-950 p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                  {ast.system_instruction}
                </p>
              </div>

              <a
                href="/chat"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Chat with Assistant</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
