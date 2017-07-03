import { Component, OnChanges, Input, OnInit, SimpleChanges } from '@angular/core';

import { CarCheckForm } from './car-check.form';
import * as FormUtils from '../../../utils/base-form.utils';

@Component({
  selector: 'knx-car-check',
  templateUrl: 'car-check.component.html'
})
export class CarCheckComponent {
  @Input() form: CarCheckForm;
  @Input() set advice(value: any) {
    if (value) {
      this.form.formGroup.patchValue(value);
      FormUtils.validateForm(this.form.formGroup);
    }
  }
}
