import Project3DCard from "@/components/projects/Project3DCard";
import SearchForm from "@/components/SearchForm";
import { Boxes } from "@/components/ui/background-boxes";


import React from "react";

const page = async () => {
 
  return (
    <>
      <div className="h-[730px] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full  z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <h1 className="heading relative">Welcome TO ProjectHub</h1>
        <p className="sub-heading max-w-3xl relative">
          Where Projec meet like-minded people
        </p>

        <SearchForm />
      </div>

      <section className="section_container">
        <p className="text-30-semibold">Trendy Project</p>
        <ul className="mt-7 card_grid grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 justify-center">
          { [
            {
              id: "1",
              title: "neew priject",
              description: "this is a new project",
            },
            {
              id: "2",
              title: "neew priject",
              description: "this is a new project",
            },
            {
              id: "3",
              title: "neew priject",
              description: "this is a new project",
            },
            {
              id: "4",
              title: "neew priject",
              description: "this is a new project",
            },
            {
              id: "5",
              title: "neew priject",
              description: "this is a new project",
            },
            {
              id: "6",
              title: "neew priject",
              description: "this is a new project",
            },
            {
              id: "7",
              title: "neew priject",
              description: "this is a new project",
            },
            {
              id: "8",
              title: "neew priject",
              description: "this is a new project",
            },
            {
              id: "9",
              title: "neew priject",
              description: "this is a new project",
            },
            {
              id: "10",
              title: "neew priject",
              description: "this is a new project",
            },
           
          ].map((item) => (
            <Project3DCard key={item.id} project={item}  />
          ))}
        </ul>
      </section>
    </>
  );
};

export default page;
