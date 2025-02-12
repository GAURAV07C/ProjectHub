import { getProjectsByUserId, getUserById } from "@/app/action/projectAction";
import Project3DCard from "@/components/Project3DCard";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import { string } from "zod";









const User = async ({ params }: { params: Promise< { id: string } > }) => {
  const session = await auth();
  const user = await getUserById((await params).id);
  const projectsResponse = await getProjectsByUserId((await params).id);



  if (!user) {
    return <p className="text-center text-gray-500">User not found.</p>;
  }

  return (
    <section className="profile_container">
      {/* Profile Card */}
      <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col max-w-sm mx-auto p-4 relative h-[30rem] items-center">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

        <EvervaultCard text="hover" imageUrl="/window.svg" />

        <h2 className="dark:text-white text-black mt-4 text-sm font-bold text-center">
          User name: {user.name}
        </h2>
        <p className="text-sm border font-semibold dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 text-center pb-11">
          {user.email}
        </p>

        {session?.user?.id === (await params).id ? (
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Edit Profile
          </button>
        ) : (
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
            Follow
          </button>
        )}
      </div>

      {/* Projects Section */}
      <div className="flex-1 flex flex-col gap-5 lg:mt-5">
        <Link href={"/create"}>
          <p>create</p>
        </Link>
        <p className="text-30-bold">All Projects</p>

        <ul className="mt-7 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 justify-center">
          {projectsResponse.success && projectsResponse.projects.length > 0 ? (
            projectsResponse.projects.map((project) => {
             

              return (
                <Project3DCard
                  key={project.id}
                  project={{ ...project, id: project.id.toString() }}
                />
              );
            })
          ) : (
            <p className="text-center text-gray-500">No projects found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default User;
