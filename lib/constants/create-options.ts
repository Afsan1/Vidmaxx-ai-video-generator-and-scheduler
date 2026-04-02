/**
 * Language options for the AI generation flow.
 */
export const LANGUAGES = [
  { language: "English", countryCode: "US", modelName: "deepgram", modelLangCode: "en-US" },
  { language: "Spanish", countryCode: "MX", modelName: "deepgram", modelLangCode: "es-MX" },
  { language: "French", countryCode: "FR", modelName: "deepgram", modelLangCode: "fr-FR" },
  { language: "Dutch", countryCode: "NL", modelName: "deepgram", modelLangCode: "nl-NL" },
  { language: "Italian", countryCode: "IT", modelName: "deepgram", modelLangCode: "it-IT" },
  { language: "Japanese", countryCode: "JP", modelName: "deepgram", modelLangCode: "ja-JP" },
  { language: "German", countryCode: "DE", modelName: "deepgram", modelLangCode: "de-DE" },
  { language: "Hindi", countryCode: "IN", modelName: "fonadalab", modelLangCode: "hi-IN" },
  { language: "Marathi", countryCode: "IN", modelName: "fonadalab", modelLangCode: "mr-IN" },
  { language: "Telugu", countryCode: "IN", modelName: "fonadalab", modelLangCode: "te-IN" },
] as const;

export type LanguageOption = typeof LANGUAGES[number];

/**
 * Voice options grouped by their respective AI models.
 */
export const VOICES = {
  deepgram: [
    {
      id: "odysseus",
      model: "deepgram",
      modelName: "aura-2-odysseus-en",
      preview: "/voice/deepgram-aura-2-odysseus-en.wav",
      gender: "male"
    },
    {
      id: "thalia",
      model: "deepgram",
      modelName: "aura-2-thalia-en",
      preview: "/voice/deepgram-aura-2-thalia-en.wav",
      gender: "female"
    },
    {
      id: "amalthea",
      model: "deepgram",
      modelName: "aura-2-amalthea-en",
      preview: "/voice/deepgram-aura-2-amalthea-en.wav",
      gender: "female"
    },
    {
      id: "andromeda",
      model: "deepgram",
      modelName: "aura-2-andromeda-en",
      preview: "/voice/deepgram-aura-2-andromeda-en.wav",
      gender: "female"
    },
    {
      id: "apollo",
      model: "deepgram",
      modelName: "aura-2-apollo-en",
      preview: "/voice/deepgram-aura-2-apollo-en.wav",
      gender: "male"
    },
  ],
  fonadalab: [
    {
      id: "vaanee",
      model: "fonadalab",
      modelName: "Vaanee",
      preview: "/voice/fonadalab-Vaanee.mp3",
      gender: "female"
    },
    {
      id: "chaitra",
      model: "fonadalab",
      modelName: "Chaitra",
      preview: "/voice/fonadalab-Chaitra.mp3",
      gender: "female"
    },
    {
      id: "meghra",
      model: "fonadalab",
      modelName: "Meghra",
      preview: "/voice/fonadalab-Meghra.mp3",
      gender: "male"
    },
    {
      id: "nirvani",
      model: "fonadalab",
      modelName: "Nirvani",
      preview: "/voice/fonadalab-Nirvani.mp3",
      gender: "female"
    },
  ],
} as const;

export type VoiceOption = typeof VOICES.deepgram[number] | typeof VOICES.fonadalab[number];

/**
 * Background Music options for the video generation flow.
 * Remote URLs provided by the user (hosted on imagekit.io).
 */
export const BACKGROUND_MUSIC = [
  {
    id: "favela",
    title: "FAVELA",
    artist: "MXZI, Deno",
    url: "https://ik.imagekit.io/gddqz8zub/BgMusic/MXZI,%20Deno%20-%20FAVELA%20_NCS%20Release_.mp3"
  },
  {
    id: "raindrops",
    title: "Raindrops",
    artist: "Mblue, George Cooksey",
    url: "https://ik.imagekit.io/gddqz8zub/BgMusic/Mblue,%20George%20Cooksey%20-%20Raindrops%20_NCS%20Release_.mp3"
  },
  {
    id: "harinezumi",
    title: "harinezumi",
    artist: "waera",
    url: "https://ik.imagekit.io/gddqz8zub/BgMusic/waera%20-%20harinezumi%20_NCS%20Release_.mp3"
  },
  {
    id: "colors",
    title: "colors",
    artist: "HXPETRAIN",
    url: "https://ik.imagekit.io/gddqz8zub/BgMusic/HXPETRAIN%20-%20colors%20_NCS%20Release_.mp3"
  },
  {
    id: "stuckinmyhead",
    title: "stuckinmyhead!",
    artist: "youth®",
    url: "https://ik.imagekit.io/gddqz8zub/BgMusic/youth%C2%AE%20-%20stuckinmyhead!%20_NCS%20Release_.mp3"
  },
] as const;

export type BackgroundMusicOption = typeof BACKGROUND_MUSIC[number];
