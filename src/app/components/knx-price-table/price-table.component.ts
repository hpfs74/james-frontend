import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Price } from '@app/shared/models';

interface PriceTableLabelOptions {
  selected: string;
  unselected: string;
}

@Component({
  selector: 'knx-price-table',
  styleUrls: ['./price-table.component.scss'],
  template: `
    <div class="knx-price-table">
      <div class="knx-recommended-wrapper visible-xs">
        <div *ngFor="let item of items; let i = index"
             [hidden]="!item.highlight"
             class="knx-recommended">
          {{ item.badge }}
          <div class="knx-recommended__tick knx-recommended__tick--{{ i }}"></div>
        </div>
      </div>

      <div class="knx-button knx-button--toggle-pills visible-xs"
           *ngFor="let item of items; let i = index"
           (click)="selectItem(i, true)"
           [attr.data-btn]="item.selected ? item.dataActive : item.dataInactive"
           [ngClass]="{ '': !item.selected, 'knx-button--toggle-pills-active': item.selected }">
        {{ item.header }}
      </div>

      <knx-price-item
        [ngClass]="{ 'knx-price-item--highlight': item.highlight }"
        *ngFor="let item of items; let i = index"
        [id]="item.id"
        [header]="item.header"
        [badge]="item.badge"
        [price]="item.price"
        [highlight]="item.highlight"
        [selected]="item.selected"
        [features]="item.features"
        [dataActive]="item.dataActive"
        [dataInactive]="item.dataInactive"
        [selectedLabel]="labels.selected"
        [unselectedLabel]="labels.unselected"
        [description]="item.description"
        (click)="selectItem(i, false)">
      </knx-price-item>
    </div>`
})
export class PriceTableComponent implements OnDestroy {
  @Output() onSelected: EventEmitter<Price> = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

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

  selectItem(index: number, isMobile: boolean) {
    let selected = this.items[index].selected;

    if (selected && !isMobile) {
      // second click
      this.onSubmit.emit();
    } else {
      this.items.map((item, i) => {
        item.selected = index === i ? true : false;
      });
      this.onSelected.emit(this.items[index]);
    }
  }

  ngOnDestroy() {
    this.items.map((item) => {
      item.selected = false;
    });
  }
}
