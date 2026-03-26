"use client";

import { useState, useEffect } from "react";

const TITLES = [
  "Penetration Tester",
  "Cybersecurity Analyst",
  "Ethical Hacker",
  "Security Researcher"
];

export default function TypingSubtitle() {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fullText = TITLES[index];
    const typingSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && currentText === fullText) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      // Pause before typing next word
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % TITLES.length);
      }, 500);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, index]);

  return (
    <span className="font-medium text-[#5B8FFF]">
      {currentText}
      <span className="animate-[pulse_1s_ease-in-out_infinite] w-[0.1em] h-[1em] bg-[#5B8FFF] inline-block align-middle ml-[2px]"></span>
    </span>
  );
}
