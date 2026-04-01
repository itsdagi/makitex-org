"use client";

import { use, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Lightbox } from "@/components/ui/Lightbox";

// Temporary mock data until fully connected to Supabase
const PROJECT_DETAILS = {
  "apex-tower": {
    title: "Apex Tower",
    category: "Commercial",
    client: "Horizon Investments",
    location: "Kazanchis, Addis Ababa",
    year: "2024",
    description: "The Apex Tower stands as a testament to modern commercial design. Integrating smart climate control and a striking glass facade, we delivered 12,000 sqm of premium office space.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    beforeImage: "https://images.unsplash.com/photo-1541888081622-1262d08dbb09?q=80&w=1200", // Construction site
    afterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200", // Finished
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
      "https://images.unsplash.com/photo-1541888081622-1262d08dbb09?q=80&w=1200",
    ],
    challenges: [
      "Deep foundation excavation in a highly dense urban area.",
      "Custom facade installation requiring specialized rigging.",
      "Achieving LEED certification local equivalents."
    ]
  }
};

export default function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const project = PROJECT_DETAILS[slug as keyof typeof PROJECT_DETAILS] || PROJECT_DETAILS["apex-tower"];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-end pb-24">
        <div className="absolute inset-0 -z-20">
          <img 
            src={project.heroImage} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale-[0.2]" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent -z-10" />

        <Container className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-primary block" />
            <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">{project.category}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-black text-white leading-none tracking-tight">
            {project.title}
          </h1>
        </Container>
      </section>

      {/* Details Bar */}
      <section className="bg-card border-b border-border/50 py-12 sticky top-[80px] z-30 shadow-sm">
        <Container className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Client</span>
            <span className="font-bold text-sm md:text-base">{project.client}</span>
          </div>
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Location</span>
            <span className="font-bold text-sm md:text-base">{project.location}</span>
          </div>
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Year</span>
            <span className="font-bold text-sm md:text-base">{project.year}</span>
          </div>
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Services</span>
            <span className="font-bold text-sm md:text-base">Design & Build</span>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <Container className="max-w-5xl">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2 prose prose-lg prose-neutral dark:prose-invert">
              <h2 className="text-4xl font-heading font-black tracking-tighter mb-6">The Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-xl font-medium">
                {project.description}
              </p>

              <h3 className="text-2xl font-bold mt-12 mb-6">Key Challenges & Solutions</h3>
              <ul className="space-y-4 list-none p-0">
                {project.challenges.map((challenge, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-accent/20 rounded-xl border border-border"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium text-foreground">{challenge}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-12">
              <div className="p-8 bg-black text-white rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary blur-3xl rounded-full opacity-30" />
                <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Start your own project</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-8">Inspired by {project.title}? Let's discuss how we can bring your next architectural vision to life.</p>
                <button className="w-full py-4 text-center border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all rounded-xl font-bold uppercase tracking-widest text-xs">
                  Request an Estimate
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Before / After Slider */}
      <section className="pb-32 bg-accent/10">
        <Container className="max-w-5xl">
           <h2 className="text-4xl font-heading font-black tracking-tighter mb-10 text-center">Transformation</h2>
           <BeforeAfterSlider beforeImage={project.beforeImage} afterImage={project.afterImage} />
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-32">
        <Container className="max-w-6xl">
           <h2 className="text-4xl font-heading font-black tracking-tighter mb-10 text-center">Project Gallery</h2>
           <Lightbox images={project.gallery} />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
