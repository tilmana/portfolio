"use client";

import { motion } from "framer-motion";
import { TerminalWindow, PromptLine } from "@/components/ui/TerminalWindow";
import { DecryptText } from "@/components/ui/DecryptText";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { config, getSectionNumber } from "@/lib/config";

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-black/20">
      <SectionReveal className="max-w-5xl mx-auto">
        <RevealItem>
          <p className="text-xs font-mono mb-3">
            <DecryptText text={`# ${getSectionNumber("skills")} / skills`} className="text-dim" />
          </p>
        </RevealItem>

        <RevealItem>
        <TerminalWindow title={`${config.handle}:~ cat skills.txt`}>
          <div className="p-6 font-mono">
            <PromptLine handle={config.handle} command="cat skills.txt" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {config.skills.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1, duration: 0.4 }}
                >
                  <h3 className="text-warn text-xs font-mono uppercase tracking-widest mb-4 pb-1 border-b border-edge">
                    [ {group.category} ]
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.08 + si * 0.04, duration: 0.25 }}
                        className="text-xs px-3 py-1.5 rounded border border-edge bg-surface text-primary font-mono hover:border-primary hover:bg-surface transition-colors duration-150 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TerminalWindow>
        </RevealItem>
      </SectionReveal>
    </section>
  );
}
