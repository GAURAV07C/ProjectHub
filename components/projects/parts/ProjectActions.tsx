import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

interface ProjectActionsProps {
  hasLiked: boolean;
  optimisticLiked: number;
  commentCount: number;
  isLiking: boolean;
  onLike: () => void;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({
  hasLiked,
  optimisticLiked,
  commentCount,
  isLiking,
  onLike,
}) => {
  return (
    <div className="flex flex-col">
      <div className="w-[90%] inline-flex justify-between items-center text-muted-foreground">
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onLike}
            disabled={isLiking}
            className="flex items-center justify-between gap-1"
          >
            <Heart
              className={`h-5 w-5 ${
                hasLiked ? "text-red-500 fill-current" : ""
              }`}
            />
            <span className="text-sm">{optimisticLiked}</span>
          </motion.button>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-5 w-5" />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectActions };
