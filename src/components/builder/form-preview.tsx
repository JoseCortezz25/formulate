"use client";

import { useState } from "react";
import type { FormConfig, FormField } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FormPreviewProps {
  form: FormConfig
}

export function FormPreview({ form }: FormPreviewProps) {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: FormField, value: string) => {
    if (field.required && !value) {
      return "This field is required";
    }
    if (field.validation) {
      if (field.validation.minLength && value.length < field.validation.minLength) {
        return `Minimum length is ${field.validation.minLength}`;
      }
      if (field.validation.maxLength && value.length > field.validation.maxLength) {
        return `Maximum length is ${field.validation.maxLength}`;
      }
      if (field.type === "number") {
        const numValue = Number(value);
        if (field.validation.min !== undefined && numValue < field.validation.min) {
          return `Minimum value is ${field.validation.min}`;
        }
        if (field.validation.max !== undefined && numValue > field.validation.max) {
          return `Maximum value is ${field.validation.max}`;
        }
      }
      if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
        return "Invalid format";
      }
    }
    if (field.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Invalid email address";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    form.fields.forEach((field) => {
      const value = formState[field.id] || "";
      const error = validateField(field, value);
      if (error) {
        newErrors[field.id] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      console.log("Form submitted successfully", formState);
      // Here you would typically send the form data to a server
      alert("Form submitted successfully!");
    }
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormState((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: "" }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">{form.name}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {form.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>

              {field.type === "text" && (
                <Input
                  type="text"
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formState[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {field.type === "textarea" && (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formState[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {field.type === "number" && (
                <Input
                  type="number"
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formState[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {field.type === "email" && (
                <Input
                  type="email"
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formState[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {field.type === "password" && (
                <Input
                  type="password"
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formState[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {field.type === "select" && (
                <Select onValueChange={(value) => handleInputChange(field.id, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {field.type === "radio" && (
                <RadioGroup onValueChange={(value) => handleInputChange(field.id, value)}>
                  {field.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                      <Label htmlFor={`${field.id}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {field.type === "checkbox" && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    onCheckedChange={(checked) => handleInputChange(field.id, checked ? "true" : "false")}
                  />
                  <Label htmlFor={field.id}>{field.label}</Label>
                </div>
              )}

              {errors[field.id] && <p className="text-sm text-red-500">{errors[field.id]}</p>}
            </div>
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

