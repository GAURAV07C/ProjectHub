import Project3DCard from "@/components/Project3DCard";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

import React from "react";



// ✅ Fix: Accept props with correct type
const Page = () => {
 

  return (
    <>
      <section className="profile_container">
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col max-w-sm mx-auto p-4 relative h-[30rem] items-center">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <EvervaultCard text="hover" imageUrl="/window.svg" />

          <h2 className="dark:text-white text-black mt-4 text-sm font-bold text-center">
            User name:
          </h2>
          <p className="text-sm border font-semibold dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 line-clamp-2 text-center pb-11">
            Watch me hover
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">All Projects</p>

          <ul className="mt-7 card_grid grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 justify-center">
            {Array.from({ length: 20 }).map((_, index) => (
              <Project3DCard key={index} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
