import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-900 overflow-x-hidden antialiased">
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Main Content Area - Scrollable Right */}
      <div className="flex-1 flex flex-col pl-72 bg-white min-h-screen">
        {/* Header - Sticky Top */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="p-8 pb-12 flex-1 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
