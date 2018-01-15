import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProfileForm } from './profile.form';
import { Profile, Settings } from '../../models';
import { Address } from '@app/address/models';
import * as FormUtils from '@app/utils/base-form.utils';
import { AddressLookupComponent } from '@app/address/containers/address-lookup.component';

@Component({
  selector: 'knx-profile-form',
  templateUrl: './profile-form.component.html'
})

export class ProfileFormComponent {
  avatarUrl: string;
  address: Address;
  @ViewChild('addressLookup') addressLookup: AddressLookupComponent;
  @Input() form: ProfileForm;
  @Input() pending: boolean;

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
        const addresPatchObj = {
          postalCode: value.postcode,
          houseNumber: this.normalizeAddressHouseNumber(value),
          houseNumberExtension: this.normalizeAddressHouseNumberAddition(value)
        };
        this.form.addressForm.formGroup.patchValue(addresPatchObj, { emitEvent: false });
        this.addressLookup.addressChange(addresPatchObj);
      }
    }
  }

  @Output() formSaved$: EventEmitter<any> = new EventEmitter();
  @Output() goBack$: EventEmitter<any> = new EventEmitter();

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
    FormUtils.validateForm(this.form.formGroup);
    Object.keys(this.form.addressForm.formGroup.controls).forEach(key => {
      const control = this.form.addressForm.formGroup.get(key);
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    this.form.addressForm.formGroup.updateValueAndValidity();

    if (this.form.formGroup.valid) {
      this.formSaved$.emit(Object.assign({},
        this.form.formGroup.value,
        this.form.addressForm.formGroup.value,
        { address: this.address }));
    }
  }

  private normalizeAddressHouseNumber(payload: Profile) {
    if (!payload.number_extended) {
      return null;
    }

    return payload.number_extended.number_only.toString();
  }

  private normalizeAddressHouseNumberAddition(payload: Profile) {
    if (!payload.number_extended) {
      return null;
    }
    return payload.number_extended.number_extension;
  }
}
