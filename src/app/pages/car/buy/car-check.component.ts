import { Component, OnChanges, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CarCheckForm } from './car-check.form';
import * as FormUtils from '../../../utils/base-form.utils';

@Component({
  selector: 'knx-car-check',
  templateUrl: 'car-check.component.html'
})
export class CarCheckComponent implements OnInit {
  @Input() form: CarCheckForm;
  @Input() set advice(value: any) {
    if (value) {
      FormUtils.updateAndValidateControls(this.form.formGroup, value);
    }
  }

  ngOnInit() {
    // bind radio buttons to comment text areas
    this.form.formGroup.get('crime').valueChanges.subscribe(val => this.toggleTextArea('crime', 'crimeComment', val));
    this.form.formGroup.get('crime').valueChanges.subscribe(val => this.toggleTextArea('debt', 'debtComment', val));
    this.form.formGroup.get('crime').valueChanges.subscribe(val => this.toggleTextArea('refuse', 'refuseComment', val));
    this.form.formGroup.get('crime').valueChanges.subscribe(val => this.toggleTextArea('driver', 'driverComment', val));
    this.form.formGroup.get('crime').valueChanges.subscribe(val => this.toggleTextArea('cause', 'causeComment', val));
    this.form.formGroup.get('crime').valueChanges.subscribe(val => this.toggleTextArea('register', 'registerComment', val));
  }

  toggleTextArea(radioControlName: string, textAreaControlName: string, value: any) {
    let fc = this.form.formGroup.get(radioControlName);
    let textArea = this.form.formGroup.get(textAreaControlName);

    if (value) {
      textArea.setValidators(Validators.required);
    } else {
      textArea.clearValidators();
    }
  }
}
