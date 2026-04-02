"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";

export const PortfolioSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from("projects").select("*").eq("featured", true).order("display_order", { ascending: true });
      if (data) {
         setProjects(data);
         const unique = Array.from(new Set(data.map((p: any) => p.category).filter(Boolean)));
         setCategories(["All", ...(unique as string[])]);
      }
    }
    fetchProjects();
  }, []);

  const filtered = activeTab === "All" ? projects : projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-32 bg-accent/5 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-xl">
             <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 inline-block">Featured Work</span>
             <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter leading-none">
               Concrete <br />
               <span className="text-primary italic">Excellence.</span>
             </h2>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1.5 bg-background shadow-xl shadow-primary/5 rounded-2xl border border-primary/10">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveTab(c)}
                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === c 
                    ? "bg-primary text-white shadow-lg shadow-primary/30" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, index) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "circOut" }}
                className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl hover:shadow-primary/30 transition-all border border-primary/5 group"
              >
                <img 
                  src={p.image_url || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000"} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent p-10 flex flex-col justify-end transition-all duration-500 group-hover:bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 sm:opacity-100">
                  <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-[2px] w-8 bg-primary block" />
                      <span className="text-primary text-xs font-black uppercase tracking-[0.3em]">{p.category || 'N/A'}</span>
                    </div>
                    <h3 className="text-4xl text-white font-heading font-black mb-4 leading-none">{p.title}</h3>
                    <p className="text-white/70 text-sm mb-8 flex items-center gap-2 font-medium">
                      <MapPin className="w-4 h-4 text-primary" /> {p.location || 'Unknown Location'}
                    </p>
                    <Button variant="outline" className="h-14 w-full md:w-fit bg-white/10 text-white border-white/20 hover:bg-white hover:text-primary rounded-2xl group transition-all duration-300">
                      View Project <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </div>
                </div>

                {/* Categories Badge for mobile when not hovered */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-background/50 backdrop-blur-md rounded-full border border-white/20 group-hover:opacity-0 transition-opacity duration-300">
                   <span className="text-[10px] text-white font-black uppercase tracking-widest">{p.category || 'N/A'}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
      </Container>
    </section>
  );
};
