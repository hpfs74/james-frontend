import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '../../../../node_modules/@cx/form';
import { AuthService } from './../../services/auth.service';

/**
 * Forgot password component
 *
 * @export
 * @class ForgotPasswordComponent
 */
@Component({
  selector: 'knx-password-reset',
  template: `
    <div class="container">
      <form [formGroup]="forgotPasswordForm" (submit)="resetPasswordRequest($event)">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="knx-password-reset__welcome">
              <p>Please provide the username/email address to get the reset link. </p>
            </div>
            <cx-form-group [formControlName]='formGroupConfig[0].formControlName'
              [options]="formGroupConfig[0]"></cx-form-group>

            <button class="knx-button knx-btn--primary fullwidth"
              [class.cx-button--pending]="isPending" [disabled]="!forgotPasswordForm.valid || isPending">
              Reset password</button>
          </div>
        </div>
          <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="cx-message cx-message--error" *ngIf="submitted && forgotPasswordForm.valid && message">
                <div class="cx-message__header">{{ messageTitle }}</div>
                <div class="cx-message__content">{{ message }}
                </div>
            </div>
          </div>
        </div>
        </form>
    </div>
  `
})
export class PasswordResetComponent {
  submitted: boolean = false;
  isPending: boolean = false;
  formBuilder: FormBuilder;
  forgotPasswordForm: FormGroup;
  validationErrors: any;
  messageTitle: string;
  message: string;
  formGroupConfig = [];
  redirectUrl: string;

  constructor(private router: Router, private authService: AuthService) {
    this.initForm();
  }

  initForm() {
    this.redirectUrl = this.authService.forgotPassword('');

    this.formBuilder = new FormBuilder();
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, Validators.compose(
        [Validators.required, CXEmailValidator]
      )],
      password: [null, Validators.compose(
        [Validators.required]
      )],
    });

    this.formGroupConfig = [
      {
        formControlName: 'email',
        label: 'E-mailadres',
        formControl: this.forgotPasswordForm.get('email'),
        inputOptions: {
          placeholder: 'voorbeeld@mail.com',
        }
      }
    ];
  }

  resetPasswordRequest(event) {
    if (this.redirectUrl) {
      window.location.href = this.redirectUrl;
    }
  }
}
