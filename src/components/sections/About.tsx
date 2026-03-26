"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Shield, BookOpen, Trophy, Code, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SectionLabel({ code, label, centered }: { code: string; label: string; centered?: boolean }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "11px",
        color: "#00F5C4",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: centered ? "center" : "flex-start",
        gap: "8px",
        opacity: 0.8,
      }}
    >
      <span style={{ color: "#5B8FFF" }}>[</span>
      {code}
      <span style={{ color: "#5B8FFF" }}>]</span>
      <span
        style={{
          width: "40px",
          height: "1px",
          background: "rgba(0,245,196,0.3)",
          display: "inline-block",
        }}
      />
      {label}
    </div>
  );
}

const cards = [
  { value: "10+",     label: "Advanced Security Tools",     icon: Code,          iconColor: "#5B8FFF", bg: "rgba(91,143,255,0.1)"  },
  { value: "Top 1%",  label: "Globally on TryHackMe",        icon: Globe,         iconColor: "#00F5C4", bg: "rgba(0,245,196,0.1)"  },
  { value: "4+",      label: "Cybersecurity Certifications",    icon: BookOpen,      iconColor: "#7B5EFF", bg: "rgba(123,94,255,0.1)"  },
  { value: "7.77",    label: "B.Tech CSE CGPA at LPU",        icon: Trophy,        iconColor: "#FFD93D", bg: "rgba(255,217,61,0.1)"  },
];

import { memo } from "react";
export default memo(function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=2000",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        }
      });

      tl.to(text1Ref.current, { opacity: 0, duration: 1 }, 1);
      tl.to(text2Ref.current, { opacity: 1, duration: 1 }, 2);
      tl.to(text2Ref.current, { opacity: 0, duration: 1 }, 4);
      tl.to(text3Ref.current, { opacity: 1, duration: 1 }, 5);
      tl.to({}, { duration: 1 }, 6); // Stay pinned slightly at the end
    }, containerRef);

    // Force GSAP to recalculate pin spacing once everything renders safely
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" className="relative w-full bg-transparent">

      {/* ── MOBILE ── */}
      <div className="md:hidden px-6 py-24 flex flex-col gap-12 items-center text-center">
        <SectionLabel code="SEC-01" label="ABOUT_ME" centered={true} />
        <div className="w-full flex flex-col gap-6">
          {[
            <span key="s1">I analyze behavior.</span>,
            <span key="s2">I find the flaw, then I <span className="text-[#00F5C4]">own the system.</span></span>,
            <span key="s3">I build things <span className="text-[#5B8FFF]">that last.</span></span>,
          ].map((text, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-[clamp(32px,8vw,52px)] font-bold font-display text-[#F0F0FF] leading-[1.15] tracking-tight"
            >
              {text}
            </motion.h2>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-[480px]">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-5 flex flex-col gap-3"
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <card.icon size={20} color={card.iconColor} />
              </div>
              <h3 className="text-[32px] font-bold font-display leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#5B8FFF] to-[#00F5C4]">{card.value}</h3>
              <p className="text-[12px] font-body text-[#6B7280] leading-relaxed">{card.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: GSAP Pinning & Crossfade ── */}
      <div className="hidden md:block w-full bg-transparent">
        <div
          ref={containerRef}
          className="w-full min-h-screen flex items-center justify-center relative"
        >
          <div className="w-full max-w-[1400px] mx-auto px-12 lg:px-20 flex flex-row items-center justify-between gap-12">

            {/* Left — crossfade statements */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="sec-label">
                <SectionLabel code="SEC-01" label="ABOUT_ME" />
              </div>

              <div className="relative" style={{ height: "clamp(120px,20vw,240px)" }}>
                <div
                  ref={text1Ref}
                  className="absolute inset-0 flex items-center text-[clamp(36px,5vw,72px)] font-bold font-display text-[#F0F0FF] leading-[1.1] tracking-tight"
                >
                  I analyze behavior.
                </div>

                <div
                  ref={text2Ref}
                  className="absolute inset-0 flex items-center text-[clamp(36px,5vw,72px)] font-bold font-display text-[#F0F0FF] leading-[1.1] tracking-tight opacity-0"
                >
                  <span>I find the flaw, then I <span className="text-[#00F5C4]">own the system.</span></span>
                </div>

                <div
                  ref={text3Ref}
                  className="absolute inset-0 flex items-center text-[clamp(36px,5vw,72px)] font-bold font-display text-[#F0F0FF] leading-[1.1] tracking-tight opacity-0"
                >
                  <span>I build things<br /><span className="text-[#5B8FFF]">that last.</span></span>
                </div>
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="flex-1 flex items-center justify-end">
              <div className="grid grid-cols-2 gap-4 lg:gap-6 w-full max-w-[480px]">
                {cards.map((card, i) => (
                  <div
                    key={i}
                    className="bg-[rgba(17,17,24,0.95)] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-6 flex flex-col gap-4 hover:border-white/20 transition-colors hover:-translate-y-1 hover:scale-[1.02] duration-300"
                  >
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <card.icon size={24} color={card.iconColor} />
                    </div>
                    <div>
                      <h3 className="text-[48px] font-bold font-display leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#5B8FFF] to-[#00F5C4]">
                        {card.value}
                      </h3>
                      <p className="text-[14px] font-body text-[#6B7280] mt-2 leading-relaxed">{card.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
});
