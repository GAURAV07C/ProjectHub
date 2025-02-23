import { getProjects } from "@/actions/projectAction";
import ProjectCard from "@/components/Feed/projectCard";
import WhoToFollow from "@/components/WhoRoFollow";
import { auth } from "@/lib/auth";
import React from "react";

const Feed = async () => {
  const projects = await getProjects();

  if (!Array.isArray(projects)) {
    return <div>Error loading projects.</div>;
  }

  const sesson = await auth();
    const id = sesson?.user?.id || "";


  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
      
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} userId={id} />
          ))}
        </div>
      </div>

      <div className=" lg:col-span-4 sticky top-20">
        <div>
          <WhoToFollow />
        </div>
      </div>
    </div>
  );
};

export default Feed;
