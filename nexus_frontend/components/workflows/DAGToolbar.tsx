"use client";

import React from "react";

export function DAGToolbar(props: any) {
  return (
    <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 text-xs text-white">
      <span className="font-bold text-emerald-400">DAGToolbar</span>
      <p className="text-gray-400">Control toolbar for running, pausing, and saving DAG pipelines.</p>
    </div>
  );
}
