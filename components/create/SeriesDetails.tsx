"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Type, 
  Clock, 
  Share2, 
  Calendar, 
  AlertCircle,
  Mail,
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

// Custom TikTok Icon as it's not in Lucide by default in some versions
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.46-.33-.24-.65-.5-.94-.79v6.52c-.03 2.11-.83 4.26-2.45 5.61-1.63 1.46-4.04 1.96-6.14 1.34-1.92-.54-3.56-2.02-4.17-3.88-.66-1.94-.34-4.22.99-5.83 1.22-1.5 3.3-2.32 5.22-1.99.17.03.35.07.51.12v4.07c-.12-.03-.24-.05-.36-.07-.84-.13-1.84-.04-2.52.5-.6.44-.88 1.2-.81 1.93.06.84.58 1.64 1.35 1.98.76.35 1.7.27 2.37-.25.5-.38.74-.98.74-1.6V.02z" />
  </svg>
);

// Use Fallback icons if Youtube/Instagram are missing from this version of Lucide
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const platforms = [
  { id: "tiktok", name: "TikTok", icon: TikTokIcon, color: "hover:text-[#ff0050] hover:bg-[#ff0050]/5" },
  { id: "youtube", name: "YouTube", icon: YoutubeIcon, color: "hover:text-[#ff0000] hover:bg-[#ff0000]/5" },
  { id: "instagram", name: "Instagram", icon: InstagramIcon, color: "hover:text-[#e1306c] hover:bg-[#e1306c]/5" },
  { id: "email", name: "Email", icon: Mail, color: "hover:text-[#4285f4] hover:bg-[#4285f4]/5" },
];

interface SeriesDetailsProps {
  seriesName: string;
  duration: string;
  selectedPlatforms: string[];
  publishTime: string;
  onNameChange: (val: string) => void;
  onDurationChange: (val: string) => void;
  onPlatformsChange: (vals: string[]) => void;
  onPublishTimeChange: (val: string) => void;
}

export function SeriesDetails({
  seriesName,
  duration,
  selectedPlatforms,
  publishTime,
  onNameChange,
  onDurationChange,
  onPlatformsChange,
  onPublishTimeChange,
}: SeriesDetailsProps) {
  
  const togglePlatform = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      onPlatformsChange(selectedPlatforms.filter(p => p !== id));
    } else {
      onPlatformsChange([...selectedPlatforms, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight leading-tight">
          Finalize Series Details
        </h2>
        <p className="text-zinc-500 text-lg">
          Complete your series configuration and set your publishing schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Name & Duration */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="seriesName" className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Type className="w-4 h-4 text-indigo-500" />
              Series Name
            </Label>
            <Input
              id="seriesName"
              placeholder="e.g., Daily Stoic Wisdom"
              value={seriesName}
              onChange={(e) => onNameChange(e.target.value)}
              className="h-16 rounded-[1.5rem] border-2 border-zinc-100 px-6 text-xl font-bold focus:border-indigo-600 focus:ring-8 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-300"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="duration" className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              Video Duration
            </Label>
            <Select value={duration} onValueChange={(val) => onDurationChange(val ?? "")}>
              <SelectTrigger className="h-16 rounded-[1.5rem] border-2 border-zinc-100 px-6 text-xl font-bold focus:ring-8 focus:ring-indigo-500/10 transition-all">
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 border-zinc-50 shadow-2xl p-2">
                <SelectItem value="30-50" className="rounded-xl h-12 text-lg font-bold focus:bg-indigo-50 focus:text-indigo-600">30 - 50 seconds</SelectItem>
                <SelectItem value="60-70" className="rounded-xl h-12 text-lg font-bold focus:bg-indigo-50 focus:text-indigo-600">60 - 70 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column: Platform Selection */}
        <div className="space-y-4">
          <Label className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-500" />
            Target Platforms
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {platforms.map((platform) => {
              const isActive = selectedPlatforms.includes(platform.id);
              return (
                <Card
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={cn(
                    "p-4 cursor-pointer transition-all duration-300 border-2 flex items-center gap-4 group rounded-[1.5rem]",
                    isActive 
                      ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-500/10" 
                      : "border-zinc-100 bg-white hover:border-zinc-200"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-2xl transition-all duration-300",
                    isActive ? "bg-indigo-600 text-white" : "bg-zinc-50 text-zinc-400 group-hover:scale-110",
                    !isActive && platform.color
                  )}>
                    <platform.icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    "font-bold text-sm tracking-tight",
                    isActive ? "text-indigo-600" : "text-zinc-500"
                  )}>
                    {platform.name}
                  </span>
                  {isActive && <CheckCircle2 className="w-5 h-5 text-indigo-600 ml-auto" />}
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Width Footer: Schedule Selection */}
      <div className="pt-6">
        <div className="p-8 rounded-[2.5rem] bg-zinc-900 text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xl font-black tracking-tight">Daily Publish Schedule</h4>
                  <p className="text-zinc-400 text-sm">Set your preferred time for daily generation.</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <input
                type="time"
                value={publishTime}
                onChange={(e) => onPublishTimeChange(e.target.value)}
                className="w-full md:w-48 h-16 bg-white/10 hover:bg-white/15 transition-colors border-2 border-white/10 rounded-2xl px-6 text-2xl font-black text-center focus:outline-none focus:ring-4 focus:ring-indigo-500/20 [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 border-dashed relative z-10">
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-zinc-400 text-sm leading-relaxed">
              <span className="text-white font-bold">Important Note:</span> Video should be generated 3-6 hours before video publish to ensure enough processing time on the servers.
            </p>
          </div>

          {/* Decorative background blast */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-600/30 transition-colors" />
        </div>
      </div>
    </div>
  );
}
