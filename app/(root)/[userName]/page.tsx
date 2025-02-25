import React from "react";
import {
  getProjectsByUserId,
  getUserLikedProjects,
  // getUserProjects
} from "@/actions/projectAction";
import { notFound } from "next/navigation";
import { isFollowing, getUserByUserName } from "@/data/user";

import { auth } from "@/lib/auth";

import ProfilePageClient from "./ProfilePageClient";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = await params;
  const user = await getUserByUserName(userName);
  if (!user) return;

  return {
    title: `${user.name ?? user.userName}`,
    description: user.bio || `Check out ${user.userName}'s profile.`,
  };
}

const page = async ({ params }: { params: Promise<{ userName: string }> }) => {
  const session = await auth();
  const { userName } = await params;
  const user = await getUserByUserName(userName);

  if (!user) {
    return notFound();
  }
 
  const userId = session?.user?.id ?? "";
  // Fetch all data concurrently
  const [projects, likedprojects, isCurrentFollowing] = await Promise.all([
    getProjectsByUserId(user.id),
    getUserLikedProjects(user.id),
    isFollowing(user.id, userId as string),
  ]);

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
    createdAt: new Date(), // Add the createdAt property
    _count: { projects: 0, following: 0, followers: 0, ...session?.user?._count },
  };

  if(!currentUser) return null

  return (
    <div>
      <ProfilePageClient
        user={user}
        projects={projects} // Extracting projects from response
        likedprojects={likedprojects}
        isFollowing={isCurrentFollowing}
        currentUserId={userId}
        currentUser={currentUser}
      />
    </div>
  );
};

export default page;




