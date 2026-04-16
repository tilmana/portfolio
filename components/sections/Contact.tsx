"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TerminalWindow, PromptLine } from "@/components/ui/TerminalWindow";
import { DecryptText } from "@/components/ui/DecryptText";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { config, getSectionNumber } from "@/lib/config";

const linkMeta: Record<string, { label: string; icon: string }> = {
  github:     { label: "github",     icon: "⬡" },
  linkedin:   { label: "linkedin",   icon: "in" },
  twitter:    { label: "twitter",    icon: "@" },
  blog:       { label: "blog",       icon: "✦" },
  ctftime:    { label: "ctftime",    icon: "⚑" },
  email:      { label: "email",      icon: "✉" },
  tryhackme:  { label: "tryhackme",  icon: "⚔" },
  resume:     { label: "resume",     icon: "↗" },
};

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const linkEntries = (
    Object.entries(config.links) as [keyof typeof config.links, string][]
  ).filter(([, url]) => url !== "");

  function copyEmail(address: string) {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(address);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <section id="contact" className="py-24 px-6">
      <SectionReveal className="max-w-4xl mx-auto">
        <RevealItem>
          <p className="text-xs font-mono mb-3">
            <DecryptText text={`# ${getSectionNumber("contact")} / contact`} className="text-dim" />
          </p>
        </RevealItem>

        <RevealItem>
        <TerminalWindow title={`${config.handle}:~ sendmail ${config.email}`}>
          <div className="p-6 font-mono">
            <PromptLine handle={config.handle} command={`sendmail ${config.email}`} />

            {/* Link rows */}
            <div className="space-y-3 mt-1">
              {linkEntries.map(([key, url], i) => {
                const meta = linkMeta[key] ?? { label: key, icon: "→" };
                const isEmail = url.startsWith("mailto:");
                const displayUrl = isEmail
                  ? url.replace("mailto:", "")
                  : url.replace(/^https?:\/\//, "");

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    {/* Icon + label */}
                    <span className="w-24 shrink-0 flex items-center gap-2">
                      <span className="text-dim text-xs w-4 text-center">
                        {meta.icon}
                      </span>
                      <span className="text-accent">{meta.label}</span>
                    </span>

                    {/* Arrow */}
                    <span className="text-dim">→</span>

                    {/* URL */}
                    <a
                      href={url}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className="text-primary hover:underline hover:neon-text transition-all truncate min-w-0"
                    >
                      {displayUrl}
                    </a>

                    {/* Copy button for email */}
                    {isEmail && (
                      <button
                        onClick={() => copyEmail(displayUrl)}
                        className="ml-2 shrink-0 text-dim hover:text-primary transition-colors text-xs font-mono"
                        title="Copy to clipboard"
                      >
                        {copied === displayUrl ? "[copied!]" : "[copy]"}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Fun footer line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: linkEntries.length * 0.08 + 0.2, duration: 0.5 }}
              className="mt-8 pt-4 border-t border-surface text-xs text-dim"
            >
              {config.ui.contactFooter}
            </motion.p>
          </div>
        </TerminalWindow>
        </RevealItem>
      </SectionReveal>
    </section>
  );
}
