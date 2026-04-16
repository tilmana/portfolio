"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRuntimeFeatures } from "@/lib/runtime-features";

const CHARS = "!@#$%^&*<>?/|{}abcdef0123456789█▓▒░±×";

interface Props {
  text: string;
  className?: string;
  /** ms per character lock-in step */
  speed?: number;
  /** Frames of scrambling before each character locks */
  scrambleFrames?: number;
}

/**
 * Renders scrambled characters that resolve left-to-right into `text`
 * once the element enters the viewport (fires once).
 */
export function DecryptText({
  text,
  className = "",
  speed = 35,
  scrambleFrames = 4,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [displayed, setDisplayed] = useState<string>(
    // Start with spaces/placeholders matching text length — avoids layout shift
    text
      .split("")
      .map((c) => (c === " " ? " " : "█"))
      .join("")
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done) return;

    let frame = 0;
    const total = text.length * scrambleFrames;

    const id = setInterval(() => {
      frame++;
      const lockedChars = Math.floor(frame / scrambleFrames);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < lockedChars) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayed(next);

      if (frame >= total) {
        clearInterval(id);
        setDisplayed(text);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(id);
  }, [inView, done, text, speed, scrambleFrames]);

  // Feature flag off — render plain text immediately
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { features } = useRuntimeFeatures();
  if (!features.decryptAnimation) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}
