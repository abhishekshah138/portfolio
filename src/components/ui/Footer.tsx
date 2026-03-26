"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronUp } from "lucide-react";

const socials = [
  { icon: Github,   href: "https://github.com/abhishekshah138",         label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/abhishek-shah-b19358290/",     label: "LinkedIn" },
  { icon: Mail,     href: "mailto:abhishekshah1388@gmail.com",     label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full relative z-10 border-t border-white/[0.05]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Left: copyright */}
        <p className="text-[12px] text-[#4B5563] text-center sm:text-left" style={{ fontFamily: 'var(--font-jetbrains-mono)', letterSpacing: '0.05em' }}>
          © 2026 ABHISHEK_SHAH // SYSTEM_STATUS: ONLINE // BUILD: v1.0.0
        </p>

        {/* Centre: social icons */}
        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#6B7280] hover:text-[#00F5C4] hover:border-[#00F5C4]/40 hover:bg-[#00F5C4]/5 transition-all duration-300"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Right: back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#6B7280] hover:text-[#F0F0FF] hover:border-white/20 text-[13px] font-body transition-all duration-300"
        >
          ^ RETURN_TO_BASE
          <ChevronUp size={14} />
        </button>

      </div>
    </motion.footer>
  );
}
