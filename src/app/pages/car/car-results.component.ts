import { Component, OnInit, Input } from '@angular/core';
import { InsuranceAdvice } from '../../models/insurance';

import { Car } from '../../models/car';

@Component({
  selector: 'knx-car-result-form',
  templateUrl: 'car-result.component.html'
})

export class CarResultComponent {
  @Input() insurancesLoading: boolean;
  @Input() insurances: Array<InsuranceAdvice>;
  @Input() car: Car;
}
