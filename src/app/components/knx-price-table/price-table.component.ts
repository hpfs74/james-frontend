import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Price } from '@app/shared/models';

interface PriceTableLabelOptions {
  selected: string;
  unselected: string;
}

@Component({
  selector: 'knx-price-table',
  styleUrls: ['./price-table.component.scss'],
  templateUrl: './price-table.component.html'
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
