import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { CarDetailForm } from './car-detail.form';

@Component({
  selector: 'ki-car-detail-page',
  templateUrl: 'car-detail-page.component.html'
})
export class CarDetailPageComponent implements OnInit {
  carDetailForm: CarDetailForm;

  constructor(private fb: FormBuilder, elementRef: ElementRef) {
  }

  ngOnInit() {
    let config = {}; // will be used to pass all dynamic strings/labels/etc.
    this.carDetailForm = new CarDetailForm(this.fb, config);
  }

  save(event) {
    console.log(event);
  }
}
