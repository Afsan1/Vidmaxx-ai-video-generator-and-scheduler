"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Music, 
  Play, 
  Pause, 
  CheckCircle2, 
  Volume2,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BACKGROUND_MUSIC, type BackgroundMusicOption } from "@/lib/constants/create-options";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BackgroundMusicProps {
  selectedMusic: string[];
  onMusicChange: (musicIds: string[]) => void;
}

export function BackgroundMusic({ 
  selectedMusic, 
  onMusicChange 
}: BackgroundMusicProps) {
  const [playingMusic, setPlayingMusic] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTogglePlay = (music: BackgroundMusicOption, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (playingMusic === music.id) {
      audioRef.current?.pause();
      setPlayingMusic(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(music.url);
      audioRef.current.play();
      setPlayingMusic(music.id);
      
      audioRef.current.onended = () => setPlayingMusic(null);
    }
  };

  const toggleSelection = (musicId: string) => {
    const isSelected = selectedMusic.includes(musicId);
    if (isSelected) {
      onMusicChange(selectedMusic.filter(id => id !== musicId));
    } else {
      onMusicChange([...selectedMusic, musicId]);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight flex items-center justify-center gap-3">
          <Music className="w-8 h-8 text-indigo-600" />
          Background Music
        </h2>
        <p className="text-zinc-500 text-lg font-medium">Select one or more tracks to set the mood of your series.</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <label className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Audio Tracks
          </label>
          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase">
            {selectedMusic.length} Selected
          </span>
        </div>

        <ScrollArea className="h-[430px] border border-zinc-200 rounded-[2.5rem] bg-white p-6 shadow-inner relative overflow-hidden">
          <div className="space-y-3">
            {BACKGROUND_MUSIC.map((music) => (
              <Card
                key={music.id}
                onClick={() => toggleSelection(music.id)}
                className={cn(
                  "p-5 cursor-pointer border-2 transition-all relative group flex items-center gap-6 rounded-[1.5rem]",
                  selectedMusic.includes(music.id)
                    ? "border-indigo-600 bg-indigo-50/40 shadow-md ring-4 ring-indigo-500/5 translate-x-1"
                    : "border-zinc-100 hover:border-indigo-100 hover:bg-zinc-50 shadow-sm"
                )}
              >
                {/* Play/Pause Button */}
                <button
                  onClick={(e) => handleTogglePlay(music, e)}
                  className={cn(
                    "w-12 h-12 flex-shrink-0 rounded-[1.25rem] flex items-center justify-center transition-all shadow-md active:scale-95 group-hover:scale-105",
                    playingMusic === music.id 
                      ? "bg-indigo-600 text-white animate-pulse" 
                      : "bg-white text-indigo-600 border border-indigo-100 hover:border-indigo-600/20"
                  )}
                >
                  {playingMusic === music.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "text-lg font-bold truncate transition-colors",
                    selectedMusic.includes(music.id) ? "text-indigo-700" : "text-zinc-900 group-hover:text-indigo-700"
                  )}>
                    {music.title}
                  </h4>
                  <p className="text-sm font-medium text-zinc-400 truncate tracking-wide">
                    {music.artist}
                  </p>
                </div>

                {/* Selection Indicators */}
                <div className="flex items-center gap-3 pr-2">
                  {selectedMusic.includes(music.id) ? (
                    <div className="bg-indigo-600 text-white rounded-full p-1.5 shadow-lg shadow-indigo-600/30 animate-in zoom-in duration-300">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-zinc-200 rounded-full group-hover:border-indigo-300 transition-colors" />
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          {/* Decorative Corner Background */}
          <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-[0.03]">
             <Music className="w-64 h-64 rotate-12" />
          </div>
        </ScrollArea>
        
        {selectedMusic.length > 0 && (
          <div className="flex justify-center p-2">
            <button 
              onClick={() => onMusicChange([])}
              className="text-xs font-bold text-zinc-400 hover:text-red-500 flex items-center gap-2 transition-colors transition-all active:scale-95 px-4 py-2 rounded-full hover:bg-red-50"
            >
              <XCircle className="w-4 h-4" />
              CLEAR ALL SELECTIONS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
