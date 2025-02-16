"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/schemas/projectSchema";
// import { createProject } from "@/actions/projectAction"; // Import server action
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { createProject } from "@/actions/projectAction";

const ProjectForm = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  const details = watch("details", "");

  const onSubmit = async (data: any) => {
    // Send form data to the server to be saved in the database
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("imageurl", data.imageurl);
    formData.append("details", data.details);

    // Call server action
    const response = await createProject(formData);

    if (response.success) {
      setMessage("Project created successfully!");
      reset(); // Reset the form after submission
      setValue("details", ""); // Clear the MDEditor manually
    } else {
      setMessage((response.message as string) || "Something went wrong.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="project-form">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="project_form_label">
            Title
          </Label>
          <Input
            id="title"
            {...register("title")}
            className="project-form_input"
            placeholder="Project Title"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title?.message as string}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="project_form_label">
            Description
          </Label>
          <Textarea
            id="description"
            {...register("description")}
            className="form_textarea"
            placeholder="Project Description"
          />
          {errors.description && (
            <p className="text-red-500">
              {errors.description?.message as string}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category" className="project_form_label">
            Category
          </Label>
          <Input
            id="category"
            {...register("category")}
            className="project-form_input"
            placeholder="Project category (Next.js, DIY...)"
          />
          {errors.category && (
            <p className="text-red-500">{errors.category?.message as string}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <Label htmlFor="imageurl" className="project_form_label">
            Image URL
          </Label>
          <Input
            id="imageurl"
            {...register("imageurl")}
            className="project-form_input"
            placeholder="Project Thumbnail URL"
          />
          {errors.imageurl && (
            <p className="text-red-500">{errors.imageurl?.message as string}</p>
          )}
        </div>

        {/* Details (Markdown Editor) */}
        <div data-color-mode="light">
          <Label htmlFor="details" className="project-form_label">
            Details
          </Label>
          <MDEditor
            id="details"
            value={details}
            onChange={(value) => setValue("details", value || "")}
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{ placeholder: "Describe your project in detail" }}
            previewOptions={{ disallowedElements: ["style"] }}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default ProjectForm;
