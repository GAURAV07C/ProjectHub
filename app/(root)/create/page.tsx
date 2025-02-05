import ProjectForm from "@/components/ProjectForm";
import React from "react";

const create = () => {
  return (
    <>
      <section className="form_container min-h-[230px]">
        <h1 className="heading">Submit Your Project</h1>
      </section>
      <ProjectForm  />
    </>
  );
};

export default create;
