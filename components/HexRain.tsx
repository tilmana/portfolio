"use client";

import { useEffect, useRef } from "react";
import { config } from "@/lib/config";

/**
 * Matrix-style falling hex characters rendered on a canvas.
 * Scoped to whatever container it's placed in (position: absolute, inset-0).
 */
export function HexRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { opacity, fadeRate, charAlpha, fontSize } = config.hexRain;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CHARS = "0123456789ABCDEF";

    let cols: number[] = [];
    let animId: number;

    function resize() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      const numCols  = Math.floor(canvas!.width / fontSize);
      cols = Array.from({ length: numCols }, () =>
        Math.floor(Math.random() * -(canvas!.height / fontSize))
      );
    }

    function draw() {
      // Read CSS vars each frame so theme switches apply immediately
      const style    = getComputedStyle(document.documentElement);
      const fgColor  = style.getPropertyValue("--color-primary").trim() || "#39ff14";
      const bgColor  = style.getPropertyValue("--color-base").trim()    || "#050a05";

      ctx!.fillStyle = bgColor;
      ctx!.globalAlpha = fadeRate;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.globalAlpha = 1;

      ctx!.font      = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx!.textAlign = "center";

      for (let i = 0; i < cols.length; i++) {
        const y  = cols[i] * fontSize;
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];

        ctx!.fillStyle   = fgColor;
        ctx!.globalAlpha = cols[i] > 0 ? charAlpha : 1;
        ctx!.fillText(ch, i * fontSize + fontSize / 2, y);

        if (y > canvas!.height && Math.random() > 0.975) cols[i] = 0;
        cols[i]++;
      }

      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [opacity, fadeRate, charAlpha, fontSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
}
