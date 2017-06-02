import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ContactDetailForm } from './../../../forms/contact-detail.form';

@Component({
  selector: 'knx-car-contact-form',
  templateUrl: 'car-contact.component.html'
})
export class CarContactComponent implements OnInit {
  @Input() form: ContactDetailForm;

  constructor() {}

  ngOnInit() {}
}
