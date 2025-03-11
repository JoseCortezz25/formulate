"use client";

import type { FormField } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Define text validation presets
const TEXT_VALIDATION_PRESETS = {
  none: { label: "No validation", pattern: "" },
  lettersOnly: { label: "Letters only (no numbers)", pattern: "^[a-zA-Z]+$" },
  lettersWithAccents: { label: "Letters only (with accents)", pattern: "^[a-zA-ZÀ-ÿ]+$" },
  lettersAndSpaces: { label: "Letters and spaces only", pattern: "^[a-zA-Z\\s]+$" },
  lettersSpacesAccents: { label: "Letters, spaces and accents", pattern: "^[a-zA-ZÀ-ÿ\\s]+$" },
  custom: { label: "Custom regex", pattern: "" }
};

interface FormFieldEditorProps {
  field: FormField
  onUpdate: (field: FormField) => void
  onDelete: () => void
}

export function FormFieldEditor({ field, onUpdate, onDelete }: FormFieldEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [validationType, setValidationType] = useState(() => {
    if (!field.validation?.pattern) return "none";

    for (const [key, preset] of Object.entries(TEXT_VALIDATION_PRESETS)) {
      if (preset.pattern === field.validation.pattern && key !== "custom") {
        return key;
      }
    }
    return "custom";
  });

  const handleValidationTypeChange = (value: string) => {
    setValidationType(value);

    if (value !== "custom") {
      onUpdate({
        ...field,
        validation: {
          ...field.validation,
          pattern: TEXT_VALIDATION_PRESETS[value as keyof typeof TEXT_VALIDATION_PRESETS].pattern
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="hover:bg-red-100/20 hover:text-red-800 cursor-pointer"
        >
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


        {(field.type === "text" || field.type === "password" || field.type === "textarea" || field.type === "number" || field.type === "date") && (
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
              <div className="space-y-3 p-4 bg-muted/50 rounded-md">
                {(field.type === "text" || field.type === "textarea") && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex-1/2 space-y-2">
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

                      <div className="flex-1/2 space-y-2">
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
                    </div>
                  </>
                )}
                {field.type === "number" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex-1/2 space-y-2">
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
                      <div className="flex-1/2 space-y-2">
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
                    </div>
                  </>
                )}
                {field.type === "text" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="validationType">Content Validation</Label>
                      <Select
                        value={validationType}
                        onValueChange={handleValidationTypeChange}
                      >
                        <SelectTrigger id="validationType" className="w-full">
                          <SelectValue placeholder="Select validation type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(TEXT_VALIDATION_PRESETS).map(([key, preset]) => (
                            <SelectItem key={key} value={key}>
                              {preset.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {validationType === "custom" && (
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
                        <p className="text-xs text-muted-foreground">
                          Enter a custom regular expression for validation
                        </p>
                      </div>
                    )}
                  </>
                )}
                {field.type === "date" && (
                  <div className="space-y-3">
                    <Label>Date Validation Type</Label>
                    <Select
                      value={field.validation?.dateType || "none"}
                      onValueChange={(value) => {
                        onUpdate({
                          ...field,
                          validation: {
                            ...field.validation,
                            dateType: (value === "minAge" || value === "dateRange" ||
                              value === "futureDate" || value === "pastDate" ||
                              value === "businessDay") ? value : undefined
                          }
                        });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select date validation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No validation</SelectItem>
                        <SelectItem value="minAge">Minimum age</SelectItem>
                        <SelectItem value="dateRange">Date range</SelectItem>
                        <SelectItem value="futureDate">Future date only</SelectItem>
                        <SelectItem value="pastDate">Past date only</SelectItem>
                        <SelectItem value="businessDay">Business days only</SelectItem>
                      </SelectContent>
                    </Select>

                    {field.validation?.dateType === "minAge" && (
                      <div className="space-y-2">
                        <Label htmlFor="ageValue">Minimum Age</Label>
                        <Input
                          id="ageValue"
                          type="number"
                          min="0"
                          value={field.validation?.ageValue || ""}
                          onChange={(e) =>
                            onUpdate({
                              ...field,
                              validation: {
                                ...field.validation,
                                ageValue: e.target.value ? Number.parseInt(e.target.value) : undefined
                              }
                            })
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Validates that the person is at least this age
                        </p>
                      </div>
                    )}

                    {field.validation?.dateType === "dateRange" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="minDate">Earliest Date</Label>
                          <Input
                            id="minDate"
                            type="date"
                            value={field.validation?.minDate || ""}
                            onChange={(e) =>
                              onUpdate({
                                ...field,
                                validation: {
                                  ...field.validation,
                                  minDate: e.target.value || undefined
                                }
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="maxDate">Latest Date</Label>
                          <Input
                            id="maxDate"
                            type="date"
                            value={field.validation?.maxDate || ""}
                            onChange={(e) =>
                              onUpdate({
                                ...field,
                                validation: {
                                  ...field.validation,
                                  maxDate: e.target.value || undefined
                                }
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

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

