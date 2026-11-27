import Navbar           from "@/components/Navbar";
import HeroSection      from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection  from "@/components/ServicesSection";
import ProcessSection   from "@/components/ProcessSection";
import BudgetSection    from "@/components/BudgetSection";
import ContactSection   from "@/components/ContactSection";
import Footer           from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-paper">
      <Navbar />
      <HeroSection />
      <PortfolioSection />
      <ServicesSection />
      <ProcessSection />
      <BudgetSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
