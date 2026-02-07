import { AdminSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar-admin";
import { ProviderSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar-provider";
import { CustomerSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar-customer";
import { getCurrentUser } from "@/services/auth"; // Server Action

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser(); // Get user from HTTPOnly Cookie/Session

  if (!user) return <div>Access Denied</div>;

  return (
    <div className="flex min-h-screen">
      {/* Dynamic Sidebar based on Role */}
      {user.role === "ADMIN" && <AdminSidebar />}
      {user.role === "PROVIDER" && <ProviderSidebar />}
      {user.role === "USER" && <CustomerSidebar />}
      
      <main className="flex-1 p-6 bg-muted/10">
        {children}
      </main>
    </div>
  );
}