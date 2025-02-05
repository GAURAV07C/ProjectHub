import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full  z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />

        <p className="tag relative">20 December 2024</p>

        <h1 className="heading relative">Tailwind is Awesome</h1>
        <p className="sub-heading max-w-5xl relative">
          nice project description
        </p>
      </div>

      <section className="section_container">
        <Image
          src={"/globe.svg"}
          alt=""
          width={50}
          height={50}
          className="w-[70vw]  h-auto rounded-xl mx-auto"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={"/"} className="flex gap-2 items-center mb-3">
              <Image
                src={"/globe.svg"}
                alt=""
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">Author name</p>
                <p className="text-16-medium">@UserName</p>
              </div>
            </Link>
            <p className="category-tag">Elecronic</p>
          </div>
          <h3 className="text-30-bold">Project Details</h3>
          <p className="no-result">no details</p>
        </div>
        <hr className="divider" />
      </section>
    </>
  );
};

export default page;
