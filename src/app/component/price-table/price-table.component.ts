import { Component, Input } from '@angular/core';
import { Price } from '../../models/price.d';

@Component({
    selector: 'knab-price-table',
    template: `<div class="cx-row">
  <div *ngFor="let item of Items" [ngClass]="getItemClass()">
    
    <knab-price-table-item  
      Header="{{item.Header}}"
      Price="{{item.Price}}"
      Highlight="{{item.Highlight}}"
      [Features]="item.Features"></knab-price-table-item>
  </div>    
</div>`,
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


    getItemClass(): string {
        let ret = 'cx-col-sm-' + 12 / this.Items.length;
        return ret;
    }
}
