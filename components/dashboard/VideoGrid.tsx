"use client";

import { useEffect, useState, useCallback } from "react";
import { VideoCard } from "./VideoCard";
import { Sparkles, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  video_title: string;
  status: string;
  created_at: string;
  image_urls?: string[];
}

interface VideoGridProps {
  initialVideos: Video[];
}

export function VideoGrid({ initialVideos }: VideoGridProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [isPolling, setIsPolling] = useState(false);

  const hasGenerating = videos.some((v) => v.status === "generating");

  const fetchVideos = useCallback(async () => {
    try {
      const res = await fetch("/api/videos", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err) {
      console.error("Polling error:", err);
    }
  }, []);

  // Auto-poll every 5 seconds while any video is generating
  useEffect(() => {
    if (!hasGenerating) {
      setIsPolling(false);
      return;
    }

    setIsPolling(true);
    const interval = setInterval(fetchVideos, 5000);
    return () => clearInterval(interval);
  }, [hasGenerating, fetchVideos]);

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-zinc-100">
        <div className="relative mb-6">
          <Video className="w-20 h-20 text-zinc-100" />
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-indigo-200 animate-pulse" />
        </div>
        <h3 className="text-xl font-black text-zinc-900 mb-2 tracking-tight">
          No videos generated yet
        </h3>
        <p className="text-zinc-500 mb-8 max-w-sm text-center font-medium">
          Complete your first series to see your AI-generated videos appear here.
        </p>
        <Link href="/dashboard/series">
          <Button className="h-12 px-8 rounded-2xl bg-zinc-900 hover:bg-indigo-600 text-white font-bold transition-all">
            Go to Series
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Live polling indicator */}
      {isPolling && (
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-500 uppercase tracking-widest px-1">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Live updating — checking for new results every 5s
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
