import { FormControlOptions } from '@cx/form-control';
import { FormControl } from '@angular/forms';

export interface KNXInputOptions extends FormControlOptions {
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'email';
  label?: string;
  hideErrors?: Array<string>;
  formControl?: FormControl; // when present formControl errors will be displayed
  showErrorMessages?: boolean;
  showPasswordStrenght?: boolean;
  textMask?: {
    mask: (string | RegExp)[];
    guide?: boolean;
    placeholderChar?: string;
    keepCharPositions?: boolean;
    pipe?: any;
  };
  attributes?: {
    [name: string]: any
  };
}

export const KNX_INPUT_DEFAULT_OPTIONS: KNXInputOptions = {
  placeholder: '',
  type: 'text',
  textMask: null
};
