import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";

interface ProjectFormFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
  type?: "text" | "textarea" | "markdown";
  placeholder?: string;
  disabled?: boolean;
}

const ProjectFormField: React.FC<ProjectFormFieldProps> = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">{label}</FormLabel>
          <FormControl>
            {type === "markdown" ? (
              <div
                data-color-mode="light"
                className="md-editor-container border rounded-lg p-4"
              >
                <MDEditor
                  {...field}
                  height={300}
                  className="rounded-lg shadow-sm border"
                  textareaProps={{
                    placeholder: placeholder || "",
                  }}
                  previewOptions={{ disallowedElements: ["style"] }}
                />
              </div>
            ) : type === "textarea" ? (
              <Textarea
                {...field}
                disabled={disabled}
                placeholder={placeholder}
                className="input-field min-h-[100px]"
              />
            ) : (
              <Input
                {...field}
                disabled={disabled}
                placeholder={placeholder}
                className="input-field"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProjectFormField;
