"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      if (session.user.email !== "dagimalemux@gmail.com") {
        alert("Admin privileges required.");
        await supabase.auth.signOut();
        router.push("/admin/login");
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-accent/5">Loading...</div>;
  }

  return (
    <div className="flex bg-accent/5 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-80 p-12 min-h-screen">
        {children}
      </main>
    </div>
  );
};
