"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import TryHackMeCard from "@/components/ui/TryHackMeCard";
import { Trophy, Flag, Globe } from "lucide-react";
import { SectionLabel } from "./About";

const items = [
  {
    rank: Trophy,
    rankLabel: "[RANK_1%] ELITE",
    rankColor: "#FFD93D",
    operation: "OPERATION: TRYHACKME",
    title: "Top 1% Globally on TryHackMe",
    date: "Dec 2025",
    description: "Consistently ranked in the top 1% globally on TryHackMe by completing advanced cybersecurity labs and practical challenges.",
    accent_color: "rgba(255,217,61,1)"
  },
  {
    rank: Flag,
    rankLabel: "[RANK_125] CTF_CONTENDER",
    rankColor: "#00F5C4",
    operation: "OPERATION: CYBER_APOCALYPSE",
    title: "Global Rank 125/8130 in Cyber Apocalypse CTF",
    date: "Mar 2025",
    description: "Competed in the international HackTheBox CTF competition, solving advanced, time-constrained challenges across diverse cybersecurity domains.",
    accent_color: "rgba(0,245,196,1)"
  },
  {
    rank: Globe,
    rankLabel: "[STATUS] ACTIVE_CONTENDER",
    rankColor: "#7B5EFF",
    operation: "OPERATION: GLOBAL_INTEL",
    title: "International CTF Competitor",
    date: "Ongoing",
    description: "Competed in multiple international CTF competitions, solving advanced, time-constrained challenges across diverse cybersecurity domains.",
    accent_color: "rgba(123,94,255,1)"
  }
];

import { memo } from "react";
export default memo(function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="achievements" 
      className="relative min-h-[100vh] flex flex-col items-center justify-center py-32 overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 flex flex-col items-center">
        <div className="flex justify-center mb-3">
          <SectionLabel code="SEC-07" label="ACHIEVEMENTS" />
        </div>
        <motion.h2 
          className="text-[32px] md:text-[clamp(40px,6vw,80px)] font-bold text-[#F0F0FF] mb-24 font-display"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Achievements
        </motion.h2>

        <div className="flex flex-col gap-12 w-full max-w-[720px] mx-auto">
          {items.map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
               whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6, delay: i * 0.2 }}
               className="flex flex-col text-left md:text-center md:items-center relative"
             >
                <div style={{
                  width: 80, height: 80,
                  borderRadius: '50%',
                  background: item.accent_color.replace('1)', '0.08)'),
                  border: `1px solid ${item.accent_color.replace('1)', '0.2)')}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <item.rank size={36} color={item.accent_color} />
                </div>

                {/* Operation tag */}
                <span style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: 11,
                  color: item.rankColor,
                  opacity: 0.8,
                  display: 'block',
                  marginBottom: '12px',
                  letterSpacing: '0.1em',
                }}>
                  {item.operation}
                </span>

                <h3 className="font-display text-[clamp(32px,5vw,56px)] font-bold text-[#F0F0FF] mb-[8px] leading-tight">
                  {item.title}
                </h3>
                
                <p className="font-mono text-[14px] text-[#6B7280] mb-[16px]">{item.date}</p>

                {/* Rank label */}
                <span style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: 12,
                  color: item.rankColor,
                  display: 'inline-block',
                  marginBottom: '16px',
                  letterSpacing: '0.08em',
                }}>
                  {item.rankLabel}
                </span>

                <p className="font-body text-[17px] text-[#9CA3AF] max-w-[560px] leading-relaxed mx-auto">
                  {item.description}
                </p>

                <div 
                   className="w-[40px] h-[2px] mt-[16px] md:mx-auto" 
                   style={{ backgroundColor: item.accent_color }}
                />

                {i !== items.length - 1 && (
                  <div className="w-full h-[1px] bg-[rgba(255,255,255,0.06)] mt-24 mb-12 hidden md:block" />
                )}
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
});
