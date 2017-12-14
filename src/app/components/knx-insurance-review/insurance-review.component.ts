import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { InsuranceAdvice } from '../../insurance/models';
import { CarInsurance } from '../../car/models';

@Component({
  selector: 'knx-insurance-review',
  styleUrls: ['./insurance-review.component.scss'],
  templateUrl: './insurance-review.component.html'
})
export class InsuranceReviewComponent {
  @Input() selectedInsurance: InsuranceAdvice;
}
