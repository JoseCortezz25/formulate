"use client";

import type { FormConfig } from "@/lib/types";
import { Button } from "@/components/ui/button";
import hljs from 'highlight.js';
import { CopyIcon, CheckIcon } from "lucide-react";

// Import highlight.js CSS (you can choose from various themes)
import 'highlight.js/styles/atom-one-dark.css';

import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/typescript';
import { useEffect, useRef, useState } from "react";

interface FormExportProps {
  form: FormConfig
}

export function FormExport({ form }: FormExportProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const generateBasicHtml = () => {
    const formHtml = `<form id="form-${form.id}">
  ${form.fields
        .map((field) => {
          switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "number":
              return `  <div>
    <label for="${field.id}">${field.label}</label>
    <input type="${field.type}" id="${field.id}" name="${field.id}" placeholder="${field.placeholder || ""}" />
  </div>`;
            case "textarea":
              return `  <div>
    <label for="${field.id}">${field.label}</label>
    <textarea id="${field.id}" name="${field.id}" placeholder="${field.placeholder || ""}"></textarea>
  </div>`;
            case "select":
              return `  <div>
    <label for="${field.id}">${field.label}</label>
    <select id="${field.id}" name="${field.id}">
      ${field.options?.map((option) => `<option value="${option.value}">${option.label}</option>`).join("\n      ")}
    </select>
  </div>`;
            case "radio":
              return `  <div>
    <fieldset>
      <legend>${field.label}</legend>
      ${field.options
                  ?.map(
                    (option) => `      <label>
        <input type="radio" name="${field.id}" value="${option.value}" />
        ${option.label}
      </label>`
                  )
                  .join("\n")}
    </fieldset>
  </div>`;
            case "checkbox":
              return `  <div>
    <label>
      <input type="checkbox" id="${field.id}" name="${field.id}" />
      ${field.label}
    </label>
  </div>`;
            default:
              return "";
          }
        })
        .join("\n\n")}
  
  <button type="submit">Submit</button>
</form>`;

    return formHtml + "\n\n" + generateValidationScript();
  };

  const generateValidationScript = () => {
    const validationScript = `
    <script src="https://unpkg.com/just-validate@latest/dist/just-validate.production.min.js"></script>
    <script>
    const validator = new JustValidate('#form-${form.id}', {
      errorFieldCssClass: 'is-invalid',
      errorLabelStyle: {
        fontSize: '14px',
        color: '#dc3545',
      },
      focusInvalidField: true,
      lockForm: true,
    });
  
    ${form.fields
        .map((field) => {
          const rules = [];

          if (field.required) {
            rules.push(`{
            rule: 'required',
            errorMessage: 'This field is required'
          }`);
          }

          if (field.validation?.minLength) {
            rules.push(`{
            rule: 'minLength',
            value: ${field.validation.minLength},
            errorMessage: 'Minimum length is ${field.validation.minLength} characters'
          }`);
          }

          if (field.validation?.maxLength) {
            rules.push(`{
            rule: 'maxLength',
            value: ${field.validation.maxLength},
            errorMessage: 'Maximum length is ${field.validation.maxLength} characters'
          }`);
          }

          if (field.validation?.pattern) {
            rules.push(`{
            rule: 'customRegexp',
            value: ${field.validation.pattern},
            errorMessage: 'Please enter a valid value'
          }`);
          }

          if (field.type === "email") {
            rules.push(`{
            rule: 'email',
            errorMessage: 'Please enter a valid email'
          }`);
          }

          if (rules.length > 0) {
            return `  validator.addField('#${field.id}', [
      ${rules.join(",\n      ")}
    ]);`;
          }
          return "";
        })
        .filter(Boolean)
        .join("\n\n")}
  
    validator.onValidate(({isValid}) => {
      console.log('Validation occurred', isValid);
    });
  
    validator.onSuccess((event) => {
      console.log('Validation passes and form submitted', event);
    });
  </script>`;

    return validationScript;
  };

  const generateShadcnCode = () => {
    return `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  ${form.fields
        .map((field) => {
          let schema = `z.string()`;
          if (field.required) {
            schema += `.min(1, "This field is required")`;
          }
          if (field.validation) {
            if (field.validation.minLength) {
              schema += `.min(${field.validation.minLength}, "Minimum length is ${field.validation.minLength}")`;
            }
            if (field.validation.maxLength) {
              schema += `.max(${field.validation.maxLength}, "Maximum length is ${field.validation.maxLength}")`;
            }
            if (field.type === "number") {
              schema = `z.number()`;
              if (field.validation.min !== undefined) {
                schema += `.min(${field.validation.min}, "Minimum value is ${field.validation.min}")`;
              }
              if (field.validation.max !== undefined) {
                schema += `.max(${field.validation.max}, "Maximum value is ${field.validation.max}")`;
              }
            }
            if (field.validation.pattern) {
              schema += `.regex(new RegExp(${field.validation.pattern}), "Invalid format")`;
            }
          }
          if (field.type === "email") {
            schema += `.email("Invalid email address")`;
          }
          return `  ${field.id}: ${schema},`;
        })
        .join("\n")}
})

export default function Form() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${form.fields.map((field) => `${field.id}: "",`).join("\n      ")}
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      ${form.fields
        .map((field) => {
          switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "number":
              return `<div className="space-y-2">
        <Label htmlFor="${field.id}">${field.label}</Label>
        <Input
          id="${field.id}"
          type="${field.type}"
          placeholder="${field.placeholder || ""}"
          {...form.register("${field.id}")}
        />
        {form.formState.errors.${field.id} && (
          <p className="text-sm text-red-500">{form.formState.errors.${field.id}?.message}</p>
        )}
      </div>`;
            case "textarea":
              return `<div className="space-y-2">
        <Label htmlFor="${field.id}">${field.label}</Label>
        <Textarea
          id="${field.id}"
          placeholder="${field.placeholder || ""}"
          {...form.register("${field.id}")}
        />
        {form.formState.errors.${field.id} && (
          <p className="text-sm text-red-500">{form.formState.errors.${field.id}?.message}</p>
        )}
      </div>`;
            case "select":
              return `<div className="space-y-2">
        <Label htmlFor="${field.id}">${field.label}</Label>
        <Select onValueChange={(value) => form.setValue("${field.id}", value)}>
          <SelectTrigger>
            <SelectValue placeholder="${field.placeholder || ""}" />
          </SelectTrigger>
          <SelectContent>
            ${field.options
                  ?.map((option) => `<SelectItem value="${option.value}">${option.label}</SelectItem>`)
                  .join("\n            ")}
          </SelectContent>
        </Select>
        {form.formState.errors.${field.id} && (
          <p className="text-sm text-red-500">{form.formState.errors.${field.id}?.message}</p>
        )}
      </div>`;
            case "radio":
              return `<div className="space-y-2">
        <Label>${field.label}</Label>
        <RadioGroup onValueChange={(value) => form.setValue("${field.id}", value)}>
          ${field.options
                  ?.map(
                    (option) => `<div className="flex items-center space-x-2">
            <RadioGroupItem value="${option.value}" id="${field.id}-${option.value}" />
            <Label htmlFor="${field.id}-${option.value}">${option.label}</Label>
          </div>`
                  )
                  .join("\n          ")}
        </RadioGroup>
        {form.formState.errors.${field.id} && (
          <p className="text-sm text-red-500">{form.formState.errors.${field.id}?.message}</p>
        )}
      </div>`;
            case "checkbox":
              return `<div className="flex items-center space-x-2">
        <Checkbox id="${field.id}" {...form.register("${field.id}")} />
        <Label htmlFor="${field.id}">${field.label}</Label>
      </div>
      {form.formState.errors.${field.id} && (
        <p className="text-sm text-red-500">{form.formState.errors.${field.id}?.message}</p>
      )}`;
            default:
              return "";
          }
        })
        .join("\n\n      ")}
      
      <Button type="submit">Submit</Button>
    </form>
  )
}`;
  };

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(form.type === "basic" ? generateBasicHtml() : generateShadcnCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Generated Code</h3>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleCopyToClipboard}
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4 text-green-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <div className="bg-gray-900 text-white py-2 px-4 flex items-center">
              <span className="text-sm font-medium">
                {form.type === "basic" ? "HTML + JavaScript" : "React + shadcn/ui"}
              </span>
            </div>
            <div className="code-container">
              <pre className="m-0 p-0 bg-transparent">
                <code
                  ref={codeRef}
                  className="typescript"
                >
                  {form.type === "basic" ? generateBasicHtml() : generateShadcnCode()}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

