"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, memo, useEffect, useState } from "react";
import TypingSubtitle from "@/components/ui/TypingSubtitle";
import MagneticButton from "@/components/ui/MagneticButton";
import ResumeModal from "@/components/ui/ResumeModal";
import { Eye, MapPin, ChevronDown } from "lucide-react";
import TerminalWidget from "@/components/ui/TerminalEasterEgg";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function ScrambleText({
  text,
  delay = 0,
  className,
  style,
}: {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [displayed, setDisplayed] = useState(text);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Immediately scramble text once mounted (client-side only)
    setDisplayed(text.split("").map(c => c === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(""));
    
    // Clear any existing timers (handles React strict mode double-invoke)
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    let iteration = 0;
    const totalIterations = text.length * 3;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayed(
          text
            .split("")
            .map((char, i) => {
              // i < iteration/3 means this character has been "decoded"
              if (i < Math.floor(iteration / 3)) return char;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );

        if (iteration >= totalIterations) {
          setDisplayed(text); // ensure final state is always correct
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        iteration++;
      }, 40);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, delay]);

  if (!isMounted) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <span className={className} style={style}>
      {displayed}
    </span>
  );
}

const CircuitPattern = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-[0.04] z-10 pointer-events-none text-white hidden md:block">
    <defs>
      <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M10 10 L30 10 L40 20 L40 40 L50 50 L80 50" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
        <circle cx="80" cy="50" r="2" fill="currentColor" />
        <path d="M20 90 L40 90 L60 70 L60 30" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="90" r="2" fill="currentColor" />
        <circle cx="60" cy="30" r="2" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#circuit)" />
  </svg>
);

const Hero = memo(function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const handleNameClick = () => {
    if (clickCount >= 10) return; // Prevent clicking during easter egg

    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Trigger shake animation
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 200);

    // Auto-reset easter egg after 3s
    if (newCount >= 10) {
      setTimeout(() => {
        setClickCount(0);
      }, 3000);
    }
  };

  let tooltipText = "";
  if (clickCount >= 5 && clickCount < 10) {
    const remaining = 10 - clickCount;
    if (remaining > 3) tooltipText = `😠 ${remaining} more clicks...`;
    else if (remaining > 1) tooltipText = `😡 ${remaining} more clicks...`;
    else tooltipText = `🤬 ${remaining} more click...`;
  }

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Background layer + blackhole space video */}
      <div className="absolute inset-0 z-0 bg-[#0A0A0F]/60 mix-blend-overlay" />
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-30vh] md:top-[-450px] left-0 w-full h-full object-cover -z-20 opacity-40 mix-blend-screen pointer-events-none"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0F]/50 to-[#0A0A0F] z-[-15] pointer-events-none" />

      
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      
      <motion.div 
        style={{ scale, opacity }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-12 lg:gap-20 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-[80px] pb-[40px] md:pt-0 md:pb-0"
      >
        {/* Left: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-2xl gap-[12px] md:gap-0 z-20"
        >
          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-2 md:mb-8 mt-0 flex items-center gap-2"
          >
            <span className="text-[#5B8FFF] font-mono text-[14px] md:text-[16px]">~/</span>
            <div className="text-[#00F5C4] font-mono text-[14px] md:text-[16px] tracking-wide">
              <TypingSubtitle />
            </div>
          </motion.div>

          <div className="relative w-full">
            <AnimatePresence>
              {tooltipText && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute -top-6 md:-top-8 left-1/2 md:left-0 md:translate-x-0 -translate-x-1/2 text-[12px] md:text-[14px] font-mono whitespace-nowrap bg-[#FF4444]/15 border border-[#FF4444]/40 text-[#FF4A4A] px-3 py-1 rounded-full z-30 shadow-[0_0_15px_rgba(255,68,68,0.3)] pointer-events-none"
                >
                  {tooltipText}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={handleNameClick}
              className="text-[clamp(48px,12vw,64px)] md:text-[clamp(72px,11vw,130px)] font-display font-bold leading-[0.85] tracking-tighter mb-2 md:mb-6 relative w-full cursor-pointer select-none lg:ml-[-0.05em]"
              style={{
                animation: isShaking ? 'shake 0.2s ease' : 'none'
              }}
            >
              <AnimatePresence mode="wait">
                {clickCount >= 10 ? (
                  <motion.div 
                    key="easter"
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#FF4A4A] text-[24px] md:text-[clamp(32px,3vw,48px)] font-mono pb-2 md:pb-4 tracking-normal"
                    style={{ textShadow: '0 0 20px rgba(255,74,74,0.4)', fontWeight: 700, lineHeight: 1.2 }}
                  >
                    Stop clicking me and just hire me already 😤
                  </motion.div>
                ) : (
                  <motion.div
                    key="normal"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-0"
                  >
                    <ScrambleText
                      text="Abhishek"
                      delay={clickCount > 0 ? 0 : 400}
                      className="block text-[#F0F0FF] leading-[0.85] pb-0 mb-0"
                    />
                    <span className="relative inline-block leading-[0.85] w-fit mt-[-0.3em] md:mt-[-0.35em]">
                      <ScrambleText
                        text="Shah"
                        delay={clickCount > 0 ? 0 : 700}
                        className="inline-block relative z-10"
                        style={{ background: 'linear-gradient(90deg, #5B8FFF, #00F5C4)', WebkitBackgroundClip: 'text', color: 'transparent' }}
                      />
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '100%' }} 
                        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                        className="absolute bottom-[4px] md:bottom-[8px] left-0 h-[4px] md:h-[6px]"
                        style={{ background: '#00F5C4' }}
                      />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-[16px] xl:text-[20px] font-body text-[#8B92A5] max-w-[500px] mb-6 md:mb-12 leading-relaxed"
          >
            I break systems to understand them —
            then build them better.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto z-50"
          >
            <MagneticButton className="w-full md:w-auto">
              <a href="#projects" className="block w-full md:w-auto px-[16px] md:px-[32px] py-[12px] md:py-[14px] text-[14px] md:text-[16px] rounded-[100px] bg-[#5B8FFF] text-[#0A0A0F] font-semibold hover:shadow-[0_0_40px_rgba(91,143,255,0.4)] transition-shadow text-center">
                View My Work
              </a>
            </MagneticButton>

            <div className="flex flex-row items-center gap-2 w-full md:w-auto">
              <div className="flex-1 md:flex-initial">
                <MagneticButton className="w-full">
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="w-full px-[8px] sm:px-[12px] md:px-[32px] py-[12px] md:py-[14px] text-[12px] sm:text-[14px] md:text-[16px] rounded-[100px] border border-[#00F5C4]/40 text-[#00F5C4] hover:bg-[#00F5C4]/10 hover:border-[#00F5C4] transition-all text-center flex items-center justify-center gap-1 md:gap-2 whitespace-nowrap"
                  >
                    <Eye size={16} />
                    Preview CV
                  </button>
                </MagneticButton>
              </div>

              <div className="flex-1 md:flex-initial">
                <MagneticButton className="w-full">
                  <a href="#contact" className="block w-full px-[8px] sm:px-[12px] md:px-[32px] py-[12px] md:py-[14px] text-[10px] sm:text-[11px] md:text-[13px] rounded-[100px] border border-[rgba(255,255,255,0.2)] text-white hover:bg-white/5 transition-colors text-center whitespace-nowrap" style={{ fontFamily: 'var(--font-jetbrains-mono)', letterSpacing: '0.05em' }}>
                    INIT_TRANSMISSION
                  </a>
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Terminal Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8 w-full hidden lg:block"
          >
            <div className="w-full max-w-xl mx-auto lg:mx-0">
              <TerminalWidget />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-[16px] md:mt-16 mb-4 flex items-center gap-3 text-[12px] md:text-[13px] text-[#6B7280] px-4 py-2 rounded-full bg-[rgba(10,10,15,0.95)] border border-white/5"
          >
            <MapPin size={13} color="#00F5C4" />
            <span style={{ fontFamily: 'var(--font-jetbrains-mono)', color: '#6B7280' }}>&gt; ping punjab.in</span>
          </motion.div>
        </motion.div>

        {/* Right: Floating Objects Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-shrink-0 relative flex justify-end items-center w-full md:w-auto"
        >
          <Image
            src="/hero-bg.svg"
            alt="floating space objects"
            height={650}
            width={650}
            priority
            draggable={false}
            className="select-none w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-contain relative z-0 opacity-40 md:opacity-100"
          />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-[32px] left-[50%] -translate-x-1/2 z-20 flex-col items-center gap-2 hidden md:flex"
      >
        <span className="text-xs text-[#6B7280] uppercase tracking-widest hidden sm:block">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} color="rgba(255,255,255,0.4)" />
        </motion.div>
      </motion.div>
    </section>
  );
});

export default memo(Hero);
