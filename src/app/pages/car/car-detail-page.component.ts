import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { ContentService } from '../../shared/content.service';
import { CarDetailForm } from './car-detail.form';

@Component({
  selector: 'ki-car-detail-page',
  templateUrl: 'car-detail-page.component.html'
})
export class CarDetailPageComponent implements OnInit {
  formConfig: any = {};
  carDetailForm: CarDetailForm;

  constructor(private fb: FormBuilder, elementRef: ElementRef, private contentService: ContentService) {
  }

  ngOnInit() {
    // will be used to pass all dynamic strings/labels/etc.
    this.contentService.getFormConfig('car-detail')
      .subscribe(data => {
        this.formConfig = data;
        console.log(data);
        this.carDetailForm = new CarDetailForm(this.fb, this.formConfig);
      });
  }

  save(event) {
    console.log(event);
  }
}
