"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: any | null;
  onSave?: () => void;
}

export const BlogEditorModal = ({ isOpen, onClose, postToEdit, onSave }: BlogEditorModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Admin",
    image_url: "",
    published: false,
    featured: false,
  });

  const supabase = createClient();

  useEffect(() => {
    if (postToEdit) {
      setFormData(postToEdit);
    } else {
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        author: "Admin",
        image_url: "",
        published: false,
        featured: false,
      });
    }
  }, [postToEdit, isOpen]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (postToEdit?.id) {
        await supabase.from("blogs").update(formData).eq("id", postToEdit.id);
      } else {
        await supabase.from("blogs").insert([formData]);
      }
      onSave?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving post.");
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
            className="fixed top-10 bottom-10 left-[10%] right-[10%] bg-card border border-border rounded-[2rem] shadow-2xl z-[210] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-border bg-accent/30">
              <h2 className="text-2xl font-heading font-black tracking-tight">{postToEdit ? "Edit Post" : "New Post"}</h2>
              <div className="flex items-center gap-4">
                <Button onClick={handleSave} disabled={loading} className="gap-2 px-6 rounded-full shadow-lg shadow-primary/20">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Post
                </Button>
                <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex flex-col md:flex-row gap-10">
              {/* Form Fields */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Title</label>
                  <input
                    type="text"
                    className="w-full p-4 border rounded-xl bg-background outline-none font-bold text-lg focus:border-primary transition-colors"
                    placeholder="E.g., The Future of Construction"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData(prev => ({ 
                        ...prev, 
                        title, 
                        slug: !postToEdit ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug 
                      }));
                    }}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Slug</label>
                    <input
                      type="text"
                      className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors text-sm"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Category</label>
                    <input
                      type="text"
                      className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors text-sm"
                      placeholder="E.g., Innovation"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Excerpt</label>
                  <textarea
                    className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors min-h-[100px] resize-none text-sm"
                    placeholder="A brief summary for the card..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Content (Markdown)</label>
                  <textarea
                    className="w-full p-4 border rounded-xl bg-accent/20 outline-none focus:border-primary transition-colors min-h-[400px] text-sm font-mono border-l-4 focus:border-l-primary"
                    placeholder="# Main Heading\n\nStart writing your post..."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
              </div>

              {/* Sidebar Settings */}
              <div className="w-full md:w-80 space-y-8 border-l border-border pl-0 md:pl-10">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block">Featured Image URL</label>
                  <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-4 overflow-hidden relative group">
                    {formData.image_url ? (
                      <img src={formData.image_url} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs font-bold">No Image</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-xl bg-background outline-none focus:border-primary transition-colors text-xs"
                    placeholder="https://images.unsplash..."
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Publishing</label>
                  
                  <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-accent/20 transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-primary" 
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    />
                    <span className="font-bold text-sm">Publish Immediately</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-accent/20 transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-primary" 
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                    <span className="font-bold text-sm">Feature on Homepage</span>
                  </label>
                </div>
                
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Author</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-xl bg-background outline-none focus:border-primary transition-colors text-sm"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
