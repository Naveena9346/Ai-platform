"use client";

import React from "react";

export function CustomNodeCard(props: any) {
  return (
    <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 text-xs text-white">
      <span className="font-bold text-emerald-400">CustomNodeCard</span>
      <p className="text-gray-400">Visual card element representing DAG graph node.</p>
    </div>
  );
}
