import { getProjectById } from "@/app/action/projectAction";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";
import Link from "next/link";

const ProjectPage = async ({ params }:   { params: Promise  < { id: string }>}) => {
  const { id } = await params;

  // Fetch the project data using the project ID
  const response = await getProjectById(id);

  if (!response.success || !response.project) {
    return <div>Project not found</div>;
  }

  const project = response.project;

  return (
    <>
      {/* Hero Section */}
      <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <p className="tag relative">
          {new Date(project.createdAt).toDateString()}
        </p>
        <h1 className="heading relative">{project.title}</h1>
        <p className="sub-heading max-w-5xl relative">{project.description}</p>
      </div>

      {/* Project Section */}
      <section className="section_container">
        <Image
          src={project.imageUrl || "/placeholder.png"}
          alt="Project Image"
          width={50}
          height={50}
          className="w-[70vw] h-auto rounded-xl mx-auto"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            {/* Link to User Profile */}
            <Link
              href={`/user/${project.authorId}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={project.authorImage}
                alt={project.authorName || "Author"}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{project.authorName}</p>
                <p className="text-16-medium">@{project.authorName}</p>
              </div>
            </Link>

            <p className="category-tag">{project.category}</p>
          </div>

          {/* Project Details */}
          <h3 className="text-30-bold">Project Details</h3>
          <p className="no-result">{project.details}</p>
        </div>

        <hr className="divider" />
      </section>
    </>
  );
};

export default ProjectPage;
