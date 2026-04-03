import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { VideoGrid } from "@/components/dashboard/VideoGrid";
import { Video, Plus, Search, Filter, LayoutGrid, List as ListIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function VideosPage() {
  const user = await currentUser();
  if (!user) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: videos, error } = await supabase
    .from("generated_videos")
    .select("*, video_series!inner(user_id)")
    .eq("video_series.user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch Videos Error:", error.message);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border-2 border-zinc-50 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <Video className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Your Creations</h1>
          </div>
          <p className="text-zinc-500 font-medium">
            Manage and export your AI-generated video assets
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/create">
            <Button className="h-12 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]">
              <Plus className="w-5 h-5" />
              New Video
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <Input
            placeholder="Search your videos..."
            className="pl-12 h-14 rounded-2xl border-2 border-zinc-50 bg-white focus:border-indigo-100 transition-all placeholder:text-zinc-400 font-medium"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-14 px-6 rounded-2xl border-2 border-zinc-50 bg-white font-bold gap-2 text-zinc-600 hover:bg-zinc-50 transition-all"
          >
            <Filter className="w-5 h-5" />
            Filters
          </Button>
          <div className="bg-zinc-100/50 p-1 rounded-2xl flex gap-1 border border-zinc-200/50">
            <Button
              size="icon"
              variant="ghost"
              className="h-12 w-12 rounded-xl bg-white shadow-sm text-indigo-600"
            >
              <LayoutGrid className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-12 w-12 rounded-xl text-zinc-400"
            >
              <ListIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Grid — auto-polls every 5s when a video is generating */}
      <VideoGrid initialVideos={videos ?? []} />
    </div>
  );
}
