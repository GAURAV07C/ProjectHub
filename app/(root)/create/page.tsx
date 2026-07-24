import ProjectForm from "@/components/projects/ProjectForm";

const CreatePage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-20">
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-3">
            Submit Your Project
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Share your project with the community. Fill in the details below to showcase your work.
          </p>
        </div>
        <ProjectForm />
      </section>
    </div>
  );
};

export default CreatePage;
