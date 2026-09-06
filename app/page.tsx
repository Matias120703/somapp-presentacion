import Navbar          from "@/components/Navbar";
import HeroSection      from "@/components/HeroSection";
import PricingSection   from "@/components/PricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection   from "@/components/ProcessSection";
import ContactSection   from "@/components/ContactSection";
import Footer           from "@/components/Footer";
import PageLoaderClient from "@/components/PageLoaderClient";

export default function Home() {
  return (
    <main className="relative bg-brand-dark overflow-hidden">
      <PageLoaderClient />
      <Navbar />
      <HeroSection />
      <PricingSection />
      <PortfolioSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
