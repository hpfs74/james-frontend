import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Price } from '../../shared/models/price';

interface PriceTableLabelOptions {
  selected: string;
  unselected: string;
}

@Component({
  selector: 'knx-price-table',
  styleUrls: ['./price-table.component.scss'],
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
        [selectedLabel]="labels.selected"
        [unselectedLabel]="labels.unselected"
        (click)="selectItem(i)">
      </knx-price-item>
    </div>`
})
export class PriceTableComponent implements OnDestroy {
  @Output() onSelected: EventEmitter<Price> = new EventEmitter();

  @Input() labels: PriceTableLabelOptions;
  @Input() items: Array<Price>;
  @Input() selectable: boolean;
  @Input() set highlight(value: string) {
    if (this.items) {
      this.items.forEach(i => {
        i.highlight = false;
        if (i.id === value) {
          i.highlight = true;
        }
      });
    }
  }

  selectItem(index: number) {
    this.items.map((item, i) => {
      item.selected = index === i ? true : false;
    });
    this.onSelected.emit(this.items[index]);
  }

  ngOnDestroy() {
    this.items.map((item) => {
      item.selected = false;
    });
  }
}
