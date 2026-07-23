import { headers } from "next/headers";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Globe, Github, Youtube, Pencil } from "lucide-react";
import { Project } from "@/types";
import { MarkdownPreview } from "@/components/markdown/MarkdownPreview";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

const ProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

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

  const project = response.project as Project & {
    authorId: string;
    authorName: string;
    authorImage: string;
  };

  const isAuthor = session?.user?.id === project.authorId;
  const techStackArray = JSON.parse(project.techStack || "[]");
  const tagsArray = JSON.parse(project.tags || "[]");

  return (
    <div className="min-h-screen  to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <div className="relative z-30 text-center space-y-4 px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            {project.company && (
              <Badge variant="secondary" className="text-sm">
                {project.company}
              </Badge>
            )}
            {project.year && (
              <Badge variant="outline" className="text-sm">
                {project.year}
              </Badge>
            )}
            {project.isRecent && (
              <Badge className="bg-emerald-300/20 text-emerald-300 border-emerald-300/30">
                Recent
              </Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {project.title}
          </h1>
          {project.excerpt && (
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {project.excerpt}
            </p>
          )}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <CalendarIcon className="w-4 h-4" />
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <span className="mx-2">•</span>
            <span>{project.views} views</span>
          </div>
        </div>
      </div>

      {/* Project Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <Card className="overflow-hidden shadow-xl">
          {project.image && (
            <div className="relative w-full h-[400px]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <CardContent className="p-8">
            {/* Author Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex items-center space-x-4 group">
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
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                {project.category && (
                  <Badge variant="outline">
                    {project.category}
                  </Badge>
                )}
                {isAuthor && (
                  <Link href={`/project/${id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Pencil className="size-4" />
                      Edit
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            {techStackArray.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStackArray.map((tech: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tagsArray.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tagsArray.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {project.description && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <div className="prose max-w-none dark:prose-invert">
                  <MarkdownPreview content={project.description} className="text-white/70" />
                </div>
              </div>
            )}

            {/* Content */}
            {project.content && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Details</h3>
                <div className="prose max-w-none dark:prose-invert">
                  <MarkdownPreview content={project.content} className="text-white/70" />
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <div className="prose max-w-none dark:prose-invert">
                  <MarkdownPreview content={project.features} className="text-white/70" />
                </div>
              </div>
            )}

            {/* Challenges */}
            {project.challenges && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Challenges</h3>
                <div className="prose max-w-none dark:prose-invert">
                  <MarkdownPreview content={project.challenges} className="text-white/70" />
                </div>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Outcomes</h3>
                <div className="prose max-w-none dark:prose-invert">
                  <MarkdownPreview content={project.outcomes} className="text-white/70" />
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-8">
              {project.liveLink && (
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <Button className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Live Demo
                  </Button>
                </Link>
              )}
              {project.sourceLink && (
                <Link href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    Source Code
                  </Button>
                </Link>
              )}
              {project.demoLink && (
                <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Youtube className="w-4 h-4" />
                    Demo Video
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ProjectPage;
