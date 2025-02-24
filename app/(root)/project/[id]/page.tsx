import { getProjectById } from "@/actions/projectAction";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

const ProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Fetch the project data using the project ID
  const response = await getProjectById(id);

  if (!response.success || !response.project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-gray-600">
          Project not found
        </p>
      </div>
    );
  }

  const project = response.project;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <div className="relative z-30 text-center space-y-4 px-4">
          <Badge variant="secondary" className="mb-2">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>
      </div>

      {/* Project Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <Card className="overflow-hidden shadow-xl">
          <Image
            src={project.imageUrl || "" }
            alt="Project Image"
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
          />
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <Link
                href={`/user/${project.authorId}`}
                className="flex items-center space-x-4 group"
              >
                <Image
                  src={project.authorImage || "/placeholder.svg"}
                  alt={project.authorName || "Author"}
                  width={64}
                  height={64}
                  className="rounded-full shadow-lg group-hover:ring-2 ring-primary transition-all"
                />
                <div>
                  <p className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {project.authorName}
                  </p>
                  <p className="text-sm text-gray-600">@{project.authorName}</p>
                </div>
              </Link>
              <Badge className="mt-4 md:mt-0" variant="outline">
                {project.category}
              </Badge>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Project Details</h3>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: project.details || "" }}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ProjectPage;
