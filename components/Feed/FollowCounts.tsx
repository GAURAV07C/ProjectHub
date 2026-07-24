"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const FollowCounts = ({ initialFollowing, initialFollowers }: { initialFollowing: number; initialFollowers: number }) => {
  const [followingCount, setFollowingCount] = useState(initialFollowing);
  const [followersCount, setFollowersCount] = useState(initialFollowers);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      if (detail.isFollowing) {
        setFollowingCount((c) => c + 1);
        setFollowersCount((c) => c + 1);
      } else {
        setFollowingCount((c) => Math.max(0, c - 1));
        setFollowersCount((c) => Math.max(0, c - 1));
      }
    };
    window.addEventListener("follow-updated", handler as EventListener);
    return () => window.removeEventListener("follow-updated", handler as EventListener);
  }, []);

  return (
    <div className="flex justify-between">
      <div>
        <p className="font-medium">{followingCount}</p>
        <p className="text-xs text-muted-foreground">Following</p>
      </div>
      <Separator orientation="vertical" />
      <div>
        <p className="font-medium">{followersCount}</p>
        <p className="text-xs text-muted-foreground">Followers</p>
      </div>
    </div>
  );
};

export default FollowCounts;
