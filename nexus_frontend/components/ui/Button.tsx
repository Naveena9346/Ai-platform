"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20",
    secondary: "bg-white/10 hover:bg-white/15 text-white font-bold border border-white/10",
    danger: "bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20",
    ghost: "bg-transparent hover:bg-white/5 text-gray-300 font-medium",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2 text-xs rounded-xl",
    lg: "px-6 py-3 text-sm rounded-xl",
  };

  return (
    <button
      className={`inline-flex items-center justify-center space-x-2 transition-all duration-200 disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
