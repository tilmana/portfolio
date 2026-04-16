"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalWindow, PromptLine } from "@/components/ui/TerminalWindow";
import { DecryptText } from "@/components/ui/DecryptText";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { useRuntimeFeatures } from "@/lib/runtime-features";
import { config, getSectionNumber } from "@/lib/config";


const COMMIT_HASHES = [
  "a1b2c3d", "f4e5d6c", "b7c8d9e", "12a3b4c", "9f8e7d6",
  "e2d3f4a", "7c6b5a4", "0f1e2d3", "8b9c0d1", "3a4b5c6",
  "d7e8f9a", "6e5d4c3", "2f3a4b5", "1d0c9b8", "c4d5e6f",
  "5b6c7d8", "4a3b2c1", "b8a9c0d", "0e1f2a3", "9d8e7f6",
];

/** Deterministic fake git hash for jobs beyond the preset list. */
function jobHash(i: number): string {
  let h = ((i + 1) * 0x9e3779b9) >>> 0;
  h = ((h ^ (h >>> 16)) * 0x85ebca6b) >>> 0;
  h = ((h ^ (h >>> 13)) * 0xc2b2ae35) >>> 0;
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

// Characters used in the cipher animation
const CIPHER_CHARS = "▒f░3▓a█0d<7b>4e|1c/{8}9^2*%&!@#$?±∓×÷∅∆";

/** Endlessly scrambles through random characters — never settles. */
function CipherText({ length = 14 }: { length?: number }) {
  // Start with a static placeholder so server/client HTML matches
  const [display, setDisplay] = useState("█".repeat(length));

  useEffect(() => {
    const id = setInterval(() => {
      setDisplay(
        Array.from({ length }, () =>
          CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
        ).join("")
      );
    }, 75);
    return () => clearInterval(id);
  }, [length]);

  return (
    <span className="text-danger font-mono tracking-wider">{display}</span>
  );
}

/** Redaction bars replacing bullet points. */
function RedactionBars() {
  const bars = [
    { width: "88%", delay: 0 },
    { width: "74%", delay: 0.05 },
    { width: "91%", delay: 0.1 },
    { width: "62%", delay: 0.15 },
  ];

  return (
    <div className="space-y-2.5 pt-1">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: bar.delay, duration: 0.3, ease: "easeOut" }}
          style={{ width: bar.width }}
          className="h-3 rounded-sm bg-[#1a0000] border border-danger/25 relative overflow-hidden"
        >
          {/* Subtle scan shimmer */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#ff4444]/10 to-transparent"
          />
        </motion.div>
      ))}
    </div>
  );
}

export function Experience() {
  const { features } = useRuntimeFeatures();
  const allIndices = new Set(config.experience.map((_, i) => i));
  const [hashes, setHashes] = useState<string[]>(() =>
    config.experience.map((_, i) => COMMIT_HASHES[i] ?? jobHash(i))
  );
  useEffect(() => {
    setHashes(config.experience.map(() =>
      COMMIT_HASHES[Math.floor(Math.random() * COMMIT_HASHES.length)]
    ));
  }, []);
  const [expanded, setExpanded] = useState<Set<number>>(
    config.expandExperience ? allIndices : new Set([0])
  );

  function toggle(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        // In accordion mode, don't collapse the last open one
        if (!config.expandExperience && next.size === 1) return prev;
        next.delete(i);
      } else {
        if (!config.expandExperience) next.clear(); // accordion: close others
        next.add(i);
      }
      return next;
    });
  }

  return (
    <section id="experience" className="py-24 px-6">
      <SectionReveal className="max-w-4xl mx-auto">
        <RevealItem>
          <p className="text-xs font-mono mb-3">
            <DecryptText text={`# ${getSectionNumber("experience")} / experience`} className="text-dim" />
          </p>
        </RevealItem>

        <RevealItem>
        <TerminalWindow title={`${config.handle}:~ git log --oneline --all`}>
          <div className="p-6 font-mono">
            <PromptLine handle={config.handle} command="git log --oneline --all" />

            <div className="space-y-1">
              {config.experience.map((job, i) => {
                const hash = hashes[i] ?? jobHash(i);
                const isHead = i === 0;
                const isOpen = expanded.has(i);
                // Failsafe: strip real data from confidential entries regardless of config values
                const isConfidential = (job as { confidential?: boolean }).confidential === true;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                  >
                    {/* Commit line */}
                    <button
                      onClick={() => toggle(i)}
                      className={`w-full text-left flex items-center gap-2 py-1.5 px-2 rounded hover:bg-surface transition-colors duration-150 group${features.glowOnInteractive && !expanded.has(i) ? " glow-pulse" : ""}`}
                    >
                      <span className="text-warn text-xs shrink-0">{hash}</span>
                      {isHead && (
                        <span className="text-accent text-xs shrink-0">(HEAD)</span>
                      )}
                      {isConfidential && (
                        <span className="text-danger text-xs shrink-0 border border-danger/40 px-1 rounded">
                          {config.ui.classifiedBadge}
                        </span>
                      )}
                      <span className="text-content text-sm truncate">
                        <span className="underline underline-offset-4 decoration-dim">{job.title}</span>
                        {!isConfidential && <span className="underline underline-offset-4 decoration-dim"> @ {job.company}</span>}
                      </span>
                      {isConfidential && (
                        <span className="text-sm shrink-0">
                          {" "}@ <CipherText length={13} />
                        </span>
                      )}
                      <span className="ml-auto text-dim text-xs shrink-0">
                        {isOpen ? "▾" : "▸"}
                      </span>
                    </button>

                    {/* Expanded details */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="details"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`ml-4 mt-1 mb-3 pl-4 border-l space-y-2 ${
                              isConfidential
                                ? "border-danger/40"
                                : "border-edge"
                            }`}
                          >
                            {/* Classification banner */}
                            {isConfidential && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2 py-1 px-2 bg-danger/10 border border-danger/30 rounded text-xs text-danger font-mono"
                              >
                                <span className="animate-pulse">⚠</span>
                                <span>{config.ui.classifiedBanner}</span>
                                <span className="ml-auto animate-pulse">⚠</span>
                              </motion.div>
                            )}

                            {/* Meta row — always visible */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-1">
                              <span>
                                <span className="text-dim">period: </span>
                                <span className="text-content">{job.period}</span>
                              </span>
                              <span>
                                <span className="text-dim">location: </span>
                                <span className="text-content">{job.location}</span>
                              </span>
                              <span className="px-2 py-0.5 rounded bg-surface border border-edge text-dim text-xs">
                                {job.type}
                              </span>
                            </div>

                            {/* Bullet points or redaction */}
                            {isConfidential ? (
                              <RedactionBars />
                            ) : (
                              <ul className="space-y-1 pt-1">
                                {job.bullets.map((bullet, bi) => (
                                  <li key={bi} className="flex gap-2 text-sm">
                                    <span className="text-primary shrink-0">[+]</span>
                                    <span className="text-content leading-relaxed">{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-xs text-dim mt-4">
              {config.ui.experienceHint}
            </p>
          </div>
        </TerminalWindow>
        </RevealItem>
      </SectionReveal>
    </section>
  );
}
