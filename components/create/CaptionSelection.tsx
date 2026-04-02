"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { CircleCheck, Type, Sparkles, Zap, Ghost, Keyboard, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const previewText = "Transform your ideas into viral AI videos.";

interface CaptionStyleConfig {
  id: string;
  name: string;
  icon: any;
  description: string;
  style: string;
  animation: {
    initial?: any;
    animate: any;
    transition?: Transition;
    word?: {
      initial: any;
      animate: any;
      transition: Transition;
    };
  };
}

const captionStyles: CaptionStyleConfig[] = [
  {
    id: "bold-punch",
    name: "Bold Punch",
    icon: Zap,
    description: "High-visibility yellow text with bold black stroke.",
    style: "font-black text-yellow-400 uppercase tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]",
    animation: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    icon: Type,
    description: "Clean, elegant white font for a sophisticated look.",
    style: "font-medium text-white tracking-tight",
    animation: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },
  {
    id: "neon-glow",
    name: "Neon Glow",
    icon: Sparkles,
    description: "Vibrant neon text with a pulsing atmospheric glow.",
    style: "font-bold text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]",
    animation: {
      animate: { 
        opacity: [0.7, 1, 0.7],
        scale: [0.98, 1, 0.98],
      },
      transition: { duration: 2, repeat: Infinity }
    }
  },
  {
    id: "glitch-vibe",
    name: "Glitch Vibe",
    icon: Ghost,
    description: "Digital distortion for a tech or futuristic feel.",
    style: "font-mono font-bold text-rose-500 relative",
    animation: {
      animate: {
        x: [0, -2, 2, -1, 0],
        y: [0, 1, -1, 0, 0],
        skew: [0, -5, 5, 0, 0],
      },
      transition: { duration: 0.2, repeat: Infinity, repeatDelay: 3 }
    }
  },
  {
    id: "typewriter",
    name: "Typewriter",
    icon: Keyboard,
    description: "Retro terminal-style sequential letter reveal.",
    style: "font-mono text-emerald-400 border-r-4 border-emerald-400 pr-2",
    animation: {
      initial: { width: 0, opacity: 0 },
      animate: { width: "auto", opacity: 1 },
      transition: { duration: 2, ease: "linear" }
    }
  },
  {
    id: "hormozi-style",
    name: "Alex Hormozi",
    icon: Star,
    description: "Fast-paced word-by-word highlight with energy.",
    style: "font-black text-white italic",
    animation: {
      animate: {}, // Dummy to satisfy type
      word: {
        initial: { scale: 0.5, opacity: 0, rotate: -5 },
        animate: { scale: 1, opacity: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 400, damping: 12 }
      }
    }
  }
];

interface CaptionSelectionProps {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
}

export function CaptionSelection({ selectedStyle, onStyleChange }: CaptionSelectionProps) {
  const [key, setKey] = useState(0);

  // Reset animation when style changes
  useEffect(() => {
    setKey((prev: number) => prev + 1);
  }, [selectedStyle]);

  const renderPreview = (style: CaptionStyleConfig) => {
    if (style.id === "typewriter") {
      return (
        <motion.p
          key={key}
          className={cn("text-2xl text-center overflow-hidden whitespace-nowrap", style.style)}
          initial={style.animation.initial}
          animate={style.animation.animate}
          transition={style.animation.transition}
        >
          {previewText}
        </motion.p>
      );
    }

    if (style.id === "hormozi-style" && style.animation.word) {
      return (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
          {previewText.split(" ").map((word, i) => (
            <motion.span
              key={`${key}-${i}`}
              className={cn("text-3xl", style.style, word.toLowerCase() === "viral" ? "text-yellow-400 scale-110" : "")}
              initial={style.animation.word?.initial}
              animate={style.animation.word?.animate}
              transition={{ ...(style.animation.word?.transition || {}), delay: i * 0.15 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      );
    }

    if (style.id === "glitch-vibe") {
      return (
        <div className="relative">
          <motion.p
            key={key}
            className={cn("text-3xl text-center uppercase tracking-widest", style.style)}
            animate={style.animation.animate}
            transition={style.animation.transition}
          >
            {previewText}
          </motion.p>
          <motion.p
            className="absolute inset-0 text-3xl text-center text-cyan-400 uppercase tracking-widest opacity-50 mix-blend-screen"
            animate={{ x: [-2, 2, -1], y: [1, -1, 0] }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2.5 }}
          >
            {previewText}
          </motion.p>
        </div>
      );
    }

    return (
      <motion.p
        key={key}
        className={cn("text-3xl text-center", style.style)}
        initial={style.animation.initial}
        animate={style.animation.animate}
        transition={style.animation.transition}
      >
        {previewText}
      </motion.p>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight leading-tight">
          Choose Caption Style
        </h2>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          Pick a dynamic animation style for your captions. This will be the visual voice of your video.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Selection Column */}
        <div className="lg:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {captionStyles.map((style) => (
              <Card
                key={style.id}
                onClick={() => onStyleChange(style.id)}
                className={cn(
                  "p-6 cursor-pointer transition-all duration-500 border-2 relative group overflow-hidden rounded-[2.5rem]",
                  selectedStyle === style.id
                    ? "border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-500/10 shadow-xl"
                    : "border-zinc-100 hover:border-indigo-200 hover:shadow-lg bg-white"
                )}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn(
                    "p-3.5 rounded-2xl transition-all duration-300",
                    selectedStyle === style.id ? "bg-indigo-600 text-white" : "bg-zinc-50 text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                  )}>
                    <style.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{style.name}</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{style.description}</p>
                  </div>
                  {selectedStyle === style.id && (
                    <CircleCheck className="w-6 h-6 text-indigo-600" />
                  )}
                </div>

                {/* Sub-preview inside card */}
                <div className="mt-4 h-24 bg-zinc-900/5 rounded-2xl flex items-center justify-center p-4 border border-zinc-100 relative group-hover:bg-zinc-900/10 transition-colors overflow-hidden">
                   <div className="scale-[0.5] origin-center opacity-40 group-hover:opacity-100 transition-opacity">
                      {renderPreview(style)}
                   </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Big Preview - Full Width Below or Floating */}
        <AnimatePresence mode="wait">
          {selectedStyle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="lg:col-span-12"
            >
              <div className="relative w-full h-[300px] md:h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-zinc-900 bg-black/95 flex items-center justify-center p-12 group">
                 {/* Video Preview Background Illusion */}
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center brightness-[0.3] scale-110 blur-sm pointer-events-none" />
                 
                 <div className="z-10 w-full flex justify-center items-center">
                    {renderPreview(captionStyles.find(s => s.id === selectedStyle)!)}
                 </div>

                 <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Animation Preview</span>
                 </div>

                 {/* Replay button */}
                 <button 
                  onClick={() => setKey((prev: number) => prev + 1)}
                  className="absolute bottom-6 right-8 text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold font-mono"
                 >
                   REPLAY ANIMATION
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
