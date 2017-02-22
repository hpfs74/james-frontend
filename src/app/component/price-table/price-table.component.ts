import { Component, Input } from '@angular/core';
import { Price } from '../../models/price.d';

@Component({
    selector: 'knab-price-table',
    template: require('./price-table.component.html'),
})
export class PriceTableComponent {

    @Input() Items: Array<Price>;

    getItemClass(): string {
        let ret = 'cx-col-sm-' + 12 / this.Items.length;
        return ret;
    }
}
