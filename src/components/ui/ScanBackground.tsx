"use client";
import { useEffect, useRef } from "react";

export default function ScanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lines: string[] = [];
    const numLines = window.innerWidth <= 768 ? 20 : 80;

    const generateLine = () => {
      const time = new Date().toISOString().split('T')[1].slice(0, 12);
      const ip = `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      const port = [22, 80, 443, 3306, 8080, 21, 23][Math.floor(Math.random() * 7)];
      const status = Math.random() > 0.8 ? "OPEN" : "FILTERED";
      return `[${time}] SCAN_TRG: ${ip}:${port} => STATE: ${status} ... [OK]`;
    };

    // Pre-fill initial lines
    for (let i = 0; i < numLines; i++) {
        lines.push(generateLine());
    }

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    let yOffset = 0;
    const speed = 0.5;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Very faint green text
      ctx.fillStyle = "rgba(0, 245, 196, 0.05)";
      ctx.font = "11px monospace";
      
      yOffset -= speed;
      if (yOffset <= -20) {
          yOffset = 0;
          lines.shift();
          lines.push(generateLine());
      }

      for (let i = 0; i < lines.length; i++) {
        // Draw multiple columns to fill width
        ctx.fillText(lines[i], 20, yOffset + i * 20);
        ctx.fillText(lines[(i + 15) % lines.length], window.innerWidth / 2, yOffset + i * 20);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-50" />;
}
