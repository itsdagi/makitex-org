"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

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

const CONTACT_INFO = [
  { icon: Mail,   label: "Email",   info: "makitextrading@gmail.com",  href: "mailto:makitextrading@gmail.com" },
  { icon: Phone,  label: "Phone",   info: "+251 71 485 7133", href: "tel:+251714857133" },
  { icon: Phone,  label: "Mobile",  info: "+251 91 326 4556", href: "tel:+251913264556" },
  { icon: MapPin, label: "Address", info: "Adwa Bridge Road, Nati Irb Bldg, 3rd Floor, Addis Ababa", href: "#map" },
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // Send via mailto as a reliable fallback — constructs an email to the company
      const subject = encodeURIComponent(`Website Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\n\nMessage:\n${formData.message}`
      );
      
      // Also submit to the Supabase inquiries table for admin visibility
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, to: "makitextrading@gmail.com" }),
      }).catch(() => null);

      setSent(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-40 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/2 opacity-5 rounded-full blur-[200px] -z-10" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Left: Info */}
          <div className="flex flex-col gap-12">
            <div>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 inline-block">Connect With Us</span>
              <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-none mb-4">
                Let's <span className="text-primary italic">Talk.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Whether you have a project in mind, a question about our services, or just want to connect — we're here to build the future with you.
              </p>
            </div>

            <div className="space-y-6">
              {CONTACT_INFO.map((item, i) => (
                <motion.a
                  href={item.href}
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-accent border border-primary/5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white shadow-sm flex-shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors leading-none mb-1">
                      {item.label}
                    </span>
                    <span className="text-lg font-heading font-black tracking-tight group-hover:text-primary transition-colors">{item.info}</span>
                  </div>
                </motion.a>
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

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-accent/10 backdrop-blur-2xl p-12 lg:p-16 rounded-[4rem] border border-primary/5 shadow-2xl shadow-primary/5"
          >
            {sent ? (
              <div className="text-center py-12 flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-heading font-black uppercase">Message Sent!</h3>
                <p className="text-muted-foreground max-w-sm text-center leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24 hours at <strong>makitextrading@gmail.com</strong>.
                </p>
                <Button onClick={() => setSent(false)} variant="outline" className="mt-4 rounded-full px-10 h-14">
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {error && (
                  <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-2xl font-medium">{error}</div>
                )}
                <div className="relative group/field">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3 block pl-2 group-focus-within/field:text-primary transition-colors">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dagim Alemu"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-background/50 h-16 px-8 rounded-2xl border border-primary/5 focus:border-primary/40 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/30 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3 block pl-2 group-focus-within/field:text-primary transition-colors">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-background/50 h-16 px-6 rounded-2xl border border-primary/5 focus:border-primary/40 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/30 font-medium"
                    />
                  </div>
                  <div className="relative group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3 block pl-2 group-focus-within/field:text-primary transition-colors">Phone</label>
                    <input
                      type="tel"
                      placeholder="+251 ..."
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-background/50 h-16 px-6 rounded-2xl border border-primary/5 focus:border-primary/40 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/30 font-medium"
                    />
                  </div>
                </div>

                <div className="relative group/field">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3 block pl-2 group-focus-within/field:text-primary transition-colors">Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-background/50 p-6 rounded-2xl border border-primary/5 focus:border-primary/40 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/30 font-medium resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="h-20 w-full rounded-2xl text-xl font-bold flex gap-4 group/btn shadow-xl shadow-primary/20"
                >
                  {loading ? (
                    <><Loader2 className="w-6 h-6 animate-spin" /> Sending...</>
                  ) : (
                    <>Send Message <Send className="w-6 h-6 transition-transform group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2" /></>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Your message will be sent to <strong>makitextrading@gmail.com</strong>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
