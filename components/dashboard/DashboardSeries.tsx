"use client";

import { useEffect, useState } from "react";
import { Video, Plus, History } from "lucide-react";
import Link from "next/link";
import { SeriesCard } from "./SeriesCard";
import { toast } from "sonner";

export function DashboardSeries() {
  const [seriesData, setSeriesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSeries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-series");
      if (!response.ok) throw new Error("Failed to fetch series");
      const data = await response.json();
      setSeriesData(data);
    } catch (error) {
      console.error("Error fetching series:", error);
      toast.error("Error", {
        description: "Failed to load your series. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const handleEdit = (id: string) => {
    window.location.href = `/dashboard/create?edit=${id}`;
  };

  const handleDelete = async (id: string) => {
    // Basic placeholder for delete logic
    if (confirm("Are you sure you want to delete this series?")) {
      try {
        setSeriesData(prev => prev.filter(s => s.id !== id));
        toast.success("Series deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete series.");
      }
    }
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    setSeriesData(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    toast.success(`Series ${newStatus === 'active' ? 'resumed' : 'paused'}`);
  };

  const handleGenerate = async (id: string) => {
    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seriesId: id }),
      });

      if (!response.ok) throw new Error("Failed to trigger generation");
      
      toast.success("Generation started!", {
        description: "Check the Inngest Dev Server to monitor progress.",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Error", {
        description: "Failed to start video generation. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-80 bg-zinc-50 rounded-[2.5rem] border-2 border-zinc-100" />
        ))}
      </div>
    );
  }

  if (seriesData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-zinc-100 rounded-3xl bg-zinc-50/10">
        <div className="w-20 h-20 bg-zinc-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm">
          <Video className="w-10 h-10 text-zinc-300" />
        </div>
        <h4 className="text-2xl font-black text-zinc-800 mb-2 tracking-tight">No series created yet</h4>
        <p className="text-zinc-500 max-w-sm mb-8 font-medium">Start your first AI automation series to see it appear here. It only takes a few minutes.</p>
        <Link 
          href="/dashboard/create"
          className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5 stroke-[3px]" />
          Create First Series
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-zinc-900 flex items-center gap-2 italic tracking-tight">
          <History className="w-6 h-6 text-indigo-600 not-italic" />
          MY VIDEO SERIES
        </h2>
        <Link href="/dashboard/history" className="text-sm font-black text-indigo-600 hover:text-indigo-700 hover:underline transition-all flex items-center gap-1 uppercase tracking-widest">
          View all history
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seriesData.map((series) => (
          <SeriesCard 
            key={series.id} 
            series={series}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onGenerate={handleGenerate}
          />
        ))}
      </div>
    </div>
  );
}
