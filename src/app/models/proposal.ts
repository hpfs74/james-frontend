import { Insurance } from './insurance';

/**
 * Buy Flow request
 *
 * @export
 * @interface Proposal
 */
export interface Proposal {
  proposal: Insurance;
  items: {
    [id: string]: string
  }
}
