import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let query = supabase
      .from("video_series")
      .select("*")
      .eq("user_id", userId);

    if (id) {
      const { data, error } = await query.eq("id", id).single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    } else {
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();
    const formData = await request.json();
    const { id, ...updateData } = formData;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Series ID is required" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Map frontend camelCase to database snake_case
    const { data, error } = await supabase
      .from("video_series")
      .update({
        niche: updateData.niche,
        custom_niche: updateData.customNiche,
        language: updateData.language,
        voice: updateData.voice,
        selected_music: updateData.selectedMusic,
        video_style: updateData.videoStyle,
        caption_style: updateData.captionStyle,
        series_name: updateData.seriesName,
        duration: updateData.duration,
        platforms: updateData.platforms,
        publish_time: updateData.publishTime,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userId) // Safety check: ensure user owns the series
      .select();

    if (error) {
      console.error("Supabase Update Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Use Service Role Key to bypass RLS as we're handling auth via Clerk
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const formData = await request.json();

    // Map frontend camelCase to database snake_case
    const { data, error } = await supabase
      .from("video_series")
      .insert([
        {
          user_id: userId,
          niche: formData.niche,
          custom_niche: formData.customNiche,
          language: formData.language,
          voice: formData.voice,
          selected_music: formData.selectedMusic,
          video_style: formData.videoStyle,
          caption_style: formData.captionStyle,
          series_name: formData.seriesName,
          duration: formData.duration,
          platforms: formData.platforms,
          publish_time: formData.publishTime,
          status: "scheduled",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
