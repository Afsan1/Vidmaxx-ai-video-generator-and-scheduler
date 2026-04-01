"use client";

import { Video } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function Header() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const handleDashboardClick = (e: React.MouseEvent) => {
     if (isSignedIn) {
       e.preventDefault();
       router.push("/dashboard");
     }
  };

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
        
        {/* Navigation Links - Always visible on larger screens */}
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
          
          {/* Dashboard link always visible, logic applies */}
          {isLoaded && (
            isSignedIn ? (
              <Link href="/dashboard" className="text-sm font-medium leading-6 text-zinc-400 hover:text-white transition-colors">
                Dashboard
              </Link>
            ) : (
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <button className="text-sm font-medium leading-6 text-zinc-400 hover:text-white transition-colors">
                  Dashboard
                </button>
              </SignInButton>
            )
          )}
        </div>

        <div className="flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
          {(!isLoaded || !isSignedIn) ? (
            <div className="flex items-center gap-x-4 md:gap-x-6">
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <button className="text-sm font-medium leading-6 text-zinc-400 hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          ) : (
            <UserButton />
          )}
        </div>
      </nav>
    </header>
  );
}
