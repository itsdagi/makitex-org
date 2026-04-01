"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowDownRight } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const textRevealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] as any }
  }),
};

const FlipCard = ({ front, back, delay = 0 }: { front: string; back: any; delay?: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 60, rotate: 2 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 1.2, delay: 0.6 + delay, ease: [0.22, 1, 0.36, 1] as any }}
      className="group relative h-72 md:h-80 w-full perspective-2000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative h-full w-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5 bg-black">
          <motion.img 
            src={front} 
            alt="Project" 
            className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
            whileHover={{ scale: 1.15 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent p-10 flex flex-col justify-end">
            <h3 className="text-white font-heading font-black text-2xl mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{back.title}</h3>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] opacity-80">{back.meta}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-[3.5rem] bg-primary p-12 flex flex-col justify-between text-white shadow-2xl overflow-hidden shadow-primary/40">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full scale-110">
                 <path d="M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80 M20 0 L20 100 M40 0 L40 100 M60 0 L60 100 M80 0 L80 100" stroke="white" strokeWidth="0.8" fill="none" />
              </svg>
           </div>

          <div className="relative z-10">
            <h4 className="font-heading font-black text-3xl mb-6 leading-tight">{back.title}</h4>
            <p className="text-sm text-white/95 leading-relaxed font-semibold italic opacity-90">{back.description}</p>
          </div>
          
          <div className="relative z-10 flex justify-between items-end border-t border-white/20 pt-8 mt-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Location</span>
              <span className="text-[12px] font-black uppercase tracking-widest">{back.location || "Addis Ababa"}</span>
            </div>
            <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/40 hover:bg-white hover:text-primary transition-all duration-500 rounded-full text-[10px] font-black uppercase tracking-widest h-12 px-8">
              Explore
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const { settings, loading } = useSettings();

  const heroBadge = settings.hero_badge || "Pioneering the Urban Horizon";
  const heroTitle = settings.hero_title || "Design Beyond Build.";
  const heroDescription = settings.hero_description || "Makitex Trading PLC integrates cutting-edge architecture with industrial-grade construction to deliver timeless masterpieces.";
  const heroPhone = settings.hero_phone || "+251 911 234 567";

  return (
    <section className="relative min-h-[110vh] flex items-center overflow-hidden bg-background pt-32 pb-40">
      {/* Dynamic Parallax Background Elements */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 overflow-hidden -z-10"
      >
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-primary/5 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 blur-[130px] rounded-full" 
        />
      </motion.div>

      <Container className="grid lg:grid-cols-2 gap-24 items-center">
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 50]) }} className="flex flex-col gap-10">
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <motion.span
                custom={1}
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-10 border border-primary/20 backdrop-blur-sm"
              >
                {heroBadge}
              </motion.span>
            </div>
            
            <div className="overflow-hidden mb-2">
              <motion.h1
                 key={heroTitle}
                 custom={2}
                 variants={textRevealVariants}
                 initial="hidden"
                 animate="visible"
                 className="text-7xl md:text-8xl lg:text-[10rem] font-heading font-black tracking-tighter leading-[0.75] uppercase"
              >
                 {heroTitle.includes('.') ? (
                   <>
                     {heroTitle.split('.')[0]}<br />
                     <span className="text-primary italic">{heroTitle.split('.')[1]}</span>
                   </>
                 ) : (
                   heroTitle
                 )}
              </motion.h1>
            </div>
            
            <div className="overflow-hidden mt-8">
              <motion.p
                 key={heroDescription}
                 custom={3}
                 variants={textRevealVariants}
                 initial="hidden"
                 animate="visible"
                 className="max-w-lg text-2xl text-muted-foreground leading-relaxed font-medium"
              >
                 {heroDescription}
              </motion.p>
            </div>
          </div>

          <motion.div
            custom={4}
            variants={textRevealVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-8 mt-4"
          >
            <Button size="lg" className="h-20 px-12 text-xl font-black rounded-[2rem] group relative overflow-hidden transition-all duration-500 shadow-2xl shadow-primary/30">
               <span className="relative z-10 flex items-center gap-3">
                 View Our Projects <ArrowDownRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
               </span>
               <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Button>
            
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Inquiry Line</span>
               <span className="text-2xl font-heading font-black">{heroPhone}</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-10 items-center">
          <div className="space-y-10">
            <FlipCard 
              front="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
              back={{ title: "Apex Tower", description: "Glass-sheathed commercial skyscraper redefined for the 21st century.", meta: "Landmark Project" }}
            />
            <FlipCard 
              front="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"
              back={{ title: "Bole Estate", description: "Minimalist luxury residential villas with private courtyards and smart automation.", meta: "Exclusive Living" }}
              delay={0.2}
            />
          </div>
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
            className="hidden xl:flex flex-col gap-10 mt-32"
          >
            <FlipCard 
              front="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"
              back={{ title: "Grand Atrium", description: "A multi-use public space bridging modern architecture with sustainable landscape.", meta: "Civil Work" }}
              delay={0.4}
            />
            <div className="h-80 bg-accent/20 rounded-[3.5rem] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-10 text-center backdrop-blur-md group hover:border-primary/50 transition-colors">
               <motion.span 
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="text-primary font-heading font-black text-7xl mb-4"
               >
                 40+
               </motion.span>
               <p className="text-xs uppercase font-black tracking-[0.3em] text-muted-foreground leading-tight">Decades of combined <br /> Industrial experience</p>
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer z-20 group"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground group-hover:text-primary transition-colors">Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};
