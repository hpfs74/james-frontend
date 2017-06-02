import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Profile } from './../../../models/profile';
import { ContactDetailForm } from './../../../forms/contact-detail.form';

@Component({
  selector: 'knx-car-contact-form',
  templateUrl: 'car-contact.component.html'
})
export class CarContactComponent implements OnChanges {
  @Input() form: ContactDetailForm;
  @Input() profile: Profile;

  ngOnChanges(changes: SimpleChanges) {
    if (this.profile) {
      this.form.formGroup.patchValue({
        firstName: this.profile.firstname,
        middleName: this.profile.infix,
        lastName: this.profile.lastname,
        mobileNumber: this.profile.phone
      });
    }
   }
}
