"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/schemas/projectSchema";
import type * as z from "zod";

import {
  Form,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProjectFormField from "./ProjectFormField";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-sucess";

const ProjectForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      category: "",
      description: "",
      details: "",
      imageurl: "",
      title: "",
      Link: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create project");
        return;
      }

      setSuccess(data.success);
      form.reset();
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
          Create New Project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <ProjectFormField control={form.control} name="title" label="Title" placeholder="Enter your Project title" disabled={isPending} />
              <ProjectFormField control={form.control} name="description" label="Description" type="textarea" placeholder="Project Description" disabled={isPending} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProjectFormField control={form.control} name="category" label="Category" placeholder="Project category (Next.js, DIY...)" disabled={isPending} />
                <ProjectFormField control={form.control} name="imageurl" label="Image URL" placeholder="Project Thumbnail Url" disabled={isPending} />
              </div>
              <ProjectFormField control={form.control} name="Link" label="Link to the project" placeholder="Live project link" disabled={isPending} />
              <ProjectFormField control={form.control} name="details" label="Details" type="markdown" placeholder="Describe your project in detail" disabled={isPending} />
            </div>

            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit Your Project"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
