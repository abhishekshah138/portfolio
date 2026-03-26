"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Current target positions
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration
  const springConfig = { stiffness: 300, damping: 28 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Trail arrays for native DOM manipulation
  const trailRef = useRef<{x: number, y: number}[]>(Array(8).fill({ x: -100, y: -100 }));
  const trailNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(window.innerWidth <= 768 || isTouchDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none';
      
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        
        // Update trail head immediately for responsiveness, shift the rest
        const newTrail = [...trailRef.current];
        newTrail.unshift({ x: e.clientX, y: e.clientY });
        newTrail.pop();
        trailRef.current = newTrail;
        
        if (trailNodesRef.current[0]) {
           trailNodesRef.current[0]!.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        }
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          target.closest("a") ||
          target.closest("button") ||
          target.classList.contains('glass-card')
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      };

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handleMouseOver);

      // Animation loop for trail interpolation
      let frame: number;
      const renderTrail = () => {
        const currentTrail = trailRef.current;
        for (let i = 1; i < currentTrail.length; i++) {
            currentTrail[i].x += (currentTrail[i - 1].x - currentTrail[i].x) * 0.4;
            currentTrail[i].y += (currentTrail[i - 1].y - currentTrail[i].y) * 0.4;
            
            if (trailNodesRef.current[i]) {
                trailNodesRef.current[i]!.style.transform = `translate(${currentTrail[i].x}px, ${currentTrail[i].y}px) translate(-50%, -50%)`;
            }
        }
        frame = requestAnimationFrame(renderTrail);
      };
      frame = requestAnimationFrame(renderTrail);

      return () => {
        document.body.style.cursor = 'auto';
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mouseover", handleMouseOver);
        window.removeEventListener('resize', checkMobile);
        cancelAnimationFrame(frame);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <div className="pointer-events-none z-[9998] fixed inset-0">
        {!isHovered && trailRef.current.map((_, index) => (
          <div
            key={`trail-${index}`}
            ref={(el) => { trailNodesRef.current[index] = el; }}
            className="absolute top-0 left-0 rounded-full bg-white/60 mix-blend-difference"
            style={{
              width: 12 - (index * 1.2),
              height: 12 - (index * 1.2),
              opacity: 0.6 - (index * 0.078),
              transform: "translate(-100px, -100px) translate(-50%, -50%)",
              willChange: "transform"
            }}
          />
        ))}
      </div>

      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference flex items-center justify-center text-black font-mono text-[10px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 44 : 12,
          height: isHovered ? 44 : 12,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      />
    </>
  );
}
