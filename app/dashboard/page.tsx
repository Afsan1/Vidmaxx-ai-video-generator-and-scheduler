import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { Sparkles, Video, History, BarChart3, Layers } from 'lucide-react';

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
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Hero Card */}
      <section className="relative overflow-hidden p-10 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Welcome back, {user?.firstName || 'Creator'}!
          </h1>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed opacity-90">
            Ready to generate your next viral hit? Use your AI credits to create high-quality series and videos in seconds.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-indigo-700 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-slate-50 transition-all flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              New Creation
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-xl font-bold backdrop-blur-sm transition-all">
              Watch Tutorials
            </button>
          </div>
        </div>
        
        {/* Decorative Background Glows */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-indigo-400/20 blur-[80px] rounded-full" />
      </section>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Series", value: "12", icon: Layers, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Videos", value: "148", icon: Video, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "AI Credits", value: "2,450", icon: Sparkles, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm flex items-center justify-between hover:border-indigo-200 transition-colors group cursor-default">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-zinc-900">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <section className="p-8 rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            Recent Creations
          </h2>
          <button className="text-sm font-semibold text-indigo-600 hover:underline transition-all">View all history</button>
        </div>
        
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-zinc-100 rounded-2xl">
          <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-zinc-300" />
          </div>
          <h4 className="text-lg font-semibold text-zinc-800 mb-2">No videos yet</h4>
          <p className="text-zinc-500 max-w-sm">Start your first creation to see it appear here. It only takes a few minutes to generate a high-quality video.</p>
        </div>
      </section>
    </div>
  );
}
