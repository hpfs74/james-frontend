export interface SectionItem {
  label: string;
  groups: Array<SectionGroup>;
}

export interface SectionGroup {
  fields: Array<SectionFields>;
}

export interface SectionFields {
  label: string;
  value: number | string;
  info?: string;
}
