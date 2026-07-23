"use client";
import { BellIcon, HomeIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";
import { Session } from "next-auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AuthButtons from "./parts/AuthButtons";

interface MobileNavbarProps {
  session: Session | null;
  user: Session["user"] | null;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ session, user }) => {
  if (user) {
    return (
      <div className="flex md:hidden lg:hidden items-center justify-between w-full px-4 py-2">
        <div className="flex items-center justify-between w-full max-w-[400px] mx-auto">
          <ModeToggle />

          <Button
            variant="ghost"
            className="flex items-center hover:bg-gray-800/50"
            asChild
          >
            <Link href="/">
              <HomeIcon className="w-6 h-6 text-gray-300 hover:text-blue-400" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center hover:bg-gray-800/50"
            asChild
          >
            <Link href="/notifications">
              <BellIcon className="w-6 h-6 text-gray-300 hover:text-blue-400" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center hover:bg-gray-800/50"
            asChild
          >
            <Link href="/create">
              <PlusCircle className="w-6 h-6 text-gray-300 hover:text-blue-400" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center hover:bg-gray-800/50"
            asChild
          >
            <Link
              href={`/${
                session?.user?.userName ?? session?.user?.email?.split("@")[0]
              }`}
            >
              <Avatar className="h-8 w-8 border-2 border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600">
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
    );
  }

  return (
    <div className="visible md:hidden lg:hidden flex space-x-4">
      <AuthButtons isLoggedIn={false} />
    </div>
  );
};

export default MobileNavbar;
