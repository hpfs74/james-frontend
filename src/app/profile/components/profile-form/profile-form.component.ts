import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileForm } from './profile.form';
import { Profile, Settings } from '../../models';
import { Address } from '@app/address/models';
import * as FormUtils from '@app/utils/base-form.utils';

@Component({
  selector: 'knx-profile-form',
  templateUrl: './profile-form.component.html'
})

export class ProfileFormComponent {
  avatarUrl: string;
  address: Address;
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
        this.form.addressForm.formGroup.patchValue({
          postalCode: value.postcode,
          houseNumber: this.normalizeAddressHouseNumber(value),
          houseNumberExtension: this.normalizeAddressHouseNumberAddition(value)
        }, { emitEvent: false });
        FormUtils.validateForm(this.form.addressForm.formGroup);
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
    FormUtils.validateForm(this.form.addressForm.formGroup);

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

    return payload.number_extended.number_only;
  }

  private normalizeAddressHouseNumberAddition(payload: Profile) {
    if (!payload.number_extended) {
      return null;
    }
    return payload.number_extended.number_extension;
  }
}
