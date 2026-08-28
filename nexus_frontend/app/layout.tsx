import React from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "NexusAI Platform — Enterprise Large-Scale AI & Gamification",
  description: "Unified AI Platform with Multi-Provider Router, Workflows, Autonomous Agents, RAG and Gamification System.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0d14] text-gray-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
