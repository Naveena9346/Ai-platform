"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  Sparkles,
  Plus,
  Trash2,
  Copy,
  RotateCcw,
  Check,
  Globe,
  MessageSquare,
  Cpu
} from "lucide-react";

interface Message {
  id?: string;
  sender: "user" | "assistant";
  content: string;
  language?: string;
  intent?: string;
  provider?: string;
  model?: string;
  is_live_api?: boolean;
  timestamp?: string;
}

export default function ChatStudio() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      content: "Hello! I am **NexusAI Assistant**. Ask me any question in **English**, **Telugu (తెలుగు)**, or **Tanglish (Romanized Telugu)**!",
      provider: "NexusAI",
      model: "Engine"
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-4o");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    gemini: "",
    anthropic: ""
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const savedKeys = localStorage.getItem("nexus_api_keys");
    if (savedKeys) {
      try {
        setApiKeys(JSON.parse(savedKeys));
      } catch {}
    }
  }, []);

  const saveApiKeys = (newKeys: typeof apiKeys) => {
    setApiKeys(newKeys);
    localStorage.setItem("nexus_api_keys", JSON.stringify(newKeys));
    setShowKeyModal(false);
  };

  // Initialize or fetch active conversation thread
  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await fetch("/api/v1/chat/conversations");
        if (res.ok) {
          const convs = await res.json();
          if (convs.length > 0) {
            setConversationId(convs[0].id);
            // Fetch messages for active conversation
            const msgRes = await fetch(`/api/v1/chat/conversations/${convs[0].id}/messages`);
            if (msgRes.ok) {
              const fetchedMsgs = await msgRes.json();
              if (fetchedMsgs.length > 0) {
                setMessages(
                  fetchedMsgs.map((m: any) => ({
                    id: m.id,
                    sender: m.sender,
                    content: m.content,
                    provider: m.meta?.provider,
                    model: m.meta?.model,
                    is_live_api: m.meta?.is_live_api,
                    language: m.meta?.language
                  }))
                );
              }
            }
          } else {
            // Create initial conversation
            const createRes = await fetch("/api/v1/chat/conversations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title: "Real-Time AI Studio Session" }),
            });
            if (createRes.ok) {
              const newConv = await createRes.json();
              setConversationId(newConv.id);
            }
          }
        }
      } catch (err) {
        // Fallback for initial UI view
      }
    };
    initChat();
  }, []);

  const handleNewChat = async () => {
    setMessages([
      {
        sender: "assistant",
        content: "Started a fresh conversation session! Ask me anything in **English**, **Telugu (తెలుగు)**, or **Tanglish (Romanized Telugu)**.",
      },
    ]);
    try {
      const res = await fetch("/api/v1/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `Session ${new Date().toLocaleTimeString()}` }),
      });
      if (res.ok) {
        const newConv = await createRes.json();
        setConversationId(newConv.id);
      }
    } catch (err) {}
  };

  const handleClearChat = async () => {
    if (conversationId) {
      try {
        await fetch(`/api/v1/chat/conversations/${conversationId}`, { method: "DELETE" });
      } catch {}
    }
    setMessages([]);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sendMessageToBackend = async (userMsgText: string) => {
    setLoading(true);
    let activeConvId = conversationId;

    try {
      if (!activeConvId) {
        const createRes = await fetch("/api/v1/chat/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Real-Time AI Studio Session" }),
        });
        if (createRes.ok) {
          const newConv = await createRes.json();
          activeConvId = newConv.id;
          setConversationId(newConv.id);
        }
      }

      if (activeConvId) {
        let sendRes: Response | null = null;
        const currentKey = apiKeys[provider as keyof typeof apiKeys] || "";

        try {
          sendRes = await fetch(`/api/v1/chat/conversations/${activeConvId}/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: userMsgText,
              preferred_provider: provider,
              preferred_model: model,
              api_key: currentKey
            }),
          });
        } catch {
          sendRes = await fetch(`http://127.0.0.1:8000/api/v1/chat/conversations/${activeConvId}/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: userMsgText,
              preferred_provider: provider,
              preferred_model: model,
              api_key: currentKey
            }),
          });
        }

        if (sendRes && sendRes.ok) {
          const data = await sendRes.json();
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              content: data.reply,
              language: data.meta?.language,
              intent: data.meta?.intent,
              provider: data.provider || provider,
              model: data.model || model,
              is_live_api: data.is_live_api
            },
          ]);
          return;
        }
      }
      throw new Error("Backend service unreachable");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          content: `### 💡 Response (${provider.toUpperCase()} - ${model})\n\nUnable to reach server. Please check your backend connection.`,
          provider: provider,
          model: model,
          is_live_api: false
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const userMsgText = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", content: userMsgText }]);
    sendMessageToBackend(userMsgText);
  };

  const handleRegenerate = () => {
    if (loading) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === "user");
    if (lastUserMsg) {
      sendMessageToBackend(lastUserMsg.content);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col glass-card p-6 space-y-4 border border-white/10 shadow-2xl relative">
      {/* Top Header Control Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 border border-cyan-400/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <span>NexusAI Chat Studio</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Live Engine
              </span>
            </h2>
            <p className="text-[11px] text-gray-400">Supports English, Telugu (తెలుగు) & Tanglish (Romanized Telugu)</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowKeyModal(true)}
            className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>API Keys</span>
          </button>

          <button
            onClick={handleNewChat}
            className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </button>

          <button
            onClick={handleClearChat}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="bg-slate-950 border border-white/10 text-xs font-bold text-gray-200 px-3 py-1.5 rounded-xl focus:outline-none focus:border-cyan-500"
          >
            <option value="openai">OpenAI Driver</option>
            <option value="gemini">Google Gemini Driver</option>
            <option value="anthropic">Anthropic Claude</option>
            <option value="ollama">Ollama (Local)</option>
            <option value="huggingface">HuggingFace</option>
          </select>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-slate-950 border border-white/10 text-xs font-bold text-gray-200 px-3 py-1.5 rounded-xl focus:outline-none focus:border-cyan-500"
          >
            <option value="gpt-4o">gpt-4o</option>
            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
            <option value="claude-3-5-sonnet-20240620">claude-3.5-sonnet</option>
            <option value="llama3:latest">llama3:latest</option>
          </select>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start space-x-3 ${
              m.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                m.sender === "user"
                  ? "bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 font-black text-xs"
                  : "bg-gradient-to-tr from-purple-600/40 to-slate-900 border border-purple-500/30 text-purple-300"
              }`}
            >
              {m.sender === "user" ? "U" : <Bot className="w-5 h-5" />}
            </div>

            <div className="max-w-3xl space-y-1.5">
              <div
                className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === "user"
                    ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-100 shadow-md"
                    : "bg-slate-950/80 border border-white/10 text-gray-200 font-sans shadow-md"
                }`}
              >
                {m.content}
              </div>

              {/* Action Toolbar for Assistant Messages */}
              {m.sender === "assistant" && (
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 pl-1">
                  <button
                    onClick={() => handleCopy(m.content, i)}
                    className="flex items-center space-x-1 hover:text-cyan-300 transition-colors"
                  >
                    {copiedIndex === i ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === i ? "Copied!" : "Copy"}</span>
                  </button>

                  <button
                    onClick={handleRegenerate}
                    className="flex items-center space-x-1 hover:text-cyan-300 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Regenerate</span>
                  </button>

                  {/* Provider & Execution Badge */}
                  <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border bg-slate-900 border-white/10 text-cyan-300">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>
                      {m.provider || provider} ({m.model || model}) • {m.is_live_api ? "⚡ Live API" : "🛡️ Nexus Engine"}
                    </span>
                  </span>

                  {m.language && (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                      <Globe className="w-3 h-3" />
                      <span>{m.language.toUpperCase()}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3 text-xs text-gray-400 pl-12 py-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>NexusAI Provider Engine processing query...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Bar */}
      <div className="flex space-x-3 pt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask in English, Telugu (నాకు చెప్పండి), or Tanglish (Naku explain cheyyi)..."
          className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-50 text-slate-950 font-black text-xs md:text-sm flex items-center space-x-2 shadow-lg shadow-cyan-500/25 transition-all shrink-0"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Configure AI Provider API Keys</span>
            </h3>
            <p className="text-xs text-gray-300">
              Enter your live API keys below to connect directly to OpenAI, Gemini, or Claude. Leave empty to use the NexusAI Local Engine.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 font-bold mb-1">OpenAI API Key</label>
                <input
                  type="password"
                  value={apiKeys.openai}
                  onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                  placeholder="sk-..."
                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-bold mb-1">Google Gemini API Key</label>
                <input
                  type="password"
                  value={apiKeys.gemini}
                  onChange={(e) => setApiKeys({ ...apiKeys, gemini: e.target.value })}
                  placeholder="AIzaSy..."
                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => saveApiKeys(apiKeys)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-md"
              >
                Save Keys
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
