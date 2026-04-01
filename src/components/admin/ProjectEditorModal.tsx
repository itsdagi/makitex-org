"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";

interface ProjectEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: any | null;
  onSave?: () => void;
}

export const ProjectEditorModal = ({ isOpen, onClose, projectToEdit, onSave }: ProjectEditorModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    category: "",
    client: "",
    location: "",
    completion_year: new Date().getFullYear(),
    image_url: "",
    gallery_images: [] as string[],
    featured: false,
    display_order: 0,
  });

  const supabase = createClient();

  useEffect(() => {
    if (projectToEdit) {
      setFormData(projectToEdit);
    } else {
      setFormData({
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "",
        client: "",
        location: "",
        completion_year: new Date().getFullYear(),
        image_url: "",
        gallery_images: [],
        featured: false,
        display_order: 0,
      });
    }
  }, [projectToEdit, isOpen]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (projectToEdit?.id) {
        await supabase.from("projects").update(formData).eq("id", projectToEdit.id);
      } else {
        await supabase.from("projects").insert([formData]);
      }
      onSave?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving project.");
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
            className="fixed top-10 bottom-10 left-[10%] right-[10%] bg-white border border-border rounded-[2rem] shadow-2xl z-[210] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-primary/10 bg-accent/30">
              <h2 className="text-3xl font-heading font-black tracking-tight">{projectToEdit ? "Edit Project" : "New Project"}</h2>
              <div className="flex items-center gap-4">
                <Button onClick={handleSave} disabled={loading} className="gap-2 px-8 rounded-full shadow-lg h-12">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Save Asset
                </Button>
                <button onClick={onClose} className="p-3 hover:bg-black/5 rounded-full transition-colors flex items-center justify-center">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 flex flex-col lg:flex-row gap-12">
              <div className="flex-1 space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Project Title</label>
                  <input
                    type="text"
                    className="w-full p-5 border rounded-2xl bg-accent/20 outline-none font-bold text-xl focus:border-primary transition-colors"
                    placeholder="E.g., Central Skyline"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData(prev => ({ 
                        ...prev, 
                        title, 
                        slug: !projectToEdit ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug 
                      }));
                    }}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Category</label>
                    <input
                      type="text"
                      className="w-full p-4 border rounded-2xl bg-accent/10 outline-none focus:border-primary transition-colors text-sm font-medium"
                      placeholder="Residential, Commercial, etc."
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Location</label>
                    <input
                      type="text"
                      className="w-full p-4 border rounded-2xl bg-accent/10 outline-none focus:border-primary transition-colors text-sm font-medium"
                      placeholder="Addis Ababa"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Client Name</label>
                    <input
                      type="text"
                      className="w-full p-4 border rounded-2xl bg-accent/10 outline-none focus:border-primary transition-colors text-sm font-medium"
                      value={formData.client}
                      onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Completion Year</label>
                    <input
                      type="number"
                      className="w-full p-4 border rounded-2xl bg-accent/10 outline-none focus:border-primary transition-colors text-sm font-medium"
                      value={formData.completion_year}
                      onChange={(e) => setFormData(prev => ({ ...prev, completion_year: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Short Description</label>
                  <textarea
                    className="w-full p-5 border rounded-2xl bg-accent/10 outline-none focus:border-primary transition-colors min-h-[120px] resize-none text-sm font-medium"
                    placeholder="Brief summary for the portfolio card..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>

              {/* Sidebar Settings */}
              <div className="w-full lg:w-[400px] space-y-10 border-l border-primary/10 pl-0 lg:pl-12">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Main Hero Image (URL)</label>
                  <div className="aspect-[4/3] w-full bg-accent/20 rounded-[2rem] border-2 border-dashed border-primary/20 flex items-center justify-center mb-6 overflow-hidden relative group">
                    {formData.image_url ? (
                      <img src={formData.image_url} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground opacity-60">
                        <ImageIcon className="w-10 h-10 mb-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Upload</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    className="w-full p-4 border rounded-xl bg-accent/10 outline-none focus:border-primary transition-colors text-xs"
                    placeholder="https://images.unsplash..."
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Display Settings</label>
                  
                  <label className="flex items-center justify-between p-5 border border-primary/10 rounded-2xl cursor-pointer hover:bg-accent/10 transition-colors">
                    <span className="font-bold text-sm tracking-wide">Feature on Homepage</span>
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-primary" 
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
