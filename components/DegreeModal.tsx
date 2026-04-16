"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";

type Degree = (typeof config.degrees)[number];

interface Props {
  degree: Degree | null;
  onClose: () => void;
}

export function DegreeModal({ degree, onClose }: Props) {
  useEffect(() => {
    if (!degree) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [degree, onClose]);

  useEffect(() => {
    document.body.style.overflow = degree ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [degree]);

  const inProgress = degree ? (degree.year as string) === "" : false;
  const longDesc   = degree ? (degree as Degree & { longDescription?: string }).longDescription ?? "" : "";

  return (
    <AnimatePresence>
      {degree && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[151] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-lg rounded-lg border border-edge bg-base neon-glow pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-black/80 border-b border-edge">
                <button
                  onClick={onClose}
                  title="Close"
                  className="font-mono text-xs text-dim hover:text-content transition-colors"
                >
                  [×]
                </button>
                <span className="flex-1 text-center text-xs text-dim font-mono truncate">
                  {config.handle}:~/degrees/{degree.degree.toLowerCase().replace(/\s+/g, "-")}
                </span>
                <span className="w-[42px]" />
              </div>

              <div className="p-6 font-mono space-y-5">
                {/* Degree name + year */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-primary font-bold text-lg neon-text leading-tight">
                    {degree.degree}
                  </h2>
                  {inProgress ? (
                    <span className="text-xs text-warn font-mono shrink-0 mt-1">
                      {config.ui.inProgress}
                    </span>
                  ) : (
                    <span className="text-xs text-dim font-mono shrink-0 mt-1">
                      {degree.year}
                    </span>
                  )}
                </div>

                {/* Institution */}
                <div>
                  <p className="text-xs text-dim mb-1"># institution</p>
                  <p className="text-sm text-accent">{degree.institution}</p>
                </div>

                {/* Focus */}
                {(degree.focus as string) && (
                  <div>
                    <p className="text-xs text-dim mb-1"># focus</p>
                    <p className="text-sm text-content">{degree.focus}</p>
                  </div>
                )}

                {/* Long description */}
                {longDesc && (
                  <div>
                    <p className="text-xs text-dim mb-1"># details</p>
                    <p className="text-sm text-content leading-relaxed">{longDesc}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
