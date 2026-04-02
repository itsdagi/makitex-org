"use client";

import { use, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Lightbox } from "@/components/ui/Lightbox";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { supabase } from "@/lib/supabase";

export default function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      const { data } = await supabase.from("projects").select("*").eq("slug", slug).single();
      if (data) setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return <main className="bg-background min-h-screen flex items-center justify-center"><Navbar /><div className="mt-40 text-xl font-heading font-black text-primary uppercase animate-pulse">Loading Case Study...</div></main>
  }
  
  if (!loading && !project) {
    return <main className="bg-background min-h-screen flex flex-col items-center pt-40"><Navbar /><h1 className="text-4xl font-heading font-black uppercase">Project Not Found</h1><Link href="/projects" className="mt-4 text-primary underline">Back to Portfolio</Link></main>
  }

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-end pb-24">
        <div className="absolute inset-0 -z-20">
          <img 
            src={project.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale-[0.2]" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent -z-10" />

        <Container className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-primary block" />
            <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">{project.category}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-black text-white leading-none tracking-tight">
            {project.title}
          </h1>
        </Container>
      </section>

      {/* Details Bar */}
      <section className="bg-card border-b border-border/50 py-12 sticky top-[80px] z-30 shadow-sm">
        <Container className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Client</span>
            <span className="font-bold text-sm md:text-base">{project.client}</span>
          </div>
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Location</span>
            <span className="font-bold text-sm md:text-base">{project.location}</span>
          </div>
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Year</span>
            <span className="font-bold text-sm md:text-base">{project.completion_year || "Ongoing"}</span>
          </div>
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Status</span>
            <span className="font-bold text-sm md:text-base">Completed</span>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <Container className="max-w-5xl">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2 prose prose-xl prose-invert max-w-none text-muted-foreground font-body leading-[1.8] marker:text-primary prose-headings:font-heading prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
              {project.content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.content}
                </ReactMarkdown>
              ) : (
                <>
                  <h2 className="text-4xl font-heading font-black tracking-tighter mb-6">The Vision</h2>
                  <p className="text-muted-foreground leading-relaxed text-xl font-medium">
                    {project.description}
                  </p>
                </>
              )}
            </div>
            
            <div className="space-y-12">
              <div className="p-8 bg-black text-white rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary blur-3xl rounded-full opacity-30" />
                <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Start your own project</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-8">Inspired by {project.title}? Let's discuss how we can bring your next architectural vision to life.</p>
                <button className="w-full py-4 text-center border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all rounded-xl font-bold uppercase tracking-widest text-xs">
                  Request an Estimate
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Before / After Slider */}
      <section className="pb-32 bg-accent/10">
        <Container className="max-w-5xl">
           <h2 className="text-4xl font-heading font-black tracking-tighter mb-10 text-center">Transformation</h2>
           <BeforeAfterSlider beforeImage={project.beforeImage || project.image_url} afterImage={project.afterImage || project.image_url} />
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-32">
        <Container className="max-w-6xl">
           <h2 className="text-4xl font-heading font-black tracking-tighter mb-10 text-center">Project Gallery</h2>
           <Lightbox images={project.gallery_images || []} />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
