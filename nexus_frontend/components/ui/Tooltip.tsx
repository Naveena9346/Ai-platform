"use client";

import React from "react";

export function Tooltip(props: any) {
  return (
    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white">
      <span className="font-bold text-cyan-400">Tooltip</span> - Hover tooltip text component.
    </div>
  );
}
