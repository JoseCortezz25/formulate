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
import Link from "next/link";
import { Plus } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

function Page() {
  const [activeTab, setActiveTab] = useState("design");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddField = (field: any) => {
    setActiveForm({
      ...activeForm,
      fields: [...activeForm.fields, field]
    });
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="w-full">
        <Tabs
          defaultValue="design"
          className="w-full gap-0"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex flex-col gap-[24px] lg:gap-0 lg:flex-row items-center lg:justify-between p-4 bg-white">
            <span className="font-bold text-lg lg:max-w-[300px] lg:w-[300px] lg:text-xl cursor-pointer">
              <Link href="/">
                Formulate
              </Link>
            </span>

            <TabsList className="rounded-full px-1 h-auto">
              <TabsTrigger className="py-2 px-5 rounded-full cursor-pointer" value="design">Build Form</TabsTrigger>
              <TabsTrigger className="py-2 px-5 rounded-full cursor-pointer" value="preview">Preview</TabsTrigger>
              <TabsTrigger className="py-2 px-5 rounded-full cursor-pointer" value="export">Export</TabsTrigger>
            </TabsList>

            <div className="flex justify-end gap-2 lg:max-w-[300px] lg:w-[300px]">
              <Button
                variant="outline"
                onClick={() => setActiveForm({ ...activeForm, type: "basic" })}
                className={cn(activeForm.type === "basic" && "bg-primary text-primary-foreground", "rounded-full py-2")}
              >
                Basic HTML
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveForm({ ...activeForm, type: "shadcn" })}
                className={cn(activeForm.type === "shadcn" && "bg-primary text-primary-foreground", "rounded-full py-2")}
              >
                shadcn / ui
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-col lg:flex-row">
            {/* Left Sidebar - Field Toolbar */}
            {activeTab === 'design' && (
              <div className="w-full lg:min-w-[350px] lg:max-w-[350px] bg-white rounded-b-[15px] lg:rounded-none hidden md:flex ">
                <FieldToolbar
                  onAddField={handleAddField}
                />
              </div>
            )}

            {/* Right Sidebar - Form Editor, Preview, Export */}
            <div className="w-full flex items-start justify-center py-9 lg:rounded-tl-[16px] inset-shadow-sm bg-gray-100">
              <TabsContent value="design" className="mt-0 max-w-[90%] lg:max-w-[50%]">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="form-fields" isDropDisabled={false}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {activeForm.fields.length === 0 && (
                          <div className="bg-white p-8 rounded-lg shadow-sm border border-dashed border-gray-300 text-center">
                            <p className="text-gray-500 mb-2">No fields added yet</p>
                            <p className="text-sm text-gray-400">Add your first field from the toolbar on the left</p>
                          </div>
                        )}
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

              <TabsContent value="preview" className="max-w-[90%] lg:max-w-[50%]">
                <FormPreview form={activeForm} />
              </TabsContent>

              <TabsContent value="export" className="max-w-[90%] lg:max-w-[50%]">
                <FormExport form={activeForm} />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>

      {/* Mobile Floating Action Button and Drawer */}
      {activeTab === 'design' && (
        <div className="fixed bottom-6 right-6 md:hidden">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                size="icon"
                className="rounded-full size-14 shadow-lg"
              >
                <Plus className="size-8" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="h-full overflow-y-auto">
                <FieldToolbar
                  onAddField={handleAddField}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default Page;