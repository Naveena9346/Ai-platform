"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Zap,
  RefreshCw,
  Sliders,
  FileText,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Activity,
  Award
} from "lucide-react";

interface HumanizationMode {
  id: string;
  name: string;
  badge: string;
  description: string;
}

interface HumanizationResult {
  original_text: str;
  humanized_text: string;
  mode: string;
  original_ai_score: number;
  humanized_ai_score: number;
  perplexity_index: number;
  burstiness_score: number;
  readability_level: string;
  words_changed: number;
  xp_gained: number;
  improvements: string[];
}

export default function HumanizerPage() {
  const [inputText, setInputText] = useState(
    "Furthermore, artificial intelligence plays a pivotal role in navigating the complexities of modern software development. Consequently, delving into its tapestry of features is a testament to technological progress."
  );
  const [selectedMode, setSelectedMode] = useState("anti_ai_bypass");
  const [modes, setModes] = useState<HumanizationMode[]>([
    {
      id: "anti_ai_bypass",
      name: "Anti-AI Detector Bypass",
      badge: "Recommended",
      description: "Optimized to bypass Turnitin, GPTZero, CopyLeaks, and ZeroGPT by boosting burstiness and stripping robotic syntax signatures."
    },
    {
      id: "standard",
      name: "Standard Natural",
      badge: "Balanced",
      description: "Natural everyday phrasing with smooth transitions and polished grammar."
    },
    {
      id: "academic",
      name: "Academic & Scholarly",
      badge: "Formal",
      description: "Formal academic vocabulary, scholarly sentence construction, and high perplexity index."
    },
    {
      id: "casual",
      name: "Casual & Conversational",
      badge: "Relatable",
      description: "Relaxed, direct tone with friendly vocabulary suitable for blogs, emails, and social media."
    },
    {
      id: "creative",
      name: "Creative & Expressive",
      badge: "Artistic",
      description: "Expressive metaphors, vivid imagery, and dynamic sentence rhythm."
    }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<HumanizationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  // Fetch available modes from backend API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/humanizer/modes")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.modes) {
          setModes(data.modes);
        }
      })
      .catch(() => {});
  }, []);

  const handleHumanize = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/humanizer/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          mode: selectedMode,
          readability: "balanced",
          bypass_ai_detectors: true
        })
      });
      const data: HumanizationResult = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Humanization API error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (result?.humanized_text) {
      navigator.clipboard.writeText(result.humanized_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 text-gray-100 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/60 via-slate-900 to-cyan-950/60 p-6 md:p-8 border border-purple-500/20 shadow-2xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                NexusAI Engine v2.4
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              AI Text Humanizer & Detector Bypass
            </h1>
            <p className="text-sm text-gray-300 max-w-2xl">
              Transform AI-generated content into 100% natural, human writing. Bypass AI detectors like
              Turnitin, GPTZero, CopyLeaks, and ZeroGPT with controlled burstiness and perplexity tuning.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-[10px] text-gray-400 font-bold">HUMANIZER XP REWARD</div>
                <div className="text-xs font-extrabold text-amber-400">+100 to +300 XP / Request</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {modes.map((mode) => {
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between space-y-2 ${
                isSelected
                  ? "bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10"
                  : "bg-slate-900/60 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{mode.name}</span>
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/40"
                      : "bg-white/5 text-gray-500"
                  }`}
                >
                  {mode.badge}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 line-clamp-2 leading-tight">
                {mode.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Side-by-Side Editor & Output Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Pane */}
        <div className="space-y-3 bg-slate-900/70 p-5 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-gray-200">Original AI Text Input</span>
              </div>
              <span className="text-[10px] font-semibold text-gray-400">
                {inputText.split(/\s+/).filter(Boolean).length} Words
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here (from ChatGPT, Claude, Gemini, etc.)..."
              className="w-full h-64 p-4 rounded-2xl bg-black/40 border border-white/10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 resize-none font-normal leading-relaxed custom-scrollbar"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button
              onClick={() => setInputText("")}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Clear Text
            </button>
            <button
              onClick={handleHumanize}
              disabled={isProcessing || !inputText.trim()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Humanizing Text...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Humanize Content</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Pane */}
        <div className="space-y-3 bg-slate-900/70 p-5 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-gray-200">Humanized Output</span>
              </div>
              {result && (
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                    <TrendingDown className="w-3 h-3" />
                    <span>AI Detection: {result.humanized_ai_score}%</span>
                  </span>
                </div>
              )}
            </div>

            <div className="w-full h-64 p-4 rounded-2xl bg-black/40 border border-white/10 text-sm text-gray-100 overflow-y-auto leading-relaxed custom-scrollbar relative">
              {result ? (
                <p className="text-gray-100 whitespace-pre-wrap">{result.humanized_text}</p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-2">
                  <Sparkles className="w-8 h-8 text-gray-600 animate-pulse" />
                  <p className="text-xs">Click "Humanize Content" to convert AI text into natural human writing.</p>
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <span>Burstiness: <strong className="text-cyan-400">{result.burstiness_score}</strong></span>
                <span>Perplexity: <strong className="text-purple-400">{result.perplexity_index}</strong></span>
              </div>

              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all flex items-center space-x-1.5"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Metrics & Improvements Panel */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="text-xs font-bold text-gray-400">AI DETECTION PROBABILITY</div>
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-black text-rose-400 line-through opacity-70">
                {result.original_ai_score}%
              </span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <span className="text-3xl font-black text-emerald-400">
                {result.humanized_ai_score}%
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Passed estimated safety threshold for Turnitin & GPTZero algorithms.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="text-xs font-bold text-gray-400">GAMIFICATION REWARD</div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-amber-400">+{result.xp_gained}</span>
              <span className="text-xs font-bold text-amber-500">XP EARNED</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Added to your enterprise daily quest & level progress leaderboard.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="text-xs font-bold text-gray-400">TRANSFORMATION SUMMARY</div>
            <ul className="text-xs space-y-1 text-gray-300">
              {result.improvements.map((imp, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
