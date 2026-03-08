"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const TILE = 128;
const FRAMES = 6;
const FPS = 24;
const ALPHA = 25;

function generateGrainFrames(): CanvasPattern[] {
  const offscreen = document.createElement("canvas");
  offscreen.width = TILE;
  offscreen.height = TILE;
  const offCtx = offscreen.getContext("2d")!;
  const target = document.createElement("canvas");
  target.width = 1;
  target.height = 1;
  const patternCtx = target.getContext("2d")!;

  const patterns: CanvasPattern[] = [];
  const pixels = TILE * TILE * 4;

  for (let f = 0; f < FRAMES; f++) {
    const imageData = offCtx.createImageData(TILE, TILE);
    const d = imageData.data;
    for (let i = 0; i < pixels; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v;
      d[i + 3] = ALPHA;
    }
    offCtx.putImageData(imageData, 0, 0);
    patterns.push(patternCtx.createPattern(offscreen, "repeat")!);
  }

  return patterns;
}

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const patterns = generateGrainFrames();
    const interval = 1000 / FPS;
    let frame = 0;
    let lastTime = 0;
    let rafId: number;
    let paused = false;
    let resizeTimer: ReturnType<typeof setTimeout>;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function tick(now: number) {
      if (paused) return;
      rafId = requestAnimationFrame(tick);
      if (now - lastTime < interval) return;
      lastTime = now;

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.fillStyle = patterns[frame % FRAMES];
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);
      frame++;
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(rafId);
      } else {
        paused = false;
        lastTime = 0;
        rafId = requestAnimationFrame(tick);
      }
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    resize();
    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
