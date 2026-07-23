import ProjectCard from "@/components/projects/projectCard";
import WhoToFollow from "@/components/WhoRoFollow";
import { auth } from "@/lib/auth";
import React from "react";
import { Project } from "@/types";

const Feed = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/projects`, {
    cache: "no-store",
  });
  const projects: Project[] = await res.json();

  if (!Array.isArray(projects)) {
    return <div>Error loading projects.</div>;
  }

  const session = await auth();
  const id = session?.user?.id || "";
  const currentUser = {
    ...session?.user,
    userName: session?.user?.userName ?? null,
    name: session?.user?.name ?? null,
    id: session?.user?.id ?? "",
    email: session?.user?.email ?? null,
    image: session?.user?.image ?? null,
    bio: session?.user?.bio ?? null,
    location: session?.user?.location ?? null,
    website: session?.user?.website ?? null,
    emailVerified: null,
    createdAt: new Date(),
    _count: {
      projects: 0,
      following: 0,
      followers: 0,
      ...session?.user?._count,
    },
    followers: [],
    following: [],
  };

  if (!currentUser) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} userId={id} currentUser={currentUser} />
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
