"use client";

import { useState, useRef, useEffect } from "react";
import {
  Globe,
  Mic2,
  Play,
  Pause,
  CheckCircle2,
  Languages as LangIcon,
  Headphones
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES, VOICES, type LanguageOption, type VoiceOption } from "@/lib/constants/create-options";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LanguageAndVoiceProps {
  selectedLanguage: string;
  selectedVoice: string;
  onLanguageChange: (lang: string) => void;
  onVoiceChange: (voiceId: string) => void;
}

export function LanguageAndVoice({
  selectedLanguage,
  selectedVoice,
  onLanguageChange,
  onVoiceChange
}: LanguageAndVoiceProps) {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentLanguage = LANGUAGES.find(l => l.language === selectedLanguage);
  const availableVoices = currentLanguage
    ? VOICES[currentLanguage.modelName as keyof typeof VOICES]
    : [];

  const handlePlayPreview = (voice: VoiceOption, e: React.MouseEvent) => {
    e.stopPropagation();

    if (playingVoice === voice.id) {
      audioRef.current?.pause();
      setPlayingVoice(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(voice.preview);
      audioRef.current.play();
      setPlayingVoice(voice.id);

      audioRef.current.onended = () => setPlayingVoice(null);
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
          <Mic2 className="w-8 h-8 text-indigo-600" />
          Language & Voice
        </h2>
        <p className="text-zinc-500 text-lg">Pick a language and then select a high-quality AI voice.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Language Selection Grid */}
        <div className="md:col-span-12 space-y-4">
          <label className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
            <Globe className="w-4 h-4" />
            1. Choose Language
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.language}
                onClick={() => {
                  onLanguageChange(lang.language);
                  onVoiceChange(""); // Reset voice when language changes
                }}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all font-medium",
                  selectedLanguage === lang.language
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm"
                    : "border-zinc-100 bg-zinc-50/50 text-zinc-500 hover:border-zinc-200 hover:bg-zinc-100/50"
                )}
              >
                <span className="text-sm">{lang.language}</span>
                {selectedLanguage === lang.language && <CheckCircle2 className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Selection Section */}
        <div className="md:col-span-12 space-y-4">
          <label className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
            <Headphones className="w-4 h-4" />
            2. Select Voice
          </label>

          {!selectedLanguage ? (
            <div className="p-12 border-2 border-dashed border-zinc-200 rounded-[2rem] bg-zinc-50/30 flex flex-col items-center justify-center text-zinc-400 text-center gap-3 opacity-60">
              <LangIcon className="w-10 h-10" />
              <p className="font-medium">Please pick a language first to load voices.</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] border border-zinc-200 rounded-[2rem] bg-white p-6 shadow-inner">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableVoices.map((voice) => (
                  <Card
                    key={voice.id}
                    onClick={() => onVoiceChange(voice.id)}
                    className={cn(
                      "p-5 cursor-pointer border-2 transition-all relative group overflow-hidden rounded-[1.5rem]",
                      selectedVoice === voice.id
                        ? "border-indigo-600 bg-indigo-50/30 shadow-md ring-4 ring-indigo-500/5"
                        : "border-zinc-100 hover:border-indigo-100 hover:bg-zinc-50 shadow-sm"
                    )}
                  >
                    <div className="flex items-start justify-between relative z-10">
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-zinc-900 group-hover:text-indigo-700 transition-colors uppercase tracking-tight">
                          {voice.id}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] uppercase font-bold py-0 h-5 px-2 bg-white text-zinc-500 border-zinc-200">
                            {voice.gender}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 h-5 px-2 bg-indigo-100 text-indigo-700">
                            {voice.model}
                          </Badge>
                        </div>
                      </div>

                      {/* Preview Audio Button */}
                      <button
                        onClick={(e) => handlePlayPreview(voice, e)}
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-95 group-hover:scale-105",
                          playingVoice === voice.id
                            ? "bg-indigo-600 text-white animate-pulse"
                            : "bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50"
                        )}
                      >
                        {playingVoice === voice.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>
                    </div>

                    {/* Selected Indicator */}
                    {selectedVoice === voice.id && (
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-indigo-600" />
                    )}

                    <p className="mt-4 text-xs font-medium text-zinc-400 tracking-wide uppercase italic">
                      {voice.modelName}
                    </p>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
