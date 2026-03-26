"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./About";
import TiltCard from "@/components/ui/TiltCard";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    id: "proj_1",
    number: "01",
    title: "Telegram Remote C2 Architecture",
    category: "Cybersecurity · Malware Analysis",
    classification: "// C2_FRAMEWORK",
    threatLevel: "HIGH",
    description: "Designed a Telegram-controlled remote administration framework. Simulated real-world C2 communication workflows to assess reliability and evasion.",
    tech_stack: ["Python", "Telegram API", "Async I/O", "Networking"],
    accent_color: "rgba(91,143,255,1)",
    project_url: null,
    github_url: "https://github.com/abhishekshah138",
    isPrivate: true,
  },
  {
    id: "proj_2",
    number: "02",
    title: "Real-Time Honeypot Simulator",
    category: "Cybersecurity · Threat Intelligence",
    classification: "// DEFENSIVE_TOOL",
    threatLevel: "MEDIUM",
    description: "Developed a Python-based honeypot detecting unauthorized access attempts across SSH and HTTP. Captured attacker metadata including IP, credentials, and commands.",
    tech_stack: ["Python", "SSH", "HTTP", "Data Visualization", "Logging"],
    accent_color: "rgba(0,245,196,1)",
    project_url: null,
    github_url: "https://github.com/abhishekshah138",
    isPrivate: true,
  },
];

import { memo } from "react";
export default memo(function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = projects.filter(p => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Python") return p.tech_stack.includes("Python");
    if (activeCategory === "Security") return p.category.includes("Cybersecurity");
    return true;
  });

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => { ScrollTrigger.refresh() }, 100);
    return () => clearTimeout(t);
  }, [activeCategory]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const pinWrap = pinWrapRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!pinWrap || !track || !section) return;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1, // Calculates after About section (priority 2)
        },
      });
    }, section);

    return () => { ctx.revert(); };
  }, []);

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
  );

  return (
    <section ref={sectionRef} id="projects" className="relative w-full">

      {/* Heading */}
      <div className="w-full px-4 sm:px-6 lg:px-24 pt-32 pb-12 md:pb-0 z-20 relative">
        <SectionLabel code="SEC-04" label="PROJECTS" />
        <h2 className="text-[32px] md:text-[clamp(40px,6vw,80px)] font-bold text-[#F0F0FF] leading-none font-display">
          Projects
        </h2>
        <p className="text-[#6B7280] text-[15px] md:text-[clamp(18px,2.5vw,28px)] mt-4 mb-8 font-body">
          Tools built. Networks broken. Labs documented.
        </p>

        <div className="flex gap-3 overflow-x-auto max-w-full pb-2 scrollbar-none">
          {["All", "Python", "Security"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-[13px] whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-[#00F5C4] text-[#0A0A0F] font-bold" : "bg-white/5 text-[#8B92A5] hover:bg-white/10"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned horizontal scroll container */}
      <div ref={pinWrapRef} className="w-full md:h-screen flex items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-[20px] md:gap-[32px] w-full md:w-max px-4 sm:px-6 md:px-24 py-12 md:py-0 will-change-transform"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <TiltCard
                key={project.id}
                className="relative flex-col flex-shrink-0 w-full md:w-[460px] min-h-[380px] md:min-h-[500px]"
                customStyle={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  padding: "36px",
                  backdropFilter: "blur(12px)",
                  transition: "border-color 0.4s, box-shadow 0.4s",
                }}
              >
                <>
                  {/* Background number */}
                  <span className="absolute top-[20px] right-[24px] font-mono text-[80px] font-bold text-[rgba(255,255,255,0.04)] leading-none pointer-events-none select-none">
                    {project.number}
                  </span>

                  {/* Terminal classification tag */}
                  <span style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '11px',
                    color: '#00F5C4',
                    opacity: 0.7,
                    display: 'block',
                    marginBottom: '8px',
                  }}>
                    {project.classification}
                  </span>

                  {/* Category tag */}
                  <div
                    className="inline-flex w-max rounded-full items-center font-mono font-medium text-[11px] px-3 py-1"
                    style={{
                      color: project.accent_color,
                      backgroundColor: project.accent_color.replace("1)", "0.1)"),
                    }}
                  >
                    {project.category}
                  </div>

                  <h3 className="font-display text-[28px] font-bold text-[#F0F0FF] mt-[16px] leading-tight drop-shadow-md">
                    {project.title}
                  </h3>

                  <p className="font-body text-[15px] text-[#6B7280] mt-[8px] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-[8px] mt-[20px]">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-[10px] py-[4px] bg-[rgba(255,255,255,0.06)] rounded-[4px] text-[#F0F0FF]/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Threat level metadata */}
                  <div className="mt-auto pt-6" style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '16px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      fontSize: 10,
                      color: '#4B5563',
                      display: 'block',
                      marginBottom: '10px',
                    }}>
                      THREAT_LEVEL: {project.threatLevel} | STATUS: CLASSIFIED
                    </span>

                    <div className="flex flex-row gap-[16px] items-center">
                      {project.isPrivate ? (
                        <span className="flex items-center gap-1.5 font-mono text-[12px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#6B7280]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          Private Repo
                        </span>
                      ) : (
                        <a href={project.project_url!} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-mono text-[13px] font-medium text-[#F0F0FF] hover:text-[#5B8FFF] transition-colors group/link">
                          → VIEW_SOURCE
                          <span className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform"><ArrowIcon /></span>
                        </a>
                      )}
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-mono text-[13px] font-medium text-[#F0F0FF] hover:text-[#5B8FFF] transition-colors group/link">
                        → REPO_ACCESS
                        <span className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform"><ArrowIcon /></span>
                      </a>
                    </div>
                  </div>
                </>
              </TiltCard>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});
