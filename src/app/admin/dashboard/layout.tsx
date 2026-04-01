"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-accent/5 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-80 p-12 min-h-screen">
        {children}
      </main>
    </div>
  );
}
