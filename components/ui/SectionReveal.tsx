"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

const containerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 18 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

/** Wraps a section's direct children and reveals them in staggered sequence. */
export function SectionReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A direct child of SectionReveal that participates in the stagger sequence. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
