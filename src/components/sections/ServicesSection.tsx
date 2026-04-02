"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { 
  HardHat, Ruler, Building2, Paintbrush,
  Hammer, FileCheck, Pencil, Layout, Trees, ArrowUpRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const iconMap: any = {
  Building2, Ruler, Paintbrush, FileCheck,
  HardHat, Hammer, Pencil, Layout, Trees
};

export const ServicesSection = () => {
  const [services, setServices] = useState<any[]>([]);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });
      if (data) {
        setServices(data);
        setActive(0);
      }
    }
    fetchServices();
  }, []);

  const current = services[active];

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-accent/5">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-primary/5 blur-[180px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/10 blur-[120px] rounded-full -z-10" />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 inline-block"
            >
              Specialized Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-6xl md:text-7xl font-heading font-black tracking-tighter leading-[0.85] uppercase"
            >
              What We <br /><span className="text-primary italic">Build.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-sm text-lg leading-relaxed border-l-4 border-primary/30 pl-6"
          >
            From initial sketch to final brick, unparalleled expertise across every stage.
          </motion.p>
        </div>

        {/* Interactive two-panel layout */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-12 items-start">
          {/* Left: Service tabs */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Building2;
              return (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-5 p-5 rounded-2xl text-left transition-all duration-400 border ${
                    active === i
                      ? "bg-primary border-primary text-white shadow-2xl shadow-primary/30 scale-[1.02]"
                      : "bg-card border-primary/10 hover:border-primary/40 hover:bg-accent/30"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    active === i ? "bg-white/20" : "bg-primary/10 group-hover:bg-primary/20"
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors ${active === i ? "text-white" : "text-primary"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-heading font-black uppercase tracking-tight text-lg leading-tight ${
                      active === i ? "text-white" : "text-foreground"
                    }`}>{s.title}</p>
                  </div>
                  <ArrowUpRight className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                    active === i ? "text-white opacity-100 translate-x-0 -translate-y-0" : "opacity-0 group-hover:opacity-60"
                  }`} />
                </motion.button>
              );
            })}
          </div>

          {/* Right: Active service detail card */}
          <div className="lg:col-span-3 sticky top-32">
            {current && (() => {
              const Icon = iconMap[current.icon] || Building2;
              return (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-card border border-primary/10 rounded-[3rem] p-12 md:p-16 overflow-hidden shadow-2xl shadow-primary/5 min-h-[400px] flex flex-col justify-between"
                >
                  {/* Background number */}
                  <span className="absolute top-6 right-10 text-[12rem] font-heading font-black text-primary/5 leading-none select-none pointer-events-none">
                    {String(active + 1).padStart(2, "0")}
                  </span>

                  {/* Glow */}
                  <div className="absolute top-[-30%] right-[-10%] w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />

                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-10 border border-primary/20">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                      Service {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>

                    <h3 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-6 leading-[1.05]">
                      {current.title}
                    </h3>

                    <div className="h-[2px] w-16 bg-primary/30 mb-8" />

                    <p className="text-lg text-muted-foreground leading-relaxed font-medium max-w-xl">
                      {current.description}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="relative z-10 mt-12 flex gap-2">
                    {services.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === active ? "bg-primary flex-[3]" : "bg-primary/20 flex-1 hover:bg-primary/40"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </div>
      </Container>
    </section>
  );
};
