import React, { useState } from "react";
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
import toast from "react-hot-toast";

import { User } from "@/types";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: NonNullable<User>;
  onSuccess?: () => void;
}

type EditForm = {
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
    name: user.name || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
  });

  const handleEditSubmit = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        onSuccess?.();
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};

export default EditProfileDialog;
