import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { User } from "@/types";

interface FollowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: "followers" | "following";
  onTabChange: (tab: "followers" | "following") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  followerUsers: NonNullable<User>[];
  followingUsers: NonNullable<User>[];
  followerUsersCreatedAt: Date | string | number | null | undefined;
  followingUsersCreatedAt: Date | string | number | null | undefined;
  currentUserId: string;
  isFollowedUser: boolean;
  isUpdatingFollow: boolean;
  onFollow: (targetId: string) => void;
  user: NonNullable<User>;
}

const FollowModal: React.FC<FollowModalProps> = ({
  open,
  onOpenChange,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  followerUsers,
  followingUsers,
  followerUsersCreatedAt,
  followingUsersCreatedAt,
  currentUserId,
  isFollowedUser,
  isUpdatingFollow,
  onFollow,
  user,
}) => {
  const renderUserRow = (getUser: User, createdAt: Date | string | number | null | undefined, isFollowed: boolean) => (
    <div className="flex items-center space-x-4">
      <Link href={getUser?.userName || ""}>
        <Avatar className="h-12 w-12 border-2 border-primary/10">
          <AvatarImage
            src={
              getUser?.image ??
              `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                getUser?.name ?? ""
              )}`
            }
          />
        </Avatar>
      </Link>
      <div className="flex-1">
        <Link
          href={getUser?.userName || ""}
          className="font-semibold hover:underline"
        >
          {getUser?.name}
        </Link>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>@{getUser?.userName}</span>
          <span>•</span>
          <span>
            {createdAt && formatDistanceToNow(new Date(createdAt))}{" "}
            ago
          </span>
        </div>
      </div>
      {currentUserId !== getUser?.id && (
        <Button
          size="sm"
          disabled={isUpdatingFollow}
          variant={isFollowed ? "outline" : "default"}
          onClick={() => onFollow(getUser.id)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {activeTab === "followers" ? "Followers" : "Following"}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={activeTab} onValueChange={(val) => onTabChange(val as "followers" | "following")}>
          <TabsList className="w-full flex border-b">
            <TabsTrigger
              value="followers"
              className="w-1/2 text-center"
            >
              Followers
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="w-1/2 text-center"
            >
              Following
            </TabsTrigger>
          </TabsList>
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="mt-4"
          />
          <TabsContent value="followers" className="mt-4">
            <div className="flex items-center space-x-4">
              {user._count.followers > 0 && (
                <div className="w-full space-y-4">
                  {followerUsers.map((getFollowerUser) =>
                    renderUserRow(getFollowerUser, followerUsersCreatedAt, isFollowedUser)
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="following" className="mt-4">
            <div className="w-full space-y-4">
              {followingUsers.map((getfollowingUser) =>
                renderUserRow(getfollowingUser, followingUsersCreatedAt, isFollowedUser)
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FollowModal;
