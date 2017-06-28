import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IbanForm } from './../../../forms/iban.form';

@Component({
  selector: 'knx-car-payment-form',
  templateUrl: 'car-payment.component.html'
})
export class CarPaymentComponent implements OnChanges {
  @Input() form: IbanForm;
  @Input() advice: any;

  ngOnChanges() {
    if (this.advice) {
      this.form.formGroup.patchValue(this.advice);
    }
  }
}
