import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Globe, Github, Youtube, Pencil } from "lucide-react";
import { Project } from "@/types";
import { MarkdownPreview } from "@/components/markdown/MarkdownPreview";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { slug: true, id: true },
  });

  return projects.map((project) => ({
    id: project.slug || project.id,
  }));
}

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
  const projectSlug = project.slug || project.id;
  const techStackArray = JSON.parse(project.techStack || "[]");
  const tagsArray = JSON.parse(project.tags || "[]");

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <section className="max-w-5xl mx-auto px-4 pt-12">
        {/* Project Image */}
        {project.image && (
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 mb-10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Title + Meta */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            {project.company && (
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                {project.company}
              </span>
            )}
            {project.year && (
              <>
                <span className="text-white/20">•</span>
                <span className="text-xs text-white/40">{project.year}</span>
              </>
            )}
            {project.isRecent && (
              <span className="px-2 py-0.5 bg-emerald-300/20 text-emerald-300 text-xs rounded-full font-mono">
                Recent
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-3 leading-tight">
            {project.title}
          </h1>
          {project.excerpt && (
            <p className="text-white/60 text-lg max-w-2xl">
              {project.excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm text-white/40 mt-3">
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

        {/* Author Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="flex items-center space-x-4">
            <Image
              src={project.authorImage || "/placeholder.svg"}
              alt={project.authorName || "Author"}
              width={56}
              height={56}
              className="rounded-full shadow-lg"
            />
            <div>
              <p className="text-lg font-semibold text-white">
                {project.authorName}
              </p>
              <p className="text-sm text-white/60">@{project.authorName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {project.category && (
              <Badge variant="outline" className="text-white/70 border-white/20">
                {project.category}
              </Badge>
            )}
            {isAuthor && (
              <Link href={`/project/${projectSlug}/edit`}>
                <Button variant="outline" size="sm" className="gap-2 text-white border-white/20 hover:bg-white/10">
                  <Pencil className="size-4" />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-white mb-4">Description</h2>
            <div className="text-white/70 text-lg leading-relaxed">
              {project.description}
            </div>
          </div>
        )}

        {/* Content / Details */}
        {project.content && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-white mb-4">Details</h2>
            <div className="prose prose-invert max-w-none text-white/70">
              <MarkdownPreview content={project.content} className="text-white/70 text-base leading-relaxed" />
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-white mb-4">Key Features</h2>
            <ul className="flex flex-col gap-2">
              <li className="text-white/70 text-base leading-relaxed">
                <MarkdownPreview content={project.features} />
              </li>
            </ul>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-white mb-4">Challenges</h2>
            <ul className="flex flex-col gap-2">
              <li className="text-white/70 text-base leading-relaxed">
                <MarkdownPreview content={project.challenges} />
              </li>
            </ul>
          </div>
        )}

        {/* Outcomes */}
        {project.outcomes && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-white mb-4">Outcomes</h2>
            <ul className="flex flex-col gap-2">
              <li className="text-white/70 text-base leading-relaxed">
                <MarkdownPreview content={project.outcomes} />
              </li>
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {techStackArray.length > 0 && (
          <div className="mb-12" id="tech-stack">
            <h2 className="font-serif text-2xl text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {techStackArray.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-lg font-semibold font-mono px-4 py-2 text-sm outline outline-2 outline-white/10 text-black bg-white tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tagsArray.length > 0 && (
          <div className="mb-12" id="tags">
            <h2 className="font-serif text-2xl text-white mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tagsArray.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-300 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-12">
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
              <Button variant="outline" className="flex items-center gap-2 text-white border-white/20 hover:bg-white/10">
                <Github className="w-4 h-4" />
                Source Code
              </Button>
            </Link>
          )}
          {project.demoLink && (
            <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center gap-2 text-white border-white/20 hover:bg-white/10">
                <Youtube className="w-4 h-4" />
                Demo Video
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
