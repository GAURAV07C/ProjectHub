import React from "react";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";

interface ProjectBodyProps {
  project: Project;
}

const ProjectBody: React.FC<ProjectBodyProps> = ({ project }) => {
  const techStackArray = JSON.parse(project.techStack || "[]");
  const tagsArray = JSON.parse(project.tags || "[]");

  return (
    <div>
      <CardContainer className="w-full flex py-2">
        <div className="w-full">
          <CardItem>
            <div className="flex items-center gap-3 mb-3">
              {project.company && (
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  {project.company}
                </span>
              )}
              {project.year && (
                <>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-white/40">{project.year}</span>
                </>
              )}
              {project.isRecent && (
                <span className="px-2 py-0.5 bg-emerald-300/20 text-emerald-300 text-xs rounded-full font-mono">
                  Recent
                </span>
              )}
            </div>
          </CardItem>
          <CardItem>
            <h2 className="text-xl font-bold text-white">{project.title}</h2>
          </CardItem>
          {project.excerpt && (
            <CardItem>
              <p className="text-muted-foreground text-sm py-1 line-clamp-2">
                {project.excerpt}
              </p>
            </CardItem>
          )}
          {project.description && (
            <CardItem>
              <div className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </div>
            </CardItem>
          )}
          <CardItem className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={project.image || ""}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </CardItem>
          {techStackArray.length > 0 && (
            <CardItem>
              <div className="flex flex-wrap gap-2 mt-4">
                {techStackArray.map((tech: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardItem>
          )}
          {tagsArray.length > 0 && (
            <CardItem>
              <div className="flex flex-wrap gap-2 mt-2">
                {tagsArray.map((tag: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardItem>
          )}
        </div>
      </CardContainer>

      <div className="flex items-center gap-2 mt-4">
        <Link href={`/project/${project.slug || project.id}`} className="ml-auto">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4" /> View Details
          </Button>
        </Link>
        {project.liveLink && (
          <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </Button>
          </Link>
        )}
        {project.sourceLink && (
          <Link href={project.sourceLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" /> Source
            </Button>
          </Link>
        )}
        {project.demoLink && (
          <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" /> Demo
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectBody;
