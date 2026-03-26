"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Training", href: "#experience" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",    href: "#contact" }
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -20, opacity: 0, x: "-50%" }}
        animate={{ 
          y: hidden ? -100 : 0, 
          opacity: 1, 
          x: "-50%" 
        }}
        transition={{ 
        }}
        className="fixed top-[12px] md:top-[20px] left-[50%] z-[100] w-[95vw] sm:w-[90vw] md:w-max max-w-[450px] md:max-w-none px-4 md:px-6 py-2.5 rounded-[100px] bg-[rgba(10,10,15,0.7)] border border-[rgba(255,255,255,0.08)] backdrop-blur-[20px] flex items-center justify-between gap-2 sm:gap-4 md:gap-6"
      >
        <Link href="/" onClick={() => setActive("")} className="font-display font-bold text-[16px] flex items-center gap-[2px]">
          <span style={{ fontFamily: 'var(--font-jetbrains-mono)', color: '#00F5C4', fontSize: 13 }}>{'>'}</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(90deg, #5B8FFF, #00F5C4)',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            AS
          </span>
        </Link>
        <div className="flex items-center justify-between w-full md:w-auto gap-3 md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className={cn(
                "font-mono font-medium transition-colors duration-200 ease-in-out hover:text-[#F0F0FF] text-[10px] sm:text-[11px] md:text-[13px]",
                active === item.label ? "text-[#5B8FFF]" : "text-[#6B7280]",
                item.label === "Achievements" ? "hidden md:block" : "block"
              )}
            >
              {item.label}
            </Link>
          ))}
          {/* Status dot */}
          <span
            className="ml-1 w-[6px] h-[6px] rounded-full flex-shrink-0"
            style={{
              background: '#00F5C4',
              boxShadow: '0 0 6px #00F5C4',
              animation: 'pulse 2s ease infinite'
            }}
            title="System online"
          />
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
