"use client";

import { 
  Ghost, 
  Sparkles, 
  Tv, 
  Cpu, 
  Lightbulb, 
  CircleCheck,
  Search,
  Utensils,
  Plane,
  Gamepad,
  History as HistoryIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const niches = [
  { id: "scary", name: "Scary Stories", icon: Ghost, description: "Eerie tales that thrill and chill your audience." },
  { id: "motivational", name: "Motivational", icon: Sparkles, description: "Inspiring narratives to fuel ambition and drive." },
  { id: "anime", name: "Anime Lore", icon: Tv, description: "Deep dives into character arcs and story lore." },
  { id: "tech", name: "Tech Reviews", icon: Cpu, description: "Latest gadgets and software reviews for tech fans." },
  { id: "hacks", name: "Life Hacks", icon: Lightbulb, description: "Smart solutions for everyday problems simplified." },
  { id: "cooking", name: "Cooking", icon: Utensils, description: "Delicious recipes and culinary techniques." },
  { id: "travel", name: "Travel Guides", icon: Plane, description: "Explore the world's most beautiful destinations." },
  { id: "gaming", name: "Gaming", icon: Gamepad, description: "Walkthroughs, reviews, and high-octane gameplay." },
  { id: "history", name: "History", icon: HistoryIcon, description: "Fascinating stories from across the ages." },
];

interface NicheSelectionProps {
  selectedNiche: string;
  customNicheValue: string;
  onSelect: (nicheId: string) => void;
  onCustomChange: (value: string) => void;
}

export function NicheSelection({ 
  selectedNiche, 
  customNicheValue, 
  onSelect, 
  onCustomChange 
}: NicheSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">Select your Niche</h2>
        <p className="text-zinc-500 text-lg">Pick a pre-defined niche or create your own custom one.</p>
      </div>

      <Tabs defaultValue={selectedNiche.startsWith("custom:") ? "custom" : "available"} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12 p-1.5 bg-zinc-100 rounded-[1.25rem] shadow-inner border border-zinc-200">
          <TabsTrigger 
            value="available" 
            className="rounded-[1rem] font-bold uppercase tracking-wider text-xs transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm text-zinc-500 hover:text-zinc-800"
          >
            Available Niche
          </TabsTrigger>
          <TabsTrigger 
            value="custom" 
            className="rounded-[1rem] font-bold uppercase tracking-wider text-xs transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm text-zinc-500 hover:text-zinc-800"
          >
            Custom Niche
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          <ScrollArea className="h-[430px] pr-4 border rounded-[2rem] p-4 bg-zinc-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {niches.map((niche) => (
                <Card
                  key={niche.id}
                  onClick={() => onSelect(niche.id)}
                  className={cn(
                    "p-5 cursor-pointer transition-all duration-300 border-2 flex flex-col gap-3 relative group rounded-[1.25rem]",
                    selectedNiche === niche.id 
                      ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-500/10" 
                      : "border-zinc-200 hover:border-indigo-200 hover:shadow-sm"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className={cn(
                      "p-3 rounded-2xl",
                      selectedNiche === niche.id ? "bg-indigo-600 text-white" : "bg-white text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                    )}>
                      <niche.icon className="w-6 h-6" />
                    </div>
                    {selectedNiche === niche.id && (
                      <CircleCheck className="w-6 h-6 text-indigo-600 animate-in zoom-in duration-300" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-md font-bold text-zinc-900 mb-1">{niche.name}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed truncate">{niche.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <div className="p-10 border-2 border-dashed border-zinc-200 rounded-[2.5rem] bg-white flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center">
              <Search className="w-10 h-10" />
            </div>
            <div className="w-full max-w-md space-y-4">
              <div className="text-center">
                <h4 className="text-xl font-bold text-zinc-900">Define your Custom Niche</h4>
                <p className="text-zinc-500">Be as specific as possible for the best AI generation.</p>
              </div>
              <Input 
                placeholder="e.g., Historical Artifacts of Ancient Egypt" 
                value={customNicheValue}
                onChange={(e) => {
                  onCustomChange(e.target.value);
                  onSelect(e.target.value ? `custom:${e.target.value}` : "");
                }}
                className="h-14 rounded-2xl border-2 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
