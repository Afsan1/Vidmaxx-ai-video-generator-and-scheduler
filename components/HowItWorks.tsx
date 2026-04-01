"use client";

import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    name: "Generate Script & Video",
    description: "Input a prompt, paste a blog URL, or let our AI brainstorm for you. VidMaxx generates the script, voiceover, and visuals in seconds.",
  },
  {
    id: "02",
    name: "Connect Your Socials",
    description: "Securely link your YouTube, TikTok, Instagram, and Email marketing tools. Set up your brand identity once.",
  },
  {
    id: "03",
    name: "Auto-Schedule & Chill",
    description: "Set your publishing calendar based on AI optimal time recommendations. We handle the uploading and cross-posting.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From prompt to published in 3 steps
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            No editing skills required. No more manual uploading to multiple platforms.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index }}
                className="flex flex-col text-center items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-2xl mb-6">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold leading-7 text-foreground">
                  {step.name}
                </h3>
                <p className="mt-4 flex-auto text-base leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
