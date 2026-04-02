"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Loader2, DollarSign, MapPin, Briefcase } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";

interface JobEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobToEdit?: any | null;
  onSave?: () => void;
}

export const JobEditorModal = ({ isOpen, onClose, jobToEdit, onSave }: JobEditorModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "Addis Ababa, Ethiopia",
    type: "Full-time",
    description: "",
    requirements: "",
    is_active: true,
  });

  const supabase = createClient();

  useEffect(() => {
    if (jobToEdit) {
      setFormData(jobToEdit);
    } else {
      setFormData({
        title: "",
        department: "",
        location: "Addis Ababa, Ethiopia",
        type: "Full-time",
        description: "",
        requirements: "",
        is_active: true,
      });
    }
  }, [jobToEdit, isOpen]);

  const handleSave = async () => {
    if (!formData.title || !formData.description) return alert("Title and description are required.");
    setLoading(true);
    try {
      if (jobToEdit?.id) {
        await supabase.from("jobs").update(formData).eq("id", jobToEdit.id);
      } else {
        await supabase.from("jobs").insert([formData]);
      }
      onSave?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed top-10 bottom-10 left-[10%] right-[10%] bg-zinc-950 text-white border border-zinc-800 rounded-[2rem] shadow-2xl z-[210] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800 bg-accent/5">
              <h2 className="text-3xl font-heading font-black tracking-tight">{jobToEdit ? "Edit Job Posting" : "New Job Posting"}</h2>
              <div className="flex items-center gap-4">
                <Button onClick={handleSave} disabled={loading} className="gap-2 px-8 rounded-full shadow-lg h-12">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Publish Job
                </Button>
                <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-10">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Job Title</label>
                <input
                  type="text"
                  className="w-full p-5 border border-zinc-800 rounded-2xl bg-zinc-900 outline-none font-bold text-xl focus:border-primary transition-colors text-white"
                  placeholder="E.g., Senior Structural Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Department</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-zinc-800 rounded-2xl bg-zinc-900 outline-none focus:border-primary transition-colors text-sm font-medium text-white"
                    placeholder="Engineering, Design, etc."
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Location</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-zinc-800 rounded-2xl bg-zinc-900 outline-none focus:border-primary transition-colors text-sm font-medium text-white"
                    placeholder="Addis Ababa"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Employment Type</label>
                  <select
                    className="w-full p-4 border border-zinc-800 rounded-2xl bg-zinc-900 outline-none focus:border-primary transition-colors text-sm font-medium text-white appearance-none"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 h-full min-h-[300px]">
                <div className="flex flex-col h-full">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Job Description</label>
                  <textarea
                    className="w-full flex-1 p-5 border border-zinc-800 rounded-2xl bg-zinc-900 outline-none focus:border-primary transition-colors resize-none text-sm font-medium text-white"
                    placeholder="Role overview..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col h-full">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Requirements (Markdown)</label>
                  <textarea
                    className="w-full flex-1 p-5 border border-zinc-800 rounded-2xl bg-zinc-900 outline-none focus:border-primary transition-colors resize-none text-sm font-medium text-white"
                    placeholder="- 5+ years experience..."
                    value={formData.requirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="border-t border-zinc-800 pt-8">
                <label className="flex items-center gap-4 cursor-pointer w-fit">
                   <input type="checkbox" checked={formData.is_active} onChange={e => setFormData(p => ({ ...p, is_active: e.target.checked }))} className="w-5 h-5 accent-primary" />
                   <span className="text-sm font-bold tracking-wide">Actively Recruiting for this position</span>
                </label>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
