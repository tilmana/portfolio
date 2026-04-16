"use client";

import { motion } from "framer-motion";
import { TerminalWindow, PromptLine } from "@/components/ui/TerminalWindow";
import { DecryptText } from "@/components/ui/DecryptText";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { config, getSectionNumber } from "@/lib/config";

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <SectionReveal className="max-w-4xl mx-auto">
        <RevealItem>
          <p className="text-xs font-mono mb-3">
            <DecryptText text={`# ${getSectionNumber("about")} / about`} className="text-dim" />
          </p>
        </RevealItem>

        <RevealItem>
        <TerminalWindow title={`${config.handle}:~ cat about.txt`}>
          <div className="p-6 font-mono">
            <PromptLine handle={config.handle} command="cat about.txt" />

            {/* Output */}
            <div className="space-y-4">
              {config.about.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  className="text-sm text-content leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Separator */}
            <div className="mt-6 pt-4 border-t border-surface">
              {/* Quick facts grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-accent">location</span>
                  <span className="text-dim"> → </span>
                  <span className="text-content">{config.location}</span>
                </div>
                <div>
                  <span className="text-accent">email</span>
                  <span className="text-dim"> → </span>
                  <a
                    href={`mailto:${config.email}`}
                    className="text-primary hover:underline"
                  >
                    {config.email}
                  </a>
                </div>
                {(Object.entries(config.links) as [string, string][])
                  .filter(([key, url]) => url !== "" && key !== "email")
                  .map(([key, url]) => (
                    <div key={key}>
                      <span className="text-accent">{key}</span>
                      <span className="text-dim"> → </span>
                      <a
                        href={url}
                        target={url.startsWith("mailto:") ? undefined : "_blank"}
                        rel={url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="text-primary hover:underline"
                      >
                        {url.replace(/^https?:\/\//, "").replace("mailto:", "")}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </TerminalWindow>
        </RevealItem>
      </SectionReveal>
    </section>
  );
}
