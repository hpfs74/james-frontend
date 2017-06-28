import { Component, OnChanges, Input, OnInit, SimpleChanges } from '@angular/core';

import { CarCheckForm } from './car-check.form';

@Component({
  selector: 'knx-car-check',
  templateUrl: 'car-check.component.html'
})
export class CarCheckComponent implements OnChanges {
  @Input() form: CarCheckForm;
  @Input() advice: any;

  ngOnChanges() {
    if (this.advice) {
      this.form.formGroup.patchValue(this.advice);
    }
  }
}
