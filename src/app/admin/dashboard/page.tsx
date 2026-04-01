"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  FileText, 
  Eye, 
  TrendingUp,
  Plus,
  ArrowRight,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const stats = [
  { name: "Total Projects", value: "48", icon: Briefcase, change: "+3", trend: "up" },
  { name: "Blog Posts", value: "12", icon: FileText, change: "+1", trend: "up" },
  { name: "Page Views", value: "4.2K", icon: Eye, change: "+12%", trend: "up" },
  { name: "New Inquiries", value: "8", icon: Users, change: "0", trend: "neutral" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-16">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading font-black tracking-tighter uppercase mb-2">Workspace.</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px]">Overview & Real-time Analytics</p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" className="h-16 px-10 rounded-2xl flex items-center gap-3 bg-white/50 backdrop-blur-sm">
             <Clock className="w-5 h-5 opacity-40" /> 
             <span className="text-[11px] font-black uppercase tracking-widest">History</span>
          </Button>
          <Button className="h-16 px-10 rounded-2xl flex items-center gap-3 bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all">
             <Plus className="w-5 h-5" />
             <span className="text-[11px] font-black uppercase tracking-widest leading-none">Create Project</span>
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group p-8 bg-white border border-primary/5 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-8">
               <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center group-hover:bg-primary transition-colors">
                  <stat.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
               </div>
               <span className={`text-[10px] font-black uppercase tracking-widest ${
                 stat.trend === "up" ? "text-emerald-500" : "text-muted-foreground"
               }`}>
                 {stat.change}
               </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.name}</p>
            <h3 className="text-4xl font-heading font-black">{stat.value}</h3>
          </motion.div>
        ))}
      </section>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex justify-between items-center px-4">
             <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Recent Projects.</h2>
             <Link href="/admin/projects" className="text-[10px] font-black uppercase tracking-widest text-primary hover:gap-3 transition-all flex items-center gap-2 underline underline-offset-8">
               View All <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
          
          <div className="flex flex-col gap-4">
             {[1,2,3].map(i => (
               <div key={i} className="group p-8 bg-white border border-primary/5 rounded-[2rem] flex items-center justify-between hover:shadow-lg transition-all">
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                       <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black tracking-widest uppercase text-primary mb-1">Residential</span>
                       <h4 className="text-xl font-heading font-black uppercase">Safari Towers - Block B</h4>
                       <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Edited 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="outline" className="h-14 w-14 p-0 rounded-2xl border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                     <ArrowRight className="w-5 h-5" />
                  </Button>
               </div>
             ))}
          </div>
        </div>

        {/* Quick Actions / Content Management */}
        <div className="flex flex-col gap-8">
           <h2 className="text-2xl font-heading font-black uppercase tracking-tight px-4">Management.</h2>
           <div className="grid gap-4">
              <Link href="/admin/dashboard/settings" className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10 flex items-center justify-between group hover:bg-primary hover:border-primary transition-all duration-500">
                 <div className="flex items-center gap-6">
                    <FileText className="w-6 h-6 text-primary group-hover:text-white" />
                    <span className="font-black uppercase tracking-widest text-xs group-hover:text-white">Front Page Text</span>
                 </div>
                 <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all" />
              </Link>
              
              <Link href="/admin/dashboard/services" className="p-8 bg-white border border-primary/5 rounded-[2rem] shadow-sm flex items-center justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                 <div className="flex items-center gap-6">
                    <Briefcase className="w-6 h-6 text-primary" />
                    <span className="font-black uppercase tracking-widest text-xs">Our Services</span>
                 </div>
                 <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary" />
              </Link>
              
              <Link href="/admin/dashboard/testimonials" className="p-8 bg-white border border-primary/5 rounded-[2rem] shadow-sm flex items-center justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                 <div className="flex items-center gap-6">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="font-black uppercase tracking-widest text-xs">Testimonials</span>
                 </div>
                 <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary" />
              </Link>
           </div>
           
           <div className="p-10 bg-accent rounded-[3rem] flex flex-col gap-4 mt-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Status</span>
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-sm font-black uppercase tracking-widest">Supabase Connected</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.1em] mt-2 italic">v2.1 API Active</p>
           </div>
        </div>
      </div>
    </div>
  );
}
