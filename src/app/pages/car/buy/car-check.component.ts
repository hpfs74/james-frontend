import { Component, OnChanges, Input, OnInit, SimpleChanges } from '@angular/core';

import { CarCheckForm } from './car-check.form';

@Component({
  selector: 'knx-car-check',
  templateUrl: 'car-check.component.html'
})
export class CarCheckComponent {
  @Input() form: CarCheckForm;
}
