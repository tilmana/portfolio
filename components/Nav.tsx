"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import { useRuntimeFeatures } from "@/lib/runtime-features";

// Build nav links from config.sections + config.navLabels, respecting visibility
const ALL_LINKS = [
  { key: "about",          href: "#about",      label: config.navLabels.about },
  { key: "skills",         href: "#skills",     label: config.navLabels.skills },
  { key: "projects",       href: "#projects",   label: config.navLabels.projects },
  { key: "experience",     href: "#experience", label: config.navLabels.experience },
  { key: "certifications", href: "#certifications",      label: config.navLabels.certifications },
  { key: "degrees",        href: "#degrees",    label: config.navLabels.degrees },
  { key: "contact",        href: "#contact",    label: config.navLabels.contact },
] as const;

const navLinks = ALL_LINKS.filter(
  (l) => config.sections[l.key as keyof typeof config.sections]
);

interface NavProps {
  onDisconnect?: () => void;
}

export function Nav({ onDisconnect }: NavProps) {
  const { features } = useRuntimeFeatures();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [navCmd, setNavCmd]       = useState<string | null>(null);

  function handleNav(href: string) {
    setMenuOpen(false);
    if (features.navAnimation) {
      const cmd = `cd ${href.replace("#", "./")}`;
      setNavCmd(cmd);
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => setNavCmd(null), 700);
      }, 320);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-edge">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between gap-4">
          {/* Left: logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="text-primary font-mono font-bold text-sm hover:neon-text transition-all shrink-0"
          >
            [{config.handle}]
          </button>

          {/* Center: desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-xs font-mono text-dim hover:text-primary hover:neon-text px-2 py-1 rounded transition-all duration-150"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: status + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Status indicator */}
            {onDisconnect ? (
              <button
                onClick={onDisconnect}
                title="Disconnect session"
                className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-dim hover:text-danger group transition-colors duration-150"
              >
                <span className="w-2 h-2 rounded-full bg-primary group-hover:bg-danger shadow-[0_0_6px_var(--color-primary)] group-hover:shadow-[0_0_6px_var(--color-danger)] animate-pulse transition-all duration-150" />
                <span>{config.ui.online}</span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-dim">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_var(--color-primary)] animate-pulse" />
                <span>{config.ui.online}</span>
              </div>
            )}

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col justify-center items-center gap-1 w-8 h-8 text-primary"
            >
              <span className={`block w-5 h-0.5 bg-primary transition-transform duration-200 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block w-5 h-0.5 bg-primary transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-primary transition-transform duration-200 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-edge bg-black/95 px-6 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm font-mono text-dim hover:text-primary py-2 text-left transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}
            {/* Status at bottom of mobile menu */}
            <div className="pt-2 mt-1 border-t border-edge">
              {onDisconnect ? (
                <button
                  onClick={() => { setMenuOpen(false); onDisconnect(); }}
                  className="flex items-center gap-2 text-xs font-mono text-dim hover:text-danger group transition-colors duration-150 py-1"
                >
                  <span className="w-2 h-2 rounded-full bg-primary group-hover:bg-danger animate-pulse transition-colors duration-150" />
                  <span>{config.ui.online}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-dim py-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>{config.ui.online}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Nav command overlay — flashes just below the nav bar when navAnimation is enabled */}
      <AnimatePresence>
        {navCmd && (
          <motion.div
            key="nav-cmd"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-14 left-1/2 -translate-x-1/2 z-[9990] font-mono text-sm px-4 py-2 bg-black/90 border border-edge rounded pointer-events-none"
          >
            <span className="text-dim">{config.handle}:~$ </span>
            <span className="text-primary">{navCmd}</span>
            <span className="inline-block w-2 h-4 bg-primary ml-1 align-middle animate-[blink_1s_step-end_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
