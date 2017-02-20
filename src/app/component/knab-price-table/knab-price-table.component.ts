import { Component, Input } from '@angular/core';
import { Price } from '../../models/price.d';

@Component({
    selector: 'knab-price-table',
    template: require('./knab-price-table.component.html'),
})
export class KnabPriceTableComponent {

    @Input() Items: Array<Price>;

    getItemClass(): string {
        let ret ='cx-col-sm-' + 12 / this.Items.length;
        return ret;
    }
}
