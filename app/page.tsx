import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
