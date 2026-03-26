"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Helper to generate a random crypto line
function generateCryptoLine() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=@#$%^&*";
  const words: string[] = [];
  for (let i = 0; i < 14; i++) {
    let word = "";
    const len = 5 + Math.floor(Math.random() * 8);
    for (let j = 0; j < len; j++) {
      word += chars[Math.floor(Math.random() * chars.length)];
    }
    words.push(word);
  }
  return words.join("   ");
}


type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  color: string;
  isPulsing: boolean;
  pulsePhase: number;
};

export default function GlobalBackground() {
  const [mounted, setMounted] = useState(false);
  const [bgLines, setBgLines] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>();

  useEffect(() => {
    setMounted(true);
    // Generate lines only once on the client
    setBgLines(Array.from({ length: 40 }, () => generateCryptoLine()));
    
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isMobile = window.innerWidth <= 768;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      let count = 60;
      if (width < 768) count = 25;
      else if (width < 1024) count = 40;
      for (let i = 0; i < count; i++) {
        const isPulsing = Math.random() < 0.2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: isPulsing ? 3 + Math.random() * 1 : 1 + Math.random() * 1.5,
          baseOpacity: 0.1 + Math.random() * 0.3,
          color: Math.random() > 0.5 ? "#5B8FFF" : "#00F5C4",
          isPulsing,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const now = performance.now();
      if (now - lastMove < 33) return;
      lastMove = now;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchEnd = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        isMobile = width <= 768;
        initParticles();
        if (isMobile || prefersReducedMotion) animate();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion && !isMobile) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          if (Math.abs(dx) <= 150 && Math.abs(dy) <= 150) {
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
              const force = ((150 - distance) / 150) * 0.8;
              p.vx += (dx / distance) * force * -1;
              p.vy += (dy / distance) * force * -1;
            }
          }
          p.vx *= 0.99; p.vy *= 0.99;
          if (p.vx > 1) p.vx = 1; else if (p.vx < -1) p.vx = -1;
          if (p.vy > 1) p.vy = 1; else if (p.vy < -1) p.vy = -1;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          if (p.x < 0) p.x = 0; else if (p.x > width) p.x = width;
          if (p.y < 0) p.y = 0; else if (p.y > height) p.y = height;
        });
      }

      if (!isMobile && !prefersReducedMotion) {
        ctx.beginPath();
        const glowPaths: { x1: number; y1: number; x2: number; y2: number }[] = [];
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          let connections = 0;
          for (let j = i + 1; j < particles.length; j++) {
            if (connections >= 5) break;
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            if (Math.abs(dx) > 130 || Math.abs(dy) > 130) continue;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              let isGlowing = false;
              if (Math.abs(mouseRef.current.x - p1.x) <= 150 && Math.abs(mouseRef.current.y - p1.y) <= 150)
                if (Math.sqrt(Math.pow(mouseRef.current.x - p1.x, 2) + Math.pow(mouseRef.current.y - p1.y, 2)) < 150) isGlowing = true;
              if (!isGlowing && Math.abs(mouseRef.current.x - p2.x) <= 150 && Math.abs(mouseRef.current.y - p2.y) <= 150)
                if (Math.sqrt(Math.pow(mouseRef.current.x - p2.x, 2) + Math.pow(mouseRef.current.y - p2.y, 2)) < 150) isGlowing = true;
              if (isGlowing) glowPaths.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
              else { ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); }
              connections++;
            }
          }
        }
        ctx.strokeStyle = "rgba(91,143,255,0.12)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        if (glowPaths.length > 0) {
          ctx.beginPath();
          glowPaths.forEach(edge => { ctx.moveTo(edge.x1, edge.y1); ctx.lineTo(edge.x2, edge.y2); });
          ctx.strokeStyle = "rgba(0,245,196,0.35)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      particles.forEach((p) => {
        let currentOpacity = p.baseOpacity;
        if (p.isPulsing && !prefersReducedMotion && !isMobile) {
          p.pulsePhase += 0.05;
          currentOpacity = p.baseOpacity + Math.sin(p.pulsePhase) * 0.2;
          if (currentOpacity < 0.1) currentOpacity = 0.1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      if (!prefersReducedMotion && !isMobile) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Layer 1: Continuously Moving Crypto Text — Full Screen */}
      <div
        className="fixed inset-0 pointer-events-none select-none overflow-hidden flex flex-col"
        style={{ zIndex: 0 }}
      >
        {bgLines.map((line, i) => {
          const goesLeft = i % 2 === 0;
          const duration = 18 + (i % 6) * 4;
          return (
            <motion.div
              key={i}
              animate={{ x: goesLeft ? ["0%", "-40%", "0%"] : ["0%", "40%", "0%"] }}
              transition={{ duration, ease: "linear", repeat: Infinity, repeatType: "loop" }}
              className="flex-1 flex items-center font-mono whitespace-nowrap"
              style={{
                fontSize: "13px",
                color: i % 7 === 0 ? "#00F5C4" : i % 5 === 0 ? "#5B8FFF" : "#4B5A7A",
                opacity: 0.12,
                letterSpacing: "0.1em",
                minHeight: 0,
                justifyContent: "center",
              }}
            >
              {line}&nbsp;&nbsp;{line}&nbsp;&nbsp;{line}
            </motion.div>
          );
        })}
      </div>


      {/* Layer 2: Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          willChange: "transform",
        }}
      />

      {/* Layer 3: Subtle Tech Grid Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(91,143,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,143,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)",
        }}
      />
    </>
  );
}
