"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProfileHeader from "./parts/ProfileHeader";
import ProfileTabs from "./parts/ProfileTabs";
import EditProfileDialog from "./parts/EditProfileDialog";
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
  const [currentUser, setCurrentUser] = useState<NonNullable<User>>(initialCurrentUser as NonNullable<User>);
  const [isFollowings, setIsFollowing] = useState(initialIsFollowing);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [followerUsers, setFollowerUsers] = useState<NonNullable<User>[]>([]);
  const [followingUsers, setFollowingUsers] = useState<NonNullable<User>[]>([]);
  const [followedUsersMap, setFollowedUsersMap] = useState<Record<string, boolean>>({});

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
        const willFollow = !isFollowings;
        setIsFollowing(willFollow);
        setUser((prev) => ({
          ...prev,
          _count: {
            ...prev._count,
            ...(user.id === currentUser.id
              ? { following: prev._count.following + (willFollow ? 1 : -1) }
              : { followers: prev._count.followers + (willFollow ? 1 : -1) }),
          },
        }));
        setCurrentUser((prev) => ({
          ...prev,
          _count: {
            ...prev._count,
            following: (prev._count.following || 0) + (willFollow ? 1 : -1),
          },
        }));
        setFollowedUsersMap((prev) => ({
          ...prev,
          [targetId]: willFollow,
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
          try {
            const isUserFollowRes = await fetch(
              `/api/follow/status?targetUserId=${followerUser.followerId}`
            );
            const { isFollowing: isFollow } = await isUserFollowRes.json();
            setFollowedUsersMap((prev) => ({ ...prev, [followerUser.followerId]: isFollow }));
          } catch {
            setFollowedUsersMap((prev) => ({ ...prev, [followerUser.followerId]: false }));
          }
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
          try {
            const isUserFollowRes = await fetch(
              `/api/follow/status?targetUserId=${followingUser.followingId}`
            );
            const { isFollowing: isFollow } = await isUserFollowRes.json();
            setFollowedUsersMap((prev) => ({ ...prev, [followingUser.followingId]: isFollow }));
          } catch {
            setFollowedUsersMap((prev) => ({ ...prev, [followingUser.followingId]: false }));
          }
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

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader
        user={user}
        currentUser={currentUser}
        handleFollow={handleFollow}
        setShowEditDialog={setIsEditDialogOpen}
        isUpdatingFollow={isUpdatingFollow}
        isFollowings={isFollowings}
        setActiveTab={setActiveTab}
        setIsModalOpen={setIsModalOpen}
        projectCount={projects.length}
      />

      <div className="mt-8">
        <ProfileTabs
          projects={projects}
          likedprojects={likedprojects}
          userId={user.id}
          currentUser={currentUser}
        />
      </div>

      <EditProfileDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={user}
        onSuccess={() => {
          setIsEditDialogOpen(false);
        }}
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
        currentUserId={currentUserId}
        followedUsersMap={followedUsersMap}
        isUpdatingFollow={isUpdatingFollow}
        onFollow={handleFollow}
        user={user}
      />
    </div>
  );
};

export default ProfilePageClient;
