import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InsuranceAdvice } from '../../insurance/models';
import { KNXFinalAdviceOptions, DefaultKNXFinalAdviceOptions } from '@app/components/knx-final-advice/knx-final-advice.options';

@Component({
  selector: 'knx-insurance-review',
  styleUrls: ['./insurance-review.component.scss'],
  templateUrl: './insurance-review.component.html'
})
export class InsuranceReviewComponent {
  @Input() selectedInsurance: InsuranceAdvice;
  @Input() knxFinalAdviceOptions: KNXFinalAdviceOptions = DefaultKNXFinalAdviceOptions;
  @Output() onProceedToBuy: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
}
