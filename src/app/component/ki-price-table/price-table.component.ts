import { Component, Input } from '@angular/core';
import { Price } from '../../models/price.d';

@Component({
  selector: 'ki-price-table',
  template: `<div class="cx-row">
  <div *ngFor="let item of Items" [ngClass]="getItemClass()">
    <ki-price-table-item 
        Header="{{item.header}}" 
        Price="{{item.price}}" 
        Highlight="{{item.highlight}}" 
        [Features]="item.features">
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
