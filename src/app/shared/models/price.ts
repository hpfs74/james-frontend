/**
 * @description
 * Price table element to be used with
 * knab-price-table o knab-price-table-item
 */
export class Price {
  id: string;
  header: string;
  price?: number;
  badge: string;
  /**
   * @description
   * List of features
   */
  features: Array<string>;
  highlight?: boolean;
  selected?: boolean;
}
