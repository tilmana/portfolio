"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";

type Project = (typeof config.projects)[number];

const severityColors = {
  critical: "bg-danger/20 text-danger border-danger/40",
  high:     "bg-[#ff7c00]/20 text-[#ff7c00] border-[#ff7c00]/40",
  medium:   "bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/40",
  low:      "bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/40",
};

function isVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    if (!project) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const media = project ? (project as Project & { media?: string }).media ?? "" : "";
  const longDesc = project
    ? (project as Project & { longDescription?: string }).longDescription ?? ""
    : "";

  return (
    <AnimatePresence>
      {project && (
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
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-edge bg-base neon-glow pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="sticky top-0 flex items-center gap-2 px-4 py-3 bg-black/80 border-b border-edge backdrop-blur z-10">
                <button
                  onClick={onClose}
                  title="Close"
                  className="font-mono text-xs text-dim hover:text-content transition-colors"
                >
                  [×]
                </button>
                <span className="flex-1 text-center text-xs text-dim font-mono truncate">
                  {config.handle}:~/projects/{project.name}
                </span>
                <span className="w-[42px]" />
              </div>

              <div className="p-6 font-mono space-y-6">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-primary font-bold text-lg neon-text">
                    {project.name}
                  </h2>
                  {"severity" in project && project.severity && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded border font-mono uppercase shrink-0 ${
                        severityColors[project.severity]
                      }`}
                    >
                      {project.severity}
                    </span>
                  )}
                </div>

                {/* Media area — only rendered when a URL is provided */}
                {media && (
                  <div className="rounded-md border border-edge overflow-hidden bg-black/40">
                    {isVideo(media) ? (
                      <video
                        src={media}
                        controls
                        className="w-full max-h-64 object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={media}
                        alt={`${project.name} screenshot`}
                        className="w-full max-h-64 object-cover"
                      />
                    )}
                  </div>
                )}

                {/* Short description */}
                <div>
                  <p className="text-xs text-dim mb-1"># description</p>
                  <p className="text-sm text-content leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Long description */}
                {longDesc && (
                  <div>
                    <p className="text-xs text-dim mb-1"># details</p>
                    <p className="text-sm text-content leading-relaxed">
                      {longDesc}
                    </p>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <p className="text-xs text-dim mb-2"># tags</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded border border-edge bg-surface text-dim font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link */}
                {project.url && (
                  <a
                    href={project.url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 text-primary text-sm rounded hover:bg-primary hover:text-black transition-all duration-200 font-mono"
                  >
                    → {(project.url as string).replace("https://", "")}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
