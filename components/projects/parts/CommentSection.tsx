import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, Delete } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Project } from "@/types";

interface CommentSectionProps {
  project: Project;
  userId: string;
  showComments: boolean;
  newComment: string;
  onNewCommentChange: (value: string) => void;
  onCommentSubmit: () => void;
  isCommenting: boolean;
  isCommentDeleting: boolean;
  onCommentDelete: (commentId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  project,
  userId,
  showComments,
  newComment,
  onNewCommentChange,
  onCommentSubmit,
  isCommenting,
  isCommentDeleting,
  onCommentDelete,
}) => {
  if (!showComments) return null;

  return (
    <div className="space-y-4 py-3 w-full">
      <Separator />
      <div className="flex gap-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => onNewCommentChange(e.target.value)}
          className="flex-1"
          rows={1}
          autoFocus
        />
        <Button onClick={onCommentSubmit} disabled={isCommenting || !newComment.trim()}>
          {isCommenting ? (
            "Posting..."
          ) : (
            <>
              <SendIcon className="size-4" />
              Comment
            </>
          )}
        </Button>
      </div>

      <div className="h-[200px] overflow-y-auto space-y-4">
        {project.comments?.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  comment.author?.image ??
                  `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                    comment.author?.name ?? ""
                  )}`
                }
              />
            </Avatar>
            <div className="flex-1">
              <span className="font-semibold text-xl">
                {comment.author?.name}
              </span>{" "}
              <span className="text-sm text-muted-foreground">
                @{comment.author?.userName}{" "}
              </span>{" "}
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </span>
              <p className="text-sm">{comment.content}</p>
            </div>
            {comment.authorId === userId && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onCommentDelete(comment.id)}
                disabled={isCommentDeleting}
              >
                <Delete className="h-4 w-4 text-red-500" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { CommentSection };
