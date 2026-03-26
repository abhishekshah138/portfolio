"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./About";

const educationData = [
  {
    type: "Bachelor of Technology - Computer Science and Engineering",
    institution: "Lovely Professional University | Punjab, India",
    duration: "Aug 2023 - Present",
    score: "CGPA: 7.55",
    accent: "#00F5C4",
  },
  {
    type: "Intermediate",
    institution: "Jyoti School Jayant | Singrauli, Madhya Pradesh",
    duration: "Apr 2021 – Mar 2023",
    score: "Percentage: 73%",
    accent: "#00F5C4",
  },
  {
    type: "Matriculation",
    institution: "Jyoti School Jayant | Singrauli, Madhya Pradesh",
    duration: "Apr 2020 – Mar 2021",
    score: "Percentage: 61%",
    accent: "#00F5C4",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-32 w-full relative overflow-hidden flex flex-col items-center bg-transparent">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div className="mb-12 flex justify-center md:justify-start">
          <SectionLabel code="SEC-02" label="EDUCATION" />
        </div>

        <div className="text-center md:text-left mb-20">
          <motion.h2 
            className="text-[40px] md:text-[64px] font-bold text-[#F0F0FF] leading-none font-display mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5C4] to-[#5B8FFF] drop-shadow-[0_0_15px_rgba(0,245,196,0.3)]">Timeline</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00F5C4] to-purple-500 rounded-full mx-auto md:mx-0 opacity-80" />
        </div>

        <div className="relative pl-8 md:pl-12 border-l-2 border-gradient-y from-[#00F5C4] via-purple-500/50 to-transparent">
          <div className="flex flex-col gap-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative"
              >
                {/* Timeline Node */}
                <div className="absolute -left-[41px] md:-left-[57px] top-6">
                  <div className="w-5 h-5 rounded-full bg-[#0A0A0F] border-2 border-[#00F5C4] shadow-[0_0_12px_rgba(0,245,196,0.5)] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#00F5C4]" />
                  </div>
                </div>

                {/* Card */}
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 md:p-10 backdrop-blur-sm hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-all duration-300 group">
                  <h3 className="text-xl md:text-2xl font-bold text-[#F0F0FF] mb-2 font-display">
                    {edu.type}
                  </h3>
                  <p className="text-[#A855F7] text-base md:text-lg font-medium mb-6 font-body">
                    {edu.institution} | {edu.duration}
                  </p>
                  
                  <div className="inline-block px-4 py-2 rounded-lg bg-[rgba(0,245,196,0.08)] border border-[rgba(0,245,196,0.2)]">
                    <span className="text-[#00F5C4] font-mono text-sm font-bold tracking-wide uppercase">
                      {edu.score}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Glows */}
      <div className="absolute top-[20%] -left-[10%] w-[30%] h-[40%] bg-[#00F5C4]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[40%] bg-purple-500/5 blur-[120px] pointer-events-none" />
    </section>
  );
};

export default React.memo(Education);
