import { Insurance, InsuranceAdvice } from './';

/**
 * Buy Flow Request
 *
 * @export
 * @interface Proposal
 */
export interface Proposal {
  advice_item_id: string;
  proposal: InsuranceAdvice;
  items: Array<Object>;
}
