"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, Calendar, DollarSign, Briefcase, CheckCircle, Clock } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
    if (data) setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    await supabase.from("quote_requests").update({ status: newStatus }).eq("id", id);
    fetchInquiries();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      await supabase.from("quote_requests").delete().eq("id", id);
      fetchInquiries();
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-heading font-black tracking-tighter uppercase mb-2">Inquiries.</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px]">Client Communications & Quotes</p>
        </div>
      </header>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading inquiries...</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-zinc-950 rounded-[2rem] border border-zinc-800">
          No inquiries found.
        </div>
      ) : (
        <div className="grid gap-6">
          {inquiries.map((inq, i) => (
            <motion.div 
              key={inq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-950 text-white p-8 rounded-[2rem] border border-zinc-800 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold font-heading uppercase">{inq.name}</h3>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      inq.status === 'reviewed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-orange-500/10 text-orange-600'
                    }`}>
                      {inq.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      {inq.email}
                    </div>
                    {inq.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary" />
                        {inq.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {inq.project_type}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4 text-primary" />
                      {inq.budget}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {inq.timeline}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-accent/20 rounded-xl border border-primary/5">
                    <p className="text-sm font-medium leading-relaxed">{inq.details}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end min-w-[150px]">
                  <span className="text-xs text-muted-foreground font-medium mb-4">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </span>
                  
                  <div className="flex flex-col gap-2 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => handleUpdateStatus(inq.id, inq.status === 'reviewed' ? 'pending' : 'reviewed')}
                      className="w-full text-xs font-bold"
                    >
                      {inq.status === 'reviewed' ? 'Mark Pending' : 'Mark Reviewed'}
                    </Button>
                    <Button 
                      onClick={() => handleDelete(inq.id)}
                      className="w-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white text-xs font-bold"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
