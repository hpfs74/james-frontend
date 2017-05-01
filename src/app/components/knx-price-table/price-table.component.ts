import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Price } from '../../models/price';

@Component({
  selector: 'knx-price-table',
  template: `
  <div class="knx-price-table-wrapper">
    <knx-price-table-item
        *ngFor="let item of items; let i = index"
        [header]="item.header"
        [badge]="item.badge"
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

  @Output() onSelected: EventEmitter<number> = new EventEmitter();

  selectItem(index: number) {
    this.items.map((item, i) => {
      item.selected = index === i ? true : false;
    });
    this.onSelected.emit(index);
  }
}
