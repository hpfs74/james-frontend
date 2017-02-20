import { Component, Input } from '@angular/core';

@Component({
  selector: 'knab-price-table-item',
  templateUrl: 'knab-price-table-item.component.html',
})
export class KnabPriceTableItemComponent  {
    project: string = 'KNAB';

    @Input() Header: string;
    @Input() Price: number;
    @Input() Items: Array<string>;
    @Input() Highlight: boolean = false;
}
