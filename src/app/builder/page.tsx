"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type FormConfig } from "@/lib/types";
import { FieldToolbar } from "@/components/builder/field-toolbar";
import { FormPreview } from "@/components/builder/form-preview";
import { FormExport } from "@/components/builder/form-export";
import { cn } from "@/lib/utils";
import { FormFieldEditor } from "@/components/builder/form-field-editor";

function Page() {
  const [activeForm, setActiveForm] = useState<FormConfig>({
    id: "1",
    name: "New Form",
    fields: [],
    type: "basic"
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const fields = Array.from(activeForm.fields);
    const [reorderedItem] = fields.splice(result.source.index, 1);
    fields.splice(result.destination.index, 0, reorderedItem);

    setActiveForm({ ...activeForm, fields });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Field Toolbar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <FieldToolbar
          onAddField={(field) => {
            setActiveForm({
              ...activeForm,
              fields: [...activeForm.fields, field]
            });
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Tabs defaultValue="design" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveForm({ ...activeForm, type: "basic" })}
                  className={cn(activeForm.type === "basic" && "bg-primary text-primary-foreground")}
                >
                  Basic HTML
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveForm({ ...activeForm, type: "shadcn" })}
                  className={cn(activeForm.type === "shadcn" && "bg-primary text-primary-foreground")}
                >
                  shadcn/ui
                </Button>
              </div>
            </div>

            <TabsContent value="design" className="mt-0">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="form-fields" isDropDisabled={false}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {activeForm.fields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                            >
                              <FormFieldEditor
                                field={field}
                                onUpdate={(updatedField) => {
                                  const newFields = [...activeForm.fields];
                                  newFields[index] = updatedField;
                                  setActiveForm({ ...activeForm, fields: newFields });
                                }}
                                onDelete={() => {
                                  const newFields = activeForm.fields.filter((_, i) => i !== index);
                                  setActiveForm({ ...activeForm, fields: newFields });
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </TabsContent>

            <TabsContent value="preview">
              <FormPreview form={activeForm} />
            </TabsContent>

            <TabsContent value="export">
              <FormExport form={activeForm} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Page;