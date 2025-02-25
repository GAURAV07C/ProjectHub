
import SearchForm from "@/components/SearchForm";
import { Boxes } from "@/components/ui/background-boxes";


import React from "react";

const page = async () => {
 
  return (
    <>

      {/* <NavBar  /> */}
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
        
      </section>
    </>
  );
};

export default page;
