"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/schemas/projectSchema";
import type * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-sucess";
import { MarkdownEditor } from "@/components/markdown/MarkdownEditor";
import { Project, Skill } from "@/types";

interface ProjectFormProps {
  project?: Project;
  redirectSlug?: string;
  onSuccess?: () => void;
}

const ProjectForm = ({ project, redirectSlug, onSuccess }: ProjectFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (success && redirectSlug) {
      window.location.href = `/project/${redirectSlug}`;
    }
  }, [success, redirectSlug]);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      slug: project?.slug || "",
      description: project?.description || "",
      excerpt: project?.excerpt || "",
      content: project?.content || "",
      image: project?.image || "",
      company: project?.company || "",
      year: project?.year || "",
      techStack: project?.techStack || "",
      tags: project?.tags || "",
      liveLink: project?.liveLink || "",
      sourceLink: project?.sourceLink || "",
      demoLink: project?.demoLink || "",
      isRecent: project?.isRecent || false,
      category: project?.category || "",
      challenges: project?.challenges || "",
      features: project?.features || "",
      outcomes: project?.outcomes || "",
    },
  });

  useEffect(() => {
    fetchUserSkills();
  }, []);

  useEffect(() => {
    if (project && userSkills.length > 0) {
      try {
        const techStackArray = JSON.parse(project.techStack || "[]");
        const matchedSkills = techStackArray
          .map((tech: string) => userSkills.find(s => s.title === tech))
          .filter((s: Skill | undefined): s is Skill => s !== undefined);
        setSelectedSkills(matchedSkills);
      } catch {
        // ignore parse error
      }
    }
  }, [project, userSkills]);

  const fetchUserSkills = async () => {
    setLoadingSkills(true);
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (res.ok) {
        setUserSkills(data.map((us: { skill: Skill }) => us.skill));
      }
    } catch {
      console.error("Failed to fetch user skills");
    } finally {
      setLoadingSkills(false);
    }
  };

  const toggleSkill = (skill: Skill) => {
    setSelectedSkills(prev => {
      const isSelected = prev.some(s => s.id === skill.id);
      const newSelected = isSelected
        ? prev.filter(s => s.id !== skill.id)
        : [...prev, skill];
      
      const techStackArray = newSelected.map(s => s.title);
      form.setValue("techStack", JSON.stringify(techStackArray));
      
      return newSelected;
    });
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);

    try {
      const url = project ? `/api/projects/${project.id}` : "/api/projects";
      const method = project ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || (project ? "Failed to update project" : "Failed to create project"));
        return;
      }

      setSuccess(project ? "Project updated successfully" : data.success);
      form.reset();
      setSelectedSkills([]);
      if (!redirectSlug) {
        onSuccess?.();
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gray-950 border border-white/10 text-white shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {project ? "Edit Project" : "Add New Project"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Company & Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70">Company</FormLabel>
                    <FormControl>
                      <Input className="bg-gray-900 border-white/10 text-white placeholder:text-white/30" placeholder="Company name" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70">Year</FormLabel>
                    <FormControl>
                      <Input className="bg-gray-900 border-white/10 text-white placeholder:text-white/30" placeholder="2024" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Title & Slug */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Title</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-gray-900 border-white/10 text-white placeholder:text-white/30" 
                      placeholder="Project title" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        if (!project) {
                          form.setValue("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                        }
                      }}
                      disabled={isPending} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Slug</FormLabel>
                  <FormControl>
                    <Input className="bg-gray-900 border-white/10 text-white placeholder:text-white/30" placeholder="auto-generated-slug" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Markdown Editors */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Description</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Add project description..."
                      minHeight="150px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Features</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="- Feature 1&#10;- Feature 2"
                      minHeight="150px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Challenges</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Describe challenges faced..."
                      minHeight="150px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="outcomes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Outcomes</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Project outcomes and results..."
                      minHeight="150px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tech Stack */}
            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Tech Stack / Skills</FormLabel>
                  <FormControl>
                    <Input 
                      type="hidden"
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  {loadingSkills ? (
                    <p className="text-sm text-gray-500 mt-2">Loading skills...</p>
                  ) : userSkills.length > 0 ? (
                    <div className="mt-3 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {userSkills.map((skill) => {
                          const isSelected = selectedSkills.some(s => s.id === skill.id);
                          return (
                            <button
                              key={skill.id}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                                isSelected
                                  ? "bg-emerald-300 text-gray-950"
                                  : "bg-gray-800 text-white hover:bg-gray-700"
                              }`}
                            >
                              {isSelected && "✓ "}
                              {skill.title}
                            </button>
                          );
                        })}
                      </div>
                      {selectedSkills.length > 0 && (
                        <div className="text-xs text-white/40">
                          Selected: {selectedSkills.map(s => s.title).join(", ")}
                        </div>
                      )}
                    </div>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Tags</FormLabel>
                  <FormControl>
                    <Input className="bg-gray-900 border-white/10 text-white placeholder:text-white/30" placeholder='web, fullstack, ecommerce' {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="liveLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70">Live Link</FormLabel>
                    <FormControl>
                      <Input className="bg-gray-900 border-white/10 text-white placeholder:text-white/30" placeholder="https://example.com" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="demoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70">Demo Link (YouTube)</FormLabel>
                    <FormControl>
                      <Input className="bg-gray-900 border-white/10 text-white placeholder:text-white/30" placeholder="https://youtube.com/watch?v=..." {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="sourceLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Source Link (GitHub)</FormLabel>
                  <FormControl>
                    <Input className="bg-gray-900 border-white/10 text-white placeholder:text-white/30" placeholder="https://github.com/..." {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Image URL</FormLabel>
                  <FormControl>
                    <Input className="bg-gray-900 border-white/10 text-white placeholder:text-white/30" placeholder="https://example.com/image.png" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRecent"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 p-4 bg-gray-950 border border-white/10 rounded-xl space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="w-5 h-5 rounded border-white/20 bg-gray-900 text-emerald-300 focus:ring-emerald-300 focus:ring-offset-gray-900"
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-white/70 cursor-pointer font-normal">
                    Show as <span className="text-emerald-300 font-semibold">Recent Project</span> on homepage
                  </FormLabel>
                </FormItem>
              )}
            />

            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}

            <div className="flex gap-3 pt-3 border-t border-white/10 mt-6">
              <Button
                type="submit"
                className="flex-1 bg-emerald-300 hover:bg-emerald-400 text-gray-950 font-bold py-6 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-300/20 disabled:opacity-50"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : project ? "Update Project" : "Add Project"}
              </Button>

              {project && (
                <Button
                  type="button"
                  variant="destructive"
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium py-6 px-6 rounded-xl border border-red-500/20"
                  disabled={isPending}
                  onClick={async () => {
                    if (!confirm("Are you sure you want to delete this project?")) return;
                    setIsPending(true);
                    setError("");
                    try {
                      const res = await fetch(`/api/projects/${project.id}`, {
                        method: "DELETE",
                      });
                      const data = await res.json();
                      if (!res.ok) {
                        setError(data.error || data.message || "Failed to delete project");
                        setIsPending(false);
                        return;
                      }
                      setSuccess("Project deleted successfully");
                      onSuccess?.();
                      if (redirectSlug) {
                        window.location.href = `/project/${redirectSlug}`;
                      }
                    } catch {
                      setError("Something went wrong");
                      setIsPending(false);
                    }
                  }}
                >
                  Delete
                </Button>
              )}
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
