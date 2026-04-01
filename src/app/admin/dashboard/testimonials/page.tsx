"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, ArrowLeft, Loader2, Pencil, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });
    
    if (data) setTestimonials(data);
    setLoading(false);
  }

  async function addTestimonial() {
    const newTestimonial = {
      name: "Guest Name",
      role: "Client / Architect / CEO",
      content: "Amazing work, very professional and efficient.",
      rating: 5,
      display_order: testimonials.length + 1
    };

    const { data, error } = await supabase
      .from("testimonials")
      .insert([newTestimonial])
      .select();

    if (data) {
      setTestimonials([...testimonials, data[0]]);
      setEditingId(data[0].id);
    }
  }

  async function updateTestimonial(testimonial: Testimonial) {
    setSaving(true);
    const { error } = await supabase
      .from("testimonials")
      .update(testimonial)
      .eq("id", testimonial.id);
    
    if (!error) setEditingId(null);
    setSaving(false);
  }

  async function deleteTestimonial(id: string) {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (!error) {
      setTestimonials(testimonials.filter(t => t.id !== id));
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
          <h1 className="text-5xl font-heading font-black tracking-tighter uppercase">Feedback.</h1>
        </div>
        <Button onClick={addTestimonial} className="h-16 px-10 rounded-2xl flex items-center gap-3">
          <Plus className="w-5 h-5" />
          <span className="font-black uppercase tracking-widest text-[11px]">Add Review</span>
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-10 rounded-[3.5rem] border transition-all duration-500 flex flex-col ${
                editingId === testimonial.id 
                ? "bg-white border-primary shadow-2xl scale-[1.02]" 
                : "bg-accent/30 border-primary/5 hover:bg-white"
              }`}
            >
              {editingId === testimonial.id ? (
                <div className="flex flex-col gap-6 h-full">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Client Name</label>
                      <input 
                        className="w-full bg-accent/50 p-6 rounded-2xl border-none outline-none font-black uppercase"
                        value={testimonial.name}
                        onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? {...t, name: e.target.value} : t))}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Job Role</label>
                      <input 
                        className="w-full bg-accent/50 p-6 rounded-2xl border-none outline-none font-medium"
                        value={testimonial.role}
                        onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? {...t, role: e.target.value} : t))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Testimonial Content</label>
                    <textarea 
                      className="w-full bg-accent/50 p-6 rounded-2xl border-none outline-none font-medium h-32 italic"
                      value={testimonial.content}
                      onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? {...t, content: e.target.value} : t))}
                    />
                  </div>

                  <div className="flex gap-4 mt-auto pt-6">
                    <Button 
                      onClick={() => updateTestimonial(testimonial)} 
                      disabled={saving}
                      className="flex-1 h-16 rounded-2xl gap-3"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span className="font-black uppercase tracking-widest text-[10px]">Save Changes</span>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setEditingId(null)}
                      className="h-16 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                       <Quote className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => setEditingId(testimonial.id)} className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                          <Pencil className="w-4 h-4" />
                       </button>
                       <button onClick={() => deleteTestimonial(testimonial.id)} className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-white transition-all">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                  
                  <blockquote className="text-xl italic font-medium leading-relaxed mb-8 opacity-90">&quot;{testimonial.content}&quot;</blockquote>
                  
                  <div className="mt-auto pt-8 border-t border-primary/10 flex justify-between items-center">
                    <div className="flex flex-col">
                       <span className="text-xl font-heading font-black uppercase">{testimonial.name}</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{testimonial.role}</span>
                    </div>
                    <div className="flex gap-1">
                       {[...Array(testimonial.rating)].map((_, i) => (
                         <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                       ))}
                    </div>
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
