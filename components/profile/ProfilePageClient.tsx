"use client";

import React, { useEffect as clientUseEffect } from "react";
import toast from "react-hot-toast";
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
import { useState, useEffect } from "react";
import Link from "next/link";
import ProfileCard from "./ProfileCard";
import { formatDistanceToNow } from "date-fns";
import { User, Project } from "@/types";

interface ProfilePageClientProps {
  user: NonNullable<User>;
  projects: Project[];
  likedprojects: Project[];
  isFollowing: boolean;
  currentUserId: string;
  currentUser: NonNullable<User>;
}

interface ProfilePageClientProps {
  user: NonNullable<User>;
  projects: Projects;
  likedprojects: Projects;
  isFollowing: boolean;
  currentUserId: string;
  currentUser: NonNullable<User>;
}

const ProfilePageClient: React.FC<ProfilePageClientProps> = ({
  isFollowing: initialIsFollowing,
  likedprojects,
  projects,
  user,
  currentUserId,
  currentUser,
}: ProfilePageClientProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isFollowings, setIsFollowing] = useState(initialIsFollowing);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [followerUsers, setFollowerUsers] = useState<NonNullable<User>[]>([]);

  const [followingUsers, setFollowingUsers] = useState<NonNullable<User>[]>([]);

  const [followingUsersCreatedAt, setFollowingUsersCreatedAt] = useState<
    Date | string | number | null
  >();

  const [followerUsersCreatedAt, setFollowerUsersCreatedAt] = useState<
    Date | string | number | null
  >();
  const [isFollowedUser, setIsFollowedUser] = useState<boolean>(false);

  const handleFollow = async (targetId: string) => {
    if (!currentUser) return;

    try {
      setIsUpdatingFollow(true);
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: targetId }),
      });
      if (res.ok) {
        setIsFollowing(!isFollowings);
      } else {
        toast.error("Failed to update follow status");
      }
    } catch {
      toast.error("Failed to update follow status");
    } finally {
      setIsUpdatingFollow(false);
    }
  };

  useEffect(() => {
    const fetchFollowers = async () => {
      const fetchedFollowers = await Promise.all(
        user.followers.map(async (followerUser) => {
          setFollowerUsersCreatedAt(followerUser.createdAt);
          try {
            const isUserFollowRes = await fetch(
              `/api/follow/status?targetUserId=${followerUser.followerId}`
            );
            const { isFollowing: isFollow } = await isUserFollowRes.json();
            setIsFollowedUser(isFollow);
          } catch {
            setIsFollowedUser(false);
          }
          setFollowerUsersCreatedAt(followerUser.createdAt);
          const userRes = await fetch(
            `/api/users/${followerUser.followerId}`
          );
          const getFollowerUser = await userRes.json();
          return getFollowerUser;
        })
      );

      setFollowerUsers(
        fetchedFollowers.filter(
          (follower) => follower !== null
        ) as NonNullable<User>[]
      );
    };

    fetchFollowers();
  }, [user.followers, currentUserId]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const fetchFollowings = await Promise.all(
        user.following.map(async (followingUser) => {
          setFollowingUsersCreatedAt(followingUser.createdAt);
          const userRes = await fetch(
            `/api/users/${followingUser.followingId}`
          );
          const getfollowingUser = await userRes.json();
          return getfollowingUser;
        })
      );
      setFollowingUsers(
        fetchFollowings.filter(
          (follower) => follower !== null
        ) as NonNullable<User>[]
      );
    };

    fetchFollowing();
  }, [user.following]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6 relative">
        <ProfileCard
          user={user}
          currentUser={currentUser}
          isFollowing={isFollowings}
          handleFollow={handleFollow}
          setShowEditDialog={setShowEditDialog}
          showEditDialog={showEditDialog}
          isUpdatingFollow={isUpdatingFollow}
          projects={projects}
          likedprojects={likedprojects}
          setIsModalOpen={setIsModalOpen}
          setActiveTab={setActiveTab}
          isFollowings
        />

        {/* fllowers following modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {activeTab === "followers" ? "Followers" : "Following"}
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue={activeTab}>
              <TabsList className="w-full flex border-b">
                <TabsTrigger
                  value="followers"
                  onClick={() => setActiveTab("followers")}
                  className="w-1/2 text-center"
                >
                  Followers
                </TabsTrigger>
                <TabsTrigger
                  value="following"
                  onClick={() => setActiveTab("following")}
                  className="w-1/2 text-center"
                >
                  Following
                </TabsTrigger>
              </TabsList>
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-4"
              />
              <TabsContent value="followers" className="mt-4">
                <div className="flex items-center space-x-4">
                  {user._count.followers > 0 && (
                    <div>
                      {followerUsers.map((getFollowerUser) => (
                        <div key={getFollowerUser?.id} className="flex">
                          <Link href={getFollowerUser?.userName || ""}>
                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                              <AvatarImage
                                src={
                                  getFollowerUser?.name ??
                                  `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                                    getFollowerUser?.name ?? ""
                                  )}`
                                }
                              />
                            </Avatar>
                          </Link>
                          <div className="flex-1">
                            <Link
                              href={getFollowerUser?.userName || ""}
                              className="font-semibold hover:underline"
                            >
                              {getFollowerUser?.name}
                            </Link>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>@{getFollowerUser?.userName}</span>
                              <span>•</span>
                              <span>
                                {followerUsersCreatedAt &&
                                  formatDistanceToNow(
                                    new Date(followerUsersCreatedAt)
                                  )}{" "}
                                ago
                              </span>
                            </div>
                          </div>
                          {currentUserId !== getFollowerUser?.id && (
                            <Button
                              size="sm"
                              disabled={isUpdatingFollow}
                              variant={isFollowedUser ? "outline" : "default"}
                              onClick={() => {
                                if (getFollowerUser?.id)
                                  handleFollow(getFollowerUser.id);
                              }}
                            >
                              {isFollowedUser ? "Unfollow" : "Follow"}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="following" className="mt-4">
                {followingUsers.map((getfollowingUser) => (
                  <div key={getfollowingUser.id}>
                    <div className="flex items-center space-x-4">
                      <Link href={getfollowingUser.userName || ""}>
                        <Avatar className="h-12 w-12 border-2 border-primary/10">
                          <AvatarImage
                            src={
                              getfollowingUser.image ??
                              `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                                getfollowingUser.name ?? ""
                              )}`
                            }
                          />
                        </Avatar>
                      </Link>
                      <div className="flex-1">
                        <Link
                          href={getfollowingUser.userName || ""}
                          className="font-semibold hover:underline"
                        >
                          {getfollowingUser.name}
                        </Link>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>@{getfollowingUser.userName}</span>
                          <span>•</span>
                          <span>
                            {formatDistanceToNow(
                              followingUsersCreatedAt
                                ? new Date(followingUsersCreatedAt)
                                : new Date()
                            )}{" "}
                            ago
                          </span>
                        </div>
                      </div>
                      {currentUserId !== getfollowingUser.id && (
                        <Button
                          size="sm"
                          variant={isFollowings ? "outline" : "default"}
                          onClick={() => handleFollow(getfollowingUser.id)}
                        >
                          {isFollowings ? "Unfollow" : "Follow"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePageClient;
