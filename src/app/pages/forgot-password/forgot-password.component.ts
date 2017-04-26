import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '../../../../node_modules/@cx/form';
import { AuthService } from './../../services/auth.service';

/**
 * Login page that's rendered in router-outlet of 'AppComponent if not logged in
 *
 * @export
 * @class LoginComponent
 */
@Component({
  selector: 'knx-forgot-password',
  template: `
    <div class="container">
      <div class="row">
        <div class="knx-forgot-password-welcome">
        </div>
      </div>

      <form [formGroup]="forgotPasswordForm" (submit)="resetPasswordRequest($event)">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <p> Please provide the username/email address to get the reset link. </p>
              <cx-form-group [formControlName]='formGroupConfig[0].formControlName'
                [options]="formGroupConfig[0]"></cx-form-group>
            

                <button class="cx-button knx-btn-primary fullwidth"
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
export class ForgotPasswordComponent {
  submitted: boolean = false;
  isPending: boolean = false;
  formBuilder: FormBuilder;
  forgotPasswordForm: FormGroup;
  validationErrors: any;
  messageTitle: string;
  message: string;
  formGroupConfig = [];

  constructor(private router: Router, private authService: AuthService) {

    // TODO: check that you cannot get here if you're logged in
    this.initForm();
  }

  initForm() {
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
    this.submitted = true;

    if (this.forgotPasswordForm.valid) {
      console.log('Trying to log in ...');
      this.isPending = true;

      let email = this.forgotPasswordForm.get('email');

      //DISABLE LoginComponent
      // this.router.navigate(['/overview']);
      console.log('email is ', email.value);

      this.authService.forgotPassword(email.value).subscribe(() => {
        this.isPending = false;

        console.log(this.authService);

        // TODO: check if return value is correct so at this point we can have net fail, wrong email or success.
        this.message = 'Reset complted, check your email. If you don\'t see any email please check in spam folder';
        this.messageTitle = 'Password reset request';
      });
    }
    return;
  }
}
