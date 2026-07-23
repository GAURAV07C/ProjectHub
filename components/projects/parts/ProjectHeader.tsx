import React from "react";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Project } from "@/types";
import { DeleteAlertDialog } from "@/components/projects/DeleteButton";

interface ProjectHeaderProps {
  project: Project;
  userId: string;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  userId,
  isDeleting,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href={project.author.userName || ""}>
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarImage
              src={
                project.author.image ??
                `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                  project.author.name ?? ""
                )}`
              }
            />
          </Avatar>
        </Link>
        <div className="flex-1">
          <Link
            href={project.author.userName || ""}
            className="font-semibold hover:underline"
          >
            {project.author.name}
          </Link>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>@{project.author.userName}</span>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(project.createdAt))} ago
            </span>
          </div>
        </div>
      </div>
      {userId === project.author.id && (
        <DeleteAlertDialog
          isDeleting={isDeleting}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default ProjectHeader;
