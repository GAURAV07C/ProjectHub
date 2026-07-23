import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, Bookmark, Heart, MessageCircle, Eye, Pencil } from "lucide-react";
import { User, Project } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProfileTabsProps {
  projects: Project[];
  likedprojects: Project[];
  userId: string;
  currentUser: NonNullable<User>;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  projects,
  likedprojects,
  userId,
  currentUser,
}) => {
  const isOwner = userId === currentUser.id;

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="group relative aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-300/30 transition-all duration-300">
      <div className="absolute inset-0">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-center p-4">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
            {project.title}
          </h3>
          <div className="flex items-center justify-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Heart className="size-4 fill-current" />
              {project._count.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="size-4" />
              {project._count.comments}
            </span>
          </div>
        </div>
      </div>

      {/* Always visible bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/90 to-transparent">
        <p className="text-white text-sm font-medium line-clamp-1">
          {project.title}
        </p>
        <p className="text-white/60 text-xs mt-1">
          {project.company} • {project.year}
        </p>
      </div>

      {/* Action buttons */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link href={`/project/${project.slug || project.id}`}>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white border-white/20">
            <Eye className="size-4" />
          </Button>
        </Link>
        {isOwner && (
          <Link href={`/project/${project.id}/edit`}>
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white border-white/20">
              <Pencil className="size-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <Tabs defaultValue="projects" className="w-full">
      <TabsList className="w-full justify-center border-b rounded-none h-auto p-0 bg-transparent gap-8">
        <TabsTrigger
          value="projects"
          className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-300 data-[state=active]:bg-transparent px-6 -ml-20 font-semibold text-white/70 data-[state=active]:text-white"
        >
          <Grid3X3 className="size-4" />
          Projects
        </TabsTrigger>
        <TabsTrigger
          value="likes"
          className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-300 data-[state=active]:bg-transparent px-6 font-semibold text-white/70 data-[state=active]:text-white"
        >
          <Bookmark className="size-4" />
          Likes
        </TabsTrigger>
      </TabsList>

      <div>
        <TabsContent value="projects" className="mt-8">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <Grid3X3 className="size-16 mx-auto mb-4 opacity-30" />
              <p className="text-xl font-medium mb-2">No projects yet</p>
              <p className="text-sm">Projects will appear here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="likes" className="mt-8">
          {likedprojects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedprojects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <Bookmark className="size-16 mx-auto mb-4 opacity-30" />
              <p className="text-xl font-medium mb-2">No liked projects</p>
              <p className="text-sm">Projects you like will appear here</p>
            </div>
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
