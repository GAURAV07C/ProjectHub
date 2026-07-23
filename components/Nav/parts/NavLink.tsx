import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  showLabel?: boolean;
  iconClassName?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon: Icon,
  label,
  showLabel = true,
  iconClassName = "",
}) => {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800/50"
      asChild
    >
      <Link href={href}>
        <Icon className={`w-5 h-5 ${iconClassName}`} />
        {showLabel && (
          <span className="hidden lg:inline text-gray-700 dark:text-gray-300">
            {label}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default NavLink;
