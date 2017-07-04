import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { IbanForm } from './../../../forms/iban.form';
import * as FormUtils from '../../../utils/base-form.utils';

@Component({
  selector: 'knx-car-payment-form',
  templateUrl: 'car-payment.component.html'
})
export class CarPaymentComponent {
  @Input() form: IbanForm;
  @Input() set advice(value: any) {
    if (value) {
      this.form.formGroup.patchValue({
        startDate: moment(value.startDate).format('DD-MM-YYYY'),
        iban: value.iban
      });
      FormUtils.validateForm(this.form.formGroup);
    }
  }
}
