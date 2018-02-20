import { Component, Output, EventEmitter, Input } from '@angular/core';
import { KNXFinalAdviceOptions, DefaultKNXFinalAdviceOptions } from '@app/components/knx-final-advice/knx-final-advice.options';

@Component({
  selector: 'knx-final-advice',
  styleUrls: ['./knx-final-advice.component.scss'],
  templateUrl: './knx-final-advice.component.html'
})
export class KNXFinalAdviceComponent {
  @Input() mobile = false;
  @Input() options: KNXFinalAdviceOptions = DefaultKNXFinalAdviceOptions;
  @Output() onButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }
}
