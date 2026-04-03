import { inngest } from "./client";
import { createClient } from "@supabase/supabase-js";
import { geminiModel } from "../gemini";
import { DeepgramClient } from "@deepgram/sdk";
import { LANGUAGES, VOICES } from "../constants/create-options";
import { genAI, safeGenerateContent } from "../gemini";

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    triggers: [
      { event: "test/hello.world" }
    ]
  },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    const data = event.data as { email?: string };
    return { message: `Hello ${data.email || "World"}! from Inngest` };
  },
);

export const generateVideo = inngest.createFunction(
  {
    id: "generate-video",
    triggers: [
      { event: "video/generate.requested" }
    ],
    retries: 10, // High retry count for quota issues
  },
  async ({ event, step }) => {
    const { seriesId, videoId } = event.data as { seriesId: string, videoId: string };

    const SCRIPT_SCHEMA = {
      type: "object",
      properties: {
        videoTitle: { type: "string" },
        fullScript: { type: "string" },
        scenes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              scene_number: { type: "integer" },
              imagePrompt: { type: "string" },
              spokenText: { type: "string" }
            },
            required: ["scene_number", "imagePrompt", "spokenText"]
          }
        }
      },
      required: ["videoTitle", "fullScript", "scenes"]
    };

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Fetch Series data from supabase
    const seriesData = await step.run("fetch-series-data", async () => {
      const { data, error } = await supabase
        .from("video_series")
        .select("*")
        .eq("id", seriesId)
        .single();

      if (error) throw new Error(`Failed to fetch series: ${error.message}`);
      return data;
    });

    // 2. Generate Video Script using AI
    const videoData = await step.run("generate-video-script", async () => {
      console.log("Generating script for series:", seriesData.series_name);

      const numScenes = seriesData.duration === '30-50s' ? 5 : 8;

      const prompt = `
        You are a professional video scriptwriter for viral social media content.
        Generate a compelling video script and metadata for a series named "${seriesData.series_name}".
        
        Niche: ${seriesData.niche}
        Target Video Style: ${seriesData.video_style}
        Target Duration: ${seriesData.duration}
        
        Requirements:
        1. Natural, engaging script suitable for a high-quality Text-to-Speech (TTS) voiceover.
        2. Exactly ${numScenes} distinct scenes.
        3. For each scene, provide a highly detailed "imagePrompt" optimized for image generation models. 
           The prompts must heavily incorporate the "${seriesData.video_style}" aesthetic.
        4. For each scene, provide the "spokenText" that the AI will say during that scene.
        5. A catchy, clickable "videoTitle".

        Return ONLY a JSON object with this exact schema:
        {
          "videoTitle": "string",
          "fullScript": "string",
          "scenes": [
            {
              "scene_number": number,
              "imagePrompt": "string",
              "spokenText": "string"
            }
          ]
        }
      `;

      const result = await safeGenerateContent(prompt, {
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: SCRIPT_SCHEMA as any
        },
      });
      const response = await result.response;
      const text = response.text();

      try {
        const cleanJson = text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanJson);
      } catch (e) {
        console.error("JSON Parsing failed, attempting manual repair:", e);
        const repair = text
          .replace(/,\s*([\]}])/g, "$1")
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
          .match(/\{[\s\S]*\}/)?.[0];
        return JSON.parse(repair || text);
      }
    });

    // 3. Sleep for a moment to reset quota
    await step.sleep("quota-reset-pause", "3s");

    // 4. Generate Voice using TTS model
    const audioUrl = await step.run("generate-voice-tts", async () => {
      console.log("Generating voice using voice ID:", seriesData.voice);

      const voiceId = seriesData.voice;
      const language = seriesData.language;
      const langOption = LANGUAGES.find(l => l.language === language);

      const modelName = langOption?.modelName || "deepgram";

      const allVoices = [
        ...VOICES.deepgram.map(v => ({ ...v, provider: "deepgram" })),
        ...VOICES.fonadalab.map(v => ({ ...v, provider: "fonadalab" }))
      ];
      const voiceOption = allVoices.find(v => v.id === voiceId);

      let audioBuffer: Buffer;

      if (modelName === "deepgram" || voiceOption?.provider === "deepgram") {
        const deepgram = new DeepgramClient({ apiKey: process.env.DEEPGRAM_API_KEY! });
        const response = await deepgram.speak.v1.audio.generate(
          {
            text: videoData.fullScript,
            model: (voiceOption?.modelName as any) || "aura-2-asteria-en"
          }
        );
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = Buffer.from(arrayBuffer);
      } else {
        const response = await fetch('https://api.fonada.ai/tts/generate-audio-large', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FONADA_API_KEY}`
          },
          body: JSON.stringify({
            input: videoData.fullScript,
            voice: voiceOption?.modelName || "Dhruv",
            language: language
          })
        });

        if (!response.ok) {
          const err = await response.text();
          throw new Error(`FonadaLabs failed: ${err}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = Buffer.from(arrayBuffer);
      }

      const { data: bucketData } = await supabase.storage.getBucket("videos");
      const allowedMimeTypes = ["audio/mpeg", "audio/wav", "image/png", "image/jpeg", "image/webp"];

      if (!bucketData) {
        console.log("Creating 'videos' bucket...");
        const { error: bucketError } = await supabase.storage.createBucket("videos", {
          public: true,
          allowedMimeTypes,
          fileSizeLimit: 10485760 // 10MB
        });
        if (bucketError) throw new Error(`Failed to create bucket: ${bucketError.message}`);
      } else {
        await supabase.storage.updateBucket("videos", {
          public: true,
          allowedMimeTypes,
        });
      }

      const fileName = `${seriesId}/voiceover_${Date.now()}.mp3`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("videos")
        .upload(fileName, audioBuffer, {
          contentType: "audio/mpeg",
          upsert: true
        });

      if (uploadError) throw new Error(`Audio upload failed: ${uploadError.message}`);

      const { data: { publicUrl } } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

      return publicUrl;
    });

    // 5. Generate Caption using Model
    const captions = await step.run("generate-captions", async () => {
      console.log("Generating captions using Deepgram ASR...");

      const deepgram = new DeepgramClient({ apiKey: process.env.DEEPGRAM_API_KEY! });

      const language = seriesData.language;
      const langOption = LANGUAGES.find(l => l.language === language);
      const languageCode = langOption?.modelLangCode || "en-US";

      const result = await deepgram.listen.v1.media.transcribeUrl(
        {
          url: audioUrl,
          model: "nova-3",
          smart_format: true,
          language: languageCode as any,
          utterances: true,
          punctuate: true
        }
      );

      const words = (result as any).results?.channels[0]?.alternatives[0]?.words;
      if (!words || words.length === 0) {
        throw new Error("No transcription words found");
      }

      console.log(`Transcribed ${words.length} words for captions.`);

      return words.map((w: any) => ({
        word: w.word,
        start: w.start,
        end: w.end,
        confidence: w.confidence
      }));
    });

    // 6. Generate Images from image prompt
    const imageUrls = await step.run("generate-images", async () => {
      console.log("Generating images for series via Pollinations AI...");

      const generatedImages: string[] = [];

      for (let i = 0; i < videoData.scenes.length; i++) {
        const scene = videoData.scenes[i];
        console.log(`Scene ${i + 1}/${videoData.scenes.length}: ${scene.imagePrompt.slice(0, 60)}...`);

        // Small courtesy delay between requests (Pollinations doesn't rate limit harshly)
        if (i > 0) await new Promise(resolve => setTimeout(resolve, 2000));

        let imageBuffer: Buffer | null = null;
        let source = "pollinations";

        // ── Tier 1: Pollinations AI (Primary — no quota, no key needed) ──
        try {
          const seed = Math.floor(Math.random() * 9999999);
          const pollUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(scene.imagePrompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;
          console.log(`Tier 1 Pollinations: ${pollUrl}`);

          const res = await fetch(pollUrl, { signal: AbortSignal.timeout(60000) });
          if (!res.ok) throw new Error(`Pollinations HTTP ${res.status}`);

          const contentType = res.headers.get("content-type") || "";
          if (!contentType.startsWith("image/")) throw new Error(`Pollinations returned non-image: ${contentType}`);

          const arrayBuf = await res.arrayBuffer();
          imageBuffer = Buffer.from(arrayBuf);
          console.log(`Tier 1 OK — ${imageBuffer.length} bytes`);
        } catch (pollErr: any) {
          console.warn("Tier 1 Pollinations failed:", pollErr.message);
        }

        // ── Tier 2: Gemini Image Generation ──
        if (!imageBuffer) {
          try {
            source = "gemini";
            console.log("Tier 2: Attempting Gemini...");
            const imageModel = genAI.getGenerativeModel({ model: "gemini-3.1-flash-image-preview" });
            const result = await imageModel.generateContent(scene.imagePrompt);
            const response = await result.response;
            for (const part of response.candidates?.[0]?.content?.parts || []) {
              if (part.inlineData) {
                imageBuffer = Buffer.from(part.inlineData.data, "base64");
                break;
              }
            }
            if (imageBuffer) console.log(`Tier 2 Gemini OK — ${imageBuffer.length} bytes`);
          } catch (gemErr: any) {
            console.warn("Tier 2 Gemini failed:", gemErr.message);
          }
        }

        // ── Tier 3: Static high-quality fallback images from Unsplash CDN ──
        if (!imageBuffer) {
          try {
            source = "unsplash-cdn";
            const fallbackImages = [
              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1024&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1024&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1024&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1024&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1024&auto=format&fit=crop",
            ];
            const fallbackUrl = fallbackImages[i % fallbackImages.length];
            console.log(`Tier 3 Unsplash CDN fallback: ${fallbackUrl}`);
            const res = await fetch(fallbackUrl);
            if (!res.ok) throw new Error(`Unsplash CDN HTTP ${res.status}`);
            const arrayBuf = await res.arrayBuffer();
            imageBuffer = Buffer.from(arrayBuf);
            console.log(`Tier 3 OK — ${imageBuffer.length} bytes`);
          } catch (finalErr: any) {
            console.error("Tier 3 failed:", finalErr.message);
            throw new Error("All image sources exhausted — check network.");
          }
        }

        // ── Upload to Supabase Storage ──
        const fileName = `${seriesId}/scene_${i + 1}_${Date.now()}.png`;
        const { error: uploadError } = await supabase.storage
          .from("videos")
          .upload(fileName, imageBuffer!, {
            contentType: "image/png",
            upsert: true,
          });

        if (uploadError) throw new Error(`Upload failed for scene ${i + 1}: ${uploadError.message}`);

        const { data: { publicUrl } } = supabase.storage.from("videos").getPublicUrl(fileName);
        generatedImages.push(publicUrl);
        console.log(`✓ Scene ${i + 1} uploaded (${source}): ${publicUrl}`);
      }

      return generatedImages;
    });

    // 7. Save everything to database
    const finalVideo = await step.run("save-to-database", async () => {
      console.log("Saving generated video data to database for videoId:", videoId);
      
      const { data, error } = await supabase
        .from("generated_videos")
        .update({
          video_title: videoData.videoTitle,
          video_script: videoData,
          audio_url: audioUrl,
          captions: captions,
          image_urls: imageUrls,
          status: "completed"
        })
        .eq("id", videoId)
        .select()
        .single();

      if (error) throw new Error(`Database save failed: ${error.message}`);
      return data;
    });

    return {
      success: true,
      message: "Video generation workflow completed (Placeholders)",
      seriesName: seriesData.series_name
    };
  }
);
