"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { 
  HardHat, 
  Ruler, 
  Building2, 
  Paintbrush, 
  Hammer, 
  FileCheck, 
  ArrowRight,
  Pencil,
  Layout,
  Trees
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const iconMap: any = {
  Building2,
  Ruler,
  Paintbrush,
  FileCheck,
  HardHat,
  Hammer,
  Pencil,
  Layout,
  Trees
};

export const ServicesSection = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });
      if (data) setServices(data);
    }
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
             <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 inline-block">Specialized Expertise</span>
             <h2 className="text-5xl md:text-6xl font-heading font-black tracking-tighter leading-none">
               Comprehensive Construction Solutions.
             </h2>
          </div>
          <p className="text-muted-foreground max-w-sm mb-2 text-lg">
            From initial sketch to final brick, we provide unparalleled expertise across the building lifecycle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || Building2;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-accent/10 backdrop-blur-sm p-10 rounded-3xl border border-primary/5 hover:border-primary/20 hover:bg-background hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Hover highlight */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-all duration-500 group-hover:scale-[3] opacity-0 group-hover:opacity-100" />
                
                <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-black mb-4 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {s.description}
                </p>
                
                <div className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
