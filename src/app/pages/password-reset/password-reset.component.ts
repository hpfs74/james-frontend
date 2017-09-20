import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '@cx/form';
import { AuthService } from '../../auth/services/auth.service';

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
  submitted = false;
  isPending = false;
  formBuilder: FormBuilder;
  forgotPasswordForm: FormGroup;
  validationErrors: any;
  messageTitle: string;
  message: string;
  formGroupConfig = [];
  goToUrl: string;

  constructor(private router: Router, private authService: AuthService) {
    this.initForm();
  }

  initForm() {
    // this.goToUrl = this.authService.getPasswordResetLink();

    // TODO
    // password reset just redirects to NICCI page now,
    // reset from here through endpoint to be implemented
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
    if (this.goToUrl) {
      window.location.href = this.goToUrl;
    }
  }
}
