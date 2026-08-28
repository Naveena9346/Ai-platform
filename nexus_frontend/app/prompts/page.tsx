"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Plus, Copy, Play, CheckCircle, Tag, Search, Code, Lock, Globe } from "lucide-react";

export default function PromptStudio() {
  const [prompts, setPrompts] = useState([
    {
      id: "p1",
      title: "Enterprise Code Refactoring Expert",
      user_template: "Refactor the following {{ language }} code to improve performance and readability:\n\n```{{ language }}\n{{ code }}\n```",
      category: "coding",
      is_public: true,
      variables: ["language", "code"]
    },
    {
      id: "p2",
      title: "Executive Document Summarizer",
      user_template: "Extract 5 key executive bullet points and key takeaways from the following document text:\n\n{{ document_text }}",
      category: "writing",
      is_public: false,
      variables: ["document_text"]
    }
  ]);

  const [title, setTitle] = useState("");
  const [templateStr, setTemplateStr] = useState("");
  const [category, setCategory] = useState("coding");
  const [isPublic, setIsPublic] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!title || !templateStr) return;
    try {
      const res = await fetch("/api/v1/prompts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          user_template: templateStr,
          category,
          is_public: isPublic
        })
      });
      const data = await res.json();
      setPrompts(prev => [
        {
          id: data.id || `p_${Date.now()}`,
          title,
          user_template: templateStr,
          category,
          is_public: isPublic,
          variables: ["input"]
        },
        ...prev
      ]);
      setTitle("");
      setTemplateStr("");
    } catch (err) {
      setPrompts(prev => [
        {
          id: `p_${Date.now()}`,
          title,
          user_template: templateStr,
          category,
          is_public: isPublic,
          variables: ["input"]
        },
        ...prev
      ]);
      setTitle("");
      setTemplateStr("");
    }
  };

  const handleCopy = (id: string, text: str) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center space-x-3">
            <Sparkles className="w-7 h-7 text-cyan-400" />
            <span>Prompt Templates & Versioning Studio</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Create reusable prompt templates with variable placeholders `{{ variable }}` and Jinja2 rendering.
          </p>
        </div>
      </div>

      {/* New Prompt Form Drawer */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Plus className="w-4 h-4 text-cyan-400" />
          <span>Create New Prompt Template (+100 XP)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Prompt Title (e.g. Code Reviewer)"
            className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="coding">Coding & Software</option>
            <option value="writing">Content & Copywriting</option>
            <option value="analysis">Data & Business Analysis</option>
            <option value="agent">Agent System Instructions</option>
          </select>
          <button
            onClick={handleCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Save & Register Template</span>
          </button>
        </div>
        <textarea
          value={templateStr}
          onChange={(e) => setTemplateStr(e.target.value)}
          placeholder="Enter prompt template text with mustache variables: Write a {{ tone }} response about {{ topic }}..."
          rows={3}
          className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-xs font-mono text-cyan-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Prompts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((p) => (
          <div key={p.id} className="glass-card-interactive p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30 flex items-center space-x-1.5">
                  <Tag className="w-3 h-3" />
                  <span className="uppercase">{p.category}</span>
                </span>
                <span className="text-[10px] font-semibold text-gray-400 flex items-center space-x-1">
                  {p.is_public ? <Globe className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3 text-amber-400" />}
                  <span>{p.is_public ? "Public Template" : "Private"}</span>
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <pre className="bg-slate-950 p-3 rounded-xl text-[11px] text-gray-300 font-mono overflow-x-auto border border-white/5 whitespace-pre-wrap">
                {p.user_template}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
              <button
                onClick={() => handleCopy(p.id, p.user_template)}
                className="flex items-center space-x-1.5 text-gray-400 hover:text-cyan-300 transition-colors"
              >
                {copiedId === p.id ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === p.id ? "Copied!" : "Copy Template"}</span>
              </button>
              <a
                href="/chat"
                className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 font-bold"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run in Studio</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
