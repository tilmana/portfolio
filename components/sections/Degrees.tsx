"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TerminalWindow, PromptLine } from "@/components/ui/TerminalWindow";
import { DecryptText } from "@/components/ui/DecryptText";
import { DegreeModal } from "@/components/DegreeModal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { useRuntimeFeatures } from "@/lib/runtime-features";
import { config, getSectionNumber } from "@/lib/config";


type Degree = (typeof config.degrees)[number];

export function Degrees() {
  const { features } = useRuntimeFeatures();
  const [selected, setSelected] = useState<Degree | null>(null);

  return (
    <section id="degrees" className="py-24 px-6">
      <SectionReveal className="max-w-4xl mx-auto">
        <RevealItem>
          <p className="text-xs font-mono mb-3">
            <DecryptText text={`# ${getSectionNumber("degrees")} / degrees`} className="text-dim" />
          </p>
        </RevealItem>

        <RevealItem>
        <TerminalWindow title={`${config.handle}:~ cat degrees.txt`}>
          <div className="p-6 font-mono">
            <PromptLine handle={config.handle} command="cat degrees.txt" />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-dim text-xs mb-5"
            >
              [*] Found {config.degrees.length} record{(config.degrees.length as number) !== 1 ? "s" : ""}.
            </motion.p>

            <div className="space-y-5">
              {config.degrees.map((deg, i) => {
                const inProgress = (deg.year as string) === "";
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                    onClick={() => setSelected(deg)}
                    className={`w-full text-left border border-edge rounded-md p-4 bg-black/30 hover:border-primary/40 hover:bg-black/50 transition-colors group${features.glowOnInteractive ? " glow-pulse" : ""}`}
                  >
                    {/* Degree + year */}
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-primary font-mono font-bold text-sm">
                        {deg.degree}
                      </h3>
                      {inProgress ? (
                        <span className="text-xs text-warn font-mono shrink-0">
                          {config.ui.inProgress}
                        </span>
                      ) : (
                        <span className="text-xs text-dim font-mono shrink-0">
                          {deg.year}
                        </span>
                      )}
                    </div>

                    {/* Institution */}
                    <p className="text-sm text-accent mb-1">{deg.institution}</p>

                    {/* Focus */}
                    {(deg.focus as string) && (
                      <p className="text-xs text-dim">
                        focus: <span className="text-content">{deg.focus}</span>
                      </p>
                    )}

                    {/* Click hint */}
                    <p className="text-xs text-dim mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {config.ui.clickToExpand}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </TerminalWindow>
        </RevealItem>

        <DegreeModal degree={selected} onClose={() => setSelected(null)} />
      </SectionReveal>
    </section>
  );
}
