import React from "react";
import ProfileHeader from "./parts/ProfileHeader";
import EditProfileDialog from "./parts/EditProfileDialog";
import ProfileTabs from "./parts/ProfileTabs";
import { User, Project } from "@/types";

interface ProfileCardProps {
  user: NonNullable<User>;
  currentUser: NonNullable<User>;
  isFollowing: boolean;
  handleFollow: (targetId: string) => void;
  setShowEditDialog: (show: boolean) => void;
  showEditDialog: boolean;

  likedprojects: Project[];
  projects: Project[];
  isUpdatingFollow: boolean;
  setIsModalOpen: (open: boolean) => void;
  setActiveTab: (tab: "followers" | "following") => void;
  isFollowings: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  currentUser,
  isFollowings,
  handleFollow,
  setShowEditDialog,
  showEditDialog,
  projects,
  likedprojects,
  isUpdatingFollow,
  setIsModalOpen,
  setActiveTab,
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6 relative">
        <ProfileHeader
          user={user}
          currentUser={currentUser}
          handleFollow={handleFollow}
          setShowEditDialog={setShowEditDialog}
          isUpdatingFollow={isUpdatingFollow}
          isFollowings={isFollowings}
          setActiveTab={setActiveTab}
          setIsModalOpen={setIsModalOpen}
        />

        <ProfileTabs
          projects={projects}
          likedprojects={likedprojects}
          userId={user.id}
          currentUser={currentUser}
        />

        <EditProfileDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          user={user}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
