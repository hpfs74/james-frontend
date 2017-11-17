import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QaIdentifier } from './../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';

import { IbanForm } from '../../../../../shared/forms/iban.form';
import * as FormUtils from '../../../../../utils/base-form.utils';

@Component({
  selector: 'knx-car-payment-form',
  templateUrl: 'car-payment.component.html'
})
export class CarPaymentComponent implements OnInit, QaIdentifier {
  qaRootId = QaIdentifiers.carPayment;

  @Input() form: IbanForm;
  @Input() set advice(value: any) {
    if (value && value.startDate || value && value.iban) {
      this.form.formGroup.patchValue({
        startDate: FormUtils.toDateFormat(FormUtils.toDateType(value.startDate)),
        iban: value.iban
      });
      FormUtils.validateControls(this.form.formGroup, Object.keys(this.form.formGroup.controls));
    }
  }

  ngOnInit() {
    const startDate = this.form.formGroup.get('startDate');
    const currentDate = FormUtils.toDateFormat(new Date());
    startDate.setValue(currentDate);
    FormUtils.validateControls(this.form.formGroup, ['startDate']);
  }
}
