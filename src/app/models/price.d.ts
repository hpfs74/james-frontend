/**
 * @description
 * Price table element to be used with
 * knab-price-table o knab-price-table-item
 */
export class Price {
    header: string;
    price: number;
    /**
     * @description
     * List of features
     */
    features: Array<string>;
    highlight: boolean;
}
