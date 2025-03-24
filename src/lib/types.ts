export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'switch'
  | 'date';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    dateType?:
      | 'minAge'
      | 'dateRange'
      | 'futureDate'
      | 'pastDate'
      | 'businessDay';
    ageValue?: number;
    minDate?: string;
    maxDate?: string;
  };
}

export interface FormConfig {
  id: string;
  name: string;
  fields: FormField[];
  type: 'basic' | 'shadcn';
}
