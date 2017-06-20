import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IbanForm } from './../../../forms/iban.form';

@Component({
  selector: 'knx-car-payment-form',
  templateUrl: 'car-payment.component.html'
})
export class CarPaymentComponent {
  @Input() form: IbanForm;
}
