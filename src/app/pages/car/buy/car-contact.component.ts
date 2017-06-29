import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Profile } from './../../../models/profile';
import { ContactDetailForm } from './../../../forms/contact-detail.form';
import { isMobileNumber } from '../../../utils/base-form.utils';

@Component({
  selector: 'knx-car-contact-form',
  templateUrl: 'car-contact.component.html'
})
export class CarContactComponent implements OnChanges {
  @Input() form: ContactDetailForm;
  @Input() profile: Profile;
  @Input() set advice(value: any) {
    if (value) {
      this.form.formGroup.patchValue({
        initials: value.initials,
        firstName: value.firstName,
        middleName: value.middleName,
        lastName: value.lastName,
        mobileNumber: value.mobileNumber,
        phoneNumber: value.phoneNumber,
        saveToProfile: value.saveToProfile
      }, { emitEvent: false });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.profile) {
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
