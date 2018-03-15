import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceAdvice } from '../../insurance/models';
import { KNXFinalAdviceOptions, DefaultKNXFinalAdviceOptions } from '@app/components/knx-final-advice/knx-final-advice.options';

import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';

@Component({
  selector: 'knx-insurance-review',
  styleUrls: ['./insurance-review.component.scss'],
  templateUrl: './insurance-review.component.html'
})
export class InsuranceReviewComponent implements QaIdentifier {
  qaRootId = QaIdentifiers.carInsurances;

  @Input() selectedInsurance: InsuranceAdvice;
  @Input() knxFinalAdviceOptions: KNXFinalAdviceOptions = DefaultKNXFinalAdviceOptions;
  @Output() onProceedToBuy: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
}
