"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TerminalWindow, PromptLine } from "@/components/ui/TerminalWindow";
import { ProjectModal } from "@/components/ProjectModal";
import { DecryptText } from "@/components/ui/DecryptText";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { useRuntimeFeatures } from "@/lib/runtime-features";
import { config, getSectionNumber } from "@/lib/config";


type Project = (typeof config.projects)[number];

const severityColors = {
  critical: "bg-[#ff4444]/20 text-[#ff4444] border-[#ff4444]/40",
  high:     "bg-[#ff7c00]/20 text-[#ff7c00] border-[#ff7c00]/40",
  medium:   "bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/40",
  low:      "bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/40",
};

export function Projects() {
  const { features } = useRuntimeFeatures();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6">
      <SectionReveal className="max-w-5xl mx-auto">
        <RevealItem>
          <p className="text-xs font-mono mb-3">
            <DecryptText text={`# ${getSectionNumber("projects")} / projects`} className="text-dim" />
          </p>
        </RevealItem>

        <RevealItem>
        <TerminalWindow title={`${config.handle}:~ ls -la ./projects/`}>
          <div className="p-6 font-mono">
            <PromptLine handle={config.handle} command="ls -la ./projects/" />

            <p className="text-xs text-dim mb-4">
              total {config.projects.length}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.projects.map((project, i) => (
                <motion.button
                  key={project.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={() => setSelected(project)}
                  className={`text-left border border-edge rounded-md p-4 bg-black/30 hover:border-primary/40 hover:bg-black/50 transition-all duration-200 group cursor-pointer${features.glowOnInteractive ? " glow-pulse" : ""}`}
                >
                  {/* Name + severity */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-primary font-mono font-bold text-sm group-hover:neon-text transition-all">
                      {project.name}
                    </h3>
                    {project.severity && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded border font-mono uppercase shrink-0 ${
                          severityColors[project.severity]
                        }`}
                      >
                        {project.severity}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-content leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-surface text-dim border border-edge font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expand hint */}
                  <p className="text-xs text-dim group-hover:text-primary transition-colors font-mono">
                    {config.ui.clickToExpand}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </TerminalWindow>
        </RevealItem>
      </SectionReveal>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
