import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knx-price-item',
  templateUrl: './price-item.component.html',
  styleUrls: ['./price-item.scss']
})
export class PriceItemComponent {
  @Input() header: string;
  @Input() badge: string;
  @Input() price: number;
  @Input() features: Array<string>;
  @Input() highlight = false;
  @Input() selectable = false;
  @Input() selected = false;
  @Input() unselectedLabel: string;
  @Input() selectedLabel: string;
  @Input() description: string;
}
