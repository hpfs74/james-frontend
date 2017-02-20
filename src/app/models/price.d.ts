/**
 * @description
 * Price table element to be used with
 * knab-price-table o knab-price-table-item
 */
export class Price {
    Header: string;
    Price: number;
    /**
     * @description
     * List of features
     */
    Features: Array<string>;
    Highlight: boolean;
}
