"use client";

import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag, Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from("blogs").select("*").eq("published", true).order("created_at", { ascending: false });
      if (data) setAllPosts(data);
    }
    fetchPosts();
  }, []);
  return (
    <main className="bg-background pt-32 min-h-screen">
      <Navbar />
      
      {/* Blog Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
        <Container>
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-8 inline-block"
            >
              Industry Insights & Engineering
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl lg:text-9xl font-heading font-black tracking-tighter leading-[0.8] mb-12 uppercase"
            >
              Makitex <br />
              <span className="text-primary italic">Journal.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-muted-foreground leading-relaxed font-body max-w-2xl font-medium"
            >
              Expert perspectives on architecture, structural engineering, and the evolving skyline of East Africa.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Featured Post (Optional) */}

      {/* Blog List Grid */}
      <section className="pb-40 pt-12">
        <Container>
           <div className="grid lg:grid-cols-3 gap-12">
             {allPosts.map((post, i) => (
               <motion.div
                 key={post.id}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1, duration: 0.8 }}
                 viewport={{ once: true }}
                 className="group flex flex-col gap-6 sm:gap-8 h-full"
               >
                 <Link href={`/blog/${post.slug}`} className="relative h-64 sm:h-80 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border border-primary/5">
                   <img 
                      src={post.image_url || "https://images.unsplash.com/photo-1518005020251-095c1a2702c1?q=80&w=800"} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                   />
                   <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                     <span className="px-4 py-2 sm:px-5 sm:py-2 bg-background/80 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-primary border border-primary/20">
                        {post.category || "Article"}
                     </span>
                   </div>
                   <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 h-10 w-10 sm:h-12 sm:w-12 bg-primary rounded-full flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-transform duration-500 shadow-xl shadow-primary/30">
                     <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                   </div>
                 </Link>
                 
                 <div className="flex flex-col gap-3 sm:gap-4 px-2 sm:px-4">
                   <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                     <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-primary" /> {new Date(post.created_at).toLocaleDateString()}</span>
                     <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-primary" /> {post.author || 'Admin'}</span>
                   </div>
                   <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
                     <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight leading-[1.1]">
                        {post.title}
                     </h3>
                   </Link>
                   <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed font-medium">
                     {post.excerpt}
                   </p>
                   
                   <Link href={`/blog/${post.slug}`} className="mt-2 flex items-center gap-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-primary group-hover:gap-5 transition-all w-fit">
                      Read Entry <div className="h-[2px] w-6 sm:w-8 bg-primary/20 group-hover:w-12 sm:group-hover:w-16 transition-all" />
                   </Link>
                 </div>
               </motion.div>
             ))}
           </div>
           
           <div className="mt-32 text-center">
              <Button variant="outline" size="lg" className="h-20 px-16 text-xl rounded-full border-2 hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/5">
                Load More Articles
              </Button>
           </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
