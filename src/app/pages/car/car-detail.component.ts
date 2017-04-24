import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { CXFormComponent, getCXValueAccessor } from '../../../../node_modules/@cx/form';

import { CarDetailForm } from './car-detail.form';
import { Price } from '../../models/price';

@Component({
  selector: 'knx-car-detail-form',
  templateUrl: 'car-detail.component.html',
})
export class CarDetailComponent implements OnInit {
  public form: CarDetailForm;
  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    maxlength: (err) => `Value is too long! Use max ${err.requiredLength} characters`,
    postalCode: () => `Provided postal code is invalid`,
    policyNumber: () => `Provided policy number is invalid`,
    email: () => `Provided e-mail is invalid`
  };

  @Input() userProfile: any;
  @Input() config: any;
  @Input() coverages: Price[];

  @Output() carDetails: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, elementRef: ElementRef) {
  }

  ngOnInit() {
    this.form = new CarDetailForm(this.fb);
  }

  save(event) {
    console.log(event);
  }
}
