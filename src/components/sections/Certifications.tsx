"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code, Shield, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";
import { SectionLabel } from "./About";

const certs = [
  {
    title: "Certified Junior Web Application Pentester",
    issuer: "Sturtle Security",
    date: "Mar 2026",
    icon: Shield,
    accent: "rgba(91,143,255,1)", // #5B8FFF
    gridClass: "md:col-start-1 md:row-start-1 md:row-end-3",
    image: "/certs/web-pentest.png",
    verifyUrl: "https://www.linkedin.com/posts/abhishek-shah-b19358290_cybersecurity-penetrationtesting-websecurity-activity-7438968241965842432-1-dP/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEaH9UUBg-8q8uEIzxRB5vLsZDPhxhC1EoI"
  },
  {
    title: "Certified Social Engineering Defense Practitioner",
    issuer: "SecOps",
    date: "Feb 2026",
    icon: Globe,
    accent: "rgba(0,245,196,1)", // #00F5C4
    gridClass: "md:col-start-2 md:row-start-1",
    verifyUrl: "https://candidate.speedexam.net/certificate.aspx?SSTATE=am4131EniU8ntjp4bO5mXaK1woWaaJXWVboTCT3HmzcnH92EfVD3PG6JqAVw6WsOrKjAzspKpAewlFHW+Rv5NepuEsqWeEjOWMyUIlQq5rc="
  },
  {
    title: "Privacy & Security in Online Social Media",
    issuer: "NPTEL",
    date: "Dec 2025",
    icon: Shield,
    accent: "rgba(123,94,255,1)", // #7B5EFF
    gridClass: "md:col-start-3 md:row-start-1",
    verifyUrl: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs117/Course/NPTEL25CS117S135870158610329203.pdf"
  },
  {
    title: "Ethical Hacking Essentials (EHE)",
    issuer: "EC-Council",
    date: "Mar 2025",
    icon: Shield,
    accent: "rgba(255,107,107,1)", // #FF6B6B
    gridClass: "md:col-start-2 md:col-end-4 md:row-start-2",
    verifyUrl: "https://www.linkedin.com/posts/abhishek-shah-b19358290_cybersecurity-ethicalhacking-learningneverstops-activity-7307403170383544320-PUnM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEaH9UUBg-8q8uEIzxRB5vLsZDPhxhC1EoI"
  }
];

const Certifications = React.memo(function Certifications() {
  return (
    <section id="certifications" className="py-32 w-full relative overflow-hidden flex flex-col items-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="mb-4 text-center md:text-left">
          <SectionLabel code="SEC-06" label="CREDENTIALS" />
        </div>
        <motion.h2 
          className="text-[32px] md:text-[clamp(40px,6vw,80px)] font-bold text-[#F0F0FF] mb-4 leading-none font-display text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Certifications
        </motion.h2>
        <motion.p 
          className="text-[#6B7280] text-[15px] md:text-[clamp(18px,2.5vw,28px)] mb-16 font-body text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Credentials that count.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2 gap-[16px]">
           {certs.map((cert, i) => {
             const isSmall = cert.issuer === "freeCodeCamp";
             
             return (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 40, scale: 0.96 }}
               whileInView={{ opacity: 1, y: 0, scale: 1 }}
               viewport={{ once: true, margin: "-80px" }}
               transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className={`relative flex flex-col group transition-all duration-300 will-change-transform p-[20px] md:p-[28px] ${cert.gridClass} ${isSmall ? 'md:h-[120px] justify-center' : 'justify-between'}`}
               style={{ 
                 borderRadius: '16px',
                 background: 'rgba(255,255,255,0.04)',
                 border: '1px solid rgba(255,255,255,0.08)',
                 borderTop: `3px solid ${cert.accent}`,
                 backdropFilter: 'blur(12px)',
               }}
               onMouseEnter={(e) => {
                   e.currentTarget.style.transform = "translateY(-4px)";
                   e.currentTarget.style.borderColor = cert.accent.replace('1)', '0.4)');
                   e.currentTarget.style.boxShadow = `0 20px 60px ${cert.accent.replace('1)', '0.15)')}`;
               }}
               onMouseLeave={(e) => {
                   e.currentTarget.style.transform = "translateY(0)";
                   e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                   e.currentTarget.style.boxShadow = "none";
               }}
             >
                <div className={`flex justify-between items-start ${isSmall ? 'mb-0 items-center' : 'mb-6'}`}>
                   <div 
                     className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center text-xl shrink-0"
                     style={{ backgroundColor: cert.accent.replace('1)', '0.12)') }}
                   >
                     <cert.icon size={22} color={cert.accent} />
                   </div>
                   {!isSmall && <span className="text-[13px] font-mono" style={{ color: cert.accent }}>{cert.date}</span>}
                   {isSmall && (
                     <div className="flex-1 ml-4 pr-[60px]">
                         <h3 className="text-[18px] font-semibold text-[#F0F0FF] font-display leading-tight">{cert.title}</h3>
                         <div className="flex items-center gap-3 mt-1">
                            <p className="text-[13px] text-[#6B7280] font-body">{cert.issuer}</p>
                            <span className="text-[13px] font-mono" style={{ color: cert.accent }}>{cert.date}</span>
                         </div>
                     </div>
                   )}
                </div>

                {cert.image && (
                  <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="relative w-full aspect-[16/10] block rounded-xl overflow-hidden mb-6 border border-white/5 bg-black/40 group-hover:border-white/10 transition-colors">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <ExternalLink color="white" size={24} className="drop-shadow-lg" />
                    </div>
                  </a>
                )}
                
                {!isSmall && (
                <div className="mt-2">
                   <h3 className="text-[18px] font-semibold text-[#F0F0FF] mb-2 font-display leading-tight">
                     {cert.title}
                   </h3>
                   <p className="text-[13px] text-[#6B7280] font-body">{cert.issuer}</p>
                </div>
                )}

                 <a 
                    href={cert.verifyUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-[20px] right-[20px] text-[12px] font-body opacity-60 hover:opacity-100 transition-opacity" 
                    style={{ color: cert.accent }}
                 >
                    Verify ↗
                 </a>
             </motion.div>
           )})}
        </div>
      </div>
    </section>
  )
});

import { memo } from "react";
export default memo(Certifications);
