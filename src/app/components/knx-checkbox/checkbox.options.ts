import { FormControlOptions } from '@cx/form-control';

export interface KNXCheckboxOptionsSingle extends FormControlOptions  {
  label: string;
}

export interface KNXCheckboxOptionsMulti extends FormControlOptions  {
  items: Array<{
    label: string,
    value: string
  }>;
}

export interface KNXCheckboxOptions extends FormControlOptions {
  items?: Array<{
    label: string,
    value: string
  }>;
  label?: string;
  hideErrors?: Array<string>;
  showErrorMessages?: boolean;
}

export const KNX_CHECKBOX_DEFAULT_OPTIONS: KNXCheckboxOptions = {
  items: null,
};
