"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { MapPin, Briefcase, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const { data } = await supabase.from("jobs").select("*").eq("is_active", true).order("created_at", { ascending: false });
      if (data) setJobs(data);
    }
    fetchJobs();
  }, []);

  return (
    <main className="bg-background pt-32 min-h-screen">
      <Navbar />

      <section className="py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-8 inline-block"
            >
              Careers
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1 }}
              className="text-7xl lg:text-9xl font-heading font-black tracking-tighter leading-[0.8] mb-12 uppercase"
            >
              Build the <br /> <span className="text-primary italic">Future.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-muted-foreground leading-relaxed font-body max-w-2xl font-medium"
            >
              Join Makitex Trading PLC and be part of an elite engineering force shaping the urban landscape.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-accent/5">
        <Container>
           <h2 className="text-4xl font-heading font-black uppercase mb-12">Open Opportunities</h2>
           {jobs.length === 0 ? (
             <p className="text-xl text-muted-foreground">There are no open positions at this time. Please check back later.</p>
           ) : (
             <div className="flex flex-col gap-6">
                {jobs.map((job, i) => (
                   <motion.div 
                     key={job.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     viewport={{ once: true }}
                     className="bg-card w-full rounded-[2.5rem] border border-primary/10 p-10 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                   >
                      <div className="flex flex-col gap-4">
                         <div className="flex items-center gap-4">
                            <span className="text-primary text-[10px] font-black uppercase tracking-widest">{job.department}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                            <span className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">{job.type}</span>
                         </div>
                         <h3 className="text-3xl font-heading font-black uppercase tracking-tight group-hover:text-primary transition-colors">{job.title}</h3>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">{job.location}</span>
                         </div>
                      </div>
                      <div className="mt-8 md:mt-0">
                         <a href="mailto:careers@makitex.com">
                           <Button className="h-16 px-10 rounded-full font-black uppercase tracking-widest bg-primary text-white hover:scale-105 transition-all shadow-xl shadow-primary/20">
                             Apply Now <ChevronRight className="w-4 h-4 ml-2" />
                           </Button>
                         </a>
                      </div>
                   </motion.div>
                ))}
             </div>
           )}
        </Container>
      </section>

      <Footer />
    </main>
  );
}
