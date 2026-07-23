import { BellIcon, HomeIcon, PlusCircle } from "lucide-react";
import { Session } from "next-auth";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavLink from "./parts/NavLink";
import AuthButtons from "./parts/AuthButtons";
import UserMenu from "./parts/UserMenu";

interface DesktopNavbarProps {
  session: Session | null;
  user: Session["user"] | null;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ session, user }) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <NavLink href="/" icon={HomeIcon} label="Home" />

      {user ? (
        <>
          <NavLink href="/notifications" icon={BellIcon} label="Notifications" />

          <Link href="/create">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <PlusCircle className="h-4 w-4 mr-1.5" />
              <span className="text-sm">Create</span>
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
