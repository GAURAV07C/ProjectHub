import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProjectForm from "@/components/projects/ProjectForm";
import { Project } from "@/types";

const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/projects/${id}`, {
    cache: "no-store",
  });
  const response = await res.json();

  if (!response.success || !response.project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-gray-600">
          Project not found
        </p>
      </div>
    );
  }

  const project = response.project as Project;

  const projectSlug = project.slug || project.id;

  const serializedProject = {
    ...project,
    createdAt: String(project.createdAt),
    updatedAt: String(project.updatedAt),
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white py-12">
      <div className="container max-w-5xl mx-auto px-4">
        <Link href={`/project/${projectSlug}`}>
          <Button variant="ghost" className="mb-6 text-white/60 hover:text-white">
            <ArrowLeft className="size-4 mr-2" />
            Back to Project
          </Button>
        </Link>

        <ProjectForm
          project={serializedProject}
          redirectSlug={projectSlug}
        />
      </div>
    </div>
  );
};

export default EditProjectPage;
