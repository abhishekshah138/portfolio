"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[999999] origin-left bg-gradient-to-r from-[#5B8FFF] to-[#00F5C4]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
