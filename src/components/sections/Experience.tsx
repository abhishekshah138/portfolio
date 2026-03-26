"use client";

import { motion } from "framer-motion";
import { Shield, BookOpen } from "lucide-react";
import { SectionLabel } from "./About";

const entries = [
  {
    type: "training",
    title: "Java Maestro: Hands-On Training on Developing GUI Applications",
    period: "2025.06 \u2192 2025.07",
    badgeText: "// SKILL_ACQUISITION",
    badgeIcon: BookOpen,
    badge_color: "#5B8FFF",
    badge_bg: "rgba(91,143,255,0.12)",
    badge_border: "rgba(91,143,255,0.25)",
    highlights: [
      "Built a Java Swing–based Quiz Application featuring a multi-screen GUI",
      "Applied event-driven programming concepts for responsive user interactions",
      "6-week intensive training with core logic implementation, debugging, and documentation"
    ],
    tech: ["Java", "Swing", "OOP", "Event Handling"],
  }
];

import { memo } from "react";
export default memo(function Experience() {
  return (
    <section id="experience" className="relative h-auto w-full overflow-hidden flex flex-col items-center py-32">
      <div className="mb-24 text-center z-10 px-4">
        <div className="flex justify-center mb-3">
          <SectionLabel code="SEC-05" label="TRAINING" />
        </div>
        <h2 className="text-[32px] md:text-[clamp(40px,6vw,80px)] font-bold text-[#F0F0FF] mb-4 leading-none font-display">
          Training
        </h2>
        <p className="text-[#6B7280] text-[15px] md:text-[clamp(18px,2.5vw,28px)] font-body">
          Real-world learning, real-world impact.
        </p>
      </div>

      <div className="relative w-full max-w-[800px] mx-auto px-6 h-full">
        {/* Vertical Timeline Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-[16px] md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] origin-top"
          style={{ backgroundImage: "linear-gradient(180deg, transparent, #5B8FFF, #00F5C4, transparent)" }}
        />

        <div className="flex flex-col gap-12 md:gap-24 w-full relative z-10 pt-12 pb-12">
          {entries.map((entry, index) => {
            const isOdd = index % 2 === 0;
            return (
              <div key={index} className={`relative flex flex-col md:flex-row items-center w-full ${!isOdd ? "md:flex-row-reverse" : ""}`}>

                {/* Timeline Dot & Line Segment */}
                <div className="absolute left-[16px] md:left-1/2 w-[12px] h-[12px] rounded-full top-1/2 -translate-y-1/2 md:-translate-x-[6px] z-20 flex justify-center items-center">
                   <div className="w-[12px] h-[12px] rounded-full z-20" style={{ backgroundColor: entry.badge_color, boxShadow: `0 0 15px ${entry.badge_color}` }} />
                   <div className="absolute w-[24px] h-[24px] rounded-full animate-ping opacity-30" style={{ backgroundColor: entry.badge_color }} />
                </div>

                <div className={`hidden md:block w-1/2 ${isOdd ? "" : "order-2"}`} />

                <motion.div
                  initial={{ opacity: 0, x: isOdd ? -60 : 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className={`w-full md:w-1/2 pl-[60px] md:pl-0 ${isOdd ? "md:pr-[60px]" : "md:pl-[60px] order-1"}`}
                >
                  <div
                    className="p-[24px] md:p-[32px] rounded-[24px] flex flex-col bg-[rgba(10,10,15,0.8)] border border-[rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-500 hover:border-[rgba(255,255,255,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden"
                  >
                    {/* Glowing Accent Corner */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: entry.badge_color }} />
                    
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                      <span
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          background: entry.badge_bg,
                          border: `1px solid ${entry.badge_border}`,
                          borderRadius: 100, padding: '6px 16px',
                          fontSize: 11, color: entry.badge_color,
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          fontFamily: "var(--font-jetbrains-mono)"
                        }}
                      >
                        <entry.badgeIcon size={14} /> {entry.badgeText}
                      </span>
                      <span className="font-mono text-[12px] text-[#4B5563] tracking-widest">{entry.period}</span>
                    </div>

                    <h3 className="font-display text-[24px] md:text-[28px] font-bold text-[#F0F0FF] mb-2 leading-tight group-hover:text-white transition-colors">{entry.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-8">
                       <span className="w-2 h-2 rounded-full bg-[#00F5C4] animate-pulse" />
                       <span className="font-mono text-[10px] text-[#00F5C4] uppercase tracking-widest">DEPLOYMENT_SUCCESSFUL</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {entry.highlights.map((highlight, i) => (
                        <li key={i} className="font-body text-[#9CA3AF] text-[15px] flex items-start gap-3 leading-relaxed group-hover:text-[#D1D5DB] transition-colors">
                          <span className="mt-[6px] w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: entry.badge_color }} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                      {entry.tech.map(tech => (
                        <span key={tech} className="font-mono text-[11px] px-[12px] py-[6px] bg-[rgba(255,255,255,0.04)] rounded-[8px] text-[#8B92A5] border border-[rgba(255,255,255,0.05)] hover:text-white hover:border-white/20 transition-all cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
