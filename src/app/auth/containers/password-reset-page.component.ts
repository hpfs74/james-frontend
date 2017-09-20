import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '@cx/form';

/**
 * Forgot password component
 *
 * @export
 * @class PasswordResetPageComponent
 */
@Component({
  selector: 'knx-password-reset',
  template: `
    <div class="container">
      <form [formGroup]="forgotPasswordForm" (submit)="resetPasswordRequest($event)">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="knx-password-reset__welcome">
              <p>Vul je e-mailadres in om je wachtwoord te resetten</p>
            </div>
            <cx-form-group [formControlName]='formGroupConfig[0].formControlName'
              [options]="formGroupConfig[0]"></cx-form-group>

            <button class="knx-button knx-btn--primary fullwidth"
              [class.cx-button--pending]="isPending" [disabled]="!forgotPasswordForm.valid || isPending">
              Wachtwoord resetten</button>
          </div>
        </div>
          <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="knx-message knx-message--error" *ngIf="submitted && forgotPasswordForm.valid && message">
                <div class="knx-message__header">{{ messageTitle }}</div>
                <div class="knx-message__content">{{ message }}
                </div>
            </div>
          </div>
        </div>
        </form>
    </div>
  `
})
export class PasswordResetPageComponent {
  submitted = false;
  isPending = false;
  formBuilder: FormBuilder;
  forgotPasswordForm: FormGroup;
  validationErrors: any;
  messageTitle: string;
  message: string;
  formGroupConfig = [];
  goToUrl: string;

  constructor() {}

  // initForm() {
  //   // this.goToUrl = this.authService.getPasswordResetLink();

  //   // TODO
  //   // password reset just redirects to NICCI page now,
  //   // reset from here through endpoint to be implemented
  //   this.formBuilder = new FormBuilder();
  //   this.forgotPasswordForm = this.formBuilder.group({
  //     email: [null, Validators.compose(
  //       [Validators.required, CXEmailValidator]
  //     )],
  //     password: [null, Validators.compose(
  //       [Validators.required]
  //     )],
  //   });

  //   this.formGroupConfig = [
  //     {
  //       formControlName: 'email',
  //       label: 'E-mailadres',
  //       formControl: this.forgotPasswordForm.get('email'),
  //       inputOptions: {
  //         placeholder: 'voorbeeld@mail.com',
  //       }
  //     }
  //   ];
  // }

  resetPasswordRequest(event) {
    if (this.goToUrl) {
      window.location.href = this.goToUrl;
    }
  }
}
