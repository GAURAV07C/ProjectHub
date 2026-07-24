"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { User, Project } from "@/types";
import ProjectHeader from "./parts/ProjectHeader";
import ProjectBody from "./parts/ProjectBody";
import { ProjectActions } from "./parts/ProjectActions";
import { CommentSection } from "./parts/CommentSection";

const ProjectCard = ({
  project,
  userId,
}: {
  project: Project;
  userId: string;
  currentUser: NonNullable<User>;
}) => {
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [hasLiked, setHasLiked] = useState(
    project.likes.some((like) => like.userId === userId)
  );
  const [optimisticLiked, setOptimisticLiked] = useState(project._count.likes);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isCommentDeleting, setIsCommentDeleting] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setHasLiked((prev) => !prev);
    setOptimisticLiked((prev) => prev + (hasLiked ? -1 : 1));
    try {
      const res = await fetch(`/api/projects/${project.id}/like`, {
        method: "POST",
      });
      if (!res.ok) throw new Error();
    } catch {
      setOptimisticLiked(project._count.likes);
      setHasLiked(project.likes.some((like) => like.userId === userId));
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    setIsCommenting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      if (res.ok) {
        toast.success("Comment posted successfully");
        setNewComment("");
      } else {
        toast.error("Error commenting on project");
      }
    } catch {
      toast.error("Error commenting on project");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (isCommentDeleting) return;

    try {
      setIsCommentDeleting(true);
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Comment deleted successfully");
      } else {
        const data = await res.json();
        throw new Error(data.error);
      }
    } catch {
      toast.error("Failed to delete comment");
    } finally {
      setIsCommentDeleting(false);
    }
  };

  const handleDeleteProject = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Project deleted successfully");
      } else {
        const data = await res.json();
        throw new Error(data.error);
      }
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          <ProjectHeader
            project={project}
            userId={userId}
            isDeleting={isDeleting}
            onDelete={handleDeleteProject}
          />

          <ProjectBody project={project} />

          <div className="flex flex-col">
            <ProjectActions
              hasLiked={hasLiked}
              optimisticLiked={optimisticLiked}
              commentCount={project._count.comments}
              isLiking={isLiking}
              onLike={handleLike}
              onToggleComments={() => setShowComments((prev) => !prev)}
            />
            <CommentSection
              project={project}
              userId={userId}
              showComments={showComments}
              newComment={newComment}
              onNewCommentChange={setNewComment}
              onCommentSubmit={handleComment}
              isCommenting={isCommenting}
              isCommentDeleting={isCommentDeleting}
              onCommentDelete={handleCommentDelete}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
