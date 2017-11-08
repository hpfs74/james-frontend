import { Component, OnChanges, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CarCheckForm } from './car-check.form';
import * as FormUtils from '../../../utils/base-form.utils';

import { QaIdentifier } from './../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../shared/models/qa-identifiers';

@Component({
  selector: 'knx-car-check',
  templateUrl: 'car-check.component.html'
})
export class CarCheckComponent implements OnInit, QaIdentifier {
  qaRootId = QaIdentifiers.carCheck;

  @Input() form: CarCheckForm;
  @Input() set advice(value: any) {
    if (value) {
      FormUtils.updateAndValidateControls(this.form.formGroup, value);
    }
  }

  ngOnInit() {
    // bind comment text areas to radio button value
    this.form.formGroup.get('crime').valueChanges.subscribe(val => this.toggleTextArea('crimeComment', val));
    this.form.formGroup.get('debt').valueChanges.subscribe(val => this.toggleTextArea('debtComment', val));
    this.form.formGroup.get('refuse').valueChanges.subscribe(val => this.toggleTextArea('refuseComment', val));
    this.form.formGroup.get('driver').valueChanges.subscribe(val => this.toggleTextArea('driverComment', val));
    this.form.formGroup.get('cause').valueChanges.subscribe(val => this.toggleTextArea('causeComment', val));
    this.form.formGroup.get('register').valueChanges.subscribe(val => this.toggleTextArea('registerComment', val));
  }

  toggleTextArea(textAreaControlName: string, value: boolean) {
    let textArea = this.form.formGroup.get(textAreaControlName);
    if (value) {
      textArea.setValidators(Validators.required);
    } else {
      textArea.clearValidators();
      textArea.markAsPristine();
      textArea.markAsUntouched();
    }
    textArea.updateValueAndValidity();
  }
}
