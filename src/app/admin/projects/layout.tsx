import { AdminLayout } from "@/components/admin/AdminLayout";

export default function AdminProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
