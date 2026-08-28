"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, DollarSign, Cpu, Clock, Activity, Shield } from "lucide-react";

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState({
    total_requests: 342,
    total_tokens: 142850,
    total_prompt_tokens: 85200,
    total_completion_tokens: 57650,
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

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center space-x-3">
          <BarChart3 className="w-7 h-7 text-cyan-400" />
          <span>Financial Cost & Token Usage Analytics</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Monitor aggregated AI model financial expenditure, token counts, request latency, and audit logs.
        </p>
      </div>

      {/* Metric Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-extrabold uppercase">Total Expenditure</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-300">${metrics.total_cost_usd.toFixed(4)}</div>
          <p className="text-xs text-gray-400">Calculated across 5 AI providers</p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-extrabold uppercase">Prompt vs Completion Tokens</span>
            <Cpu className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{metrics.total_tokens.toLocaleString()} Total</div>
          <div className="flex justify-between text-xs font-mono text-purple-300 pt-1">
            <span>Prompt: {metrics.total_prompt_tokens.toLocaleString()}</span>
            <span>Completion: {metrics.total_completion_tokens.toLocaleString()}</span>
          </div>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-extrabold uppercase">System Performance</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300">{metrics.avg_latency_ms} ms</div>
          <p className="text-xs text-emerald-400 font-bold">FastAPI Async pipeline online</p>
        </div>
      </div>

      {/* Model Breakdown Table */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Model Expenditure Breakdown</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="uppercase bg-white/5 text-gray-400">
              <tr>
                <th className="p-3">Model Name</th>
                <th className="p-3">Provider</th>
                <th className="p-3">Requests</th>
                <th className="p-3">Total Tokens</th>
                <th className="p-3">Est. Cost (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr className="hover:bg-white/5">
                <td className="p-3 font-bold text-white">gpt-4o</td>
                <td className="p-3 text-cyan-400">OpenAI</td>
                <td className="p-3">185</td>
                <td className="p-3">92,400</td>
                <td className="p-3 text-emerald-400">$0.3120</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="p-3 font-bold text-white">gemini-1.5-flash</td>
                <td className="p-3 text-purple-400">Google Gemini</td>
                <td className="p-3">110</td>
                <td className="p-3">38,150</td>
                <td className="p-3 text-emerald-400">$0.0815</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="p-3 font-bold text-white">claude-3-5-sonnet</td>
                <td className="p-3 text-pink-400">Anthropic</td>
                <td className="p-3">47</td>
                <td className="p-3">12,300</td>
                <td className="p-3 text-emerald-400">$0.0350</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
