import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileForm } from './profile.form';
import { Profile, Address } from './../../models';
import * as FormUtils from '../../utils/base-form.utils';

@Component({
  selector: 'knx-profile-edit',
  template: `
  <form [formGroup]="form.formGroup">
    <div class="knx-avatar-profile">
      <img class="knx-avatar-profile__image" src="{{avatarUrl || '../../../assets/images/avatars/assistant.png'}}">

      <cx-form-group class="cx-styleguide-icon__icon knx-icon-pencil"
        [formControlName]="form.formConfig.avatar.formControlName"
        (events)="loadAvatar($event)"
        [options]="form.formConfig.avatar">
      </cx-form-group>
    </div>

    <cx-form-group
      [options]="form.formConfig.gender"
      [formControlName]="form.formConfig.gender.formControlName">
    </cx-form-group>

    <div class="row">
      <div class="col-md-6">
        <cx-form-group
          [options]="form.formConfig.firstName"
          [formControlName]="form.formConfig.firstName.formControlName">
        </cx-form-group>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <cx-form-group
          [options]="form.formConfig.lastName"
          [formControlName]="form.formConfig.lastName.formControlName">
        </cx-form-group>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <cx-form-group
          [options]="form.formConfig.birthDate"
          [formControlName]="form.formConfig.birthDate.formControlName">
        </cx-form-group>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 col-md-offset-4">
        <knx-address-lookup
          (addressFound)="updateAddress($event)"
          [addressFormGroup]="form.addressForm"
          [validationErrors]="form.validationErrors">
        </knx-address-lookup>
      </div>
    </div>

    <cx-form-group
      [options]="form.formConfig.pushNotifications"
      [formControlName]="form.formConfig.pushNotifications.formControlName">
    </cx-form-group>

    <cx-form-group
      [options]="form.formConfig.emailNotifications"
      [formControlName]="form.formConfig.emailNotifications.formControlName">
    </cx-form-group>
  </form>

  <button class="knx-button knx-button--link knx-button--back" (click)="goBack$.emit()">Terug</button>
  <button class="knx-button knx-button--primary pull-right" (click)="save()">Opslaan</button>
  `
})

export class ProfileEditComponent {
  @Input() form: ProfileForm;
  @Input() set profile(value: Profile) {
    if (value) {
      this.form.formGroup.patchValue({
        avatar: value.profile_image,
        gender: value.gender,
        firstName: value.firstname,
        lastName: value.lastname,
      }, { emitEvent: false });

      // this.form.addressForm.patchValue({
      //   postalCode: value.postcode,
      //   houseNumber: value.number,
      //   houseNumberExtension: value.number_extended ? value.number_extended.number_letter : ''
      // }, { emitEvent: false });
      // FormUtils.validateForm(this.form.addressForm);
    }
  }
  @Output() formSaved$: EventEmitter<any> = new EventEmitter();
  @Output() goBack$: EventEmitter<any> = new EventEmitter();

  avatarUrl: string;
  address: Address;

  loadAvatar($event) {
    let ctrl = this.form.formGroup.get('avatar');
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
        this.form.addressForm.value,
        { address: this.address }));
    }
  }
}
