"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  MapPin, 
  Maximize, 
  Calendar,
  Grid,
  List,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const allProjects = [
  { id: 1, title: "Apex Tower", cat: "Commercial", loc: "Kazanchis", area: "12,000 sqm", year: "2024", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200" },
  { id: 2, title: "Bole Luxury Estate", cat: "Residential", loc: "Bole", area: "4,500 sqm", year: "2023", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=200" },
  { id: 3, title: "Summit Highlands", cat: "Residential", loc: "Sarbet", area: "3,200 sqm", year: "2024", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200" },
];

export default function AdminProjectsPage() {
  const [view, setView] = useState("Grid");

  return (
    <div className="flex flex-col gap-16">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading font-black tracking-tighter uppercase mb-2">Portfolio.</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px]">Project Lifecycle & Asset Management</p>
        </div>
        
        <Button className="h-20 px-12 rounded-[2rem] flex items-center gap-4 bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
           <Plus className="w-6 h-6" />
           <span className="text-xl font-heading font-black tracking-widest leading-none">Add Project</span>
        </Button>
      </header>

      {/* Filter and View Toggle */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white p-6 rounded-[2rem] border border-primary/5 shadow-sm">
         <div className="flex items-center gap-4 p-1 bg-accent/20 rounded-xl border">
            {["Residential", "Commercial", "Industrial", "Infrastructure"].map(t => (
               <button key={t} className="px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">
                  {t}
               </button>
            ))}
         </div>
         
         <div className="flex gap-4">
            <div className="flex bg-accent/20 rounded-xl border p-1">
               <button 
                 onClick={() => setView("Grid")}
                 className={`p-3 rounded-lg transition-all ${view === "Grid" ? "bg-primary text-white" : "text-muted-foreground"}`}
               >
                 <Grid className="w-4 h-4" />
               </button>
               <button 
                 onClick={() => setView("List")}
                 className={`p-3 rounded-lg transition-all ${view === "List" ? "bg-primary text-white" : "text-muted-foreground"}`}
               >
                 <List className="w-4 h-4" />
               </button>
            </div>
            
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
               <input 
                 type="text" 
                 placeholder="Search project ID..." 
                 className="bg-accent/20 h-14 pl-12 pr-6 rounded-xl border border-transparent focus:border-primary/30 outline-none transition-all text-sm font-medium w-64"
               />
            </div>
         </div>
      </section>

      {/* Projects Grid View */}
      <section className="grid md:grid-cols-3 gap-10">
        {allProjects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group h-full bg-white border border-primary/5 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
          >
            <div className="relative h-64 overflow-hidden">
               <img 
                 src={p.img} 
                 alt={p.title} 
                 className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
               />
               <div className="absolute top-6 left-6 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
                  {p.cat}
               </div>
               <div className="absolute top-6 right-6 hidden group-hover:flex gap-2 transition-all">
                  <Button variant="outline" className="h-10 w-10 p-0 rounded-xl bg-white/50 backdrop-blur-md border border-white/40 hover:bg-white text-primary">
                     <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="h-10 w-10 p-0 rounded-xl bg-rose-500/10 backdrop-blur-md border border-rose-500/30 hover:bg-rose-500 text-rose-600 hover:text-white transition-all">
                     <Trash2 className="w-4 h-4" />
                  </Button>
               </div>
            </div>
            
            <div className="p-10 flex flex-col gap-6">
               <div>
                  <h4 className="text-2xl font-heading font-black uppercase leading-tight group-hover:text-primary transition-colors">{p.title}</h4>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2 opacity-60">
                     <MapPin className="w-3.5 h-3.5" />
                     <span className="text-[10px] font-black uppercase tracking-widest leading-none">{p.loc}</span>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-6 pt-6 border-t border-primary/5">
                  <div className="flex flex-col gap-1">
                     <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none">Surface Area</span>
                     <span className="text-sm font-black italic">{p.area}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none">Completion</span>
                     <span className="text-sm font-black italic">{p.year}</span>
                  </div>
               </div>
               
               <Link href="#" className="flex items-center justify-between group-hover:translate-x-2 transition-transform duration-500 pt-2 text-primary">
                  <span className="text-xs font-black uppercase tracking-[0.3em] font-heading">Manage Assets</span>
                  <ChevronRight className="w-5 h-5" />
               </Link>
            </div>
          </motion.div>
        ))}
        
        {/* Placeholder / Empty State for creating */}
        <div className="group h-full bg-accent/30 border-2 border-dashed border-primary/20 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center hover:border-primary/50 transition-all cursor-pointer">
           <div className="w-20 h-20 rounded-full bg-white border border-primary/10 flex items-center justify-center p-6 text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
              <Plus className="w-10 h-10" strokeWidth={3} />
           </div>
           <h4 className="text-xl font-heading font-black uppercase tracking-tight mb-2">New Entry</h4>
           <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest opacity-60">Add structural blueprints and assets</p>
        </div>
      </section>
      
      {/* Portfolio Health */}
      <section className="bg-primary/5 rounded-[4rem] p-16 flex flex-col md:flex-row justify-between items-center gap-12 border border-primary/10">
         <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-heading font-black uppercase tracking-tight leading-tight">Construction <br /> Growth Index.</h3>
            <p className="max-w-md text-sm text-muted-foreground font-medium opacity-80 leading-relaxed italic border-l-4 border-primary pl-8">Your portfolio visibility has increased by 14.8% this quarter in the Bole sub-city region.</p>
         </div>
         
         <div className="grid grid-cols-2 gap-12 text-center border-l md:pl-20">
            <div className="flex flex-col gap-2">
               <h4 className="text-5xl font-heading font-black tracking-tighter">84%</h4>
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">Retention</span>
            </div>
            <div className="flex flex-col gap-2">
               <h4 className="text-5xl font-heading font-black tracking-tighter">1.2x</h4>
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">Velocity</span>
            </div>
         </div>
      </section>
    </div>
  );
}
