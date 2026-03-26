"use client";

import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 60;
    const connectDistance = 120;

    let resizeTimer: NodeJS.Timeout;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 150);
    };
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", resize);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        })
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(91, 143, 255, 0.15)";
      ctx.strokeStyle = "rgba(91, 143, 255, 0.15)";
      
      // 1. Update positions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // 2. Draw all particles (batched)
      ctx.fillStyle = "rgba(91, 143, 255, 0.15)";
      ctx.beginPath();
      particles.forEach((p) => {
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      });
      ctx.fill();

      // 3. Draw all connecting lines (batched)
      ctx.strokeStyle = "rgba(91, 143, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx*dx + dy*dy;

            if (distSq < connectDistance * connectDistance) {
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
            }
        }
      }
      ctx.stroke();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
    </div>
  );
}
