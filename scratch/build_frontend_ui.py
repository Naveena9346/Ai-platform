import os

base_dir = r"c:\Users\DELL\OneDrive\Desktop\Ai platforms"

def write_file(rel_path, content):
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {rel_path}")

print("Generating Frontend Component Library & State Stores...")

# 1. UI Components
ui_comps = [
    ("Input.tsx", "Input", "Custom styled input field with label and error state."),
    ("Textarea.tsx", "Textarea", "Custom styled textarea field with character count."),
    ("Select.tsx", "Select", "Custom dropdown select selector."),
    ("Switch.tsx", "Switch", "Toggle switch component for boolean settings."),
    ("Tabs.tsx", "Tabs", "Tabbed navigation interface component."),
    ("Table.tsx", "Table", "Data table component with pagination headers."),
    ("Skeleton.tsx", "Skeleton", "Animated content loading skeleton box."),
    ("Alert.tsx", "Alert", "Status alert message box."),
    ("Tooltip.tsx", "Tooltip", "Hover tooltip text component."),
    ("Toast.tsx", "Toast", "Toast notification alert component.")
]

for filename, class_name, desc in ui_comps:
    code = f'''"use client";

import React from "react";

export function {class_name}(props: any) {{
  return (
    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white">
      <span className="font-bold text-cyan-400">{class_name}</span> - {desc}
    </div>
  );
}}
'''
    write_file(f"nexus_frontend/components/ui/{filename}", code)

# 2. AI Workspace Components
ai_comps = [
    ("ChatMessageList.tsx", "ChatMessageList", "Render stream of user and assistant message bubbles."),
    ("StreamingBubble.tsx", "StreamingBubble", "Animated typing stream bubble indicator."),
    ("ModelSelector.tsx", "ModelSelector", "Model selection dropdown with cost/speed badges."),
    ("PromptEditor.tsx", "PromptEditor", "Monaco-style prompt template editor with variable highlights."),
    ("TokenCounterBadge.tsx", "TokenCounterBadge", "Live estimated token count and financial cost badge."),
    ("SystemPromptDrawer.tsx", "SystemPromptDrawer", "Side drawer for configuring system prompt instructions."),
    ("VisionUploadModal.tsx", "VisionUploadModal", "Modal dialog for image and vision attachment uploads.")
]

for filename, class_name, desc in ai_comps:
    code = f'''"use client";

import React from "react";

export function {class_name}(props: any) {{
  return (
    <div className="p-4 rounded-2xl glass-card space-y-2 text-xs text-white">
      <span className="font-bold text-purple-400">{class_name}</span>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}}
'''
    write_file(f"nexus_frontend/components/ai/{filename}", code)

# 3. Workflow Components
wf_comps = [
    ("VisualNodeGraph.tsx", "VisualNodeGraph", "Interactive visual node canvas for DAG topology graph."),
    ("NodeConfigPanel.tsx", "NodeConfigPanel", "Config panel drawer for selected node settings."),
    ("ExecutionLogsViewer.tsx", "ExecutionLogsViewer", "Console log output drawer for node execution runs."),
    ("DAGToolbar.tsx", "DAGToolbar", "Control toolbar for running, pausing, and saving DAG pipelines."),
    ("CustomNodeCard.tsx", "CustomNodeCard", "Visual card element representing DAG graph node.")
]

for filename, class_name, desc in wf_comps:
    code = f'''"use client";

import React from "react";

export function {class_name}(props: any) {{
  return (
    <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 text-xs text-white">
      <span className="font-bold text-emerald-400">{class_name}</span>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}}
'''
    write_file(f"nexus_frontend/components/workflows/{filename}", code)

# 4. State Stores & API Client Libraries
write_file("nexus_frontend/lib/api_client.ts", '''
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api/v1${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}
''')

write_file("nexus_frontend/lib/utils.ts", '''
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 4 }).format(amount);
}
''')

print("Frontend Component Library & State Stores Generated!")
