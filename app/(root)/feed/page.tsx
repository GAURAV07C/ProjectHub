import ProjectCard from "@/components/projects/projectCard";
import { auth } from "@/lib/auth";
import React from "react";
import { Project, User } from "@/types";
import RightSidebar from "@/components/layout/RightSidebar";
import { redirect } from "next/navigation";

import { headers } from "next/headers";

const Feed = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/projects?limit=20`, {
    cache: "no-store",
  });
  const projects: Project[] = await res.json();

  if (!Array.isArray(projects)) {
    return <div>Error loading projects.</div>;
  }

  const id = session.user.id;
  const userCount = session.user._count as { projects?: number; following?: number; followers?: number } | undefined;
  const currentUser = {
    id: session.user.id,
    name: session.user.name ?? null,
    userName: session.user.userName ?? null,
    email: session.user.email ?? null,
    image: session.user.image ?? null,
    bio: session.user.bio ?? null,
    location: session.user.location ?? null,
    website: session.user.website ?? null,
    emailVerified: null,
    createdAt: new Date(),
    _count: {
      projects: userCount?.projects ?? 0,
      following: userCount?.following ?? 0,
      followers: userCount?.followers ?? 0,
    },
    followers: [],
    following: [],
  };

  const trendingProjects = [...projects]
    .sort((a, b) => (b._count?.likes || 0) - (a._count?.likes || 0))
    .slice(0, 5);

  let suggestedUsers: User[] = [];
  try {
    const usersRes = await fetch(`${baseUrl}/api/users/random`, {
      cache: "no-store",
    });
    const usersData = await usersRes.json();
    if (Array.isArray(usersData)) {
      suggestedUsers = usersData;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8">
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} userId={id} currentUser={currentUser} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 sticky top-[72px] self-start">
        <RightSidebar trendingProjects={trendingProjects} suggestedUsers={suggestedUsers} />
      </div>
    </div>
  );
};

export default Feed;
