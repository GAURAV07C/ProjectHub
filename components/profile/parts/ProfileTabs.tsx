import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/projects/projectCard";
import { FileTextIcon, HeartIcon } from "lucide-react";
import { User, Project } from "@/types";

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
  return (
    <Tabs defaultValue="projects" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
        <TabsTrigger
          value="projects"
          className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 -ml-20 font-semibold"
        >
          <FileTextIcon className="size-4" />
          Projects
        </TabsTrigger>
        <TabsTrigger
          value="likes"
          className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 font-semibold"
        >
          <HeartIcon className="size-4" />
          Likes
        </TabsTrigger>
      </TabsList>

      <div>
        <TabsContent value="projects" className="mt-16">
          <div className="space-y-8 -m-10">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  userId={userId}
                  currentUser={currentUser}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No projects yet
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="likes" className="mt-16">
          <div className="space-y-16 -m-10">
            {likedprojects.length > 0 ? (
              likedprojects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  userId={userId}
                  currentUser={currentUser}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No liked projects to show
              </div>
            )}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
