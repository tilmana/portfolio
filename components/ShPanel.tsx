"use client";

import { useState, useEffect } from "react";
import { useRuntimeFeatures } from "@/lib/runtime-features";
import { THEMES, ThemeName, config } from "@/lib/config";

// Human-readable script name for each feature key
const SCRIPT_LABELS: Record<string, string> = {
  customCursor:      "custom_cursor",
  decryptAnimation:  "decrypt_animation",
  hexRain:           "hex_rain",
  scanLine:          "scan_line",
  sshLogout:         "ssh_logout",
  navAnimation:      "nav_animation",
  glowOnInteractive: "glow_on_interactive",
};

function applyTheme(name: ThemeName) {
  const p = THEMES[name];
  const root = document.documentElement;
  root.style.setProperty("--color-primary", p.primary);
  root.style.setProperty("--color-accent",  p.accent);
  root.style.setProperty("--color-dim",     p.dim);
  root.style.setProperty("--color-edge",    p.edge);
  root.style.setProperty("--color-surface", p.surface);
  root.style.setProperty("--color-base",    p.base);
  root.style.setProperty("--color-content", p.content);
  root.style.setProperty("--color-warn",    p.warn);
  root.style.setProperty("--color-danger",  p.danger);
}

export function ShPanel() {
  const { features, toggle } = useRuntimeFeatures();
  const [open, setOpen]           = useState(false);
  const [view, setView]           = useState<"scripts" | "themes">("scripts");
  const [activeTheme, setActive]  = useState<ThemeName>(config.theme);

  const featureKeys  = Object.keys(SCRIPT_LABELS) as (keyof typeof features)[];
  const themeNames   = Object.keys(THEMES) as ThemeName[];

  function commitTheme(name: ThemeName) {
    setActive(name);
    applyTheme(name);
  }

  function revertTheme() {
    applyTheme(activeTheme);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(false); setView("scripts"); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function handleTogglePanel() {
    if (open) { setOpen(false); setView("scripts"); }
    else      { setOpen(true); }
  }

  return (
    <div className={`fixed bottom-4 right-4 z-[9980] font-mono text-xs select-none${features.customCursor ? " cursor-none" : ""}`}>

      {/* Dropdown */}
      {open && (
        <div className="mb-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-edge bg-black/95 overflow-hidden shadow-lg">

          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-black/80 border-b border-edge">
            <span className="font-mono text-xs text-dim">[×]</span>
            <span className="flex-1 text-center text-dim truncate">
              {view === "themes" ? "~/scripts/change_theme.sh" : "~/scripts"}
            </span>
          </div>

          {/* ── Scripts view ───────────────────────────────── */}
          {view === "scripts" && (
            <ul className="p-2 space-y-0.5">
              <li>
                <button
                  onClick={() => setView("themes")}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-white/5 text-accent transition-colors duration-100"
                >
                  <span className="text-dim mr-1">$</span>change_theme.sh
                </button>
              </li>
              {featureKeys.map((key) => {
                const on   = features[key];
                const slug = SCRIPT_LABELS[key];
                const name = on ? `disable_${slug}.sh` : `enable_${slug}.sh`;
                return (
                  <li key={key}>
                    <button
                      onClick={() => toggle(key)}
                      className={[
                        "w-full text-left px-2 py-1.5 rounded hover:bg-white/5 transition-colors duration-100",
                        on ? "text-danger" : "text-primary",
                      ].join(" ")}
                    >
                      <span className="text-dim mr-1">$</span>{name}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* ── Theme picker view ───────────────────────────── */}
          {view === "themes" && (
            <div className="p-2">
              <button
                onClick={() => { revertTheme(); setView("scripts"); }}
                className="w-full text-left px-2 py-1.5 mb-1 rounded hover:bg-white/5 text-dim transition-colors duration-100"
              >
                ← back
              </button>

              <ul onMouseLeave={revertTheme}>
                {themeNames.map((name) => {
                  const isActive = name === activeTheme;
                  return (
                    <li key={name}>
                      <button
                        onMouseEnter={() => applyTheme(name)}
                        onClick={() => commitTheme(name)}
                        className={[
                          "w-full text-left px-2 py-1.5 rounded flex items-center gap-2",
                          "hover:bg-white/5 transition-colors duration-100",
                          isActive ? "text-primary" : "text-content",
                        ].join(" ")}
                      >
                        {/* Swatch dot — uses the theme's own primary color, not the CSS var */}
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: THEMES[name].primary }}
                        />
                        {name}
                        {isActive && <span className="text-dim ml-auto"># active</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {/* Keyboard hint */}
          <div className="px-3 py-1.5 border-t border-edge text-[10px] text-dim flex gap-3">
            <span><span className="text-edge">[esc]</span> close</span>
            {view === "themes" && <span><span className="text-edge">[←]</span> back</span>}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <div className="flex justify-end">
        <button
          onClick={handleTogglePanel}
          className={[
            "px-3 py-1.5 rounded border transition-colors duration-150 bg-black/80",
            open
              ? "border-primary text-primary"
              : "border-edge text-dim hover:border-primary hover:text-primary",
          ].join(" ")}
        >
          <span className="text-dim mr-1">$</span>sh
        </button>
      </div>
    </div>
  );
}
