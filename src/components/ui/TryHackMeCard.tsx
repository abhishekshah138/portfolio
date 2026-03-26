"use client";
import { motion } from "framer-motion";

// UPDATE THESE WITH REAL DATA FROM: https://tryhackme.com/p/harryX1X
const THM_RANK = "Top 15%";
const THM_BADGES = "10";
const THM_ROOMS = "57";
const THM_STREAK = "5";

const thmRooms = [
  "Pre-Security",
  "Introduction to Cybersecurity",
  "Linux Fundamentals",
  "Network Fundamentals",
  "Web Fundamentals",
  "CompTIA Pentest+",
  "Offensive Pentesting",
  "Cyber Defense",
  "SOC Level 1",
];

export default function TryHackMeCard() {
  const stats = [
    { label: "RANK", value: THM_RANK, color: "#00F5C4" },
    { label: "BADGES", value: THM_BADGES, color: "#5B8FFF" },
    { label: "ROOMS DONE", value: THM_ROOMS, color: "#7B5EFF" },
    { label: "STREAK", value: `${THM_STREAK} days`, color: "#FFD93D" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-[860px] mx-auto mb-16 rounded-[20px] p-8 overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Accent glow behind card */}
      <div 
        className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          top: "-40px",
          left: "-40px",
          background: "radial-gradient(circle, rgba(0,245,196,0.12), transparent 70%)"
        }}
      />

      <div className="relative z-10 w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-md overflow-hidden bg-white/5 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://tryhackme.com/img/favicon.png" alt="THM" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-display text-[20px] font-bold text-[#F0F0FF] leading-tight">TryHackMe</h3>
            <span className="font-mono text-[13px] text-[#6B7280]">@harryX1X</span>
          </div>
        </div>
        
        <a 
          href="https://tryhackme.com/p/harryX1X"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[12px] text-[#00F5C4] px-[14px] py-[4px] rounded-full transition-colors"
          style={{
             border: "1px solid rgba(0,245,196,0.3)",
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0,245,196,0.08)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          View Profile ↗
        </a>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-[12px] p-4 text-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div 
              className="font-display text-[28px] font-bold tracking-tight"
              style={{
                background: `linear-gradient(90deg, ${stat.color}, white)`,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {stat.value}
            </div>
            <div className="font-mono text-[11px] text-[#6B7280] uppercase mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rooms Completed */}
      <div className="relative z-10 mt-6">
        <h4 className="font-mono text-[11px] text-[#6B7280] uppercase mt-6 mb-3">Completed Rooms</h4>
        <div className="flex flex-wrap gap-2">
          {thmRooms.map((room, i) => (
            <motion.div
              key={room}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className="font-mono text-[12px] px-[14px] py-[6px] rounded-full cursor-default transition-all duration-200"
              style={{
                background: "rgba(0,245,196,0.08)",
                border: "1px solid rgba(0,245,196,0.2)",
                color: "#00F5C4"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0,245,196,0.15)";
                e.currentTarget.style.borderColor = "rgba(0,245,196,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0,245,196,0.08)";
                e.currentTarget.style.borderColor = "rgba(0,245,196,0.2)";
              }}
            >
              {room}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
