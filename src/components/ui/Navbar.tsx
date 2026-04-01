"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { QuoteModal } from "./QuoteModal";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled 
          ? "top-4 px-4 sm:px-8" 
          : "top-0 px-0"
      }`}>
        <div className={`mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled 
            ? "max-w-[1200px] w-full bg-background/80 backdrop-blur-2xl border border-primary/20 shadow-[0_20px_60px_-15px_rgba(0,128,128,0.15)] rounded-[2.5rem] py-3 px-6 sm:px-8" 
            : "max-w-[1400px] w-full px-6 sm:px-12 py-8 bg-transparent"
        }`}>
          <div className="scale-90 sm:scale-100 origin-left">
            <Logo />
          </div>
          
          <nav className="hidden xl:flex items-center gap-1 lg:gap-4 bg-accent/20 px-4 py-1.5 rounded-full border border-primary/5">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[10px] lg:text-[11px] font-black hover:text-primary transition-all duration-300 uppercase tracking-widest px-3 py-2 rounded-full hover:bg-white/10 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button size="sm" onClick={() => setIsQuoteOpen(true)} className="rounded-full px-6 lg:px-8 h-10 lg:h-12 text-[10px] lg:text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all overflow-hidden group relative">
              <span className="relative z-10 flex items-center gap-2">Initiate <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 animate-pulse-slow block" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Button>
          </div>

          <button 
            className="xl:hidden p-3 bg-accent/20 rounded-full transition-colors border border-primary/10 hover:bg-primary hover:text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-background/95 backdrop-blur-2xl shadow-2xl z-[70] p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <Logo />
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    className="text-3xl font-heading font-black tracking-tight hover:text-primary transition-colors flex items-center gap-4 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-xs font-bold text-muted-foreground group-hover:text-primary leading-none transition-colors">
                      /
                    </span>
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto">
                <Button onClick={() => { setIsMenuOpen(false); setIsQuoteOpen(true); }} className="w-full h-16 rounded-2xl text-lg font-bold">
                  Book a Consultation
                </Button>
                <div className="mt-8 pt-8 border-t flex flex-col gap-2">
                   <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Contact</p>
                   <p className="font-heading font-bold text-lg">info@makitex.com</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
};
