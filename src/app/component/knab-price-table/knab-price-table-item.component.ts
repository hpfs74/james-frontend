import { Component, Input } from '@angular/core';

@Component({
  selector: 'knab-price-table-item',
  template: require('./knab-price-table-item.component.html'),
})
export class KnabPriceTableItemComponent  {
    project: string = 'KNAB';

    @Input() Header: string;
    @Input() Price: number;
    @Input() Features: Array<string>;
    @Input() Highlight: boolean = false;
}
