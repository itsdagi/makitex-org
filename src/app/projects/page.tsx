"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, Filter, ArrowUpRight, MapPin, Calendar, Maximize } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const categories = ["All", "Residential", "Commercial", "Industrial", "Infrastructure"];

const allProjects = [
  { id: 1, title: "Apex Tower", slug: "apex-tower", cat: "Commercial", loc: "Kazanchis, Addis Ababa", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200", area: "12,000 sqm", year: "2024" },
  { id: 2, title: "Bole Luxury Estate", slug: "bole-luxury-estate", cat: "Residential", loc: "Bole Sub-city", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200", area: "4,500 sqm", year: "2023" },
  { id: 3, title: "Summit Highlands", slug: "summit-highlands", cat: "Residential", loc: "Sarbet, Addis Ababa", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200", area: "3,200 sqm", year: "2024" },
  { id: 4, title: "Industrial Smart-Zone", slug: "industrial-smart-zone", cat: "Industrial", loc: "Dukem Industrial Park", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200", area: "50,000 sqm", year: "2022" },
  { id: 5, title: "Metropolitan Bridge", slug: "metropolitan-bridge", cat: "Infrastructure", loc: "Addis-Adama Expressway", img: "https://images.unsplash.com/photo-1513360309081-38f0d12739a7?q=80&w=1200", area: "500m Span", year: "2023" },
  { id: 6, title: "Global Retail Hub", slug: "global-retail-hub", cat: "Commercial", loc: "Piassa, Addis Ababa", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200", area: "8,000 sqm", year: "2024" },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? allProjects : allProjects.filter(p => p.cat === activeTab);

  return (
    <main className="bg-background pt-32 min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
        <Container>
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 inline-block"
            >
              Masterpieces in Concrete
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl lg:text-9xl font-heading font-black tracking-tighter leading-none mb-10"
            >
              Our <span className="text-primary italic">Portfolio.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-muted-foreground leading-relaxed font-medium"
            >
              A showcase of architectural innovation and structural excellence across Ethiopia. Each project represents our commitment to longevity and modern design.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-[80px] z-40 bg-background/80 backdrop-blur-xl border-y py-6 shadow-sm">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-2 p-1 bg-accent/20 rounded-2xl border">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveTab(c)}
                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === c 
                    ? "bg-primary text-white shadow-lg" 
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="bg-accent/20 h-12 pl-12 pr-6 rounded-xl border border-transparent focus:border-primary/30 focus:bg-background transition-all outline-none text-sm font-medium w-full md:w-64"
                />
             </div>
             <Button variant="outline" className="h-12 w-12 p-0 rounded-xl">
               <Filter className="w-5 h-5" />
             </Button>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <Container>
          <motion.div layout className="grid md:grid-cols-2 gap-12">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, index) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-[450px] md:h-[600px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5 cursor-pointer"
                >
                  <Link href={`/projects/${p.slug}`} className="block w-full h-full relative cursor-pointer group">
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" 
                    />
                    
                    {/* Detailed Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent p-8 md:p-12 flex flex-col justify-end">
                      <div className="translate-y-8 md:translate-y-16 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <span className="h-[2px] w-8 md:w-12 bg-primary block" />
                          <span className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">{p.cat}</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl text-white font-heading font-black mb-6 md:mb-10 leading-none">{p.title}</h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 border-t border-white/10 pt-6 md:pt-8 mt-6 md:mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200">
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-2 text-white/40 text-[9px] md:text-[10px] uppercase font-black tracking-widest">
                              <MapPin className="w-3 h-3 hidden sm:block" /> Location
                            </span>
                            <span className="text-white text-[10px] md:text-xs font-bold uppercase truncate">{p.loc}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-2 text-white/40 text-[9px] md:text-[10px] uppercase font-black tracking-widest">
                              <Maximize className="w-3 h-3 hidden sm:block" /> Area
                            </span>
                            <span className="text-white text-[10px] md:text-xs font-bold uppercase">{p.area}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-2 text-white/40 text-[9px] md:text-[10px] uppercase font-black tracking-widest">
                              <Calendar className="w-3 h-3 hidden sm:block" /> Year
                            </span>
                            <span className="text-white text-[10px] md:text-xs font-bold uppercase">{p.year}</span>
                          </div>
                        </div>

                        <div className="mt-8 md:mt-12 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-400">
                           <span className="h-10 md:h-14 flex items-center px-6 md:px-10 rounded-xl md:rounded-2xl bg-white/10 text-white border border-white/20 hover:bg-white hover:text-primary transition-all duration-500 font-black tracking-widest uppercase text-[9px] md:text-xs">
                              View Case Study
                           </span>
                           <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary transition-all duration-500 group-btn shrink-0 ml-2">
                              <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 text-white group-hover:rotate-45" />
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating ID Card for visual interest */}
                    <div className="absolute top-6 left-6 md:top-10 md:left-10 w-1 md:w-1.5 h-8 md:h-12 bg-primary group-hover:h-16 md:group-hover:h-24 transition-all duration-700" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
