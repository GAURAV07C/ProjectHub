import { getRandomUsers } from "@/data/user";
import { auth } from "@/lib/auth";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "@/components/FollowButton";

const WhoRoFollow = async () => {
  const sesson = await auth();
  const id = sesson?.user?.id || "";
  const users = await getRandomUsers(id);

  if (users.length === 0) {
    return null;
  }

  

  return (
    <Card>
      <CardHeader>
        <CardTitle> Who to Follow </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-2 items-center justify-between "
            >
              <div className="flex items-center gap-1">
                <Link href={`/${user?.userName}`}>
                  <Avatar className="w-10 h-10 border-2 ">
                    <AvatarImage src={user?.image || "/placeholder.svg"} />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link
                    href={`/${user?.userName}`}
                    className="font-medium cursor-pointer"
                  >
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.userName}</p>
                  <p className="text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton targetId={user.id} userId={id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhoRoFollow;
