"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur-md">
      {/* Central Search or Breadcrumbs can go here */}
      <div className="flex-1 flex items-center max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="w-full bg-zinc-50 border border-zinc-200 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-zinc-900"
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-zinc-500 hover:bg-zinc-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white" />
        </button>
        <div className="h-8 w-[1px] bg-zinc-200 mx-2" />
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-9 h-9 border border-zinc-200 shadow-sm"
            }
          }}
        />
      </div>
    </header>
  );
}
