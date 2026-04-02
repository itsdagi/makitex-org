"use client";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ArrowUp } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

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

const Twitter = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();

  const socials = [
    { Icon: Instagram, link: settings.social_instagram || "#" },
    { Icon: Facebook, link: settings.social_facebook || "#" },
    { Icon: Linkedin, link: settings.social_linkedin || "#" },
    { Icon: Twitter, link: settings.social_twitter || "#" }
  ];

  return (
    <footer className="py-24 bg-accent/20 border-t border-primary/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/b bg-gradient-to-t from-transparent to-primary/5 blur-[100px] -z-10" />
      
      <Container className="grid lg:grid-cols-4 gap-20">
        <div className="col-span-2">
          <Logo className="mb-10" />
          <p className="max-w-md text-xl text-muted-foreground leading-relaxed font-body font-medium">
             Designing, Building and Delivering iconic structures across Ethiopia. Makitex Trading PLC is where architectural vision meets industrial strength.
          </p>
          
          <div className="flex gap-4 mt-12">
             {socials.map(({ Icon, link }, i) => (
               <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-2 shadow-sm shadow-primary/5">
                 <Icon className="w-6 h-6" />
               </a>
             ))}
          </div>
        </div>

        <div>
           <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-10">Quick Navigation</h4>
           <div className="flex flex-col gap-6">
              {["Services", "Projects", "About", "Testimonials", "Contact"].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xl font-heading font-black hover:text-primary transition-colors flex items-center gap-2 group">
                   <span className="w-4 h-0.5 bg-primary/20 transition-all duration-300 group-hover:w-8 group-hover:bg-primary" />
                   {item}
                </a>
              ))}
           </div>
        </div>

        <div className="flex flex-col">
           <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-10">Headquarters</h4>
           <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Location</p>
                 <p className="font-heading font-black text-lg">Adwa Bridge Road, <br />Nati Irb Bldg, 3rd Floor,<br />Addis Ababa, Ethiopia</p>
              </div>
              <div className="flex flex-col gap-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Inquiries</p>
                 <p className="font-heading font-black text-base leading-relaxed">makitextrading@gmail.com<br />+251 71 485 7133<br />+251 91 326 4556</p>
              </div>
           </div>
           
           <button 
             onClick={scrollToTop}
             className="mt-auto ml-auto w-20 h-20 rounded-full border border-primary/20 flex flex-col items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 hover:scale-110 active:scale-95 group shadow-2xl shadow-primary/10"
           >
              <ArrowUp className="w-8 h-8 group-hover:-translate-y-2 transition-transform" />
              <span className="text-[8px] font-black uppercase tracking-widest mt-1">TOP</span>
           </button>
        </div>
      </Container>

      <div className="border-t border-primary/5 mt-24 pt-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">
        &copy; {currentYear} Makitex Trading PLC. Designed & Built for the Future.
      </div>
    </footer>
  );
};
