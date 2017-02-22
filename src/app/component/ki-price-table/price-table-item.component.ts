import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-price-table-item',
  template: `<div class="knab-pricing-table" [ngClass]="{'knab-pricing-table--highlight': highlight }">
  <div class="knab-pricing-table__header" >
    {{ header }}
  </div>
  <ul class="knab-pricing-table__features">
    <li *ngFor="let item of features">{{ item }}</li>
  </ul>  
  <div class="knab-pricing-table__price">
    vanaf <span class="knab-pricing-table__price-amount">&euro; {{ price }}</span>
  </div>
</div>`,
})
export class PriceTableItemComponent {
  project: string = 'KNAB';

  @Input() header: string;
  @Input() price: number;
  @Input() features: Array<string>;
  @Input() highlight: boolean = false;
  @Input() selectable: boolean = false;
}
