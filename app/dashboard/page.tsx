import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export default async function DashboardPage() {
  const user = await currentUser();

  if (user) {
    // Guaranteed sync at any cost: whenever you visit the dashboard, we ensure your record exists
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from('user')
      .upsert({
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      })
      .select();

    if (error) {
       console.error("Guaranteed Sync Error Details:", error.message, error.details, error.hint);
    } else {
       console.log("Guaranteed Sync Success! Data recorded:", data);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[#0A0014] text-white">
      <h1 className="text-3xl font-bold italic drop-shadow-lg">
        Welcome to the VidMaxx Dashboard, {user?.firstName}!
      </h1>
    </div>
  );
}
