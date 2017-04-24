import { Component, Input } from '@angular/core';
import { Price } from '../../models/price';

@Component({
  selector: 'knx-price-table',
  template: `
  <div class="knx-price-table-wrapper">
    <knx-price-table-item
        *ngFor="let item of items; let i = index"
        [header]="item.header"
        [price]="item.price"
        [highlight]="item.highlight"
        [selected]="item.selected"
        [features]="item.features"
        (click)="selectItem(i)">
    </knx-price-table-item>
</div>`,
})
export class PriceTableComponent {
  @Input() items: Array<Price>;
  @Input() selectable: boolean;

  selectItem(index: number) {
    this.items.map((item, i) => {
      item.selected = index === i ? true : false;
    });
  }
}
