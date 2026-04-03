import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import ChecklistPreview from "@/components/sections/ChecklistPreview";
import Showcase from "@/components/sections/Showcase";
import HowItWorks from "@/components/sections/HowItWorks";
import DownloadCta from "@/components/sections/DownloadCta";
import FeedbackSection from "@/components/sections/FeedbackSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ChecklistPreview />
      <Showcase />
      <HowItWorks />
      <DownloadCta />
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FeedbackSection source="homepage" className="mt-0" />
        </div>
      </section>
    </>
  );
}
