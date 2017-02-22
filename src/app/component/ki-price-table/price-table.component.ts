import { Component, Input } from '@angular/core';
import { Price } from '../../models/price.d';

@Component({
  selector: 'ki-price-table',
  template: require('./price-table.component.html'),
})
export class PriceTableComponent {

  @Input() Items: Array<Price>;
  @Input() Select: boolean;


  /**
   * set the current Highlighted element
   */
  setHightlight(index) {
    this.Items.map((item, i) => {
      item.Highlight = index === i ? true : false;
    });
  }


  private getItemClass(): string {
    let ret = 'cx-col-sm-' + 12 / this.Items.length;
    return ret;
  }
}
