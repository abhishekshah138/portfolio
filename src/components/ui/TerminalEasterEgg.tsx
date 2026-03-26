"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Entry = {
  type: "input" | "output";
  text: string | React.ReactNode;
};

export default function TerminalWidget() {
  const [history, setHistory] = useState<Entry[]>([]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout;

    setHistory([{ type: "output", text: "Portfolio terminal access granted. Type 'help'." }]);

    t1 = setTimeout(() => {
      setHistory(prev => [...prev, { type: "input", text: "whoami" }]);
    }, 800);

    t2 = setTimeout(() => {
      setHistory(prev => [
        ...prev, 
        { type: "output", text: "abhishek_shah" }, 
        { type: "input", text: "cat skills.txt" }
      ]);
    }, 1800);

    t3 = setTimeout(() => {
      setHistory(prev => [
        ...prev, 
        { type: "output", text: "python, nmap, burpsuite, wireshark, next.js" }
      ]);
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: Entry[] = [...history, { type: "input", text: cmd }];

    if (trimmedCmd === "") {
        // do nothing
    } else if (trimmedCmd === "clear") {
      setHistory([{ type: "output", text: "Terminal cleared." }]);
      setInputVal("");
      return;
    } else if (trimmedCmd === "help") {
      newHistory.push({ type: "output", text: "Available commands: whoami, nmap abhishek.dev, cat flag.txt, skills, projects, contact, hack, clear" });
    } else if (trimmedCmd === "whoami") {
      newHistory.push({ type: "output", text: "Abhishek Shah - Cybersecurity Engineer." });
    } else if (trimmedCmd === "nmap abhishek.dev") {
      newHistory.push({ type: "output", text: "Starting Nmap 7.93 ( https://nmap.org )\nNmap scan report for abhishek.dev (192.168.1.100)\nHost is up (0.012s latency).\n\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\n\nNmap done: 1 IP address scanned." });
    } else if (trimmedCmd === "cat flag.txt") {
      newHistory.push({ type: "output", text: "FLAG{4bh1sh3k_1s_h1r1ng}" });
    } else if (trimmedCmd === "skills") {
      newHistory.push({ type: "output", text: "Python, Next.js, Penetration Testing, Wireshark, Bash..." });
    } else if (trimmedCmd === "projects") {
      newHistory.push({ type: "output", text: "1. Telegram C2\n2. Honeypot Simulator" });
    } else if (trimmedCmd === "contact") {
      newHistory.push({ type: "output", text: "Email: abhishekshah1388@gmail.com\nGitHub: /abhishekshah138" });
    } else if (trimmedCmd === "hack") {
      newHistory.push({ type: "output", text: "Initializing payload... Bypassing firewall... Just kidding, I only hack defensively. 🛡️" });
    } else {
      newHistory.push({ type: "output", text: `Command not found: ${trimmedCmd}. Type 'help' for a list of commands.` });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <div
      className="w-full max-w-xl bg-[rgba(10,10,15,0.95)] border border-[#00F5C4]/20 rounded-lg shadow-[0_0_30px_rgba(0,245,196,0.05)] overflow-hidden flex flex-col font-mono text-[13px] text-[#00F5C4] transition-all duration-300 hover:border-[#00F5C4]/40 hover:shadow-[0_0_30px_rgba(0,245,196,0.15)]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#00F5C4]/5 border-b border-[#00F5C4]/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-xs text-[#00F5C4]/50 uppercase tracking-widest">guest@portfolio:~</span>
        <div className="w-4" /> {/* Spacer for alignment */}
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="p-4 h-[160px] md:h-[180px] overflow-y-auto whitespace-pre-wrap select-text [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            {entry.type === "input" ? (
              <div className="flex gap-2 text-white/90">
                <span className="text-[#00F5C4]">~$</span>
                <span>{entry.text}</span>
              </div>
            ) : (
              <div className="text-[#00F5C4]/80 ml-4">{entry.text}</div>
            )}
          </div>
        ))}
        
        <div className="flex gap-2 text-white/90 mt-2 pb-2">
          <span className="text-[#00F5C4]">~$</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex-1"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-transparent outline-none border-none text-white/90 shadow-none focus:ring-0 p-0 m-0"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
