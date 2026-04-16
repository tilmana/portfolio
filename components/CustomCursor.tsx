"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current as HTMLDivElement;
    const ring = ringRef.current as HTMLDivElement;
    if (!dot || !ring) return;

    let animId: number;
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let pointer = false;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.opacity  = "1";
      ring.style.opacity = "1";

      const el = document.elementFromPoint(mx, my);
      const wasPointer = pointer;
      if (el) {
        const tag = el.tagName.toLowerCase();
        const cur = getComputedStyle(el).cursor;
        pointer = cur === "pointer" || tag === "a" || tag === "button";
      }
      if (pointer !== wasPointer) {
        const size = pointer ? "28px" : "20px";
        ring.style.width  = size;
        ring.style.height = size;
      }

      dot.style.transform  = `translate(${mx - 2}px, ${my - 2}px)`;
    }

    function onLeave() { dot.style.opacity = ring.style.opacity = "0"; }
    function onEnter() { dot.style.opacity = ring.style.opacity = "1"; }

    function tick() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const offset = pointer ? 14 : 10;
      ring.style.transform = `translate(${rx - offset}px, ${ry - offset}px)`;
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ opacity: 0, willChange: "transform" }}
      >
        <div className="w-1 h-1 bg-primary" style={{ boxShadow: "0 0 4px var(--color-primary)" }} />
      </div>

      {/* Outer crosshair */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ opacity: 0, width: 20, height: 20, transition: "width 150ms, height 150ms", willChange: "transform" }}
      >
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-0 w-2 h-px bg-primary" />
          <div className="absolute top-0 left-0 w-px h-2 bg-primary" />
          <div className="absolute top-0 right-0 w-2 h-px bg-primary" />
          <div className="absolute top-0 right-0 w-px h-2 bg-primary" />
          <div className="absolute bottom-0 left-0 w-2 h-px bg-primary" />
          <div className="absolute bottom-0 left-0 w-px h-2 bg-primary" />
          <div className="absolute bottom-0 right-0 w-2 h-px bg-primary" />
          <div className="absolute bottom-0 right-0 w-px h-2 bg-primary" />
        </div>
      </div>
    </>
  );
}
