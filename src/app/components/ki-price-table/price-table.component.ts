import { Component, Input } from '@angular/core';
import { Price } from '../../models/price';

@Component({
  selector: 'ki-price-table',
  template: `<div class="row">
  <div *ngFor="let item of items" [ngClass]="getItemClass()">
    <ki-price-table-item
        header="{{item.header}}"
        price="{{item.price}}"
        highlight="{{item.highlight}}"
        [features]="item.features">
    </ki-price-table-item>
  </div>
</div>`,
})
export class PriceTableComponent {

  @Input() items: Array<Price>;
  @Input() selectable: boolean;

  /**
   * set the current Highlighted element
   */
  setHightlight(index: number) {
    this.items.map((item, i) => {
      item.highlight = index === i ? true : false;
    });
  }

  /**
   * get the right class for columns
   */
  getItemClass(): string {
    let ret = 'cx-col-sm-' + 12 / this.items.length;
    return ret;
  }
}
