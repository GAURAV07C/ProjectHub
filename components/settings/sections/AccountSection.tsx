"use client";

import React from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface AccountSectionProps {
  user: NonNullable<User>;
  onSave: (data: { email: string }) => Promise<void>;
  isLoading: boolean;
}

const AccountSection: React.FC<AccountSectionProps> = ({ user, onSave, isLoading }) => {
  const [email, setEmail] = React.useState(user.email || "");

  React.useEffect(() => {
    setEmail(user.email || "");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ email });
  };

  return (
    <Card className="bg-gray-900/50 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Account Settings</CardTitle>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <Separator className="bg-white/10" />

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

export default AccountSection;
