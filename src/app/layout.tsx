import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import TerminalEasterEgg from "@/components/ui/TerminalEasterEgg";
import HackModeToggle from "@/components/ui/HackModeToggle";
import StatusTicker from "@/components/ui/StatusTicker";
import GlobalBackground from "@/components/ui/GlobalBackground";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://harshdeep72.github.io"),
  title: "Abhishek Shah — Cybersecurity Engineer",
  description: "Portfolio of Abhishek Shah — Cybersecurity Engineer, B.Tech CSE student, and TryHackMe Top 1%.",
  keywords: ["Abhishek Shah", "Portfolio", "Cybersecurity", "Python Developer", "Software Engineer"],
  openGraph: {
    title: "Abhishek Shah | Cybersecurity Engineer",
    description: "I build systems by day, audit networks by night, and build things that last. View my projects and experience.",
    url: "https://abhishekshah138.github.io/portfolio",
    siteName: "Abhishek Shah Portfolio",
    images: [
      {
        url: "/og_harshdeep.png",
        width: 1200,
        height: 630,
        alt: "Harshdeep Singh Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Shah | Cybersecurity Engineer",
    description: "I build systems by day, audit networks by night, and build things that last.",
    images: ["/og_harshdeep.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preload" href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" as="style" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-body text-text-primary antialiased relative`}>
        {/* 
          WW91IGZvdW5kIGl0LiBZb3UnZCBmaXQgcmlnaHQgaW4uCkVtYWlsIG1lIGF0OiBhYmhpc2hla3NoYWgxMzg4QGdtYWlsLmNvbQ==
        */}
        <GlobalBackground />
        <div className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        <ScrollProgress />
        <Preloader />
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
