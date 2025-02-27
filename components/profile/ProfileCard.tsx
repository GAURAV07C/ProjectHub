import React, { useState, Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { getUserByUserName, updateProfile } from "@/data/user";
import toast from "react-hot-toast";
import LoginButton from "../auth/login-button";
import { getProjectsByUserId } from "@/actions/projectAction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type User = Awaited<ReturnType<typeof getUserByUserName>>;
type Projects = Awaited<ReturnType<typeof getProjectsByUserId>>;

interface ProfileCardProps {
  user: NonNullable<User>;
  currentUser: NonNullable<User>;
  isFollowing: boolean;
  handleFollow: (targetId: string) => void;
  setShowEditDialog: (show: boolean) => void;
  showEditDialog: boolean;

  likedprojects: Projects;
  projects: Projects;
  isUpdatingFollow: boolean;
  setIsModalOpen: (open: boolean) => void;
  setActiveTab: Dispatch<SetStateAction<"followers" | "following">>;
  isFollowings: boolean;
}

import {
  CalendarIcon,
  EditIcon,
  FileTextIcon,
  HeartIcon,
  LinkIcon,
  MapPinIcon,
} from "lucide-react";
import ProjectCard from "../projects/projectCard";

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  currentUser,
  projects,
  likedprojects,
  handleFollow,
  setShowEditDialog,
  showEditDialog,
  setIsModalOpen,
  isUpdatingFollow,
  isFollowings,

  setActiveTab,
}) => {
  const [editForm, setEditForm] = useState({
    name: user.name || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
  });

  const handleEditSubmit = async () => {
    const formData = new FormData();
    Object.entries(editForm).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await updateProfile(formData, user?.id);
    if (result.success) {
      setShowEditDialog(false);
      toast.success("Profile updated successfully");
    }
  };

  const isOwnedProfile =
    currentUser?.userName === user.userName ||
    currentUser?.email?.split("@")[0] === user.userName;

  const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6 relative">
        <div className="w-full max-w-lg mx-auto">
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={
                      user.image ??
                      `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`
                    }
                  />
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold">
                  {user.name ?? user.userName}
                </h1>
                <p className="text-muted-foreground">@{user.userName}</p>
                <p className="mt-2 text-sm">{user.bio}</p>

                {/* PROFILE STATS */}
                <div className="w-full mt-6">
                  <div className="flex justify-between mb-4">
                    <div
                      onClick={() => {
                        setActiveTab("following");
                        setIsModalOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <div className="font-semibold">
                        {user._count.following.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Following
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div
                      onClick={() => {
                        setActiveTab("followers");
                        setIsModalOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <div className="font-semibold">
                        {user._count.followers.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Followers
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <div className="font-semibold">
                        {user._count.projects.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Projects
                      </div>
                    </div>
                  </div>
                </div>

                {/* "FOLLOW & EDIT PROFILE" BUTTONS */}
                {!currentUser.userName ? (
                  <LoginButton>
                    <Button className="w-full mt-4">Follow</Button>
                  </LoginButton>
                ) : isOwnedProfile ? (
                  <Button
                    className="w-full mt-4"
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

                {/* LOCATION & WEBSITE */}
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
                        className="hover:underline"
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
            </CardContent>
          </Card>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="projects"
                className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent px-6 -ml-20 font-semibold"
              >
                <FileTextIcon className="size-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="likes"
                className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent px-6 font-semibold"
              >
                <HeartIcon className="size-4" />
                Likes
              </TabsTrigger>
            </TabsList>

            <div>
              <TabsContent value="projects" className="mt-16 ">
                <div className="space-y-8 -m-10 ">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        userId={user.id}
                        currentUser={currentUser}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No projects yet
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="likes" className="mt-16">
                <div className="space-y-16 -m-10  ">
                  {likedprojects.length > 0 ? (
                    likedprojects.map((projects) => (
                      <ProjectCard
                        key={projects.id}
                        project={projects}
                        userId={user?.id}
                        currentUser={currentUser}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No liked projects to show
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        {/* edit profile modal */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  className="min-h-[100px]"
                  placeholder="Tell us about yourself"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="location"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  placeholder="Where are you based?"
                />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  name="website"
                  value={editForm.website}
                  onChange={(e) =>
                    setEditForm({ ...editForm, website: e.target.value })
                  }
                  placeholder="Your personal website"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleEditSubmit}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileCard;
