"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export function HeroSection() {
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <section className="relative overflow-hidden bg-[#0A0014] pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center justify-center min-h-[90vh]">
      {/* Intense dark background with subtle radial glow matching the image */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_20%,_#2A144E_0%,_#0A0014_100%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-5xl flex flex-col items-center text-center">
        
        {/* Top Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium bg-[#1F1B2C]/80 text-[#8B82B5] border border-[#3E3466]/50 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Video Generation
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center font-bold tracking-tight"
        >
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white tracking-[-0.04em] leading-[1.1] mb-2 drop-shadow-sm">
            Generate & Schedule
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[-0.04em] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-[#6b8cff] via-[#8551ff] to-[#ff4e91]">
            AI Component Videos
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-base md:text-xl leading-snug md:leading-relaxed text-[#9ca3af] max-w-2xl mx-auto"
        >
          Create engaging shorts for YouTube, Instagram, and TikTok in seconds.<br className="hidden md:block"/> Automate your content calendar with our intelligent scheduler.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 mb-20 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-8 sm:px-0"
        >
          {isLoaded && isSignedIn ? (
            <Link
              href="/dashboard"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-sm hover:bg-zinc-200 transition-all font-sans"
            >
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-sm hover:bg-zinc-200 transition-all font-sans">
                Start Creating for Free <ArrowRight className="h-4 w-4" />
              </button>
            </SignInButton>
          )}
          <a
            href="#"
            className="flex w-full sm:w-auto items-center justify-center rounded-md bg-white/5 border border-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
            style={{ minWidth: "160px", minHeight: "48px" }}
          >
            {/* The second button in screenshot appears blank or maybe "Watch Demo". Using a standard secondary button */}
            Watch Demo
          </a>
        </motion.div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 pt-10 border-t border-transparent"
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#6b7280] uppercase mb-6 text-center">
            Trusted by creators on
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-white/70 font-semibold text-lg sm:text-xl">
            <span>YouTube Shorts</span>
            <span>Instagram Reels</span>
            <span>TikTok</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
