import { inngest } from "@/lib/inngest/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    const { seriesId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!seriesId) {
      return NextResponse.json({ error: "Series ID is required" }, { status: 400 });
    }

    // 1. Create an initial record in generated_videos with 'generating' status
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch series info for initial title
    const { data: series } = await supabase
      .from("video_series")
      .select("series_name")
      .eq("id", seriesId)
      .single();

    const { data: videoRecord, error: insertError } = await supabase
      .from("generated_videos")
      .insert([
        {
          series_id: seriesId,
          video_title: series?.series_name || "Generating Video...",
          status: "generating",
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("Initial Insert Error:", insertError);
      return NextResponse.json({ error: "Failed to initialize video record" }, { status: 500 });
    }

    // 2. Trigger the Inngest function with the new videoRecord.id
    await inngest.send({
      name: "video/generate.requested",
      data: {
        seriesId,
        userId,
        videoId: videoRecord.id,
      },
    });

    return NextResponse.json({ 
      success: true, 
      videoId: videoRecord.id,
      message: "Video generation triggered successfully" 
    });
  } catch (err) {
    console.error("Trigger Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
