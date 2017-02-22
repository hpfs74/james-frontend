import { Component, Input } from '@angular/core';
import { Price } from '../../models/price.d';

@Component({
  selector: 'ki-price-table',
  template: `<div class="cx-row">
  <div *ngFor="let item of Items" [ngClass]="getItemClass()">
    <ki-price-table-item 
        Header="{{item.Header}}" 
        Price="{{item.Price}}" 
        Highlight="{{item.Highlight}}" 
        [Features]="item.Features">
    </ki-price-table-item>
  </div>
</div>`,
})
export class PriceTableComponent {

  @Input() Items: Array<Price>;
  @Input() Selectable: boolean;

  /**
   * set the current Highlighted element
   */
  setHightlight(index) {
    this.Items.map((item, i) => {
      item.Highlight = index === i ? true : false;
    });
  }

  /**
   * get the right class for columns
   */
  getItemClass(): string {
    let ret = 'cx-col-sm-' + 12 / this.Items.length;
    return ret;
  }
}
