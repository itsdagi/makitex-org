"use client";

import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, User, ArrowLeft, Tag, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'next/navigation';

const dummyContent = `
# The Future of Sustainable Architecture in Ethiopia

Sustainability isn't just a buzzword; it's the foundation of modern engineering. In Addis Ababa, we're seeing a shift towards local material integration and high-performance building envelopes.

## 1. Local Stone & Thermal Mass
Using local basalt and volcanic stone allows us to leverage natural thermal mass, reducing the need for active cooling and heating systems. This approach not only lowers the carbon footprint but also aligns our modern designs with the historical tectonic language of Ethiopia.

## 2. Solar Harvesting & Passive Design
With our high altitude and clear sunlight, solar energy is an underutilized goldmine. By integrating photovoltaic facades and optimizing window-to-wall ratios, we can achieve net-zero energy status for many boutique commercial projects.

> "True architecture is a dialogue between the earth and the sky. In the horn of Africa, this dialogue requires a unique language of shade, light, and mass."

### The Makitex Approach
At Makitex Trading PLC, we prioritize:
- **Biophilic Design**: Integrating vertical gardens and natural ventilation.
- **Smart Infrastructure**: Using IoT sensors to monitor structural loads and energy consumption.
- **Longevity**: Building for centuries, not decades.

---
Stay tuned for more updates on our latest projects.
`;

export default function BlogPostPage() {
  const { slug } = useParams();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Progress Bar */}
      <motion.div 
        style={{ scaleX: scrollYProgress }} 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left" 
      />

      {/* Hero Header */}
      <header className="relative h-[80vh] w-full overflow-hidden">
        <motion.div style={{ scale, opacity }} className="absolute inset-0">
          <img 
             src="https://images.unsplash.com/photo-1518005020251-095c1a2702c1?q=80&w=2000" 
             alt="Post Cover" 
             className="w-full h-full object-cover grayscale-[0.5]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>
        
        <Container className="absolute inset-0 flex flex-col justify-end pb-24 z-10">
          <Link href="/blog" className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-10 group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Makitex Journal
          </Link>
          
          <div className="max-w-4xl">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-6"
             >
                <span className="text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">Featured Entry</span>
                <span>March 15, 2026</span>
             </motion.div>
             <motion.h1 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1, duration: 0.8 }}
               className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter leading-[0.8] uppercase"
             >
                Building the <span className="text-primary italic">Sustainable</span> Horizon.
             </motion.h1>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="flex items-center gap-6 mt-12"
             >
                <img src="https://i.pravatar.cc/150?u=a" alt="Author" className="w-16 h-16 rounded-full border-2 border-primary/20" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Author</span>
                  <span className="text-xl font-heading font-black uppercase">Eng. Samuel K.</span>
                </div>
             </motion.div>
          </div>
        </Container>
      </header>

      {/* Content Section */}
      <section className="py-24 md:py-40 relative">
        <div className="absolute top-0 right-0 w-1/4 h-1/2 bg-primary/5 blur-[150px] -z-10" />
        <Container className="grid lg:grid-cols-12 gap-20">
          
          {/* Side Utils */}
          <aside className="hidden lg:flex lg:col-span-2 flex-col gap-12 sticky top-32 h-fit">
             <div className="flex flex-col gap-4 border-l-2 border-primary/10 pl-8">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">Interact</span>
               <div className="flex flex-col gap-6">
                 <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">
                    <Bookmark className="w-5 h-5" /> Save
                 </button>
                 <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" /> Share
                 </button>
               </div>
             </div>
             
             <div className="flex flex-col gap-4 border-l-2 border-primary/10 pl-8">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">Tags</span>
               <div className="flex flex-wrap gap-2">
                 {["Engineering", "Green", "Urban"].map(tag => (
                   <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-accent px-3 py-1 rounded-md opacity-70">
                      #{tag}
                   </span>
                 ))}
               </div>
             </div>
          </aside>

          {/* Main Content */}
          <motion.article 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 prose prose-xl prose-invert max-w-none text-muted-foreground font-body leading-[1.8] marker:text-primary prose-headings:font-heading prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-foreground prose-blockquote:border-primary prose-blockquote:bg-accent/5 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:italic prose-a:text-primary prose-strong:text-foreground"
          >
             <ReactMarkdown remarkPlugins={[remarkGfm]}>
               {dummyContent}
             </ReactMarkdown>
          </motion.article>
          
          {/* Right Sidebar / Ad / Related */}
          <div className="lg:col-span-3">
             <div className="bg-accent/20 p-10 rounded-[3rem] border border-primary/5 sticky top-32">
                <h4 className="text-xl font-heading font-black mb-6 uppercase tracking-tight">Newsletter.</h4>
                <p className="text-sm font-medium mb-8 opacity-70">Get the latest engineering insights from Makitex delivered directly to your inbox.</p>
                <div className="space-y-4">
                  <input type="email" placeholder="email@example.com" className="w-full bg-background h-14 px-6 rounded-2xl border border-primary/5 focus:border-primary outline-none transition-all" />
                  <Button className="w-full h-16 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]">Subscribe</Button>
                </div>
             </div>
          </div>
        </Container>
      </section>

      {/* Suggested Reading */}
      <section className="py-24 border-t border-primary/5">
        <Container>
           <h2 className="text-4xl font-heading font-black mb-20 uppercase tracking-tighter">Recommended Reads.</h2>
           <div className="grid md:grid-cols-2 gap-12">
             <Link href="#" className="flex gap-8 group">
                <div className="w-48 h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl border border-primary/5">
                   <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center">
                   <span className="text-[10px] uppercase font-black tracking-widest text-primary mb-2">Design</span>
                   <h3 className="text-xl font-heading font-black group-hover:text-primary transition-colors">10 Principles of High-Performance Modern Homes</h3>
                </div>
             </Link>
             <Link href="#" className="flex gap-8 group">
                <div className="w-48 h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl border border-primary/5">
                   <img src="https://images.unsplash.com/photo-1513360309081-38f0d12739a7?q=80&w=600" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center">
                   <span className="text-[10px] uppercase font-black tracking-widest text-primary mb-2">Engineering</span>
                   <h3 className="text-xl font-heading font-black group-hover:text-primary transition-colors">Navigating Complex Infrastructure Projects</h3>
                </div>
             </Link>
           </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
