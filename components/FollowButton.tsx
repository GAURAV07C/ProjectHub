"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

interface FollowButtonProps {
  targetId: string;
  initialIsFollowing?: boolean;
  onFollowSuccess?: (targetId: string, isFollowing: boolean) => void;
}

function FollowButton({ targetId, initialIsFollowing = false, onFollowSuccess }: FollowButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  useEffect(() => {
    let mounted = true;
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/follow/status?targetUserId=${targetId}`);
        const data = await res.json();
        if (mounted) setIsFollowing(data.isFollowing ?? false);
      } catch {
        // ignore
      }
    };
    fetchStatus();
    return () => {
      mounted = false;
    };
  }, [targetId]);

  const handleFollow = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: targetId }),
      });
      if (res.ok) {
        const nextStatus = !isFollowing;
        setIsFollowing(nextStatus);
        toast.success(nextStatus ? "User followed successfully" : "Unfollowed successfully");
        onFollowSuccess?.(targetId, nextStatus);
        window.dispatchEvent(
          new CustomEvent("follow-updated", { detail: { targetId, isFollowing: nextStatus } })
        );
      } else {
        const data = await res.json();
        toast.error(data.error || "Error following user");
      }
    } catch {
      toast.error("Error following user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={isFollowing ? "outline" : "default"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
export default FollowButton;
