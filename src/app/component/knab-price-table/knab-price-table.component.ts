import { Component, Input } from '@angular/core';

@Component({
    selector: module.id,
    template: require('./knab-price-table.component.html'),
})
export class KnabPriceTableComponent {

    @Input() Items: Array<any>;

    getItemClass(): string {
        return "cx-col-sm-4";
    }
}
