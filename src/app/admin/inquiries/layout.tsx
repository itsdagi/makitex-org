import { AdminLayout } from "@/components/admin/AdminLayout";

export default function AdminInquiriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
