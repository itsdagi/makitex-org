"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, CheckCircle2, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobEditorModal } from "@/components/admin/JobEditorModal";
import { supabase } from "@/lib/supabase";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<any>(null);

  const fetchJobs = async () => {
    setLoading(true);
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    if (data) setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (job: any) => {
    setJobToEdit(job);
    setIsEditorOpen(true);
  };

  const handleCreate = () => {
    setJobToEdit(null);
    setIsEditorOpen(true);
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading font-black tracking-tighter uppercase mb-2">Job Board.</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px]">Careers & Recruitment</p>
        </div>
        
        <Button 
          onClick={handleCreate} 
          className="h-20 px-12 rounded-[2rem] flex items-center gap-4 bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
        >
           <Plus className="w-6 h-6" />
           <span className="text-xl font-heading font-black tracking-widest leading-none">Post Job</span>
        </Button>
      </header>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-zinc-950 rounded-[2rem] border border-zinc-800">
          No job postings found. Create one above!
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job, i) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-950 text-white p-8 rounded-[2.5rem] border border-zinc-800 shadow-sm flex items-center justify-between hover:border-primary/50 transition-all"
            >
               <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                     <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <div className="flex items-center gap-4">
                        <h4 className="text-2xl font-heading font-black uppercase text-white">{job.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          job.is_active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                          {job.is_active ? 'Active' : 'Closed'}
                        </span>
                     </div>
                     <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">{job.department} • {job.location} • {job.type}</p>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <Button onClick={() => handleEdit(job)} variant="outline" className="h-12 w-12 p-0 rounded-2xl border-white/10 hover:bg-white hover:text-black transition-all">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={async () => {
                      if (confirm("Delete this job posting?")) {
                        await supabase.from("jobs").delete().eq("id", job.id);
                        fetchJobs();
                      }
                    }}
                    variant="outline" className="h-12 w-12 p-0 rounded-2xl border-white/10 hover:bg-destructive hover:text-white hover:border-destructive transition-all">
                    <Trash2 className="w-4 h-4" />
                  </Button>
               </div>
            </motion.div>
          ))}
        </div>
      )}

      <JobEditorModal 
         isOpen={isEditorOpen}
         onClose={() => setIsEditorOpen(false)}
         jobToEdit={jobToEdit}
         onSave={() => fetchJobs()}
      />
    </div>
  );
}
