"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { 
  MoreVertical, 
  Pencil, 
  Play, 
  Pause, 
  Trash2, 
  History, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const videoStyles = [
  { id: "3d-render", name: "3D Render", image: "/video-style/3d-render.png" },
  { id: "anime", name: "Anime", image: "/video-style/anime.png" },
  { id: "cinematic", name: "Cinematic", image: "/video-style/cinematic.png" },
  { id: "cyberpunk", name: "Cyberpunk", image: "/video-style/cyberpunk.png" },
  { id: "gta", name: "GTA Style", image: "/video-style/gta.png" },
  { id: "realistic", name: "Realistic", image: "/video-style/realistic.png" },
];

interface SeriesCardProps {
  series: {
    id: string;
    series_name: string;
    video_style: string;
    status: string;
    created_at: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string, currentStatus: string) => void;
  onGenerate?: (id: string) => void;
}

export function SeriesCard({ 
  series, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  onGenerate 
}: SeriesCardProps) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const styleInfo = videoStyles.find(s => s.id === series.video_style) || videoStyles[0];
  const isPaused = series.status === 'paused';

  const handleGenerateClick = async () => {
    if (!onGenerate) return;
    try {
      setIsGenerating(true);
      await onGenerate(series.id);
      router.push("/dashboard/videos");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="group overflow-hidden rounded-[2.5rem] border-zinc-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border-2 hover:border-indigo-100">
      {/* Thumbnail Header */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={styleInfo.image}
          alt={series.series_name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-100"
        />
        
        {/* Top Right Edit Button Overlay */}
        <Button
          size="icon"
          variant="secondary"
          onClick={() => onEdit?.(series.id)}
          className="absolute top-4 right-4 h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl"
        >
          <Pencil className="w-4 h-4" />
        </Button>

        {/* Status Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge className={cn(
            "rounded-xl px-3 py-1 font-bold text-[10px] uppercase tracking-widest backdrop-blur-md border",
            !isPaused 
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
          )}>
            {series.status}
          </Badge>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-zinc-900 tracking-tight leading-tight line-clamp-1">
              {series.series_name}
            </h3>
            <p className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Created {formatDistanceToNow(new Date(series.created_at))} ago
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="h-10 w-10 rounded-2xl hover:bg-zinc-100 text-zinc-400 flex items-center justify-center transition-colors">
              <MoreVertical className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl p-2 border-2 border-zinc-50 shadow-2xl min-w-[160px]">
              <DropdownMenuItem 
                onClick={() => onEdit?.(series.id)}
                className="rounded-xl h-10 font-bold gap-3 focus:bg-indigo-50 focus:text-indigo-600"
              >
                <Pencil className="w-4 h-4" /> Edit Series
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onToggleStatus?.(series.id, series.status)}
                className="rounded-xl h-10 font-bold gap-3 focus:bg-indigo-50 focus:text-indigo-600"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? "Resume Series" : "Pause Series"}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2 bg-zinc-100" />
              <DropdownMenuItem 
                onClick={() => onDelete?.(series.id)}
                className="rounded-xl h-10 font-bold gap-3 text-rose-500 focus:bg-rose-50 focus:text-rose-600"
              >
                <Trash2 className="w-4 h-4" /> Delete Series
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col gap-3 mt-auto">
          <Button 
            variant="outline" 
            onClick={() => router.push("/dashboard/videos")}
            className="w-full h-12 rounded-2xl border-2 border-zinc-100 hover:border-indigo-100 hover:bg-indigo-50/30 text-zinc-600 hover:text-indigo-600 font-bold gap-2 group/btn transition-all"
          >
            <History className="w-4 h-4 transition-transform group-hover/btn:-rotate-12" />
            View Generated Videos
            <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </Button>
          
          <Button 
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className="w-full h-12 rounded-2xl bg-zinc-900 hover:bg-indigo-600 text-white font-black gap-2 shadow-lg shadow-zinc-200 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isGenerating ? "Triggering..." : "Generate Now"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
