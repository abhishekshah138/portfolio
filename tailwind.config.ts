import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        surface: "#111118",
        accent: {
          primary: "#5B8FFF",
          secondary: "#00F5C4",
          glow: "#7B5EFF",
        },
        text: {
          primary: "#F0F0FF",
          muted: "#6B7280",
        },
        card: {
          bg: "rgba(255,255,255,0.04)",
          border: "rgba(255,255,255,0.08)",
        }
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0A0A0F 0%, #0D1B3E 50%, #0A0A0F 100%)',
        'gradient-accent': 'linear-gradient(90deg, #5B8FFF, #00F5C4)',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
