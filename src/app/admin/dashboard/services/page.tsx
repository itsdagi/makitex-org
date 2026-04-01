"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, ArrowLeft, Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });
    
    if (data) setServices(data);
    setLoading(false);
  }

  async function addService() {
    const newService = {
      title: "New Service",
      description: "Service description goes here...",
      icon: "Pencil",
      display_order: services.length + 1
    };

    const { data, error } = await supabase
      .from("services")
      .insert([newService])
      .select();

    if (data) {
      setServices([...services, data[0]]);
      setEditingId(data[0].id);
    }
  }

  async function updateService(service: Service) {
    setSaving(true);
    const { error } = await supabase
      .from("services")
      .update(service)
      .eq("id", service.id);
    
    if (!error) setEditingId(null);
    setSaving(false);
  }

  async function deleteService(id: string) {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (!error) {
      setServices(services.filter(s => s.id !== id));
    }
  }

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="flex flex-col gap-12">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-5xl font-heading font-black tracking-tighter uppercase">Services.</h1>
        </div>
        <Button onClick={addService} className="h-16 px-10 rounded-2xl flex items-center gap-3">
          <Plus className="w-5 h-5" />
          <span className="font-black uppercase tracking-widest text-[11px]">Add Service</span>
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {services.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-10 rounded-[3rem] border transition-all duration-500 ${
                editingId === service.id 
                ? "bg-white border-primary shadow-2xl scale-[1.02]" 
                : "bg-accent/30 border-primary/5 hover:bg-white"
              }`}
            >
              {editingId === service.id ? (
                <div className="flex flex-col gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Service Title</label>
                    <input 
                      className="w-full bg-accent/50 p-6 rounded-2xl border-none outline-none font-heading font-black uppercase text-xl"
                      value={service.title}
                      onChange={(e) => setServices(services.map(s => s.id === service.id ? {...s, title: e.target.value} : s))}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Description</label>
                    <textarea 
                      className="w-full bg-accent/50 p-6 rounded-2xl border-none outline-none font-medium h-32"
                      value={service.description}
                      onChange={(e) => setServices(services.map(s => s.id === service.id ? {...s, description: e.target.value} : s))}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={() => updateService(service)} 
                      disabled={saving}
                      className="flex-1 h-16 rounded-2xl gap-3"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span className="font-black uppercase tracking-widest text-[10px]">Save Changes</span>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setEditingId(null)}
                      className="h-16 px-8 rounded-2xl"
                    >
                      <span className="font-black uppercase tracking-widest text-[10px]">Cancel</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Pencil className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => setEditingId(service.id)} className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                          <Pencil className="w-4 h-4" />
                       </button>
                       <button onClick={() => deleteService(service.id)} className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-white transition-all">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                  <h3 className="text-3xl font-heading font-black uppercase mb-4">{service.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed mb-8 flex-grow">{service.description}</p>
                  <div className="pt-8 border-t border-primary/5">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">Order: {service.display_order}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
