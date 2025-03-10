import React from "react";
import DesktopNavbar from "./DesktopNav";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { auth } from "@/lib/auth";

const NavBar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="fixed bottom-0 md:bottom-[88%] lg:bottom-[90%] md:fixed  md:top-0   w-full border-t md:border-t-0 md:border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex md:items-center">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent font-mono tracking-wider"
            >
              PROJECT HUB
            </Link>
          </div>

          {/* Pass session and user as props */}
          <DesktopNavbar session={session} user={user ?? null} />
          <MobileNavbar session={session} user={user ?? null} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
