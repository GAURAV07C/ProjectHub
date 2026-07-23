import React from "react";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";

interface ProjectBodyProps {
  project: Project;
}

const ProjectBody: React.FC<ProjectBodyProps> = ({ project }) => {
  return (
    <div>
      <CardContainer className="w-full flex py-2">
        <div className="w-full">
          <CardItem>
            <h2 className="text-xl font-bold text-white">{project.title}</h2>
          </CardItem>
          <CardItem>
            <p className="text-muted-foreground text-sm py-1 line-clamp-2">
              {project.description}
            </p>
          </CardItem>
          <CardItem className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={project.imageUrl || ""}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </CardItem>
        </div>
      </CardContainer>

      <div className="flex items-center gap-2">
        <Link href={`project/${project.id}`} className="ml-auto">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4" /> View Details
          </Button>
        </Link>
        {project.Link && (
          <Link href={project.Link} className="ml-auto">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" /> Use Project
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectBody;
