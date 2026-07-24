import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

import { User, Skill } from "@/types";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: NonNullable<User>;
  onSuccess?: (updatedUser?: User) => void;
}

type EditForm = {
  userName: string;
  name: string;
  bio: string;
  location: string;
  website: string;
};

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onOpenChange,
  user,
  onSuccess,
}) => {
  const [editForm, setEditForm] = useState<EditForm>({
    userName: user.userName || "",
    name: user.name || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
  });

  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(false);

  useEffect(() => {
    if (open) {
      fetchAllSkills();
      fetchUserSkills();
    }
  }, [open, user.id]);

  const fetchAllSkills = async () => {
    try {
      const res = await fetch("/api/skills/all");
      const data = await res.json();
      if (res.ok) {
        setAllSkills(data);
      }
    } catch {
      console.error("Failed to fetch skills");
    }
  };

  const fetchUserSkills = async () => {
    setLoadingSkills(true);
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (res.ok) {
        setUserSkills(data.map((us: { skill: Skill }) => us.skill));
      }
    } catch {
      console.error("Failed to fetch user skills");
    } finally {
      setLoadingSkills(false);
    }
  };

  const handleAddSkill = async (skillId: string) => {
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserSkills([...userSkills, data.skill]);
        toast.success("Skill added");
      } else {
        toast.error(data.error || "Failed to add skill");
      }
    } catch {
      toast.error("Failed to add skill");
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    try {
      const res = await fetch("/api/skills", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserSkills(userSkills.filter((s) => s.id !== skillId));
        toast.success("Skill removed");
      } else {
        toast.error(data.error || "Failed to remove skill");
      }
    } catch {
      toast.error("Failed to remove skill");
    }
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: editForm.userName,
          name: editForm.name,
          bio: editForm.bio,
          location: editForm.location,
          website: editForm.website,
          userId: user.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        onOpenChange(false);
        toast.success("Profile updated successfully");
        onSuccess?.(data.user);
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const availableSkills = allSkills.filter(
    (skill) => !userSkills.some((us) => us.id === skill.id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              name="userName"
              value={editForm.userName}
              onChange={(e) =>
                setEditForm({ ...editForm, userName: e.target.value })
              }
              placeholder="Your username"
            />
          </div>
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

          <div className="space-y-2">
            <Label>Skills</Label>
            {loadingSkills ? (
              <p className="text-sm text-gray-500">Loading skills...</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-3">
                  {userSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                      onClick={() => handleRemoveSkill(skill.id)}
                    >
                      {skill.title} ×
                    </Badge>
                  ))}
                </div>
                {availableSkills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Add skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.map((skill) => (
                        <Badge
                          key={skill.id}
                          variant="outline"
                          className="cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                          onClick={() => handleAddSkill(skill.id)}
                        >
                          + {skill.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
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
  );
};

export default EditProfileDialog;
