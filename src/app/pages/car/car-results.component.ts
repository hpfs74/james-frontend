import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceAdvice } from '../../models/insurance';

import { Car } from '../../models/car';

@Component({
  selector: 'knx-car-result-form',
  templateUrl: 'car-result.component.html'
})

export class CarResultComponent implements OnInit {
  @Input() insurances: Array<InsuranceAdvice>;
  @Input() car: Car;

  @Output() insuranceSelected$: EventEmitter<InsuranceAdvice> = new EventEmitter();

  stepAmount: number;
  total: number;

  ngOnInit() {
    this.total = this.stepAmount = 4;
  }

  showMore(): void {
    this.total += this.stepAmount;
  }

  selectInsurance(event) {
    this.insuranceSelected$.emit(event);
  }
}
