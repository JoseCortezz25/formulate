"use client";

import type { FormField } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FormFieldEditorProps {
  field: FormField
  onUpdate: (field: FormField) => void
  onDelete: () => void
}

export function FormFieldEditor({ field, onUpdate, onDelete }: FormFieldEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field</h3>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="label">Label</Label>
          <Input id="label" value={field.label} onChange={(e) => onUpdate({ ...field, label: e.target.value })} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input
            id="placeholder"
            value={field.placeholder}
            onChange={(e) => onUpdate({ ...field, placeholder: e.target.value })}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="required"
            checked={field.required}
            onCheckedChange={(checked) => onUpdate({ ...field, required: checked })}
          />
          <Label htmlFor="required">Required</Label>
        </div>

        <div className="space-y-2">
          <div
            className="flex items-center justify-between space-x-4 px-4 py-2 bg-muted rounded-md cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h4 className="text-sm font-semibold">Advanced Validation</h4>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="sr-only">Toggle advanced validation</span>
            </Button>
          </div>
          {isOpen && (
            <div className="space-y-2 p-4 bg-muted/50 rounded-md">
              {(field.type === "text" || field.type === "textarea") && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="minLength">Minimum Length</Label>
                    <Input
                      id="minLength"
                      type="number"
                      value={field.validation?.minLength || ""}
                      onChange={(e) =>
                        onUpdate({
                          ...field,
                          validation: {
                            ...field.validation,
                            minLength: e.target.value ? Number.parseInt(e.target.value) : undefined
                          }
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="maxLength">Maximum Length</Label>
                    <Input
                      id="maxLength"
                      type="number"
                      value={field.validation?.maxLength || ""}
                      onChange={(e) =>
                        onUpdate({
                          ...field,
                          validation: {
                            ...field.validation,
                            maxLength: e.target.value ? Number.parseInt(e.target.value) : undefined
                          }
                        })
                      }
                    />
                  </div>
                </>
              )}
              {field.type === "number" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="min">Minimum Value</Label>
                    <Input
                      id="min"
                      type="number"
                      value={field.validation?.min || ""}
                      onChange={(e) =>
                        onUpdate({
                          ...field,
                          validation: {
                            ...field.validation,
                            min: e.target.value ? Number.parseInt(e.target.value) : undefined
                          }
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="max">Maximum Value</Label>
                    <Input
                      id="max"
                      type="number"
                      value={field.validation?.max || ""}
                      onChange={(e) =>
                        onUpdate({
                          ...field,
                          validation: {
                            ...field.validation,
                            max: e.target.value ? Number.parseInt(e.target.value) : undefined
                          }
                        })
                      }
                    />
                  </div>
                </>
              )}
              {field.type === "text" && (
                <div className="grid gap-2">
                  <Label htmlFor="pattern">Pattern (Regex)</Label>
                  <Input
                    id="pattern"
                    value={field.validation?.pattern || ""}
                    onChange={(e) =>
                      onUpdate({
                        ...field,
                        validation: {
                          ...field.validation,
                          pattern: e.target.value
                        }
                      })
                    }
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {(field.type === "select" || field.type === "radio") && (
          <div className="grid gap-2">
            <Label>Options</Label>
            {field.options?.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option.label}
                  onChange={(e) => {
                    const newOptions = [...(field.options || [])];
                    newOptions[index] = { ...option, label: e.target.value };
                    onUpdate({ ...field, options: newOptions });
                  }}
                  placeholder="Option label"
                />
                <Input
                  value={option.value}
                  onChange={(e) => {
                    const newOptions = [...(field.options || [])];
                    newOptions[index] = { ...option, value: e.target.value };
                    onUpdate({ ...field, options: newOptions });
                  }}
                  placeholder="Option value"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newOptions = field.options?.filter((_, i) => i !== index);
                    onUpdate({ ...field, options: newOptions });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newOptions = [...(field.options || []), { label: "", value: "" }];
                onUpdate({ ...field, options: newOptions });
              }}
            >
              Add Option
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

