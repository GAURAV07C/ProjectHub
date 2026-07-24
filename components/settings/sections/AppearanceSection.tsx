"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ModeToggle from "@/components/ModeToggle";

const AppearanceSection = () => {
  return (
    <Card className="bg-gray-900/50 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Appearance</CardTitle>
        <CardDescription>Customize how the app looks</CardDescription>
      </CardHeader>
      <CardContent>
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
  );
};

export default AppearanceSection;
