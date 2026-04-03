import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;

if (!apiKey && process.env.NODE_ENV === "production") {
  throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is missing in production environment");
}

export const genAI = new GoogleGenerativeAI(apiKey || "dummy_key");

// Helper for resilient content generation with fallbacks
export async function safeGenerateContent(prompt: string, options?: any) {
  const models = [
    "gemini-2.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-1.5-pro"
  ];

  let lastError: any = null;

  for (const modelName of models) {
    try {
      console.log(`Attempting generation with model: ${modelName}`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: options?.generationConfig,
        safetySettings: options?.safetySettings
      });
      const result = await model.generateContent(prompt);
      return result;
    } catch (err: any) {
      lastError = err;
      const status = err?.status || (err?.message?.includes("404") ? 404 : (err?.message?.includes("429") ? 429 : null));
      
      if (status === 404 || status === 429) {
        console.warn(`Model ${modelName} failed (${status}). Trying fallback...`);
        continue;
      }
      throw err; // Re-throw fatal errors (e.g. invalid API key)
    }
  }

  throw lastError || new Error("All Gemini models failed");
}

// Default export for simpler use cases
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  generationConfig: {
    responseMimeType: "application/json",
  },
});
