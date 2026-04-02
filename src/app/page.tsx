import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CareersCTASection } from "@/components/sections/CareersCTASection";
import { MapSection } from "@/components/sections/MapSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative bg-background overflow-hidden selection:bg-primary/20 selection:text-primary scroll-smooth">
      <Navbar />
      
      {/* Hero with initial transition elements */}
      <HeroSection />
      
      <div className="relative">
         {/* Inter-section structural decorations */}
         <div className="absolute top-0 right-0 w-1/4 h-[40%] bg-primary/2 blur-[150px] rounded-full -z-10" />
         <div className="absolute bottom-[20%] left-0 w-1/3 h-[30%] bg-primary/3 blur-[120px] rounded-full -z-10" />
         
         <AboutSection />
         <ServicesSection />
         
         {/* Portfolio with a prompt to visit the separate page */}
         <PortfolioSection />
         
         <TestimonialsSection />
         <ContactSection />
         <MapSection />
         <CareersCTASection />
      </div>

      {/* Latest Journal Highlights could go here eventually */}
      
      <Footer />
    </main>
  );
}

