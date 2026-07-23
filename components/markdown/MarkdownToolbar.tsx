"use client";

import React from "react";

interface ToolbarButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export function ToolbarButton({ onClick, title, children, active, disabled }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`p-1.5 rounded-md transition text-xs font-medium ${
        active
          ? "bg-white/20 text-white"
          : "text-white/60 hover:text-white hover:bg-white/10"
      } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

interface ToolbarSeparatorProps {
  className?: string;
}

export function ToolbarSeparator({ className = "" }: ToolbarSeparatorProps) {
  return <div className={`w-px h-5 bg-white/10 mx-1 ${className}`} />;
}
