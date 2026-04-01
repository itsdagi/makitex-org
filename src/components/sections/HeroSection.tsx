"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
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

const FlipCard = ({ front, back, delay = 0, autoFlipInterval = 5000 }: { front: string; back: any; delay?: number; autoFlipInterval?: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, autoFlipInterval + delay * 1000);
    return () => clearInterval(interval);
  }, [isHovered, autoFlipInterval, delay]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 60, rotateY: 45, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.6 + delay, ease: [0.22, 1, 0.36, 1] as any }}
      className="group relative h-80 sm:h-96 md:h-[28rem] w-full perspective-[2000px] cursor-pointer"
      onMouseEnter={() => { setIsHovered(true); setIsFlipped(true); }}
      onMouseLeave={() => { setIsHovered(false); setIsFlipped(false); }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative h-full w-full preserve-3d"
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face (Image) */}
        <div 
          className="absolute inset-0 backface-hidden rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-black border border-white/10"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.img 
            src={front} 
            alt="Project" 
            className="absolute inset-0 h-full w-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
          />
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-black/40 to-transparent p-6 sm:p-8 md:p-10 flex flex-col justify-end opacity-90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 sm:p-8 md:p-10 flex flex-col justify-end z-10">
            <h3 
              className="text-white font-heading font-black text-2xl sm:text-3xl md:text-4xl mb-1 translate-y-4 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out"
              style={{ transform: "translateZ(30px)" }}
            >
              {back.title}
            </h3>
            <p className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] opacity-80 shadow-black drop-shadow-md">
              {back.meta}
            </p>
          </div>
        </div>

        {/* Back Face (Details + Glassmorphism) */}
        <div 
          className="absolute inset-0 backface-hidden rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] bg-black/60 p-8 sm:p-10 flex flex-col items-center justify-center text-center text-white border border-white/10 backdrop-blur-[40px] shadow-2xl overflow-hidden group/back"
          style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
        >
           {/* Elegant Radial Glow */}
           <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.25)_0%,transparent_70%)] opacity-0 group-hover/back:opacity-100 transition-opacity duration-1000 pointer-events-none blur-[50px]" />

          <div className="relative z-10 transform-style-3d flex flex-col items-center w-full" style={{ transform: "translateZ(30px)" }}>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary mb-4 opacity-90 drop-shadow-md">
              {back.location || "Addis Ababa"}
            </span>
            
            <h4 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-6 drop-shadow-2xl px-4">{back.title}</h4>
            
            <div className="h-[2px] w-12 bg-primary/30 mb-6" />
            
            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-medium italic opacity-90 drop-shadow-md line-clamp-3 px-2 max-w-[90%]">
              {back.description}
            </p>
            
            <div style={{ transform: "translateZ(20px)" }} className="mt-8">
              <Link 
                href={`/projects/${back.slug || 'apex-tower'}`}
                className="group/link flex items-center justify-center h-12 md:h-14 px-8 md:px-10 rounded-full bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 group-hover/link:text-white transition-colors duration-500 delay-100">
                  Explore Project <ArrowDownRight className="w-4 h-4 md:w-5 md:h-5 group-hover/link:-rotate-45 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover/link:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </Link>
            </div>
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
            <div className="overflow-hidden pb-4">
              <motion.span
                custom={1}
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase mb-6 md:mb-10 border border-primary/20 backdrop-blur-sm shadow-xl shadow-primary/5"
              >
                {heroBadge}
              </motion.span>
            </div>
            
            <div className="overflow-visible mb-6">
              <motion.h1
                 key={heroTitle}
                 custom={2}
                 variants={textRevealVariants}
                 initial="hidden"
                 animate="visible"
                 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] font-heading font-black tracking-tighter leading-[0.85] uppercase py-2"
              >
                 {heroTitle.split(' ').map((word, idx, arr) => (
                   <span 
                     key={idx} 
                     className={idx === arr.length - 1 ? "text-primary italic inline-block" : "inline-block mr-4 md:mr-8"}
                   >
                     {word.replace('.', '')}
                     {idx === arr.length - 1 && '.'}
                   </span>
                 ))}
              </motion.h1>
            </div>
            
            <div className="overflow-hidden mt-6 md:mt-10">
              <motion.p
                 key={heroDescription}
                 custom={3}
                 variants={textRevealVariants}
                 initial="hidden"
                 animate="visible"
                 className="max-w-xl text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium pl-6 border-l-4 border-primary/40"
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
            className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-8 sm:gap-12 mt-8 md:mt-12"
          >
            <Link href="/projects" className="block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-16 md:h-20 px-8 md:px-12 text-lg md:text-xl font-black rounded-full group relative overflow-hidden transition-all duration-500 shadow-2xl shadow-primary/30 active:scale-95">
                 <span className="relative z-10 flex items-center justify-center gap-3">
                   Explore Portfolio <ArrowDownRight className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-45 transition-transform duration-500" />
                 </span>
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Button>
            </Link>
            
            <div className="flex items-center gap-6 pl-2 sm:pl-6 sm:border-l-2 border-primary/20">
               <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center animate-pulse-slow">
                 <div className="w-3 h-3 rounded-full bg-primary" />
               </div>
               <div className="flex flex-col">
                 <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-1">Direct Inquiry</span>
                 <span className="text-xl md:text-2xl font-heading font-black tracking-tight">{heroPhone}</span>
               </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-10 items-center">
          <div className="space-y-10">
            <FlipCard 
              front="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
              back={{ title: "Apex Tower", description: "Glass-sheathed commercial skyscraper redefined for the 21st century.", meta: "Landmark Project", slug: "apex-tower", location: "Kazanchis" }}
            />
            <FlipCard 
              front="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"
              back={{ title: "Bole Estate", description: "Minimalist luxury residential villas with private courtyards and smart automation.", meta: "Exclusive Living", slug: "bole-luxury-estate", location: "Bole Sub-city" }}
              delay={0.2}
            />
          </div>
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
            className="hidden xl:flex flex-col gap-10 mt-32"
          >
            <FlipCard 
              front="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"
              back={{ title: "Grand Atrium", description: "A multi-use public space bridging modern architecture with sustainable landscape.", meta: "Civil Work", slug: "grand-atrium", location: "Sarbet" }}
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
