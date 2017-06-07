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
        mobileNumber: this.form.isMobileNumber(this.profile.phone) ? this.profile.phone : null,
        phoneNumber: !this.form.isMobileNumber(this.profile.phone) ? this.profile.phone : null
      });

      // Update validation state of known pre-filled profile fields
      // Note: only seems to get triggered if touched/dirty state is
      // updated on each individual control
      Object.keys(this.form.formGroup.controls)
        .filter(key => {
          return ['firstName', 'middleName', 'lastName', 'mobileNumber', 'phone']
            .indexOf(key) > -1 && this.form.formGroup.get(key).value;
        })
        .forEach(key => {
          this.form.formGroup.get(key).markAsTouched();
          this.form.formGroup.get(key).markAsDirty();
      });
      this.form.formGroup.updateValueAndValidity();
    }
   }
}
