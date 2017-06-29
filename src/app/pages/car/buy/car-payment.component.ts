import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { IbanForm } from './../../../forms/iban.form';

@Component({
  selector: 'knx-car-payment-form',
  templateUrl: 'car-payment.component.html'
})
export class CarPaymentComponent {
  @Input() form: IbanForm;
  @Input() set advice(value: any) {
    if (this.advice) {
      this.form.formGroup.patchValue({
        startDate: moment(this.advice.startDate).format('DD-MM-YYYY'),
        iban: this.advice.iban
      });
    }
  }
}
