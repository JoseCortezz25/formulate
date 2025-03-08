"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import type { FormField } from "@/lib/types";
import { useState } from "react";

const FIELD_TYPES = [
  {
    category: "Short Text",
    items: [
      { type: "text", label: "Single line" },
      { type: "email", label: "Email" },
      { type: "password", label: "Password" }
    ]
  },
  {
    category: "Long Text",
    items: [{ type: "textarea", label: "Multiline" }]
  },
  {
    category: "Options",
    items: [
      { type: "select", label: "Dropdown" },
      { type: "radio", label: "Multiple Choice" },
      { type: "checkbox", label: "Checkboxes" }
    ]
  },
  {
    category: "Yes/No",
    items: [
      { type: "switch", label: "Switch" },
      { type: "checkbox", label: "Single Checkbox" }
    ]
  },
  {
    category: "Numbers",
    items: [{ type: "number", label: "Number" }]
  },
  {
    category: "Date and Time",
    items: [{ type: "date", label: "Date" }]
  }
];

interface FieldToolbarProps {
  onAddField: (field: FormField) => void
}

export function FieldToolbar({ onAddField }: FieldToolbarProps) {
  const [search, setSearch] = useState("");
  const [filteredFields, setFilteredFields] = useState(FIELD_TYPES);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value === "") {
      setFilteredFields(FIELD_TYPES);
      return;
    }

    const filtered = FIELD_TYPES.map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      )
    })).filter((category) => category.items.length > 0);

    setFilteredFields(filtered);
  };

  return (
    <div className="space-y-4 mx-6 my-4 lg:sticky lg:top-10">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search components"
          className="pl-8"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <ScrollArea className="max-h-[200px] overflow-scroll lg:overflow-auto lg:max-h-none md:h-[calc(100vh-8rem)]">
        {filteredFields.map((category) => (
          <div key={category.category} className="mb-6">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">{category.category}</h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <Button
                  key={item.type}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    onAddField({
                      id: `${item.type}-${Date.now()}`,
                      type: item.type as any, // eslint-disable-line @typescript-eslint/no-explicit-any
                      label: `New ${item.label}`,
                      placeholder: `Enter ${item.label.toLowerCase()}`,
                      required: false
                    });
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

