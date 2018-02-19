import { Component, Output, EventEmitter, Input } from '@angular/core';
import { KNXFinalBuyOptions, DefaultKNXFinalBuyOptions } from '@app/components/knx-final-buy/knx-final-buy.options';

@Component({
  selector: 'knx-final-buy',
  styleUrls: ['./knx-final-buy.component.scss'],
  templateUrl: './knx-final-buy.component.html'
})
export class KNXFinalBuyComponent {
  @Input() options: KNXFinalBuyOptions = DefaultKNXFinalBuyOptions;
  @Output() onButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
}
