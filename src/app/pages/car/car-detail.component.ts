import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { CarDetailForm } from './car-detail.form';

@Component({
  selector: 'ki-car-detail-form',
  templateUrl: 'car-detail.component.html'
})
export class CarDetailComponent implements OnInit, OnChanges {
  form: CarDetailForm;

  @Input() userProfile: any;
  @Input() steps: any[];
  @Input() config: any;

  @Output() carDetails: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, elementRef: ElementRef) {
  }

  ngOnInit() {
    return;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['steps']) {
      this.steps = changes['steps'].currentValue;
    }
    if (changes['config']) {
      this.config = changes['config'].currentValue;
      this.form = new CarDetailForm(this.fb, this.config);
    }
  }

  save(event) {
    console.log(event);
  }
}