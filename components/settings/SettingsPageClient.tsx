"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import ProfileSection from "./sections/ProfileSection";
import AccountSection from "./sections/AccountSection";
import AppearanceSection from "./sections/AppearanceSection";

interface SettingsPageClientProps {
  user: NonNullable<User>;
}

const SettingsPageClient: React.FC<SettingsPageClientProps> = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<"profile" | "account" | "appearance">("profile");

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleProfileUpdate = async (data: {
    name: string;
    userName: string;
    bio: string;
    location: string;
    website: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setUser(result.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountUpdate = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setUser(result.user);
        toast.success("Account updated successfully");
      } else {
        toast.error(result.error || "Failed to update account");
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
            <ProfileSection
              user={user}
              onSave={handleProfileUpdate}
              isLoading={isLoading}
            />
          )}
          {activeSection === "account" && (
            <AccountSection
              user={user}
              onSave={handleAccountUpdate}
              isLoading={isLoading}
            />
          )}
          {activeSection === "appearance" && (
            <AppearanceSection />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPageClient;
