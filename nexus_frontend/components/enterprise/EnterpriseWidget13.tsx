"use client";

import React, { useState, useEffect } from "react";
import { Activity, CheckCircle2, Cpu, Database, Shield, Zap } from "lucide-react";

interface EnterpriseWidget13Props {
  title?: string;
  initialData?: any;
  onSuccess?: (data: any) => void;
}

export function EnterpriseWidget13({ title = "EnterpriseWidget13", initialData, onSuccess }: EnterpriseWidget13Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [data, setData] = useState<any>(initialData || null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setStatus("idle");
  }, [title]);

  const handleExecute = async () => {
    setStatus("loading");
    setTimeout(() => {
      const result = { id: counter + 1, timestamp: new Date().toISOString(), widget: title };
      setData(result);
      setCounter(prev => prev + 1);
      setStatus("success");
      if (onSuccess) onSuccess(result);
    }, 300);
  };

  return (
    <div className="glass-card p-6 space-y-4 border border-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>{title}</span>
        </h3>
        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
          Status: {status}
        </span>
      </div>
      <p className="text-xs text-gray-400">Enterprise React UI Component Widget 13.</p>
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-mono text-gray-500">Executions: {counter}</span>
        <button
          onClick={handleExecute}
          disabled={status === "loading"}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20"
        >
          {status === "loading" ? "Processing..." : "Trigger Action"}
        </button>
      </div>
      {data && (
        <div className="p-3 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-white/5">
          {JSON.stringify(data, null, 2)}
        </div>
      )}
    </div>
  );
}
