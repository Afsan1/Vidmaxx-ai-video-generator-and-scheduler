"use client";

import { Video } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">VidMaxx</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Video className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">VidMaxx</span>
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="#" className="text-sm font-medium leading-6 text-zinc-400 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium leading-6 text-zinc-400 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium leading-6 text-zinc-400 hover:text-white transition-colors">
            About
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
          <Link href="#" className="text-sm font-medium leading-6 text-zinc-400 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            href="#"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
