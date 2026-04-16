"use client";

import { motion } from "framer-motion";
import { TerminalWindow, PromptLine } from "@/components/ui/TerminalWindow";
import { DecryptText } from "@/components/ui/DecryptText";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { config, getSectionNumber } from "@/lib/config";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6">
      <SectionReveal className="max-w-4xl mx-auto">
        <RevealItem>
          <p className="text-xs font-mono mb-3">
            <DecryptText text={`# ${getSectionNumber("certifications")} / certifications`} className="text-dim" />
          </p>
        </RevealItem>

        <RevealItem>
        <TerminalWindow title={`${config.handle}:~ cat certifications.txt`}>
          <div className="p-6 font-mono">
            <PromptLine handle={config.handle} command="cat certifications.txt" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {config.certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="border border-edge rounded-md p-4 bg-black/30 hover:border-primary/40 transition-colors duration-200"
                >
                  {/* Short cert name */}
                  <p className="text-primary font-bold text-lg leading-tight mb-1">
                    {cert.name}
                  </p>

                  {/* Full name */}
                  <p className="text-content text-xs leading-snug mb-3">
                    {cert.full}
                  </p>

                  {/* Org and year */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-dim">{cert.org}</span>
                    {(cert.year as string) === "" ? (
                      <span className="text-warn">({config.ui.inProgress})</span>
                    ) : (
                      <span className="text-dim">{cert.year}</span>
                    )}
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
