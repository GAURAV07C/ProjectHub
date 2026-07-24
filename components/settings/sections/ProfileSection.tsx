"use client";

import React from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ProfileSectionProps {
  user: NonNullable<User>;
  onSave: (data: {
    name: string;
    userName: string;
    bio: string;
    location: string;
    website: string;
  }) => Promise<void>;
  isLoading: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user, onSave, isLoading }) => {
  const [form, setForm] = React.useState({
    name: user.name || "",
    userName: user.userName || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
  });

  React.useEffect(() => {
    setForm({
      name: user.name || "",
      userName: user.userName || "",
      bio: user.bio || "",
      location: user.location || "",
      website: user.website || "",
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <Card className="bg-gray-900/50 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Profile Information</CardTitle>
        <CardDescription>Update your public profile information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={
                user.image ||
                `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                  user.name || "User"
                )}`
              }
            />
          </Avatar>
          <div>
            <p className="text-sm text-gray-400">Profile Picture</p>
            <p className="text-xs text-gray-500">
              {user.image ? "Custom avatar set" : "Using generated avatar"}
            </p>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              placeholder="Your username"
            />
          </div>

          <div className="space-y-2">
            <Label>Display Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="min-h-[100px]"
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Where are you based?"
            />
          </div>

          <div className="space-y-2">
            <Label>Website</Label>
            <Input
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="Your personal website"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
