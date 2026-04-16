"use client";

import { useState, useCallback } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Degrees } from "@/components/sections/Degrees";
import { Contact } from "@/components/sections/Contact";
import { SSHLogout } from "@/components/SSHLogout";
import { CustomCursor } from "@/components/CustomCursor";
import { ShPanel } from "@/components/ShPanel";
import { RuntimeFeaturesProvider, useRuntimeFeatures } from "@/lib/runtime-features";
import { config } from "@/lib/config";

const currentYear = new Date().getFullYear();
const { sections } = config;

// ── Inner component — has access to RuntimeFeaturesContext ──────────────────

function PortfolioInner() {
  const { features } = useRuntimeFeatures();
  const [loggedOut, setLoggedOut]   = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  const handleDisconnect = useCallback(() => setLoggedOut(true), []);

  const handleReconnect = useCallback(() => {
    setSessionKey((k) => k + 1);
    setLoggedOut(false);
    window.scrollTo({ top: 0 });
  }, []);

  const echoCmd = `echo "Built with Next.js + Tailwind. © ${currentYear} ${config.name}"`;
  const echoOut = `Built with Next.js + Tailwind. © ${currentYear} ${config.name}`;

  return (
    <>
      {features.customCursor && <CustomCursor />}
      {features.sshLogout && loggedOut && <SSHLogout onDone={handleReconnect} />}

      <div
        className={[
          "min-h-screen bg-base text-content transition-opacity duration-500",
          features.customCursor ? "cursor-none" : "",
          features.sshLogout && loggedOut ? "opacity-0 pointer-events-none" : "opacity-100",
        ].join(" ")}
      >
        <Nav onDisconnect={features.sshLogout ? handleDisconnect : undefined} />

        <main key={sessionKey}>
          <Hero />
          {sections.about          && <About />}
          {sections.skills         && <Skills />}
          {sections.projects       && <Projects />}
          {sections.experience     && <Experience />}
          {sections.certifications && <Certifications />}
          {sections.degrees        && <Degrees />}
          {sections.contact        && <Contact />}
        </main>

        <footer className="py-12 px-6 border-t border-edge">
          <div className="max-w-4xl mx-auto font-mono text-sm space-y-1">
            <p>
              <span className="text-accent">visitor</span>
              <span className="text-dim">@</span>
              <span className="text-primary">{config.handle}</span>
              <span className="text-dim">:</span>
              <span className="text-accent">~</span>
              <span className="text-content">$ </span>
              <span className="text-content">{echoCmd}</span>
            </p>
            <p className="text-dim text-xs pl-2">{echoOut}</p>
          </div>
        </footer>
      </div>

      <ShPanel />
    </>
  );
}

// ── Outer component — provides the context ──────────────────────────────────

export function PortfolioClient() {
  return (
    <RuntimeFeaturesProvider>
      <PortfolioInner />
    </RuntimeFeaturesProvider>
  );
}
