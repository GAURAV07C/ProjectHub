import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "@/lib/auth";

interface UserMenuProps {
  session: Session | null;
  user: Session["user"] | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ session, user }) => {
  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800/50"
        asChild
      >
        <Link
          href={`/${
            session?.user?.userName ?? session?.user?.email?.split("@")[0]
          }`}
        >
          <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
          <span className="hidden lg:inline text-gray-700 dark:text-gray-300">
            Profile
          </span>
        </Link>
      </Button>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <LogOut size={18} className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </form>

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
  );
};

export default UserMenu;
