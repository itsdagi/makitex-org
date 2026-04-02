import { AdminLayout } from "@/components/admin/AdminLayout";

export default function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
