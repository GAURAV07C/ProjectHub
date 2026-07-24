import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ArrowUpRightIcon } from "lucide-react";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default async function ProjectsPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  const res = await fetch("/api/projects", { next: { revalidate: 3600 } });
  const projects: Project[] = await res.json();

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <main className="flex-grow pt-32 pb-16 lg:py-40">
        <div className="container max-w-6xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-emerald-300 transition-colors mb-10">
            <ArrowLeft className="size-4 rotate-180" />
            <span>Back to Home</span>
          </Link>

          <div className="mb-16">
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">All Projects</h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Explore my recent work and side projects. Each project represents a unique challenge and learning experience.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center text-white/50 py-20">
              <p className="text-xl mb-2">No projects yet</p>
              <p className="text-sm">Check back soon for new work.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((project) => {
                const projectSlug = project.slug || project.id;
                const techStack = JSON.parse(project.techStack || "[]");
                return (
                  <Link key={project.id} href={`/project/${projectSlug}`} className="group block h-full">
                    <Card className="h-full bg-gray-900 border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-300/30 transition-all duration-300">
                      <div className="lg:grid lg:grid-cols-2 gap-0">
                        <div className="p-6 md:p-8 flex flex-col justify-center">
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

                          <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-emerald-300 transition-colors mb-3">
                            {project.title}
                          </h3>

                          <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                            {project.excerpt || project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {techStack.slice(0, 4).map((tech: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              {project.views.toLocaleString()} views
                            </span>
                          </div>

                          <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 group-hover:text-emerald-200 transition-colors mt-4">
                            <span>View Project</span>
                            <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                        <div className="relative min-h-[220px] md:min-h-[260px]">
                          {project.image && (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent lg:block hidden" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
