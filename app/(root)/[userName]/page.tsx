import React from "react";
import {
  getProjectsByUserId,
  getUserByUserName,
} from "@/actions/projectAction";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from "lucide-react";
import Project3DCard from "@/components/projects/Project3DCard";

const page = async ({ params }: { params: Promise<{ userName: string }> }) => {
  const session = await auth();
  const { userName } = await params;
  const user = await getUserByUserName(userName);

  if (!user) {
    return <p className="text-center text-gray-500">User not found.</p>;
  }

  // Fetch projects using user ID instead of username
  const projectsResponse = await getProjectsByUserId(user.id);

  const isOwnProfile = session?.user?.userName === userName;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <Image
          src={user.image || "/placeholder.svg"}
          alt={user.name || "User"}
          width={150}
          height={150}
          className="rounded-full mb-4 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <h1 className="text-2xl font-semibold mr-4">{user.name}</h1>
            {isOwnProfile ? (
              <Button variant="outline" size="sm" className="mr-2">
                Edit Profile
              </Button>
            ) : (
              <Button variant="default" size="sm" className="mr-2">
                Follow
              </Button>
            )}
            {isOwnProfile && (
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="flex mb-4 space-x-6">
            <span>
              <strong>{projectsResponse.projects.length}</strong> posts
            </span>
            <span>
              <strong>1.2k</strong> followers
            </span>
            <span>
              <strong>567</strong> following
            </span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <hr />
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          {isOwnProfile && (
            <Link href="/create">
              <Button variant="ghost" size="sm">
                <PlusCircle className="h-5 w-5 mr-2" />
                Create Project
              </Button>
            </Link>
          )}
        </div>
        <div className="">
          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 justify-center">
            {projectsResponse.success &&
            projectsResponse.projects.length > 0 ? (
              projectsResponse.projects.map((project) => (
                <Project3DCard
                  key={project.id}
                  project={{ ...project, id: project.id.toString() }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No projects found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
