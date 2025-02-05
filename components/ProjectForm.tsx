"use client";

import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
const ProjectForm = () => {
  return (
    <div>
      <form action="/" className="project-form">
        <div>
          <label htmlFor="title" className="project_form_label">
            Title{" "}
          </label>

          <Input
            id="title"
            name="title"
            className="  project-form_input"
            required
            placeholder="Project Title"
          />
        </div>
        <div>
          <Label className="project_form_label" htmlFor="description">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            className="form_textarea"
            required
            placeholder="Project Description"
          />
        </div>
        <div>
          <Label className="project_form_label" htmlFor="category">
            Category
          </Label>
          <Input
            id="category"
            name="category"
            className="project-form_input"
            required
            placeholder="Project category(DIY,Electronic , Next.js , Java...)"
          />
        </div>
        <div>
          <Label className="project_form_label" htmlFor="link">
            Image Url
          </Label>
          <Input
            id="link"
            name="link"
            className="project-form_input"
            required
            placeholder="Project Thumbnail Url "
          />
        </div>
        <div data-color-mode="light">
          <Label htmlFor="details" className="project-form_label">
            Details
          </Label>
          <MDEditor
            id="details"
            preview="edit"
            height={300}
            style={{
              borderRadius: 20,
              overflow: "hidden",
            }}
            textareaProps={{
              placeholder: "describe Your Project in details",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
