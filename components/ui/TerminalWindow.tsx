"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { DecryptText } from "@/components/ui/DecryptText";
import { useRuntimeFeatures } from "@/lib/runtime-features";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  scanlines?: boolean;
}

export function TerminalWindow({
  title = "terminal",
  children,
  className = "",
  delay = 0,
  scanlines = true,
}: TerminalWindowProps) {
  const { features } = useRuntimeFeatures();
  return (
    <div className={`relative rounded-lg overflow-hidden neon-glow bg-base border border-edge ${className}`}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-b border-edge shrink-0">
        <span className="font-mono text-xs text-dim">[×]</span>
        <span className="flex-1 text-center text-xs font-mono truncate px-2">
          <DecryptText text={title} className="text-dim" speed={30} scrambleFrames={3} />
        </span>
        <span className="w-6" />
      </div>

      {/* Content + scan line */}
      <div className="relative">
        {children}

        {/* Scan line sweeps down once on entrance */}
        {features.scanLine && (
          <motion.div
            aria-hidden
            initial={{ top: "0%", opacity: 1 }}
            whileInView={{ top: "100%", opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: delay + 0.1, ease: "linear" }}
            className="absolute left-0 right-0 h-px pointer-events-none z-20"
            style={{ boxShadow: "0 0 12px var(--color-primary), 0 0 24px color-mix(in srgb, var(--color-primary) 38%, transparent)", background: "var(--color-primary)" }}
          />
        )}

        {/* Scanlines overlay */}
        {scanlines && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.04)_2px,rgba(0,0,0,0.04)_4px)]"
          />
        )}
      </div>
    </div>
  );
}

/** A styled prompt line: visitor@handle:~$ command */
export function PromptLine({
  handle,
  command,
}: {
  handle: string;
  command: string;
}) {
  return (
    <p className="text-sm font-mono mb-3">
      <span className="text-accent">visitor</span>
      <span className="text-dim">@</span>
      <span className="text-primary">{handle}</span>
      <span className="text-dim">:</span>
      <span className="text-accent">~</span>
      <span className="text-content">$ </span>
      <span className="text-content">{command}</span>
    </p>
  );
}

/** Section label (dimmed, like a comment) */
export function SectionComment({ children }: { children: ReactNode }) {
  return (
    <p className="text-dim text-sm font-mono mb-1">
      {children}
    </p>
  );
}
