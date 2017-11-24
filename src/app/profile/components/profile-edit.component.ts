import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileForm } from './profile.form';
import { Profile } from '../models';
import { Address } from '../../address/models';
import * as FormUtils from '../../utils/base-form.utils';

@Component({
  selector: 'knx-profile-edit',
  template: `
  <form [formGroup]="form.formGroup" class="knx-fancy-form">
    <div class="knx-avatar knx-avatar--editable">
      <img class="knx-avatar__profile-image" src="{{ avatarUrl }}">

      <knx-form-group class="knx-styleguide-icon__icon knx-icon-pencil"
        [formControlName]="form.formConfig.avatar.formControlName"
        (events)="loadAvatar($event)"
        [options]="form.formConfig.avatar">
      </knx-form-group>
    </div>

    <div class="row">
      <div class="col-md-4">
        <knx-form-group
          [options]="form.formConfig.gender"
          [formControlName]="form.formConfig.gender.formControlName">
        </knx-form-group>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <knx-form-group
          [options]="form.formConfig.firstName"
          [formControlName]="form.formConfig.firstName.formControlName">
        </knx-form-group>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <knx-form-group
          [options]="form.formConfig.lastName"
          [formControlName]="form.formConfig.lastName.formControlName">
        </knx-form-group>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <knx-form-group
          [options]="form.formConfig.birthDate"
          [formControlName]="form.formConfig.birthDate.formControlName">
        </knx-form-group>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 col-md-offset-4">
        <knx-address-lookup
          [addressForm]="form.addressForm"
          (addressFound)="updateAddress($event)">
        </knx-address-lookup>
      </div>
    </div>

    <knx-form-group
      [options]="form.formConfig.pushNotifications"
      [formControlName]="form.formConfig.pushNotifications.formControlName">
    </knx-form-group>

    <knx-form-group
      [options]="form.formConfig.emailNotifications"
      [formControlName]="form.formConfig.emailNotifications.formControlName">
    </knx-form-group>
  </form>

  <button class="knx-button knx-button--link knx-button--back" (click)="goBack$.emit()">Terug</button>
  <button class="knx-button knx-button--primary pull-right" (click)="save()">Opslaan</button>
  `
})

export class ProfileEditComponent {
  @Input() form: ProfileForm;

  @Input() set profile(value: Profile) {
    if (value) {
      const patchObj = {
        gender: value.gender,
        firstName: value.firstname,
        lastName: value.lastname,
        birthDate: value.birthday ? FormUtils.toDateFormat(FormUtils.parseNicciDate(value.birthday)) : value.birthday
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
