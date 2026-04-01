"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      router.push("/admin");
    } else {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background p-12 lg:p-16 rounded-[4rem] shadow-2xl w-full max-w-xl border border-primary/5 relative z-10 mx-4"
      >
        <div className="flex flex-col items-center mb-16">
          <Logo className="mb-10 scale-125" />
          <div className="h-1 w-20 bg-primary/20 rounded-full mb-6" />
          <h2 className="text-4xl font-heading font-black text-center uppercase tracking-tight leading-none">
            Corporate <span className="text-primary">Admin</span>
          </h2>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Internal Email</label>
              <input 
                type="email" 
                placeholder="admin@makitex.com" 
                required
                className="w-full h-18 bg-accent/30 px-8 rounded-3xl border border-primary/5 outline-none focus:border-primary/40 focus:bg-background transition-all font-medium" 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Security Key</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                className="w-full h-18 bg-accent/30 px-8 rounded-3xl border border-primary/5 outline-none focus:border-primary/40 focus:bg-background transition-all font-medium" 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-20 rounded-3xl text-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </Button>
          
          <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] mt-4 opacity-50">
            For Authorized Makitex Personnel Only
          </p>
        </form>
      </motion.div>
    </div>
  );
}
