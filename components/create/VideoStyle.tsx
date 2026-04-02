"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const videoStyles = [
  { id: "3d-render", name: "3D Render", image: "/video-style/3d-render.png" },
  { id: "anime", name: "Anime", image: "/video-style/anime.png" },
  { id: "cinematic", name: "Cinematic", image: "/video-style/cinematic.png" },
  { id: "cyberpunk", name: "Cyberpunk", image: "/video-style/cyberpunk.png" },
  { id: "gta", name: "GTA Style", image: "/video-style/gta.png" },
  { id: "realistic", name: "Realistic", image: "/video-style/realistic.png" },
];

interface VideoStyleProps {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
}

export function VideoStyle({ selectedStyle, onStyleChange }: VideoStyleProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
          Select Video Style
        </h2>
        <p className="text-zinc-500 text-lg">
          Choose the visual aesthetic for your AI-generated video.
        </p>
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-[2.5rem] border border-zinc-100 bg-zinc-50/30 p-6 md:p-8 shadow-inner">
        <div className="flex gap-8 pb-6 px-4">
          {videoStyles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => onStyleChange(style.id)}
              className={cn(
                "group relative flex-none cursor-pointer transition-all duration-500",
                "w-[240px] md:w-[320px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl",
                selectedStyle === style.id
                  ? "ring-[4px] ring-indigo-600 ring-offset-4 scale-[1.02]"
                  : "hover:scale-[1.02] grayscale-[30%] hover:grayscale-0"
              )}
            >
              {/* Image with 9:16 ratio */}
              <Image
                src={style.image}
                alt={style.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-1000 group-hover:scale-110",
                  selectedStyle === style.id ? "brightness-110" : "brightness-75 group-hover:brightness-100"
                )}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Style Name and Status */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-2xl font-black tracking-tight drop-shadow-md mb-2">{style.name}</p>
                
                {selectedStyle === style.id ? (
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm bg-white/10 backdrop-blur-md w-fit px-4 py-1.5 rounded-full border border-white/20">
                    <CircleCheck className="w-4 h-4 fill-indigo-400 text-zinc-900" />
                    Selected Style
                  </div>
                ) : (
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to select
                  </span>
                )}
              </div>

              {/* Top Right Badge */}
              {selectedStyle === style.id && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-6 right-6 bg-indigo-600 text-white p-2.5 rounded-full shadow-2xl z-10"
                >
                  <CircleCheck className="w-6 h-6 stroke-[3px]" />
                </motion.div>
              )}

              {/* Decorative Glass Border on Hover */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-[2.5rem] transition-colors duration-500 z-20 pointer-events-none" />
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2.5 bg-zinc-200/50 hover:bg-zinc-300 transition-colors" />
      </ScrollArea>
    </div>
  );
}
