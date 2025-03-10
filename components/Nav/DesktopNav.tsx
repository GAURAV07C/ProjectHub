import { BellIcon, HomeIcon, UserIcon, LogOut, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";
import { signOut } from "@/lib/auth";

import { Session } from "next-auth";

interface DesktopNavbarProps {
  session: Session | null;
  user: Session["user"] | null;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ session, user }) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800/50"
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
          <span className="hidden lg:inline text-gray-700 dark:text-gray-300">
            Home
          </span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            asChild
          >
            <Link href="/notifications">
              <BellIcon className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
              <span className="hidden lg:inline text-gray-700 dark:text-gray-300">
                Notifications
              </span>
            </Link>
          </Button>
          <Link href="/create">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <PlusCircle className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
              <span className="hidden lg:inline text-gray-700 dark:text-gray-300">
                Create Project
              </span>
            </Button>
          </Link>
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

          <div className="flex items-center space-x-4">
            <div className=""></div>
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
          </div>
        </>
      ) : (
        <div className="flex space-x-4">
          <Link href="/auth/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-md">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DesktopNavbar;
