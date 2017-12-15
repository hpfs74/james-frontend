import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KNXStepError, KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

@Component({
  selector: 'knx-wizard-controls',
  styleUrls: ['./knx-wizard-controls.component.scss'],
  templateUrl: './knx-wizard-controls.component.html',
})
export class KNXWizardControlsComponent {
  @Input() currentStepOptions: KNXWizardStepRxOptions;
  @Input() error: KNXStepError;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();
  isPendingNext: boolean;
  constructor() {}

  next() {
    this.onNext.emit();
  }

  back() {
    this.onBack.emit();
  }
}
