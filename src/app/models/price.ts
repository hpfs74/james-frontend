/**
 * this module describe the price of the price table
 */


/**
 * @description
 * Price table element to be used with
 * knab-price-table o knab-price-table-item
 */
export class Price {
  header: string;
  price: number;
  badge: string;
  /**
   * @description
   * List of features
   */
  features: Array<string>;
  highlight?: boolean;
  selected?: boolean;
}
