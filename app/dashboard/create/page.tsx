"use client";

import { useState } from "react";
import { Stepper } from "@/components/create/Stepper";
import { NicheSelection } from "@/components/create/NicheSelection";
import { LanguageAndVoice } from "@/components/create/LanguageAndVoice";
import { BackgroundMusic } from "@/components/create/BackgroundMusic";
import { VideoStyle } from "@/components/create/VideoStyle";
import { CaptionSelection } from "@/components/create/CaptionSelection";
import { SeriesDetails } from "@/components/create/SeriesDetails";
import { CreationFooter } from "@/components/create/CreationFooter";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateSeriesPage() {
  const [currentStep, setCurrentStep] = useState(1);
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
          onContinue={nextStep}
          onBack={prevStep}
          isContinueDisabled={!isStepValid()}
        />

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none" />
      </div>
    </div>
  );
}
