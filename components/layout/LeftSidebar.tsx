"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User as UserType } from "@/types";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/feed", label: "Feed", icon: Search },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/projects", label: "Projects", icon: PenSquare },
];

interface LeftSidebarProps {
  user?: UserType;
}

const LeftSidebar = ({ user }: LeftSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col justify-between fixed top-0 left-0 h-screen w-64 border-r border-white/10 bg-[#0A0A0F] z-40">
      <div className="flex flex-col gap-2 p-4">
        <Link href="/" className="flex items-center gap-2 mb-6 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-300 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-white">ProjectHub</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${
                  isActive
                    ? "font-bold text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-lg">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Link href="/create">
          <Button className="w-full mt-4 bg-emerald-300 hover:bg-emerald-400 text-gray-950 font-semibold rounded-full py-6">
            Create
          </Button>
        </Link>
      </div>

      {user && (
        <div className="p-4 border-t border-white/10">
          <Link
            href={`/${user.userName ?? user.email?.split("@")[0]}`}
            className="flex items-center gap-3 hover:bg-white/5 rounded-full p-2 transition-colors"
          >
            <Avatar className="h-10 w-10 border border-white/20">
              <AvatarImage
                src={
                  user.image ??
                  `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                    user.name ?? "U"
                  )}`
                }
                alt="User Profile"
              />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">{user.name}</span>
              <span className="text-xs text-gray-400">@{user.userName ?? user.email?.split("@")[0]}</span>
            </div>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
