"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Layers, 
  PlayCircle, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Plus, 
  ArrowUpCircle, 
  UserCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Series", icon: Layers, href: "/dashboard/series" },
  { name: "Videos", icon: PlayCircle, href: "/dashboard/videos" },
  { name: "Guides", icon: BookOpen, href: "/dashboard/guides" },
  { name: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const footerItems = [
  { name: "Upgrade", icon: ArrowUpCircle, href: "/dashboard/upgrade", color: "text-indigo-600 font-bold" },
  { name: "Profile Setting", icon: UserCircle, href: "/dashboard/profile" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-white border-r border-zinc-200 flex flex-col fixed left-0 top-0 z-40">
      {/* Sidebar Header */}
      <div className="p-6 flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt="VidMaxx Logo" 
          width={40} 
          height={40} 
          className="rounded-lg shadow-sm"
        />
        <span className="text-2xl font-bold tracking-tight text-zinc-900">vidmaxx</span>
      </div>

      {/* Create New Action */}
      <div className="px-6 mb-8">
        <Link href="/dashboard/create">
          <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98]">
            <Plus className="w-5 h-5" />
            <span className="text-md">Create New Series</span>
          </button>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group",
              pathname === item.href 
                ? "bg-indigo-50 text-indigo-700" 
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
            )}
          >
            <item.icon className={cn(
              "w-6 h-6", 
              pathname === item.href ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-900"
            )} />
            <span className="text-lg font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-zinc-100 space-y-2">
        {footerItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
              item.color
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-lg font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
