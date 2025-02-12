import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { auth } from "@/lib/auth";
import DeleteButton from "./DeleteButton";

const Project3DCard = async ({
  project,
}: {
  project: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    userId?: string;
  };
}) => {
  const session = await auth();

  return (
    <CardContainer className="inter- h-[20rem]">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[24rem] h-[30rem] rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {project.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {project.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={project.imageUrl || "/placeholder.png"} // Fallback if no image is available
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={project.title}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <Link href={`/project/${project.id}`}>
            <CardItem
              translateZ={20}
              translateX={-40}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              View Details →
            </CardItem>
          </Link>

          {session?.user?.id === String(project.userId) && (
            <DeleteButton projectId={project.id} />
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default Project3DCard;
