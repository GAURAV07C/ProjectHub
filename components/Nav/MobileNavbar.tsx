"use client";
import { BellIcon, HomeIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";

import { Session } from "next-auth";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface MobileNavbarProps {
  session: Session | null;
  user: Session["user"] | null;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ session, user }) => {
  return user ? (
    <div className=" flex md:hidden lg:hidden items-center justify-between w-full px-4 py-2">
      {/* Flex container for equal spacing */}
      <div className="flex items-center justify-between w-full max-w-[400px] mx-auto">
        {/* Left Side - Theme Toggle */}
        <ModeToggle />

        {/* Center Icons */}
        <Button variant="ghost" className="flex items-center" asChild>
          <Link href="/">
            <HomeIcon className="w-6 h-6" />
          </Link>
        </Button>

        <Button variant="ghost" className="flex items-center" asChild>
          <Link href="/notifications">
            <BellIcon className="w-6 h-6" />
          </Link>
        </Button>

        <Button variant="ghost" className="flex items-center" asChild>
          <Link href="/create">
            <PlusCircle className="w-6 h-6" />
          </Link>
        </Button>

        {/* Right Side - Profile Icon */}
        <Button variant="ghost" className="flex items-center" asChild>
          <Link
            href={`/${
              session?.user?.userName ?? session?.user?.email?.split("@")[0]
            }`}
          >
            <Avatar className="h-8 w-8 border-2 border-gray-300 dark:border-gray-700">
              <AvatarImage
                src={
                  user?.image ??
                  `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                    user?.name ?? "U"
                  )}`
                }
                alt="User Profile"
              />
            </Avatar>
          </Link>
        </Button>
      </div>
    </div>
  ) : (
    <div className="visible md:hidden lg:hidden flex space-x-4">
      <Link href="/auth/login">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold shadow-md">
          Sign In
        </Button>
      </Link>
      <Link href="/auth/signup">
        <Button className="bg-green-400 hover:bg-green-500 text-gray-900 font-semibold shadow-md">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default MobileNavbar;
