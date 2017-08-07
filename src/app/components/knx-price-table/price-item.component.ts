import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knx-price-item',
  template: `
  <div class="knx-price-item" [ngClass]="{'knx-price-item--highlight': highlight, 'knx-price-item--selected': selected }">
    <div class="knx-price-item__header" >
      {{ header }}
      <div *ngIf="highlight" class="knx-price-item__badge">{{ badge }}</div>
    </div>
    <ul class="knx-price-item__features">
      <li *ngFor="let item of features">{{ item }}</li>
    </ul>
    <div *ngIf="price" class="knx-price-item__price">
      vanaf <span>{{ price | currency:'EUR':true:'1.2-2' }}</span>
    </div>
    <button class="knx-button knx-button--ghost">{{ selected ? ' Gekozen' : 'Kies deze' }}</button>
  </div>`
})
export class PriceItemComponent {
  @Input() header: string;
  @Input() badge: string;
  @Input() price: number;
  @Input() features: Array<string>;
  @Input() highlight = false;
  @Input() selectable = false;
  @Input() selected = false;
}
