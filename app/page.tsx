import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import CurriculumOutline from "@/components/CurriculumOutline";
import ThemeCards from "@/components/ThemeCards";
import AboutRevivery from "@/components/AboutRevivery";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <CurriculumOutline />
      <ThemeCards />
      <AboutRevivery />
      <FAQ />
      <FinalCTA />
    </>
  );
}
