export type FieldType = "text" | "number" | "email" | "password" | "select" | "checkbox" | "radio" | "textarea" | "date"

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  validation?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
  }
}

export interface FormConfig {
  id: string
  name: string
  fields: FormField[]
  type: "basic" | "shadcn"
}

