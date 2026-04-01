"use client";

import { motion } from "framer-motion";
import { Bot, CalendarClock, Mail, Zap } from "lucide-react";

const features = [
  {
    name: "AI Video Generation",
    description:
      "Transform simple text prompts or blog posts into highly engaging short-form videos complete with AI voiceovers, captions, and dynamic visuals.",
    icon: Bot,
  },
  {
    name: "Multi-Platform Auto-Scheduling",
    description:
      "Connect your accounts once and schedule months of content across TikTok, Instagram Reels, and YouTube Shorts simultaneously.",
    icon: CalendarClock,
  },
  {
    name: "Email Campaign Integration",
    description:
      "Embed your generated videos directly into automated email sequences to increase click-through rates and audience engagement.",
    icon: Mail,
  },
  {
    name: "High-Speed Rendering",
    description:
      "Our optimized cloud infrastructure renders your 4K shorts in seconds, not hours. Spend less time waiting and more time growing.",
    icon: Zap,
  },
];

export function Features() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base font-semibold leading-7 text-primary"
          >
            Create Faster
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Everything you need to go viral
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            VidMaxx consolidates the entire content creation and distribution pipeline into one powerful, easy-to-use platform.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="relative pl-16 group"
              >
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary">
                    <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
