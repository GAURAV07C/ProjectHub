"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ModeToggle from "@/components/ModeToggle";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface SettingsPageClientProps {
  user: NonNullable<User>;
}

const SettingsPageClient: React.FC<SettingsPageClientProps> = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<"profile" | "account" | "appearance">("profile");

  const [profileForm, setProfileForm] = useState({
    name: initialUser.name || "",
    userName: initialUser.userName || "",
    bio: initialUser.bio || "",
    location: initialUser.location || "",
    website: initialUser.website || "",
  });

  const [accountForm, setAccountForm] = useState({
    email: initialUser.email || "",
  });

  useEffect(() => {
    setProfileForm({
      name: user.name || "",
      userName: user.userName || "",
      bio: user.bio || "",
      location: user.location || "",
      website: user.website || "",
    });
    setAccountForm({
      email: user.email || "",
    });
  }, [user]);

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profileForm.name,
          userName: profileForm.userName,
          bio: profileForm.bio,
          location: profileForm.location,
          website: profileForm.website,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: accountForm.email,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        toast.success("Account updated successfully");
      } else {
        toast.error(data.error || "Failed to update account");
      }
    } catch {
      toast.error("Failed to update account");
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { id: "profile" as const, label: "Profile", description: "Update your public profile information" },
    { id: "account" as const, label: "Account", description: "Manage your account settings" },
    { id: "appearance" as const, label: "Appearance", description: "Customize how the app looks" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-gray-900/50 border-white/10">
            <CardContent className="p-2">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-white border border-white/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {activeSection === "profile" && (
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

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      value={profileForm.userName}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, userName: e.target.value })
                      }
                      placeholder="Your username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={profileForm.bio}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, bio: e.target.value })
                      }
                      className="min-h-[100px]"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={profileForm.location}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, location: e.target.value })
                      }
                      placeholder="Where are you based?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Website</Label>
                    <Input
                      value={profileForm.website}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, website: e.target.value })
                      }
                      placeholder="Your personal website"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleProfileUpdate}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "account" && (
            <Card className="bg-gray-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={accountForm.email}
                      onChange={(e) =>
                        setAccountForm({ ...accountForm, email: e.target.value })
                      }
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div>
                      <p className="text-sm font-medium text-white">Email Verification</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {user.emailVerified
                          ? `Verified on ${format(new Date(user.emailVerified), "MMMM d, yyyy")}`
                          : "Your email is not verified"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.emailVerified
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div>
                      <p className="text-sm font-medium text-white">Member Since</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {format(new Date(user.createdAt), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex justify-end">
                  <Button
                    onClick={handleAccountUpdate}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "appearance" && (
            <Card className="bg-gray-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Appearance</CardTitle>
                <CardDescription>Customize how the app looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <p className="text-sm font-medium text-white">Dark Mode</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <ModeToggle />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPageClient;
