import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Price } from '../../shared/models/price';

@Component({
  selector: 'knx-price-table',
  template: `
  <div class="knx-price-table">
    <knx-price-item
        *ngFor="let item of items; let i = index"
        [id]="item.id"
        [header]="item.header"
        [badge]="item.badge"
        [price]="item.price"
        [highlight]="item.highlight"
        [selected]="item.selected"
        [features]="item.features"
        (click)="selectItem(i)">
    </knx-price-item>
</div>`,
})
export class PriceTableComponent {
  @Input() items: Array<Price>;
  @Input() selectable: boolean;

  @Output() onSelected: EventEmitter<Price> = new EventEmitter();

  selectItem(index: number) {
    this.items.map((item, i) => {
      item.selected = index === i ? true : false;
    });
    this.onSelected.emit(this.items[index]);
  }
}
