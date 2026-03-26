"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Phone, Send, CheckCircle, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';
import { SectionLabel } from "../sections/About";

const contactCards = [
  { icon: Mail,     label: "SECURE_CHANNEL",       value: "abhishekshah1388@gmail.com",   href: "mailto:abhishekshah1388@gmail.com", accent: "rgba(91,143,255,1)" },
  { icon: Linkedin, label: "PROFESSIONAL_NETWORK",  value: "linkedin.com/in/abhishek-shah",     href: "https://www.linkedin.com/in/abhishek-shah-b19358290/", accent: "rgba(0,245,196,1)" },
  { icon: Github,   label: "CODE_REPOSITORY",       value: "github.com/abhishekshah138",           href: "https://github.com/abhishekshah138",      accent: "rgba(255,255,255,1)" },
];

function AnimatedWord({
  word,
  startDelay,
}: {
  word: string;
  startDelay: number;
}) {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: startDelay + i * 0.04,
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

const Contact = React.memo(function Contact() {
  const [copied, setCopied] = React.useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validateForm = () => {
    if (!formRef.current) return false;
    const formData = new FormData(formRef.current);
    const newErrors: Record<string,string> = {};

    const name = formData.get('from_name') as string;
    const email = formData.get('from_email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || name.length < 2) newErrors.from_name = "Name must be at least 2 characters";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.from_email = "Valid email is required";
    if (!subject || subject.length < 3) newErrors.subject = "Subject must be at least 3 characters";
    if (!message || message.length < 10) newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === 'sending') return;
    
    if (!validateForm()) return;
    
    setFormState('sending');
    
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      
      setFormState('sent');
      formRef.current?.reset();
      
      setTimeout(() => setFormState('idle'), 4000);
      
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  const line1 = ["Ready", "to", "secure"];
  const line2 = ["the", "next", "big", "thing?"];

  // Pre-compute start delays so each word picks up where the last left off
  // Line 1 character count = 5 + 1(space) + 5 = 11 chars
  const line1Delays = line1.reduce<number[]>((acc, word, i) => {
    const prev = i === 0 ? 0 : acc[i - 1] + line1[i - 1].length * 0.04 + 0.06;
    acc.push(prev);
    return acc;
  }, []);

  const line2BaseDelay = line1Delays[line1.length - 1] + line1[line1.length - 1].length * 0.04 + 0.1;
  const line2Delays = line2.reduce<number[]>((acc, word, i) => {
    const prev = i === 0 ? line2BaseDelay : acc[i - 1] + line2[i - 1].length * 0.04 + 0.06;
    acc.push(prev);
    return acc;
  }, []);

  return (
    <section
      id="contact"
      className="relative min-h-[100vh] w-full flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
    >
      {/* Animated blob background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Desktop Blobs */}
        <div className="contact-blob-1 hidden md:block" style={{ width: '40vw', height: '40vw', position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.25, backgroundColor: '#0D1B3E', top: '50%', left: '20%', transform: 'translate(-50%, -50%)' }} />
        <div className="contact-blob-2 hidden md:block" style={{ width: '35vw', height: '35vw', position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, backgroundColor: '#0A2040', top: '30%', right: '20%', transform: 'translate(50%, -50%)' }} />
        <div className="contact-blob-3 hidden md:block" style={{ width: '25vw', height: '25vw', position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.06, backgroundColor: '#7B5EFF', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        
        {/* Mobile Blob */}
        <div className="contact-blob-1 md:hidden" style={{ width: '80vw', height: '80vw', position: 'absolute', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.15, backgroundColor: '#0D1B3E', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12 mt-12 items-start justify-between">
        
        {/* ── Left Column ── */}
        <div className="w-full md:w-[40%] flex flex-col text-left">
          <div className="mb-8 text-left w-full">
            <SectionLabel code="SEC-08" label="ESTABLISH_CONNECTION" />
          </div>
          <div className="mb-12 text-left w-full">
            <h2 className="font-display font-bold leading-[1.1] tracking-tighter text-[clamp(40px,6vw,64px)] text-left">
              <span className="block mb-1" style={{ textShadow: '0 0 80px rgba(91,143,255,0.15)' }}>
                {line1.map((word, i) => (
                  <React.Fragment key={i}>
                    <AnimatedWord word={word} startDelay={line1Delays[i]} />
                    {i < line1.length - 1 && <span className="inline-block" style={{ width: '0.28em' }} />}
                  </React.Fragment>
                ))}
              </span>
              <span
                className="block relative z-10"
                style={{
                  background: 'linear-gradient(90deg, #5B8FFF, #00F5C4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 0 80px rgba(91,143,255,0.15)',
                }}
              >
                {line2.map((word, i) => (
                  <React.Fragment key={i}>
                    <AnimatedWord word={word} startDelay={line2Delays[i]} />
                    {i < line2.length - 1 && <span className="inline-block" style={{ width: '0.28em' }} />}
                  </React.Fragment>
                ))}
              </span>
            </h2>

            <motion.p
              className="mt-5 max-w-[400px]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 13, color: '#6B7280', display: 'block', lineHeight: 2 }}>&gt; Accepting new connections...</span>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 13, color: '#6B7280', display: 'block', lineHeight: 2 }}>&gt; Available for: internships, collabs, full-time</span>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 13, color: '#6B7280', display: 'block', lineHeight: 2 }}>&gt; Response time: &lt; 24hrs</span>
            </motion.p>
          </div>

          <div className="flex flex-col gap-[16px] w-full max-w-[400px]">
            {contactCards.map((card, i) => (
              <motion.a
                key={card.label}
                href={card.label === 'SECURE_CHANNEL' ? undefined : card.href}
                onClick={(e) => {
                  if (card.label === 'SECURE_CHANNEL') {
                    e.preventDefault();
                    navigator.clipboard.writeText(card.value);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
                target={card.label === 'SECURE_CHANNEL' ? undefined : "_blank"}
                rel={card.label === 'SECURE_CHANNEL' ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-row items-center p-[20px] gap-[16px] text-left transition-all duration-300 will-change-transform"
                style={{
                  cursor: card.label === 'EMAIL' ? 'pointer' : undefined,
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 16px 48px ${card.accent.replace('1)', '0.15)')}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span
                  className="flex items-center justify-center shrink-0 w-[44px] h-[44px] rounded-full text-[20px]"
                  style={{ backgroundColor: card.accent.replace('1)', '0.12)') }}
                >
                  <card.icon size={18} color={card.accent} />
                </span>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-mono text-[#8B95A3] text-[11px] mb-1">{card.label}</span>
                  <span className="font-body text-[#F0F0FF] text-[14px] font-[500] truncate">{card.value}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Right Column (Form) ── */}
        <div className="w-full md:w-[55%] flex flex-col mt-12 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-[28px] md:p-[36px] rounded-[20px] w-full relative"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#F0F0FF', marginBottom: 4 }}>
              Send a Message
            </h3>
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>
              I&apos;ll respond within 24 hours
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="font-mono text-[11px] text-[#6B7280] uppercase mb-[6px]">Your Name</label>
                <input 
                  type="text" 
                  name="from_name" 
                  placeholder="Your Name" 
                  required 
                  onChange={() => setErrors(prev => ({...prev, from_name: ''}))}
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[10px] px-[16px] py-[14px] font-body text-[14px] text-[#F0F0FF] outline-none transition-colors focus:border-[rgba(91,143,255,0.5)] focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] placeholder:text-[#6B7280]"
                />
                {errors.from_name && <p style={{ color: '#FF6464', fontSize: 12, marginTop: 4 }}>{errors.from_name}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-mono text-[11px] text-[#6B7280] uppercase mb-[6px]">Your Email</label>
                <input 
                  type="email" 
                  name="from_email" 
                  placeholder="your@email.com" 
                  required 
                  onChange={() => setErrors(prev => ({...prev, from_email: ''}))}
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[10px] px-[16px] py-[14px] font-body text-[14px] text-[#F0F0FF] outline-none transition-colors focus:border-[rgba(91,143,255,0.5)] focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] placeholder:text-[#6B7280]"
                />
                {errors.from_email && <p style={{ color: '#FF6464', fontSize: 12, marginTop: 4 }}>{errors.from_email}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-mono text-[11px] text-[#6B7280] uppercase mb-[6px]">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="What's this about?" 
                  required 
                  onChange={() => setErrors(prev => ({...prev, subject: ''}))}
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[10px] px-[16px] py-[14px] font-body text-[14px] text-[#F0F0FF] outline-none transition-colors focus:border-[rgba(91,143,255,0.5)] focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] placeholder:text-[#6B7280]"
                />
                {errors.subject && <p style={{ color: '#FF6464', fontSize: 12, marginTop: 4 }}>{errors.subject}</p>}
              </div>

              <div className="flex flex-col mb-2">
                <label className="font-mono text-[11px] text-[#6B7280] uppercase mb-[6px]">Message</label>
                <textarea 
                  name="message" 
                  placeholder="Tell me about your project, opportunity, or just say hello..." 
                  rows={5} 
                  required 
                  onChange={() => setErrors(prev => ({...prev, message: ''}))}
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[10px] px-[16px] py-[14px] font-body text-[14px] text-[#F0F0FF] outline-none transition-colors focus:border-[rgba(91,143,255,0.5)] focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] placeholder:text-[#6B7280] resize-y min-h-[120px]"
                />
                {errors.message && <p style={{ color: '#FF6464', fontSize: 12, marginTop: 4 }}>{errors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={formState === 'sending'}
                className="w-full flex items-center justify-center gap-2 rounded-[100px] px-[32px] py-[14px] font-semibold text-[15px] transition-all will-change-transform mt-2"
                style={{
                  background: formState === 'sent' ? 'linear-gradient(90deg, #00F5C4, #00D4A8)' : formState === 'error' ? 'rgba(255,100,100,0.2)' : 'linear-gradient(90deg, #5B8FFF, #00F5C4)',
                  color: formState === 'error' ? '#FF6464' : '#0A0A0F',
                  border: formState === 'error' ? '1px solid rgba(255,100,100,0.4)' : 'none',
                  opacity: formState === 'sending' ? 0.7 : 1,
                  cursor: formState === 'sending' ? 'not-allowed' : 'pointer'
                }}
              >
                {formState === 'idle' && (
                  <>INITIALIZE_TRANSMISSION <Send size={16} /></>
                )}
                {formState === 'sending' && (
                  <>Sending... <Loader2 size={16} className="animate-spin" /></>
                )}
                {formState === 'sent' && (
                  <>Message Sent! <CheckCircle size={16} /></>
                )}
                {formState === 'error' && (
                  <>Failed — Try Again</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blobAnim1 {
          0%   { transform: scale(1)   translate(0px, 0px);     }
          100% { transform: scale(1.2) translate(100px, -50px); }
        }
        @keyframes blobAnim2 {
          0%   { transform: scale(1)   translate(0px, 0px);      }
          100% { transform: scale(0.8) translate(-100px, 100px); }
        }
        @keyframes blobAnim3 {
          0%   { transform: scale(1)   translate(0px, 0px);    }
          100% { transform: scale(1.1) translate(50px, 100px); }
        }
        .contact-blob-1 { animation: blobAnim1 12s ease infinite alternate; }
        .contact-blob-2 { animation: blobAnim2 18s ease infinite alternate; }
        .contact-blob-3 { animation: blobAnim3 24s ease infinite alternate; }
      ` }} />
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#00F5C4] text-[#0A0A0F] px-5 py-2 rounded-full font-medium text-sm shadow-[0_0_20px_rgba(0,245,196,0.3)] z-[99999]"
          >
            Copied!
          </motion.div>
        )}
        {formState === 'sent' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[24px] right-[24px] z-[9999] flex items-center gap-[12px] px-[20px] py-[16px] rounded-[12px]"
            style={{
              background: 'rgba(0,245,196,0.1)',
              border: '1px solid rgba(0,245,196,0.3)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <CheckCircle size={20} color="#00F5C4" />
            <span className="font-body text-[14px] text-[#F0F0FF]">Message sent! I&apos;ll get back to you soon.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

import { memo } from "react";
export default memo(Contact);