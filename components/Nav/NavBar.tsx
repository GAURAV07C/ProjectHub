import React from "react";
import DesktopNavbar from "./DesktopNav";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { auth } from "@/lib/auth";

const NavBar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className=" fixed md:sticky bottom-0 md:top-0   w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:visible md:flex md:items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
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
