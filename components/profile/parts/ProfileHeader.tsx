import React from "react";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  EditIcon,
  MapPinIcon,
  LinkIcon,
} from "lucide-react";
import LoginButton from "../../auth/login-button";
import { User } from "@/types";

interface ProfileHeaderProps {
  user: NonNullable<User>;
  currentUser: NonNullable<User>;
  handleFollow: (targetId: string) => void;
  setShowEditDialog: (show: boolean) => void;
  isUpdatingFollow: boolean;
  isFollowings: boolean;
  setActiveTab: (tab: "followers" | "following") => void;
  setIsModalOpen: (open: boolean) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  currentUser,
  handleFollow,
  setShowEditDialog,
  isUpdatingFollow,
  isFollowings,
  setActiveTab,
  setIsModalOpen,
}) => {
  const isOwnedProfile =
    currentUser?.userName === user.userName ||
    currentUser?.email?.split("@")[0] === user.userName;

  const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-card rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-40" />
            <Avatar className="w-24 h-24 relative ring-2 ring-white/10">
              <AvatarImage
                src={
                  user.image ??
                  `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`
                }
              />
            </Avatar>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">
            {user.name ?? user.userName}
          </h1>
          <p className="text-muted-foreground">@{user.userName}</p>
          {user.bio && <p className="mt-2 text-sm text-gray-300">{user.bio}</p>}

          <div className="w-full mt-6">
            <div className="flex justify-between mb-4">
              <div
                onClick={() => {
                  setActiveTab("following");
                  setIsModalOpen(true);
                }}
                className="cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors"
              >
                <div className="font-semibold text-white">
                  {user._count.following.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Following
                </div>
              </div>
              <Separator orientation="vertical" className="bg-white/10" />
              <div
                onClick={() => {
                  setActiveTab("followers");
                  setIsModalOpen(true);
                }}
                className="cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors"
              >
                <div className="font-semibold text-white">
                  {user._count.followers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Followers
                </div>
              </div>
              <Separator orientation="vertical" className="bg-white/10" />
              <div>
                <div className="font-semibold text-white">
                  {user._count.projects.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Projects
                </div>
              </div>
            </div>
          </div>

          {!currentUser.userName ? (
            <LoginButton>
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Follow
              </Button>
            </LoginButton>
          ) : isOwnedProfile ? (
            <Button
              className="w-full mt-4 bg-white/10 hover:bg-white/15 text-white border border-white/10"
              onClick={() => setShowEditDialog(true)}
            >
              <EditIcon className="size-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <Button
              className="w-full mt-4"
              onClick={() => handleFollow(user.id)}
              disabled={isUpdatingFollow}
              variant={isFollowings ? "outline" : "default"}
            >
              {isFollowings ? "Unfollow" : "Follow"}
            </Button>
          )}

          <div className="w-full mt-6 space-y-2 text-sm">
            {user.location && (
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="size-4 mr-2" />
                {user.location}
              </div>
            )}
            {user.website && (
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="size-4 mr-2" />
                <a
                  href={
                    user.website.startsWith("http")
                      ? user.website
                      : `https://${user.website}`
                  }
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </div>
            )}
            <div className="flex items-center text-muted-foreground">
              <CalendarIcon className="size-4 mr-2" />
              Joined {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
