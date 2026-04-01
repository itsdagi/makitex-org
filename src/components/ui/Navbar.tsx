"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-background/70 backdrop-blur-xl border-b border-border/40 py-2" 
          : "bg-transparent py-6"
      }`}>
        <Container className="flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-bold hover:text-primary transition-all duration-300 uppercase tracking-[0.2em] font-body relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <Button size="sm" className="rounded-full px-6 font-bold shadow-lg shadow-primary/20">
              Get Started
            </Button>
          </nav>

          <button 
            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </Container>
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
                <Button className="w-full h-16 rounded-2xl text-lg font-bold">
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
    </>
  );
};
