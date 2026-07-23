import { headers } from "next/headers";
import React from "react";
import { notFound } from "next/navigation";
import { isFollowing, getUserByUserName } from "@/data/user";

import { auth } from "@/lib/auth";

import ProfilePageClient from "@/components/profile/ProfilePageClient";
import { Project } from "@/types";


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

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const projectsRes = await fetch(`${baseUrl}/api/projects/user/${user.id}`);
  const likedprojectsRes = await fetch(`${baseUrl}/api/projects/user/${user.id}/liked`);

  const projects: Project[] = await projectsRes.json();
  const likedprojects: Project[] = await likedprojectsRes.json();
  const isCurrentFollowing = await isFollowing(user.id, userId as string);

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
    followers: user.followers,
    following: user.following,
  };

  if(!currentUser) return null

  return (
    <div>
      <ProfilePageClient
        user={user}
        projects={projects}
        likedprojects={likedprojects}
        isFollowing={isCurrentFollowing}
        currentUserId={userId}
        currentUser={currentUser}
      />
    </div>
  );
};

export default page;
