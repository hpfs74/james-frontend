import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knx-price-table-item',
  template: `
  <div class="knx-pricing-table" [ngClass]="{'knx-pricing-table--highlight': highlight, 'knx-pricing-table--selected': selected }">
    <div class="knx-pricing-table-header" >
      {{ header }}
      <div *ngIf="highlight" class="knx-pricing-table-badge">{{ badge }}</div>
    </div>
    <ul class="knx-pricing-table-features">
      <li *ngFor="let item of features">
        <div class="knx-icon-check"></div>
        <div class="knx-pricing-table-text">{{ item }}</div>
      </li>
    </ul>
    <div *ngIf="price" class="knx-pricing-table-price">
      vanaf <span class="knx-pricing-table-amount">{{ price | currency:'EUR':true:'1.2-2' }}</span>
    </div>
    <div class="knx-pricing-table-input">
    </div>
</div>`,
})
export class PriceTableItemComponent {
  @Input() header: string;
  @Input() badge: string;
  @Input() price: number;
  @Input() features: Array<string>;
  @Input() highlight: boolean = false;
  @Input() selectable: boolean = false;
  @Input() selected: boolean = false;
}
