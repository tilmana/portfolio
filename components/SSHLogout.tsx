"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import { useRuntimeFeatures } from "@/lib/runtime-features";

type Phase = "logging-out" | "waiting" | "connecting" | "done";

const LOGOUT_LINES: { text: string; delay: number }[] = [
  { text: `visitor@${config.handle}:~$ exit`, delay: 150 },
  { text: "logout",                            delay: 500 },
  { text: "",                                  delay: 750 },
  { text: "Saving session...",                 delay: 1000 },
  { text: "  ...copying shared history...",    delay: 1300 },
  { text: "  ...saving history...truncating history files...", delay: 1650 },
  { text: "  ...completed.",                   delay: 2000 },
  { text: "",                                  delay: 2200 },
  { text: "Deleting expired sessions...   ...none found.", delay: 2500 },
  { text: "",                                  delay: 2800 },
  { text: "[Process completed]",               delay: 3100 },
  { text: "",                                  delay: 3400 },
  { text: `Connection to ${config.domain} closed.`, delay: 3700 },
];

const RECONNECT_LINES: { text: string; delay: number }[] = [
  { text: `Connecting to ${config.domain}...`,           delay: 100 },
  { text: "  Authentication method: publickey",          delay: 500 },
  { text: `  Authenticated to ${config.domain} ([127.0.0.1]:22).`, delay: 950 },
  { text: "  Session established.",                      delay: 1300 },
  { text: "",                                            delay: 1550 },
  { text: config.ui.sshWelcome,                         delay: 1800 },
  { text: `Last login: ${new Date().toUTCString()}`,    delay: 2050 },
  { text: "",                                            delay: 2300 },
  { text: "Loading portfolio...",                        delay: 2500 },
];
const PROGRESS_START = 2900;
const DONE_AT       = 4200;

interface Props {
  onDone: () => void;
}

export function SSHLogout({ onDone }: Props) {
  const { features } = useRuntimeFeatures();
  const [phase, setPhase]         = useState<Phase>("logging-out");
  const [lines, setLines]         = useState<string[]>([]);
  const [progress, setProgress]   = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  const addLine = useCallback((text: string) => {
    setLines((prev) => [...prev, text]);
  }, []);

  // ── Phase: logging-out ─────────────────────────────────
  useEffect(() => {
    if (phase !== "logging-out") return;
    setLines([]);
    setShowPrompt(false);

    const timers = LOGOUT_LINES.map(({ text, delay }) =>
      setTimeout(() => addLine(text), delay)
    );
    const promptTimer = setTimeout(() => setShowPrompt(true), 4200);
    const phaseTimer  = setTimeout(() => setPhase("waiting"),  4200);

    return () => [...timers, promptTimer, phaseTimer].forEach(clearTimeout);
  }, [phase, addLine]);

  // ── Phase: waiting — listen for Enter / click ──────────
  useEffect(() => {
    if (phase !== "waiting") return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter") startReconnect();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function startReconnect() {
    if (phase !== "waiting") return;
    setPhase("connecting");
  }

  // ── Phase: connecting ──────────────────────────────────
  useEffect(() => {
    if (phase !== "connecting") return;
    setLines([]);
    setShowPrompt(false);
    setProgress(0);

    const timers = RECONNECT_LINES.map(({ text, delay }) =>
      setTimeout(() => addLine(text), delay)
    );

    // Animate progress bar
    const progTimer = setTimeout(() => {
      let pct = 0;
      const id = setInterval(() => {
        pct += 2;
        setProgress(pct);
        if (pct >= 100) clearInterval(id);
      }, (DONE_AT - PROGRESS_START) / 50);
    }, PROGRESS_START);

    const doneTimer = setTimeout(() => setPhase("done"), DONE_AT + 400);

    return () => [...timers, progTimer, doneTimer].forEach(clearTimeout);
  }, [phase, addLine]);

  // ── Phase: done ────────────────────────────────────────
  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(onDone, 600);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="ssh-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed inset-0 z-[200] bg-[#010b01] flex flex-col justify-center items-center px-6 font-mono${features.customCursor ? " cursor-none" : ""}`}
          // Tap anywhere during waiting phase to reconnect
          onClick={() => phase === "waiting" && startReconnect()}
        >
          {/* Terminal content */}
          <div className="w-full max-w-2xl space-y-0">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm leading-relaxed text-content"
              >
                {line === "" ? <span>&nbsp;</span> : line}
              </motion.p>
            ))}

            {/* Progress bar (connecting phase) */}
            {phase === "connecting" && progress > 0 && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-primary text-xs w-10 text-right">
                    {progress}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Press ENTER prompt */}
          <AnimatePresence>
            {showPrompt && phase === "waiting" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 text-sm text-dim flex items-center gap-1 select-none"
              >
                Press{" "}
                <kbd className="px-1.5 py-0.5 border border-dim rounded text-xs mx-1">
                  ENTER
                </kbd>{" "}
                {config.ui.sshReconnect}
                <span className="inline-block w-2 h-4 bg-primary ml-1 cursor-blink-inline animate-[blink_1s_step-end_infinite]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
