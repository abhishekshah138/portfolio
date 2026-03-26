"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|+=~";

    let animId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        // Alternating dim blue and cyan for low-light feel
        const isCyan = Math.random() > 0.85;
        ctx.fillStyle = isCyan ? "rgba(0,245,196,0.9)" : "rgba(91,143,255,0.7)";
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    document.body.style.overflow = "hidden";

    const duration = 2200;
    const interval = 20;
    const step = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    const mainTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, duration + 500);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(mainTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Matrix Code Rain Background */}
          <MatrixCanvas />

          {/* Dark vignette overlay to focus on center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Padlock — opens as progress increases */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(16px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center cursor-default mb-2 relative"
            >
              {/* Pulsing glow ring — intensifies with progress */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute rounded-full"
                style={{
                  width: 110,
                  height: 110,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(circle, rgba(0,245,196,${0.05 + (progress / 100) * 0.4}) 0%, transparent 70%)`,
                  boxShadow: `0 0 ${20 + progress * 0.6}px rgba(0,245,196,${0.1 + (progress / 100) * 0.5})`,
                }}
              />

              {/* Lock shackle — rises slowly as progress goes 0→100% */}
              <div
                style={{
                  // Starts at locked (translateY 20px), rises only 18px total to open
                  transform: `translateY(${20 - (progress / 100) * 18}px)`,
                  transition: "transform 0.3s ease-out",
                  filter: `drop-shadow(0 0 ${8 + progress * 0.12}px rgba(0,245,196,${0.4 + (progress / 100) * 0.6}))`,
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <Image
                  src="/lock-top.png"
                  alt="Lock shackle"
                  width={44}
                  height={44}
                  priority
                />
              </div>

              {/* Lock body — glows blue→cyan as it unlocks */}
              <div
                style={{
                  filter: `drop-shadow(0 0 ${14 + progress * 0.2}px rgba(${
                    Math.round(91 + (progress / 100) * (-91)),
                    Math.round(143 + (progress / 100) * 102),
                    Math.round(255 + (progress / 100) * (-61))
                  },0.7))`,
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <Image
                  src="/lock-main.png"
                  alt="Lock body"
                  width={64}
                  height={64}
                  priority
                />
              </div>

              {/* UNLOCKED flash at 100% */}
              {progress >= 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.4, 1] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(0,245,196,0.35) 0%, transparent 70%)" }}
                />
              )}
            </motion.div>

            {/* Percentage Display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-baseline gap-2"
            >
              <span className="font-display font-bold text-7xl md:text-8xl text-white tracking-tighter">
                {Math.round(progress)}
              </span>
              <span className="font-mono text-xl text-[#00F5C4]">%</span>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-[200px] md:w-[300px] h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5B8FFF] to-[#00F5C4]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* ENCRYPTION_LAYER_ACTIVE Badge */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-[14px] py-[5px] border border-[#00F5C4]/40 bg-[rgba(10,10,15,0.7)] backdrop-blur-sm shadow-[0_0_12px_rgba(0,245,196,0.2)]"
            >
              <span className="text-[12px] text-[#00F5C4] font-mono tracking-wider">
                ENCRYPTION_LAYER_ACTIVE
              </span>
            </motion.div>

            {/* Initialising status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B92A5] flex items-center gap-2"
            >
              <div className="w-1 h-1 rounded-full bg-[#00F5C4] animate-pulse" />
              Initialising_Systems.exe
            </motion.div>

            {/* Post-quantum tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-mono text-[10px] text-[#4B5A7A] tracking-widest text-center"
            >
              &gt; Securing data transmission with post-quantum cryptography...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
