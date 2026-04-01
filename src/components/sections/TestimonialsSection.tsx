"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });
      if (data) setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-40 bg-background relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <Container>
        <div className="flex flex-col items-center text-center mb-24 max-w-2xl mx-auto">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Client Feedback</span>
          <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter leading-[0.9]">
            The Standard of <span className="text-primary italic">Trust.</span>
          </h2>
          <div className="h-1 w-24 bg-primary mt-8 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-accent/10 backdrop-blur-xl p-12 rounded-[3.5rem] border border-primary/5 relative group transition-all duration-500 hover:bg-background hover:shadow-2xl hover:shadow-primary/10 flex flex-col items-center text-center"
            >
              <div className="absolute top-10 right-10 text-primary/20 transition-transform group-hover:scale-125 duration-500">
                <Quote className="w-16 h-16 fill-current" />
              </div>
              
              <div className="flex gap-1 mb-10">
                {[...Array(t.rating || 5)].map((star, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-12 relative z-10 italic">
                &quot;{t.content}&quot;
              </p>
              
              <div className="mt-auto flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-md rounded-full transform group-hover:scale-125 transition-transform duration-500" />
                  <img 
                    src={t.image_url || `https://i.pravatar.cc/150?u=${t.id}`} 
                    alt={t.name} 
                    className="w-20 h-20 rounded-full border-4 border-background relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <div>
                  <h4 className="font-heading font-black text-2xl group-hover:text-primary transition-colors uppercase">{t.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em] mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
