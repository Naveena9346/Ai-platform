"use client";

import React from "react";

export function ChatMessageList(props: any) {
  return (
    <div className="p-4 rounded-2xl glass-card space-y-2 text-xs text-white">
      <span className="font-bold text-purple-400">ChatMessageList</span>
      <p className="text-gray-400">Render stream of user and assistant message bubbles.</p>
    </div>
  );
}
