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
      <div className="flex md:hidden items-center justify-between w-full px-4">
        <Link href="/" className="flex items-center">
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-300 to-blue-500 bg-clip-text text-transparent font-mono">
            PH
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
              <HomeIcon className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
              <BellIcon className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/create">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
              <PlusCircle className="w-5 h-5" />
            </Button>
          </Link>

          <Link
            href={`/${
              session?.user?.userName ?? session?.user?.email?.split("@")[0]
            }`}
          >
            <Avatar className="h-8 w-8 border border-white/20 cursor-pointer">
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
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:hidden items-center gap-2">
      <ModeToggle />
      <AuthButtons isLoggedIn={false} />
    </div>
  );
};

export default MobileNavbar;