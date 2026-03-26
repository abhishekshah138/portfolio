"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HackModeToggle() {
  const [isHackMode, setIsHackMode] = useState(false);

  useEffect(() => {
    if (isHackMode) {
      document.documentElement.classList.add("hack-mode");
    } else {
      document.documentElement.classList.remove("hack-mode");
    }
  }, [isHackMode]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsHackMode(!isHackMode)}
      className="fixed bottom-6 right-6 z-[999999] w-12 h-12 rounded-full bg-[#0A0A0F] border border-[#5B8FFF]/40 flex items-center justify-center shadow-[0_0_20px_rgba(91,143,255,0.2)] hover:border-[#00F5C4] hover:shadow-[0_0_30px_rgba(0,245,196,0.4)] transition-all group"
      title="Toggle Hack Mode"
    >
      <span className="font-mono text-[15px] font-bold text-[#F0F0FF] group-hover:text-[#00F5C4] transition-colors">
        {`</>`}
      </span>
    </motion.button>
  );
}
