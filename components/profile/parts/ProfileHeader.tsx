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
  projectCount: number;
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
  projectCount,
}) => {
  const isOwnedProfile =
    currentUser?.userName === user.userName ||
    currentUser?.email?.split("@")[0] === user.userName;

  const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Profile Header - Instagram Style */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
        {/* Avatar with gradient ring */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-300 via-blue-500 to-purple-600 rounded-full blur opacity-70" />
          <Avatar className="w-24 h-24 md:w-36 md:h-36 relative ring-2 ring-gray-900">
            <AvatarImage
              src={
                user.image ??
                `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`
              }
              className="object-cover"
            />
          </Avatar>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Username and Action Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {user.userName}
            </h1>
            
            <div className="flex items-center gap-2">
              {!currentUser.userName ? (
                <LoginButton>
                  <Button className="bg-gradient-to-r from-emerald-300 to-blue-500 hover:from-emerald-400 hover:to-blue-600 text-gray-950 font-semibold">
                    Follow
                  </Button>
                </LoginButton>
              ) : isOwnedProfile ? (
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => setShowEditDialog(true)}
                >
                  <EditIcon className="size-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button
                  className="bg-gradient-to-r from-emerald-300 to-blue-500 hover:from-emerald-400 hover:to-blue-600 text-gray-950 font-semibold"
                  onClick={() => handleFollow(user.id)}
                  disabled={isUpdatingFollow}
                >
                  {isFollowings ? "Following" : "Follow"}
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center md:justify-start gap-6 md:gap-8 mb-4">
            <div className="text-center">
              <span className="block text-xl md:text-2xl font-bold text-white">
                {projectCount}
              </span>
              <span className="text-sm text-gray-400">projects</span>
            </div>
            <Separator orientation="vertical" className="h-8 bg-white/10" />
            <div
              onClick={() => {
                setActiveTab("followers");
                setIsModalOpen(true);
              }}
              className="text-center cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span className="block text-xl md:text-2xl font-bold text-white">
                {user._count.followers.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400">followers</span>
            </div>
            <Separator orientation="vertical" className="h-8 bg-white/10" />
            <div
              onClick={() => {
                setActiveTab("following");
                setIsModalOpen(true);
              }}
              className="text-center cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span className="block text-xl md:text-2xl font-bold text-white">
                {user._count.following.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400">following</span>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1">
            {user.name && (
              <p className="font-semibold text-white text-sm">
                {user.name}
              </p>
            )}
            {user.bio && (
              <p className="text-sm text-gray-300 whitespace-pre-wrap">
                {user.bio}
              </p>
            )}
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-400 mt-2">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPinIcon className="size-3.5" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <a
                  href={
                    user.website.startsWith("http")
                      ? user.website
                      : `https://${user.website}`
                  }
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="size-3.5" />
                  <span>{user.website}</span>
                </a>
              )}
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-3.5" />
                <span>Joined {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights / Skills Tags */}
      {user.userSkills && user.userSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
          {user.userSkills.map((userSkill) => (
            <span
              key={userSkill.id}
              className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 transition-colors"
            >
              {userSkill.skill.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
