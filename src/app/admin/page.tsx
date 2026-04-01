import { redirect } from "next/navigation";

export default function AdminRootRedirect() {
  // Simple redirect to the actual dashboard
  redirect("/admin/dashboard");
}
