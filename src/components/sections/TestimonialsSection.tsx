"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const CLIENT_LOGOS = [
  "ZEMEN BANK",
  "ETHIO TELECOM",
  "AFRICAN UNION",
  "BGI ETHIOPIA",
  "MIDROC",
  "NBE"
];

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });
      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        // Fallback for demo if no data
        setTestimonials([
          { id: 1, name: "Elias Solomon", role: "CEO, Zemen Bank", content: "Makitex delivered our headquarters ahead of schedule with craftsmanship that exceeded our international benchmarks.", rating: 5 },
          { id: 2, name: "Sara Bekele", role: "Lead Architect", content: "The attention to detail and ability to handle complex structural challenges makes them our go-to partner.", rating: 5 },
          { id: 3, name: "Aman T.", role: "Operations Director", content: "Their commitment to safety and sustainable practices completely changed our industrial park facade.", rating: 5 },
        ]);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-40 bg-background relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <Container>
        <div className="flex flex-col items-center text-center mb-20 max-w-2xl mx-auto">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Client Feedback</span>
          <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter leading-[0.9]">
            The Standard of <span className="text-primary italic">Trust.</span>
          </h2>
        </div>

        <div className="mb-32">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-16"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.id || i} className="h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-accent/10 backdrop-blur-xl p-6 sm:p-8 md:p-10 h-full rounded-[2.5rem] md:rounded-[3.5rem] border border-primary/5 relative group transition-all duration-500 hover:bg-background hover:shadow-2xl hover:shadow-primary/10 flex flex-col items-center text-center"
                >
                  <div className="absolute top-6 right-6 md:top-10 md:right-10 text-primary/20 transition-transform group-hover:scale-125 duration-500">
                    <Quote className="w-8 h-8 md:w-12 md:h-12 fill-current" />
                  </div>
                  
                  <div className="flex gap-1 mb-6 md:mb-8">
                    {[...Array(t.rating || 5)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium mb-8 md:mb-10 relative z-10 italic line-clamp-4">
                    &quot;{t.content}&quot;
                  </p>
                  
                  <div className="mt-auto flex flex-col items-center gap-3 md:gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-md rounded-full transform group-hover:scale-125 transition-transform duration-500" />
                      <img 
                        src={t.image_url || `https://i.pravatar.cc/150?u=${t.id}`} 
                        alt={t.name} 
                        className="w-16 h-16 rounded-full border-4 border-background relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500 object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-xl group-hover:text-primary transition-colors uppercase">{t.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em] mt-1">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Client Logos Stripe */}
        <div className="border-y border-primary/10 py-10 relative overflow-hidden bg-accent/5">
          <div className="flex gap-16 min-w-max animate-spin-slow" style={{ animation: "scroll 30s linear infinite" }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
               <div key={index} className="text-2xl font-heading font-black uppercase tracking-[0.3em] text-muted-foreground/30 hover:text-primary transition-colors cursor-default select-none flex items-center gap-16">
                 {logo}
                 <span className="w-2 h-2 rounded-full bg-primary/30" />
               </div>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 2rem)); }
            }
          `}} />
        </div>
      </Container>
    </section>
  );
};
