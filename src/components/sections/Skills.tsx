"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./About";
import SkillsRadar from "@/components/ui/SkillsRadar";
import { Code, Shield, Terminal, Globe, Network } from "lucide-react";

const categories = [
  {
    name: "PROGRAMMING",
    icon: Code,
    accent: "91,143,255",
    hex: "#5B8FFF",
    skills: ["C", "C++", "Java", "Python", "SQL", "HTML", "CSS"]
  },
  {
    name: "CYBERSECURITY_TOOLS",
    icon: Shield,
    accent: "0,245,196",
    hex: "#00F5C4",
    skills: ["Nmap", "Metasploit", "Burp Suite", "Wireshark", "FFUF", "Msfconsole"]
  },
  {
    name: "PLATFORMS",
    icon: Terminal,
    accent: "123,94,255",
    hex: "#7B5EFF",
    skills: ["TryHackMe", "HackTheBox", "PortSwigger", "Hackerone"]
  },
  {
    name: "SOFT_SKILLS",
    icon: Network,
    accent: "0,245,196",
    hex: "#00F5C4",
    skills: ["Analytical Thinking", "Enthusiastic", "Problem solving", "Adaptability"]
  }
];

import { memo } from "react";
export default memo(function Skills() {
  return (
    <section id="skills" className="relative py-32 w-full overflow-hidden flex flex-col items-center justify-center">
      
      <div className="text-center z-10 mb-20 px-4">
        <div className="flex justify-center mb-3">
          <SectionLabel code="SEC-03" label="TECHNICAL_SKILLS" />
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[32px] md:text-[clamp(40px,6vw,80px)] font-bold text-[#F0F0FF] mb-4 font-display"
        >
          Technical Skills
          <span className="cursor-blink" style={{ color: '#00F5C4', marginLeft: 4 }}>_</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[15px] md:text-[clamp(18px,2.5vw,28px)] text-[#6B7280] font-body"
        >
          Tools I use to build and break.
        </motion.p>
      </div>

      <div className="z-10 max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-24 w-full items-center lg:items-start">
        {/* Left: Skills Radar Chart */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-center lg:sticky lg:top-32">
          <SkillsRadar />
        </div>

        {/* Right: Skills Categories */}
        <div className="w-full lg:w-1/2 flex flex-col gap-12">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-3"
              >
                <category.icon size={16} color={category.hex} />
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '12px',
                    color: '#6B7280',
                    letterSpacing: '0.12em',
                  }}
                >
                  {category.name}
                </span>
              </motion.div>
              
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: `rgba(${category.accent}, 0.2)`,
                    }}
                    className="px-[10px] md:px-[14px] py-[4px] md:py-[6px] rounded-[100px] border font-body text-[11px] md:text-[13px] backdrop-blur-sm transition-all duration-300 cursor-default"
                    style={{
                      backgroundColor: `rgba(${category.accent}, 0.1)`,
                      borderColor: `rgba(${category.accent}, 0.2)`,
                      color: `rgb(${category.accent})`
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
