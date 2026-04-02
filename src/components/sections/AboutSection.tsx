"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowUpRight, Award, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettings } from "@/hooks/useSettings";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export const AboutSection = () => {
  const { settings, loading } = useSettings();
  const aboutTitle = settings.about_title || "Building the Future of Ethiopia.";
  const aboutDescription = settings.about_content || "Founded on the principles of integrity and excellence, Makitex Trading PLC has grown to become a leader in the design and construction industry. We bridge the gap between architectural imagination and physical reality.";

  const highlights = [
    "Design & Build Integration",
    "Sustainability & Safety Focus",
    "Innovative Modern Materials",
    "On-Schedule Delivery",
  ];

  const milestones = [
    { year: 2012, title: "Foundation", desc: "Makitex Trading PLC established." },
    { year: 2016, title: "Expansion", desc: "Expanded to industrial developments." },
    { year: 2020, title: "Excellence", desc: "Awarded top construction firm." },
    { year: 2025, title: "Innovation", desc: "Pioneering sustainable smart-structures." },
  ];

  return (
    <section id="about" className="py-40 relative">
      <div className="absolute top-1/2 left-0 w-1/4 h-1/4 bg-primary/10 blur-[150px] rounded-full -z-10" />
      
      <Container className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative group">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl z-10"
           >
             <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000"
                alt="Expert Engineering"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           </motion.div>
           
           {/* Decorative elements */}
           <div className="absolute -top-12 -right-12 w-64 h-64 border-4 border-primary/20 rounded-[4rem] -z-0" />
           <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary rounded-[2rem] -z-0" />
           
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4, duration: 0.6 }}
             className="absolute bottom-16 right-[-20px] p-8 md:p-10 bg-background border border-primary/20 rounded-[2rem] shadow-2xl z-20 flex flex-col gap-6"
           >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                   <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-heading font-black text-primary leading-none">
                    <AnimatedCounter end={150} suffix="+" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">Projects Completed</span>
                </div>
              </div>

              <div className="flex gap-4 items-center border-t border-border pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                   <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-heading font-black text-primary leading-none">
                    <AnimatedCounter end={500} suffix="+" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">Happy Clients</span>
                </div>
              </div>
           </motion.div>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 inline-block">Our Foundation</span>
            <h2 className="text-6xl md:text-7xl font-heading font-black tracking-tighter leading-none mb-8">
               {aboutTitle.includes('Future') ? (
                 <>
                   Building the <span className="text-primary italic">Future</span> of Ethiopia.
                 </>
               ) : aboutTitle}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
               {aboutDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="flex items-center gap-4 bg-accent/10 p-5 rounded-2xl border border-primary/5 group hover:bg-background transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest">{h}</span>
              </motion.div>
            ))}
          </div>

          <Button variant="ghost" className="w-fit h-16 px-0 text-2xl font-black font-heading hover:text-primary transition-all flex gap-3 group">
            Our Full Story <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </Button>
        </div>
      </Container>

      {/* Timeline Section */}
      <Container className="mt-40">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 inline-block hidden">Company History</span>
          <h3 className="text-5xl font-heading font-black tracking-tight mb-4">A Legacy of <span className="text-primary italic">Growth</span>.</h3>
          <p className="text-muted-foreground font-medium">Tracing our steps from a local startup to one of East Africa's premier construction firms.</p>
        </div>

        <div className="relative border-l border-primary/20 md:border-none md:flex md:justify-between px-6 md:px-0 max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-[23px] left-0 w-full h-[1px] bg-primary/20 -z-10" />
          
          {milestones.map((m, i) => (
            <motion.div 
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative pl-8 md:pl-0 md:text-center pb-12 md:pb-0"
            >
               <div className="absolute left-[-5px] md:left-1/2 top-1 w-[11px] h-[11px] md:-translate-x-1/2 bg-primary rounded-full ring-4 ring-background" />
               <div className="md:mt-16 bg-card border hover:border-primary/50 transition-colors p-6 rounded-2xl shadow-xl shadow-primary/5 md:w-64 z-10 mx-auto">
                 <div className="text-3xl font-heading font-black text-primary mb-2">
                   <AnimatedCounter end={m.year} duration={1} />
                 </div>
                 <h4 className="font-bold text-lg mb-2">{m.title}</h4>
                 <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
