"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { toggleFollowButton } from "@/data/user";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
// import { toggleFollow } from "@/actions/user.action";
interface FollowButtonProps {
  userId: string;
  targetId: string;
}

function FollowButton({ targetId, userId }: FollowButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    
    setIsLoading(true);

    try {
      await toggleFollowButton(targetId, userId);
        toast.success("User followed successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error following user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow"}
    </Button>
  );
}
export default FollowButton;
