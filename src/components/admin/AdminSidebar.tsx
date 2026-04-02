"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  ChevronRight,
  Users,
  Building2
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/utils/cn";

const menuItems = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/admin/projects", icon: Briefcase },
  { name: "Journal/Blog", href: "/admin/blog", icon: FileText },
  { name: "Testimonials", href: "/admin/dashboard/testimonials", icon: Users },
  { name: "Partners", href: "/admin/partners", icon: Building2 },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Job Board", href: "/admin/jobs", icon: Briefcase },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-background border-r flex flex-col pt-10 pb-8 z-50">
      <div className="px-10 mb-16">
        <Logo />
        <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary/60 mt-2 block pl-1">Admin Dashboard</span>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "group relative h-14 rounded-2xl flex items-center gap-4 px-6 transition-all duration-300",
                isActive 
                  ? "bg-primary text-white shadow-xl shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:text-primary transition-colors")} />
              <span className="text-[11px] font-black uppercase tracking-widest leading-none">{item.name}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full"
                  initial={false}
                />
              )}
              
              <ChevronRight className={cn(
                "ml-auto w-4 h-4 opacity-0 transition-all",
                isActive ? "opacity-40" : "group-hover:opacity-40 group-hover:translate-x-1"
              )} />
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 px-4 border-t pt-8">
        <button className="w-full h-14 rounded-2xl flex items-center gap-4 px-6 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all group">
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-[11px] font-black uppercase tracking-widest leading-none">Logout</span>
        </button>
      </div>
    </aside>
  );
};
