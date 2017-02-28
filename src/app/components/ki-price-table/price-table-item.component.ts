import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-price-table-item',
  template: `<div class="ki-pricing-table" [ngClass]="{'ki-pricing-table--highlight': highlight }">
  <div class="ki-pricing-table__header" >
    {{ header }}
  </div>
  <ul class="ki-pricing-table__features">
    <li *ngFor="let item of features">{{ item }}</li>
  </ul>
  <div class="ki-pricing-table__price">
    price <span class="ki-pricing-table__price-amount">{{ price | currency:'EUR':true:'1.2-2' }}</span>
  </div>
</div>`,
})
export class PriceTableItemComponent {
  @Input() header: string;
  @Input() price: number;
  @Input() features: Array<string>;
  @Input() highlight: boolean = false;
  @Input() selectable: boolean = false;
}
