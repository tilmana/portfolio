"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  lines: string[];
  /** ms per character */
  speed?: number;
  /** ms between lines */
  lineDelay?: number;
  /** ms before typing starts */
  startDelay?: number;
  className?: string;
  showCursor?: boolean;
}

/**
 * Types out an array of strings one character at a time.
 * Each line appears after the previous one finishes.
 */
export function TypewriterText({
  lines,
  speed = 45,
  lineDelay = 300,
  startDelay = 0,
  className = "",
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] ?? "") + line[currentChar];
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      // Line done — pause then move to next
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [started, currentLine, currentChar, lines, speed, lineDelay]);

  return (
    <span className={className}>
      {displayedLines.map((text, i) => (
        <span key={i}>
          {text}
          {i === displayedLines.length - 1 && !done && showCursor && (
            <span className="cursor-blink inline-block w-[2px] h-[1em] bg-primary align-middle ml-[1px]" />
          )}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
      {done && showCursor && (
        <span className="cursor-blink inline-block w-[2px] h-[1em] bg-primary align-middle ml-[1px]" />
      )}
    </span>
  );
}
