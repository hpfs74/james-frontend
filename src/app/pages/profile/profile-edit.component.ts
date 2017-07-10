import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileForm } from './profile.form';
import { Profile, Address } from './../../models';
import * as FormUtils from '../../utils/base-form.utils';

@Component({
  selector: 'knx-profile-edit',
  template: `
  <div class="col-sm-10 col-sm-offset-2">
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
        <div class="col-md-4">
          <cx-form-group
            [options]="form.formConfig.birthDate"
            [formControlName]="form.formConfig.birthDate.formControlName">
          </cx-form-group>
        </div>
      </div>

      <knx-address-lookup
        (addressFound)="updateAddress($event)"
        [addressFormGroup]="form.addressForm"
        [validationErrors]="form.validationErrors">
      </knx-address-lookup>
    </form>
  </div>

  <div class="col-sm-12">
    <button class="knx-button knx-button--link knx-button--back" (click)="goBack$.emit()">Terug</button>
    <button class="knx-button knx-button--primary pull-right" (click)="save()">Opslaan</button>
  </div>
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

      if (value.address) {
        this.form.addressForm.patchValue({
          postalCode: value.address.postcode,
          houseNumber: value.address.number,
          houseNumberExtension: value.address.number_extended ? value.address.number_extended.number_letter : ''
        }, { emitEvent: false });
        FormUtils.validateForm(this.form.addressForm);
      }
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
