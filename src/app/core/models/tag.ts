export interface Tag {
  _id: string;
  tag: string;
  blocked: boolean;
  alert: boolean;
  order: number;
  description: string;
  translation_text: string;
  translation_label?: string;
  translation_description?: string;
  disabled?: boolean;
}
