import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ki-price-table-item',
  template: `
  <div class="ki-pricing-table" [ngClass]="{'ki-pricing-table--highlight': highlight, 'ki-pricing-table--selected': selected }">
    <div class="ki-pricing-table-header" >
      {{ header }}
    </div>
    <ul class="ki-pricing-table-features">
      <li *ngFor="let item of features"><span class="icon fa fa-check"></span> {{ item }}</li>
    </ul>
    <div class="ki-pricing-table-price">
      vanaf <span class="ki-pricing-table-amount">{{ price | currency:'EUR':true:'1.2-2' }}</span>
    </div>
    <div class="ki-pricing-table-input">
    </div>
</div>`,
})
export class PriceTableItemComponent {
  @Input() header: string;
  @Input() price: number;
  @Input() features: Array<string>;
  @Input() highlight: boolean = false;
  @Input() selectable: boolean = false;
  @Input() selected: boolean = false;
}
