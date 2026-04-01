"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Instagram = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Linkedin = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

export const ContactSection = () => {
  return (
    <section id="contact" className="py-40 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/2 opacity-5 rounded-full blur-[200px] -z-10" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="flex flex-col gap-12">
            <div>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 inline-block">Connect With Us</span>
              <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-none mb-4">
                Let's <span className="text-primary italic">Talk.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Whether you have a project in mind, a question about our services, or just want to connect, we're here to help you build the future.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email", info: "info@makitex.com" },
                { icon: Phone, label: "Phone", info: "+251 911 234 567" },
                { icon: MapPin, label: "Address", info: "Addis Ababa, Ethiopia | Bole Sub-city" }
              ].map((item, i) => (
                <motion.div 
                   key={item.label}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1, duration: 0.6 }}
                   viewport={{ once: true }}
                   className="flex items-center gap-6 group"
                >
                  <div className="w-16 h-16 bg-accent border border-primary/5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white shadow-sm">
                     <item.icon className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors leading-none mb-1">
                       {item.label}
                    </span>
                    <span className="text-2xl font-heading font-black tracking-tight">{item.info}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex gap-4">
               {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                 <a key={i} href="#" className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                   <Icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-accent/10 backdrop-blur-2xl p-12 lg:p-16 rounded-[4rem] border border-primary/5 shadow-2xl shadow-primary/5 group"
          >
            <form className="flex flex-col gap-10">
              <div className="flex flex-col gap-8">
                 <div className="relative group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3 block pl-2 group-focus-within/field:text-primary transition-colors">Your Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-background/50 h-16 px-8 rounded-2xl border border-primary/5 focus:border-primary/40 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/30 font-medium" />
                 </div>
                 
                 <div className="relative group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3 block pl-2 group-focus-within/field:text-primary transition-colors">Your Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-background/50 h-16 px-8 rounded-2xl border border-primary/5 focus:border-primary/40 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/30 font-medium" />
                 </div>
                 
                 <div className="relative group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3 block pl-2 group-focus-within/field:text-primary transition-colors">Message</label>
                    <textarea rows={4} placeholder="Tell us about your project..." className="w-full bg-background/50 p-8 rounded-2xl border border-primary/5 focus:border-primary/40 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/30 font-medium" />
                 </div>
              </div>

              <Button size="lg" className="h-20 w-full rounded-2xl text-xl font-bold flex gap-4 group/btn shadow-xl shadow-primary/20">
                Send Message <Send className="w-6 h-6 transition-transform group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 group-active/btn:translate-x-0 group-active/btn:translate-y-0" />
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
