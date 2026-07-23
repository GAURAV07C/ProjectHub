import { BellIcon, HomeIcon, PlusCircle } from "lucide-react";
import { Session } from "next-auth";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";
import NavLink from "./parts/NavLink";
import AuthButtons from "./parts/AuthButtons";
import UserMenu from "./parts/UserMenu";

interface DesktopNavbarProps {
  session: Session | null;
  user: Session["user"] | null;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ session, user }) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <NavLink href="/" icon={HomeIcon} label="Home" />
      
      {user ? (
        <>
          <NavLink href="/notifications" icon={BellIcon} label="Notifications" />
          
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

          <UserMenu session={session} user={user} />
        </>
      ) : (
        <AuthButtons isLoggedIn={false} />
      )}
    </div>
  );
};

export default DesktopNavbar;
