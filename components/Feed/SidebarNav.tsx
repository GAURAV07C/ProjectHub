"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Home,
  Compass,
  Bell,
  PlusCircle,
  User,
  LogOut,
  Settings,
} from "lucide-react";

interface SidebarNavProps {
  userName: string | null;
}

const SidebarNav = ({ userName }: SidebarNavProps) => {
  const pathname = usePathname();

  const navItems = [
    { href: "/feed", icon: Home, label: "Home" },
    { href: "/projects", icon: Compass, label: "Explore" },
    { href: "/notifications", icon: Bell, label: "Notifications" },
    { href: "/create", icon: PlusCircle, label: "Create" },
    { href: `/${userName}`, icon: User, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="w-full space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-white border border-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-emerald-300" : ""}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
      >
        <LogOut className="w-5 h-5 flex-shrink-0" />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default SidebarNav;
