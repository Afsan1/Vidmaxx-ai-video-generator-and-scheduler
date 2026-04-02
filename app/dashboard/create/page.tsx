"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Stepper } from "@/components/create/Stepper";
import { NicheSelection } from "@/components/create/NicheSelection";
import { LanguageAndVoice } from "@/components/create/LanguageAndVoice";
import { BackgroundMusic } from "@/components/create/BackgroundMusic";
import { VideoStyle } from "@/components/create/VideoStyle";
import { CaptionSelection } from "@/components/create/CaptionSelection";
import { SeriesDetails } from "@/components/create/SeriesDetails";
import { CreationFooter } from "@/components/create/CreationFooter";
import { motion, AnimatePresence } from "framer-motion";

function CreateSeriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditing = !!editId;

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    niche: "",
    customNiche: "",
    language: "",
    voice: "",
    selectedMusic: [] as string[],
    videoStyle: "",
    captionStyle: "",
    seriesName: "",
    duration: "",
    platforms: [] as string[],
    publishTime: "09:00",
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchSeries = async () => {
      if (!editId) return;

      try {
        setIsFetching(true);
        const response = await fetch(`/api/create-series?id=${editId}`);
        if (!response.ok) throw new Error("Failed to fetch series data");
        
        const data = await response.json();
        
        // Map database snake_case to frontend camelCase
        setFormData({
          niche: data.niche,
          customNiche: data.custom_niche || "",
          language: data.language,
          voice: data.voice,
          selectedMusic: data.selected_music || [],
          videoStyle: data.video_style,
          captionStyle: data.caption_style,
          seriesName: data.series_name,
          duration: data.duration,
          platforms: data.platforms || [],
          publishTime: data.publish_time,
        });
      } catch (error) {
        console.error("Error fetching series:", error);
        toast.error("Error", {
          description: "Could not load series data for editing.",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchSeries();
  }, [editId]);

  const handleScheduleSeries = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/create-series", {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isEditing ? { ...formData, id: editId } : formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Failed to ${isEditing ? 'update' : 'schedule'} series`);
      }

      toast.success(isEditing ? "Series updated successfully!" : "Series scheduled successfully!", {
        description: isEditing ? "Your changes have been saved." : "Your videos will start generating soon.",
      });
      
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Scheduling error:", error);
      toast.error("Error", {
        description: error.message || "Failed to schedule your series. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logic to determine if we can continue to the next step
  const isStepValid = () => {
    if (currentStep === 1) {
      return !!formData.niche;
    }
    if (currentStep === 2) {
      return !!formData.language && !!formData.voice;
    }
    if (currentStep === 3) {
      return formData.selectedMusic.length > 0;
    }
    if (currentStep === 4) {
      return !!formData.videoStyle;
    }
    if (currentStep === 5) {
      return !!formData.captionStyle;
    }
    if (currentStep === 6) {
      return (
        !!formData.seriesName &&
        !!formData.duration &&
        formData.platforms.length > 0 &&
        !!formData.publishTime
      );
    }
    return false;
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      {/* 6-Step Stepper */}
      <Stepper currentStep={currentStep} totalSteps={6} />

      <div className="mt-12 min-h-[600px] bg-white rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 p-8 md:p-12 relative overflow-hidden flex flex-col">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <NicheSelection 
                  selectedNiche={formData.niche}
                  customNicheValue={formData.customNiche}
                  onSelect={(niche) => updateFormData("niche", niche)}
                  onCustomChange={(val) => updateFormData("customNiche", val)}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <LanguageAndVoice
                  selectedLanguage={formData.language}
                  selectedVoice={formData.voice}
                  onLanguageChange={(lang) => updateFormData("language", lang)}
                  onVoiceChange={(voice) => updateFormData("voice", voice)}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <BackgroundMusic
                  selectedMusic={formData.selectedMusic}
                  onMusicChange={(musicIds) => updateFormData("selectedMusic", musicIds)}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <VideoStyle
                  selectedStyle={formData.videoStyle}
                  onStyleChange={(styleId) => updateFormData("videoStyle", styleId)}
                />
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <CaptionSelection
                  selectedStyle={formData.captionStyle}
                  onStyleChange={(styleId) => updateFormData("captionStyle", styleId)}
                />
              </motion.div>
            )}

            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <SeriesDetails
                  seriesName={formData.seriesName}
                  duration={formData.duration}
                  selectedPlatforms={formData.platforms}
                  publishTime={formData.publishTime}
                  onNameChange={(val) => updateFormData("seriesName", val)}
                  onDurationChange={(val) => updateFormData("duration", val)}
                  onPlatformsChange={(vals) => updateFormData("platforms", vals)}
                  onPublishTimeChange={(val) => updateFormData("publishTime", val)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Creation Footer */}
        <CreationFooter 
          currentStep={currentStep}
          totalSteps={6}
          onContinue={currentStep === 6 ? handleScheduleSeries : nextStep}
          onBack={prevStep}
          isContinueDisabled={!isStepValid() || isFetching}
          isLoading={isSubmitting}
          label={currentStep === 6 ? (isEditing ? "Update Series" : "Schedule Series") : undefined}
        />

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none" />
      </div>
    </div>
  );
}

export default function CreateSeriesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    }>
      <CreateSeriesContent />
    </Suspense>
  );
}
