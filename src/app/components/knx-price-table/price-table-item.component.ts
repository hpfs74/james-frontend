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
      <li *ngFor="let item of features">
        <div class="knx-icon-check"></div>
        <div class="knx-price-item__text">{{ item }}</div>
      </li>
    </ul>
    <div *ngIf="price" class="knx-price-item__price">
      vanaf <span class="knx-price-item__amount">{{ price | currency:'EUR':true:'1.2-2' }}</span>
    </div>
    <div class="knx-price-item__select">
      <button class="knx-button knx-button--ghost">
        <span *ngIf="selected" class="knx-icon-check"></span>{{ selected ? ' Gekozen' : 'Kies deze' }}
      </button>
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
