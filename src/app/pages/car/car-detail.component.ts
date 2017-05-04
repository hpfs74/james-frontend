import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { CXFormComponent, getCXValueAccessor } from '../../../../node_modules/@cx/form';
import * as CXInputMasks from '../../../../node_modules/@cx/input/src/cx-input.masks';

import { CarDetailForm } from './car-detail.form';
import { Price } from '../../models/price';
import { Address } from '../../models/address';

@Component({
  selector: 'knx-car-detail-form',
  templateUrl: 'car-detail.component.html',
})
export class CarDetailComponent implements OnInit {
  public form: CarDetailForm;
  public CXInputMasks = CXInputMasks;

  @Input() userProfile: any;
  @Input() config: any;
  @Input() coverages: Price[];
  @Input() isCoverageLoading: boolean;

  // notify licenseplate entered
  @Output() licensePlateChange: EventEmitter<string> = new EventEmitter();

  // notify details change to get new coverages
  @Output() coverageDetailsChange: EventEmitter<any> = new EventEmitter();

  // form submit
  @Output() nextStep: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, elementRef: ElementRef) {
  }

  ngOnInit() {
    this.form = new CarDetailForm(this.fb);
    this.form.formGroup.valueChanges.subscribe(data => {
      this.coverageDetailsChange.emit(data);
    });
  }

  onLicensePlateChange(licensePlate: string) {
    const validLength = 6;
    if (licensePlate && licensePlate.length === validLength) {
      this.licensePlateChange.emit(licensePlate);
    }
  }

  onAddressFound(event: Address) {
    // handling the address view
  }

  submitForm(event) {
    this.nextStep.emit();
  }
}
