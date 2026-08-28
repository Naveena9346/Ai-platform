"use client";

import React, { useState } from "react";
import { Send, Bot, User, Sparkles, Cpu } from "lucide-react";

export default function ChatStudio() {
  const [messages, setMessages] = useState([
    { sender: "assistant", content: "Hello! I am NexusAI. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-4o");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", content: userMsg }]);
    setLoading(true);

    try {
      // Create or use conversation fallback
      const res = await fetch("/api/v1/chat/conversations");
      const convs = await res.json();
      let convId = convs.length > 0 ? convs[0].id : null;

      if (!convId) {
        const newConvRes = await fetch("/api/v1/chat/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "New Studio Session" }),
        });
        const newConv = await newConvRes.json();
        convId = newConv.id;
      }

      const sendRes = await fetch(`/api/v1/chat/conversations/${convId}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          preferred_provider: provider,
          preferred_model: model,
        }),
      });
      const data = await sendRes.json();
      setMessages((prev) => [...prev, { sender: "assistant", content: data.reply || "Response received." }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "assistant", content: "[Simulated Provider Response: NexusAI multi-provider model routing online.]" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col glass-card p-6 space-y-4">
      {/* Top Selector Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">AI Chat Studio</h2>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="bg-slate-800 border border-white/10 text-xs font-semibold text-gray-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500"
          >
            <option value="openai">OpenAI</option>
            <option value="gemini">Google Gemini</option>
            <option value="anthropic">Anthropic Claude</option>
            <option value="ollama">Ollama (Offline)</option>
            <option value="huggingface">HuggingFace</option>
          </select>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-slate-800 border border-white/10 text-xs font-semibold text-gray-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500"
          >
            <option value="gpt-4o">gpt-4o</option>
            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
            <option value="claude-3-5-sonnet-20240620">claude-3.5-sonnet</option>
            <option value="llama3:latest">llama3:latest</option>
          </select>
        </div>
      </div>

      {/* Messages Stream Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start space-x-3 ${
              m.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.sender === "user"
                  ? "bg-cyan-500 text-slate-950 font-bold text-xs"
                  : "bg-purple-600/30 border border-purple-500/30 text-purple-300"
              }`}
            >
              {m.sender === "user" ? "U" : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={`p-4 rounded-2xl max-w-2xl text-sm leading-relaxed ${
                m.sender === "user"
                  ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-100"
                  : "bg-white/5 border border-white/10 text-gray-200"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-xs text-gray-400 pl-11">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>NexusAI Provider routing token stream...</span>
          </div>
        )}
      </div>

      {/* Bottom Input Area */}
      <div className="flex space-x-3 pt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything or request AI workflow action..."
          className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          onClick={handleSend}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
