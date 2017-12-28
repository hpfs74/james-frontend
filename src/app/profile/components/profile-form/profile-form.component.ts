import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileForm } from './profile.form';
import { Profile } from '../../models';
import { Address } from '@app/address/models';
import * as FormUtils from '@app/utils/base-form.utils';

@Component({
  selector: 'knx-profile-form',
  templateUrl: './profile-form.component.html'
})

export class ProfileFormComponent {
  @Input() form: ProfileForm;

  @Input() set profile(value: Profile) {
    if (value) {
      const patchObj = {
        gender: value.gender,
        firstName: value.firstname,
        lastName: value.lastname,
        birthDate: value.birthday ? FormUtils.toDateFormat(FormUtils.parseNicciDate(value.birthday)) : value.birthday,
        houseHold: value.household
      };

      this.avatarUrl = value.profile_image;

      this.form.formGroup.patchValue(patchObj, { emitEvent: false });

      FormUtils.validateControls(this.form.formGroup, Object.keys(patchObj)
        .filter(key => patchObj[key] !== null));

      if (value.number && value.postcode) {
        this.form.addressForm.formGroup.patchValue({
          postalCode: value.postcode,
          houseNumber: value.number,
          houseNumberExtension: value.number_extended ? value.number_extended.number_letter : ''
        }, { emitEvent: false });
        FormUtils.validateForm(this.form.addressForm.formGroup);
      }
    }
  }
  @Output() formSaved$: EventEmitter<any> = new EventEmitter();
  @Output() goBack$: EventEmitter<any> = new EventEmitter();

  avatarUrl: string;
  address: Address;

  loadAvatar($event) {
    const ctrl = this.form.formGroup.get('avatar');
    if (ctrl.value.length) {
      this.avatarUrl = ctrl.value[0].dataUrl;
    }
  }

  updateAddress(event) {
    this.address = event;
  }

  save() {
    Object.keys(this.form.formGroup.controls).forEach(key => {
      this.form.formGroup.get(key).markAsTouched();
    });
    this.form.formGroup.updateValueAndValidity();

    if (this.form.formGroup.valid) {
      this.formSaved$.emit(Object.assign({},
        this.form.formGroup.value,
        this.form.addressForm.formGroup.value,
        { address: this.address }));
    }
  }
}
