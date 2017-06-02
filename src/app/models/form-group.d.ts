import { Options } from '../../../node_modules/@cx/form-group/';
/**
 * Create an augmentation for "../../../node_modules/@cx/form-group/" module
 * {@link https://github.com/Microsoft/TypeScript/pull/6213 GitHub}
 */
declare module '../../../node_modules/@cx/form-group/' {
    // Augment the 'Options' class definition with interface merging
    export interface Options {
      formControlName: string;
    }
}
