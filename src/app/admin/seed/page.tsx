"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Database, Shield, Lock, CheckCircle2, AlertCircle } from "lucide-react";

export default function SeedPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const seedData = async () => {
    setStatus("loading");
    setMessage("Seeding tables...");

    try {
      // 1. Initial Hero Settings
      const settings = [
        { key: 'hero_badge', value: 'Pioneering the Urban Horizon', category: 'hero' },
        { key: 'hero_title', value: 'Design Beyond Build.', category: 'hero' },
        { key: 'hero_description', value: 'Makitex Trading PLC integrates cutting-edge architecture with industrial-grade construction to deliver timeless masterpieces.', category: 'hero' },
        { key: 'hero_phone', value: '+251 911 234 567', category: 'hero' },
        { key: 'about_title', value: 'The Makitex Standard', category: 'about' },
        { key: 'about_description', value: 'Founded on the principles of precision and innovation, Makitex Trading PLC has evolved into a premier architectural and construction firm in East Africa.', category: 'about' }
      ];

      for (const s of settings) {
        await supabase.from('site_settings').upsert(s, { onConflict: 'key' });
      }

      // 2. Initial Services
      const services = [
        { title: 'Architectural Design', description: 'Bespoke architectural solutions that harmonize aesthetics with functional excellence.', icon: 'Pencil', display_order: 1 },
        { title: 'General Construction', description: 'Turnkey construction services for commercial, residential, and industrial sectors.', icon: 'Hammer', display_order: 2 },
        { title: 'Interior Excellence', description: 'Curated interior spaces that reflect identity and foster inspiration.', icon: 'Layout', display_order: 3 },
        { title: 'Landscape Integration', description: 'Sustainable outdoor environments that bridge the gap between nature and structure.', icon: 'Trees', display_order: 4 }
      ];

      for (const s of services) {
        await supabase.from('services').upsert(s, { onConflict: 'title' });
      }

      // 3. Initial Testimonials
      const testimonials = [
        { name: 'Elias Solomon', role: 'CEO, Zemen Bank', content: 'Makitex delivered our headquarters ahead of schedule with craftsmanship that exceeded our international benchmarks.', rating: 5, display_order: 1 },
        { name: 'Sara Bekele', role: 'Lead Architect', content: 'The attention to detail and ability to handle complex structural challenges makes them our go-to partner.', rating: 5, display_order: 2 }
      ];

      for (const t of testimonials) {
        await supabase.from('testimonials').upsert(t, { onConflict: 'name' });
      }

      setStatus("success");
      setMessage("Database seeded successfully!");
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-accent/10 py-32">
      <Container className="max-w-3xl">
        <div className="bg-white rounded-[4rem] p-16 shadow-2xl border border-primary/5">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
              <Database className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-black uppercase tracking-tight">System Seed.</h1>
              <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px]">Setup Initial Admin Content</p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-10 bg-accent rounded-3xl border border-primary/5">
               <div className="flex items-center gap-4 mb-6">
                 <Shield className="w-6 h-6 text-primary" />
                 <h3 className="font-heading font-black uppercase">1. Admin Credentials</h3>
               </div>
               <p className="text-sm text-muted-foreground mb-8">Please manually create this user in your Supabase Auth dashboard before logging in.</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-background rounded-2xl border border-primary/5 flex flex-col gap-1">
                     <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Email</span>
                     <span className="font-bold">admin@makitex.com</span>
                  </div>
                  <div className="p-6 bg-background rounded-2xl border border-primary/5 flex flex-col gap-1">
                     <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Password</span>
                     <span className="font-bold">Admin123!</span>
                  </div>
               </div>
            </div>

            <div className="p-10 bg-primary/5 rounded-3xl border border-primary/10">
               <div className="flex items-center gap-4 mb-6">
                 <Lock className="w-6 h-6 text-primary" />
                 <h3 className="font-heading font-black uppercase">2. Content Initialization</h3>
               </div>
               <p className="text-sm text-muted-foreground mb-8">Click below to populate the database with original Makitex content for services and front page text.</p>
               
               <Button 
                 onClick={seedData} 
                 disabled={status === "loading" || status === "success"}
                 className="w-full h-20 rounded-2xl text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/20"
               >
                 {status === "loading" ? "Initializing..." : status === "success" ? "System Ready" : "Start Seeding Data"}
               </Button>
            </div>

            {status !== "idle" && (
              <div className={`p-8 rounded-2xl flex items-center gap-4 ${
                status === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"
              }`}>
                {status === "success" ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                <p className="font-bold uppercase tracking-widest text-xs">{message}</p>
              </div>
            )}
          </div>
          
          <div className="mt-16 pt-12 border-t border-primary/5 text-center">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Once seeded, navigate to /admin/login</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
