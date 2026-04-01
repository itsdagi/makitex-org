"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Loader2, Globe, Layout, Info, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Setting {
  id: string;
  key: string;
  value: string;
  category: string;
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState("hero");

  useEffect(() => {
    fetchSettings();
  }, []);

  const defaultSettings = [
    { key: "hero_badge", value: "Pioneering the Urban Horizon", category: "hero" },
    { key: "hero_title", value: "Design Beyond Build.", category: "hero" },
    { key: "hero_description", value: "Makitex Trading PLC integrates cutting-edge architecture with industrial-grade construction to deliver timeless masterpieces.", category: "hero" },
    { key: "hero_phone", value: "+251 911 234 567", category: "hero" },
    { key: "about_title", value: "A Legacy Built on Concrete Promises.", category: "about" },
    { key: "about_content", value: "We are more than contractors...", category: "about" },
    { key: "contact_email", value: "hello@makitex.com", category: "contact" },
    { key: "contact_address", value: "Bole Sub-city, Addis Ababa, Ethiopia", category: "contact" },
    { key: "social_linkedin", value: "https://linkedin.com/company/makitex", category: "social" },
    { key: "social_twitter", value: "https://twitter.com/makitex", category: "social" },
    { key: "social_instagram", value: "https://instagram.com/makitex", category: "social" },
  ];

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");
    
    if (data && data.length > 0) {
      // Auto-merge missing keys
      const existingKeys = data.map(d => d.key);
      const missing = defaultSettings.filter(ds => !existingKeys.includes(ds.key));
      
      if (missing.length > 0) {
        await supabase.from("site_settings").insert(missing);
        const { data: updatedData } = await supabase.from("site_settings").select("*");
        if (updatedData) setSettings(updatedData);
      } else {
        setSettings(data);
      }
    } else if (data?.length === 0) {
       // Seed if completely empty
       await supabase.from("site_settings").insert(defaultSettings);
       setSettings(defaultSettings as any);
    }
    setLoading(false);
  }

  async function updateSetting(key: string, value: string) {
    const { error } = await supabase
      .from("site_settings")
      .update({ value, updated_at: new Date() })
      .eq("key", key);
    
    if (error) alert("Error saving: " + error.message);
  }

  const handleSaveAll = async () => {
    setSaving(true);
    for (const setting of settings) {
      await updateSetting(setting.key, setting.value);
    }
    setSaving(false);
    alert("Configurations saved successfully!");
  }

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  const categories = [
    { id: "hero", name: "Landing Page", icon: Globe },
    { id: "about", name: "About Section", icon: Info },
    { id: "contact", name: "Corporate Info", icon: Phone },
    { id: "social", name: "Social Media", icon: Globe } // Share icon would be better but globe is imported
  ];

  const filteredSettings = settings.filter(s => s.category === activeCategory);

  return (
    <div className="flex flex-col gap-12">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-5xl font-heading font-black tracking-tighter uppercase">Front Page Text.</h1>
        </div>
        <Button onClick={handleSaveAll} disabled={saving} className="h-16 px-10 rounded-2xl flex items-center gap-3">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span className="font-black uppercase tracking-widest text-[11px]">Save All</span>
        </Button>
      </header>

      <div className="flex gap-4 p-2 bg-accent/30 rounded-3xl self-start">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-3 px-8 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
              activeCategory === cat.id 
              ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105" 
              : "hover:bg-primary/10 text-muted-foreground"
            }`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {filteredSettings.map((setting) => (
          <motion.div
            key={setting.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-10 bg-white border border-primary/5 rounded-[3rem] shadow-sm flex flex-col gap-6"
          >
            <div className="flex justify-between items-center px-2">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{setting.key.split('_').join(' ')}</span>
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            
            {(setting.key.includes('description') || setting.key.includes('content') || setting.key.includes('summary')) ? (
              <textarea 
                className="w-full bg-accent/30 p-8 rounded-[2.5rem] border-none outline-none font-medium h-48 leading-relaxed focus:bg-accent/50 transition-all shadow-inner"
                value={setting.value}
                onChange={(e) => setSettings(settings.map(s => s.key === setting.key ? {...s, value: e.target.value} : s))}
              />
            ) : (
              <input 
                className="w-full bg-accent/30 p-8 rounded-[2rem] border-none outline-none font-heading font-black text-2xl uppercase tracking-tighter focus:bg-accent/50 transition-all shadow-inner"
                value={setting.value}
                onChange={(e) => setSettings(settings.map(s => s.key === setting.key ? {...s, value: e.target.value} : s))}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="p-12 bg-primary text-white rounded-[3rem] flex flex-col gap-4 mt-8 shadow-2xl shadow-primary/30 relative overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[150%] bg-white/10 blur-[80px] rounded-full rotate-12" />
         <h4 className="text-2xl font-heading font-black uppercase tracking-tight z-10">Production Note.</h4>
         <p className="text-sm font-medium opacity-80 leading-relaxed z-10 max-w-xl">These changes take effect immediately on the front page once saved. Double check for typos in headings as they are a core part of the Makitex visual identity.</p>
      </div>
    </div>
  );
}
