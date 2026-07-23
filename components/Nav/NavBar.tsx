import React from "react";
import DesktopNavbar from "./DesktopNav";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { auth } from "@/lib/auth";

const NavBar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-blue-500 bg-clip-text text-transparent font-mono tracking-wider"
            >
              PROJECT HUB
            </Link>
          </div>

          <DesktopNavbar session={session} user={user ?? null} />
          <MobileNavbar session={session} user={user ?? null} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
