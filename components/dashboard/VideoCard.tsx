"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  Loader2,
  Calendar,
  MoreVertical,
  ExternalLink
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: {
    id: string;
    video_title: string;
    status: string;
    created_at: string;
    image_urls?: string[];
  };
}

export function VideoCard({ video }: VideoCardProps) {
  const isGenerating = video.status === "generating";
  const thumbnail = video.image_urls?.[0] || "/logo.png"; // Fallback to logo

  return (
    <Card className="group overflow-hidden rounded-[2.5rem] border-zinc-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border-2 hover:border-indigo-100">
      {/* Thumbnail Area */}
      <div className="relative aspect-video overflow-hidden bg-zinc-100">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-50/80 backdrop-blur-sm z-10">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              <div className="absolute inset-0 blur-xl bg-indigo-400/20 animate-pulse" />
            </div>
            <p className="text-sm font-black text-indigo-600 uppercase tracking-widest animate-pulse">
              Generating...
            </p>
          </div>
        ) : (
          <Image
            src={thumbnail}
            alt={video.video_title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        
        {/* Play Button Overlay (Only if completed) */}
        {!isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
            <Button size="icon" className="h-14 w-14 rounded-full bg-white text-indigo-600 shadow-2xl hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-current" />
            </Button>
          </div>
        )}

        {/* Status Badge Overlay */}
        <div className="absolute top-4 left-4">
          <Badge className={cn(
            "rounded-xl px-3 py-1 font-bold text-[10px] uppercase tracking-widest backdrop-blur-md border",
            isGenerating 
              ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" 
              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
          )}>
            {isGenerating ? "In Progress" : "Ready"}
          </Badge>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <h3 className="text-lg font-black text-zinc-900 tracking-tight leading-tight line-clamp-2">
              {video.video_title}
            </h3>
            <div className="flex items-center gap-4">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-zinc-300" />
                {formatDistanceToNow(new Date(video.created_at))} ago
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl shrink-0 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Info (Optional) */}
        {isGenerating && (
          <div className="pt-2">
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-2/3 animate-progress transition-all duration-1000" />
            </div>
            <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-tighter">
              Orchestrating AI Assets...
            </p>
          </div>
        )}

        {/* Footer Actions */}
        {!isGenerating && (
          <div className="pt-4 mt-auto flex gap-2">
            <Button className="flex-1 h-11 rounded-xl bg-zinc-900 hover:bg-indigo-600 text-white font-bold gap-2 transition-all">
              <ExternalLink className="w-4 h-4" />
              View Details
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
