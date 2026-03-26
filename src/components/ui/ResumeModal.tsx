"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl h-[90vh] bg-[#0A0A0F] border border-[#5B8FFF]/30 rounded-2xl shadow-[0_0_50px_rgba(91,143,255,0.15)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#5B8FFF]/20 bg-[#5B8FFF]/5">
              <h3 className="font-display font-semibold text-[#F0F0FF] text-lg">Resume_Abhishek_Shah.pdf</h3>
              <div className="flex items-center gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-[#5B8FFF] text-[#0A0A0F] font-semibold rounded-full hover:shadow-[0_0_20px_rgba(91,143,255,0.4)] transition-shadow text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Iframe container */}
            <div className="flex-1 w-full bg-[#1A1A1D] flex items-center justify-center relative">
              <iframe
                src="/resume.pdf#toolbar=0" // Try to hide default PDF viewers toolbar for a cleaner look
                className="w-full h-full border-none hidden sm:block"
                title="Resume Preview"
              />
              {/* Mobile Fallback layout */}
              <div className="sm:hidden flex flex-col items-center justify-center p-6 text-center w-full h-full text-[#8B92A5]">
                <svg className="w-16 h-16 mb-4 text-[#5B8FFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mb-8 text-[#F0F0FF] font-medium text-[15px]">Native iframe rendering is unsupported in some mobile environments.</p>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#5B8FFF] text-[#0A0A0F] font-semibold rounded-[100px] shadow-[0_0_20px_rgba(91,143,255,0.3)] transition-colors inline-block"
                >
                  Open PDF in New Tab ↗
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
