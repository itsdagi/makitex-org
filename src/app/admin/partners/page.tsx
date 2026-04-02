"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, Loader2, Pencil, Link2, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
}

export default function PartnersManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => { fetchPartners(); }, []);

  async function fetchPartners() {
    setLoading(true);
    const { data } = await supabase.from("partners").select("*").order("display_order", { ascending: true });
    if (data) setPartners(data);
    setLoading(false);
  }

  async function addPartner() {
    const newPartner = { name: "Partner Name", logo_url: "", display_order: partners.length + 1 };
    const { data } = await supabase.from("partners").insert([newPartner]).select();
    if (data) { setPartners([...partners, data[0]]); setEditingId(data[0].id); }
  }

  async function updatePartner(partner: Partner) {
    setSaving(true);
    await supabase.from("partners").update(partner).eq("id", partner.id);
    setEditingId(null);
    setSaving(false);
  }

  async function deletePartner(id: string) {
    if (!confirm("Remove this partner?")) return;
    await supabase.from("partners").delete().eq("id", id);
    setPartners(partners.filter(p => p.id !== id));
  }

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="flex flex-col gap-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading font-black tracking-tighter uppercase mb-2">Partners.</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px]">Ticker Logos & Names</p>
        </div>
        <Button onClick={addPartner} className="h-16 px-10 rounded-2xl flex items-center gap-3 bg-primary text-white shadow-xl shadow-primary/20">
          <Plus className="w-5 h-5" />
          <span className="font-black uppercase tracking-widest text-[11px]">Add Partner</span>
        </Button>
      </header>

      {partners.length === 0 && (
        <div className="text-center py-20 bg-zinc-950 rounded-[2rem] border border-zinc-800 text-muted-foreground">
          No partners yet. Click "Add Partner" above.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col gap-6 ${
                editingId === partner.id
                  ? "bg-zinc-900 border-primary shadow-2xl scale-[1.02]"
                  : "bg-zinc-950 border-zinc-800 hover:border-primary/40"
              }`}
            >
              {editingId === partner.id ? (
                <>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground block">Company Name</label>
                    <input
                      className="w-full bg-zinc-800 text-white p-4 rounded-2xl border-none outline-none font-black uppercase"
                      value={partner.name}
                      onChange={(e) => setPartners(partners.map(p => p.id === partner.id ? {...p, name: e.target.value} : p))}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground block">Logo URL (Optional)</label>
                    <input
                      type="url"
                      className="w-full bg-zinc-800 text-white p-4 rounded-2xl border-none outline-none font-medium"
                      placeholder="https://..."
                      value={partner.logo_url || ""}
                      onChange={(e) => setPartners(partners.map(p => p.id === partner.id ? {...p, logo_url: e.target.value} : p))}
                    />
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button onClick={() => updatePartner(partner)} disabled={saving} className="flex-1 h-12 rounded-2xl">
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setEditingId(null)} className="h-12 px-6 rounded-2xl border-zinc-700 text-white hover:bg-zinc-800">
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {partner.logo_url ? (
                      <img src={partner.logo_url} alt={partner.name} className="h-10 w-20 object-contain" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-heading font-black uppercase text-white">{partner.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{partner.logo_url ? "Logo" : "Text only"}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingId(partner.id)} className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => deletePartner(partner.id)} className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Live Preview */}
      {partners.length > 0 && (
        <div className="mt-8 p-8 bg-zinc-950 border border-zinc-800 rounded-[2rem]">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-6">Preview — Ticker Strip</p>
          <div className="border-y border-zinc-800 py-6 overflow-hidden">
            <div className="flex gap-12 flex-wrap">
              {partners.map((p) => (
                <div key={p.id} className="flex items-center gap-4 text-white font-heading font-black uppercase tracking-widest opacity-60">
                  {p.logo_url ? <img src={p.logo_url} alt={p.name} className="h-6 object-contain" /> : <span>{p.name}</span>}
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
