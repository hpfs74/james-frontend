import { Component, Input } from '@angular/core';
import { Price } from '../../models/price';

@Component({
  selector: 'ki-price-table',
  template: `
  <div class="ki-price-table-wrapper">
    <ki-price-table-item
        *ngFor="let item of items; let i = index"
        [header]="item.header"
        [price]="item.price"
        [highlight]="item.highlight"
        [selected]="item.selected"
        [features]="item.features"
        (click)="selectItem(i)">
    </ki-price-table-item>
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
