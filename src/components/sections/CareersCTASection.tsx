"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { supabase } from "@/lib/supabase";
import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

export const CareersCTASection = () => {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (data) setJobs(data);
    }
    fetchJobs();
  }, []);

  // Always render — show placeholder when no active jobs

  return (
    <section className="py-40 relative overflow-hidden bg-accent/5">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-2/3 h-1/2 bg-primary/5 blur-[180px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full -z-10" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Headline */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-8 inline-block"
            >
              Work With Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.85] uppercase mb-10"
            >
              Build the <br />
              <span className="text-primary italic">Future.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground leading-relaxed font-medium max-w-md mb-12"
            >
              We're seeking engineers, architects, and bold thinkers to shape the skylines of East Africa.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              viewport={{ once: true }}
            >
              <Link
                href="/careers"
                className="inline-flex items-center gap-3 h-20 px-12 bg-primary text-white font-black text-sm uppercase tracking-widest rounded-full shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
              >
                View All Openings
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Job Listings */}
          <div className="flex flex-col gap-5">
            {jobs.length > 0 ? jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <Link
                  href="/careers"
                  className="group flex items-center justify-between p-8 bg-card border border-primary/10 rounded-[2rem] hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                      <Briefcase className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">{job.department}</p>
                      <h4 className="text-xl font-heading font-black uppercase tracking-tight group-hover:text-primary transition-colors">{job.title}</h4>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {job.location} · {job.type}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </Link>
              </motion.div>
            )) : (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center p-16 bg-card border border-primary/10 rounded-[2.5rem] text-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-3">Coming Soon</p>
                  <h4 className="text-2xl font-heading font-black uppercase">No openings right now</h4>
                  <p className="text-muted-foreground text-sm mt-3 font-medium">
                    We're always open to exceptional talent. Send your CV directly.
                  </p>
                </div>
                <a
                  href="mailto:careers@makitex.com"
                  className="inline-flex items-center gap-2 px-8 h-14 rounded-full border border-primary/30 text-primary font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  Send Your CV <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
