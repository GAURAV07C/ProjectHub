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
import { Badge } from "@/components/ui/badge";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-sucess";
import { MarkdownEditor } from "@/components/markdown/MarkdownEditor";
import { Project, Skill } from "@/types";

interface ProjectFormProps {
  project?: Project;
  onSuccess?: () => void;
}

const ProjectForm = ({ project, onSuccess }: ProjectFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      excerpt: "",
      content: "",
      image: "",
      company: "",
      year: "",
      techStack: "",
      tags: "",
      liveLink: "",
      sourceLink: "",
      demoLink: "",
      isRecent: false,
      category: "",
      challenges: "",
      features: "",
      outcomes: "",
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
      onSuccess?.();
    } catch {
      setError("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {project ? "Edit Project" : "Create New Project"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} disabled={isPending} />
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
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="my-project" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} disabled={isPending} />
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
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2024" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="liveLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sourceLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Link (GitHub)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/..." {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="demoLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demo Link (YouTube)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stack</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='["React", "TypeScript", "Next.js"]' 
                      {...field} 
                      disabled={isPending}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                  {loadingSkills ? (
                    <p className="text-sm text-gray-500 mt-2">Loading skills...</p>
                  ) : userSkills.length > 0 ? (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500 mb-2">Select from your skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {userSkills.map((skill) => {
                          const isSelected = selectedSkills.some(s => s.id === skill.id);
                          return (
                            <Badge
                              key={skill.id}
                              variant={isSelected ? "default" : "outline"}
                              className="cursor-pointer transition-colors"
                              onClick={() => toggleSkill(skill)}
                            >
                              {skill.title} {isSelected ? "✓" : "+"}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder='["web", "fullstack", "ecommerce"]' {...field} disabled={isPending} />
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
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="- Feature 1&#10;- Feature 2&#10;- Feature 3"
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
                  <FormLabel>Challenges</FormLabel>
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
                  <FormLabel>Outcomes</FormLabel>
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

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Content</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Full project content in markdown..."
                      minHeight="300px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}

            {project && (
              <Button
                type="button"
                variant="destructive"
                className="w-full"
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
                    onSuccess?.();
                  } catch {
                    setError("Something went wrong");
                    setIsPending(false);
                  }
                }}
              >
                Delete Project
              </Button>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : project ? "Update Project" : "Create Project"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
