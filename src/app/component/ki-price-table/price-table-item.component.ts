import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-price-table-item',
  template: require('./price-table-item.component.html'),
})
export class PriceTableItemComponent {
  project: string = 'KNAB';

  @Input() Header: string;
  @Input() Price: number;
  @Input() Features: Array<string>;
  @Input() Highlight: boolean = false;
}
