"use client";

import { motion } from "framer-motion";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { HexRain } from "@/components/HexRain";
import { config } from "@/lib/config";
import { useRuntimeFeatures } from "@/lib/runtime-features";

const statusConfig = {
  open: { color: "text-primary", dot: "bg-primary", label: "Open to opportunities" },
  employed: { color: "text-warn", dot: "bg-warn", label: "Employed" },
  freelance: { color: "text-accent", dot: "bg-accent", label: "Available for freelance" },
};

export function Hero() {
  const { features } = useRuntimeFeatures();
  const status = statusConfig[config.status];

  const typeLines = [...config.typewriterLines];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Hex rain */}
      {features.hexRain && <HexRain />}

      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-primary) 3%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 3%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--color-primary) 5%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-lg overflow-hidden neon-glow bg-base border border-edge"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-b border-edge">
            <span className="font-mono text-xs text-dim">[×]</span>
            <span className="flex-1 text-center text-xs text-dim font-mono">
              visitor@{config.handle}:~
            </span>
            <span className="w-[42px]" />
          </div>

          {/* Terminal content */}
          <div className="p-6 md:p-10">
            {/* whoami command */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-mono mb-6"
            >
              <span className="text-accent">visitor</span>
              <span className="text-dim">@</span>
              <span className="text-primary">{config.handle}</span>
              <span className="text-dim">:</span>
              <span className="text-accent">~</span>
              <span className="text-content">$ </span>
              <span className="text-content">{config.heroCommand}</span>
            </motion.p>

            {/* Name — big */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold font-mono text-primary neon-text mb-2 leading-tight"
            >
              {config.name}
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg md:text-xl text-accent font-mono mb-1"
            >
              {config.title}
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="text-sm text-dim font-mono mb-8 italic"
            >
              // {config.tagline}
            </motion.p>

            {/* Typewriter output block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="bg-black/40 rounded-md border border-surface p-4 mb-8 font-mono text-sm overflow-x-auto"
            >
              <TypewriterText
                lines={typeLines}
                speed={40}
                startDelay={1200}
                className="text-content whitespace-pre"
              />
            </motion.div>

            {/* Status + CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Status badge */}
              <span className="flex items-center gap-2 text-sm font-mono">
                <span className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
                <span className={status.color}>{status.label}</span>
              </span>

            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center text-xs text-dim font-mono mt-8"
        >
          {config.ui.scrollHint}
        </motion.p>
      </div>
    </section>
  );
}
