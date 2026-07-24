import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { auth } from "@/lib/auth";
import { LinkIcon, MapPinIcon } from "lucide-react";
import SidebarNav from "./SidebarNav";
import FollowCounts from "./FollowCounts";

const Sidebar = async () => {
   
  const session = await auth();
  const user = session?.user;
  if (!user) return null;

  return (
    <div className="w-full">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/${user.userName}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 ">
                <AvatarImage
                  src={
                    user.image ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                      user.name || "User"
                    )}`
                  }
                />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {user.userName}
                </p>
              </div>
            </Link>

            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4" />
              <FollowCounts initialFollowing={user._count?.following ?? 0} initialFollowers={user._count?.followers ?? 0} />
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || "No location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a
                    href={`${user.website}`}
                    className="hover:underline truncate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
            
            <Separator className="my-4" />
            <div className="w-full text-left">
              <SidebarNav userName={user.userName ?? null} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
