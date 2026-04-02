"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  MoreVertical,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { BlogEditorModal } from "@/components/admin/BlogEditorModal";

import { supabase } from "@/lib/supabase";

export default function AdminBlogPage() {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchPosts = async () => {
    setFetchLoading(true);
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setAllPosts(data);
    setFetchLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const [search, setSearch] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<any>(null);

  const handleEdit = (post: any) => {
    setPostToEdit(post);
    setIsEditorOpen(true);
  };

  const handleCreate = () => {
    setPostToEdit(null);
    setIsEditorOpen(true);
  };

  return (
    <div className="flex flex-col gap-16">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading font-black tracking-tighter uppercase mb-2">Journal.</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px]">Content Management & Editorial</p>
        </div>
        
        <Button 
          onClick={handleCreate} 
          className="h-20 px-12 rounded-[2rem] flex items-center gap-4 bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
        >
           <Plus className="w-6 h-6" />
           <span className="text-xl font-heading font-black tracking-widest leading-none">New Entry</span>
        </Button>
      </header>

      {/* Filter and Search Bar */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-8 bg-zinc-950 text-white p-6 rounded-[2rem] border border-zinc-800 shadow-sm">
         <div className="flex flex-wrap items-center gap-4 p-1 bg-accent/20 rounded-xl border">
            {["All", "Published", "Drafts", "Archived"].map(t => (
               <button key={t} className="px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all hover:bg-background">
                  {t}
               </button>
            ))}
         </div>
         
         <div className="flex gap-4 w-full md:w-auto">
            <div className="relative group flex-1 md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
               <input 
                 type="text" 
                 placeholder="Search entries..." 
                 className="w-full bg-accent/20 h-14 pl-12 pr-6 rounded-xl border border-transparent focus:border-primary/30 outline-none transition-all text-sm font-medium"
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>
            <Button variant="outline" className="h-14 w-14 p-0 rounded-xl">
               <Filter className="w-5 h-5" />
            </Button>
         </div>
      </section>

      {/* Posts Table / List */}
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-12 gap-4 px-8 mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
           <div className="col-span-5">Post Title</div>
           <div className="col-span-2 text-center">Status</div>
           <div className="col-span-2 text-center">Engagement</div>
           <div className="col-span-2 text-center">Last Modified</div>
           <div className="col-span-1 text-right">Actions</div>
        </div>
        
        <div className="flex flex-col gap-4">
          {allPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group grid grid-cols-12 gap-4 p-8 bg-zinc-950 text-white border border-zinc-800 rounded-[2.5rem] items-center hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50 transition-all duration-500"
            >
               <div className="col-span-5 flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-accent overflow-hidden shadow-sm">
                    <img src={post.image_url || "https://images.unsplash.com/photo-1518005020251-095c1a2702c1?q=80&w=200"} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                 </div>
                 <div className="flex flex-col">
                    <h4 className="text-lg font-heading font-black uppercase group-hover:text-primary transition-colors">{post.title}</h4>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest italic">{post.author}</span>
                 </div>
              </div>
              
              <div className="col-span-2 flex justify-center">
                 <span className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                   post.published ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"
                 }`}>
                    {post.published ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {post.published ? "Published" : "Draft"}
                 </span>
              </div>
              
              <div className="col-span-2 text-center flex flex-col items-center">
                 <span className="text-xl font-heading font-black">{post.views || '0'}</span>
                 <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">Views</span>
              </div>
              
              <div className="col-span-2 text-center">
                 <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              
              <div className="col-span-1 flex justify-end gap-2">
                 <Button onClick={() => handleEdit(post)} variant="outline" className="h-12 w-12 p-0 rounded-xl border-primary/5 hover:bg-primary hover:text-white transition-all">
                    <Edit2 className="w-4 h-4" />
                 </Button>
                 <Button 
                   onClick={async () => {
                     if (confirm("Are you sure?")) {
                       await supabase.from("blogs").delete().eq("id", post.id);
                       fetchPosts();
                     }
                   }}
                   variant="outline" className="h-12 w-12 p-0 rounded-xl border-primary/5 hover:bg-destructive hover:text-white hover:border-destructive transition-all">
                    <Trash2 className="w-4 h-4" />
                 </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 bg-accent/30 p-12 rounded-[3.5rem] border border-primary/5">
         <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Engagement Factor</span>
            <div className="flex items-end gap-3">
               <h3 className="text-5xl font-heading font-black">2.4K</h3>
               <span className="text-emerald-500 text-xs font-black mb-1.5">+14.2%</span>
            </div>
            <p className="text-[11px] font-medium text-muted-foreground italic mt-2 uppercase tracking-tight opacity-70">Average read time: 4.5 minutes</p>
         </div>
      </div>

      <BlogEditorModal 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        postToEdit={postToEdit} 
        onSave={() => fetchPosts()}
      />
    </div>
  );
}
