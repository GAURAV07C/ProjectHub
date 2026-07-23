"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProfileCard from "./ProfileCard";
import { User, Project } from "@/types";
import FollowModal from "./parts/FollowModal";

interface ProfilePageClientProps {
  user: NonNullable<User>;
  projects: Project[];
  likedprojects: Project[];
  isFollowing: boolean;
  currentUserId: string;
  currentUser: NonNullable<User>;
}

const ProfilePageClient: React.FC<ProfilePageClientProps> = ({
  isFollowing: initialIsFollowing,
  likedprojects,
  projects,
  user: initialUser,
  currentUserId,
  currentUser: initialCurrentUser,
}: ProfilePageClientProps) => {
  const [user, setUser] = useState(initialUser);
  const [currentUser] = useState<NonNullable<User>>(initialCurrentUser as NonNullable<User>);
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
        setIsFollowing((prev) => !prev);
        setUser((prev) => ({
          ...prev,
          _count: {
            ...prev._count,
            followers: prev._count.followers + (isFollowings ? -1 : 1),
          },
        }));
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

  if (!currentUser) return null;

  if (!currentUser) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6 relative">
        <ProfileCard
          user={user}
          currentUser={currentUser}
          isFollowing={isFollowings}
          handleFollow={handleFollow}
          setShowEditDialog={() => {}}
          showEditDialog={false}
          isUpdatingFollow={isUpdatingFollow}
          projects={projects}
          likedprojects={likedprojects}
          setIsModalOpen={setIsModalOpen}
          setActiveTab={setActiveTab}
          isFollowings={isFollowings}
        />

        <FollowModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          followerUsers={followerUsers}
          followingUsers={followingUsers}
          followerUsersCreatedAt={followerUsersCreatedAt}
          followingUsersCreatedAt={followingUsersCreatedAt}
          currentUserId={currentUserId}
          isFollowedUser={isFollowedUser}
          isUpdatingFollow={isUpdatingFollow}
          onFollow={handleFollow}
          user={user}
        />
      </div>
    </div>
  );
};

export default ProfilePageClient;
