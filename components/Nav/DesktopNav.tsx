import { BellIcon, HomeIcon, UserIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";
import { signOut } from "@/lib/auth";

import { Session } from "next-auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface DesktopNavbarProps {
  session: Session | null;
  user: Session["user"] | null;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ session, user }) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-2 h-2" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/${
                session?.user?.userName ?? session?.user?.email?.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <div className="flex items-center space-x-4">
            <div className=" border-2 border-white rounded-full">
              <Avatar className="h-8 w-8 ">
                <AvatarImage
                  src={
                    user.image ??
                    `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                      user.name ?? ""
                    )}`
                  }
                />
              </Avatar>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="ghost" className="flex items-center gap-2">
                <LogOut size={18} className="w-4 h-4" /> Logout
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex space-x-4">
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
      )}
    </div>
  );
};

export default DesktopNavbar;
