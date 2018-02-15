import { Component, Input, OnInit } from '@angular/core';

import { CarInsurance } from '../../car/models/car-insurance';

@Component({
  selector: 'knx-insurance-review-car',
  templateUrl: './insurance-review-car.component.html',
  styleUrls: ['./insurance-review-car.component.scss']
})
export class InsuranceReviewCarComponent {
  @Input() carInsurance: CarInsurance;

  showOneOffPremium(): boolean {
    return this.carInsurance.one_off_premium > 0;
  }
}
