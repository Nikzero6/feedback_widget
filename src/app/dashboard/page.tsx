"use client";

import { Header, Button } from "@/components/ui";
import { LogoutIcon } from "@/components/icons";
import { DashboardLayout } from "@/features/dashboard";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Feedback Dashboard"
        actions={
          <Button variant="destructive" onClick={handleLogout}>
            <LogoutIcon size={20} />
            Logout
          </Button>
        }
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <DashboardLayout />
      </main>
    </div>
  );
}
