import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import * as fromInsurance from '../../insurance/reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromAdvice from '../../insurance/reducers/advice';
import * as auth from '../../auth/actions/auth';
import * as registration from '../../auth/actions/registration';
import { Authenticate } from '../../auth/models/auth';
import { ContentConfig, Content } from '../../content.config';

@Component({
  selector: 'knx-password-reset',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent {
  registrationError$: Observable<string> = this.store$.select(fromAuth.getRegistrationError).filter(error => error !== null);
  registrationPending$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationPending);
  registrationSuccess$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationSuccess);
  resendError$: Observable<string> = this.store$.select(fromAuth.getRegistrationResendActivationEmailError);
  resendPending$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationResendActivationEmailPending);
  resendSuccess$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationResendActivationEmailSuccess);
  registrationEmail$: Observable<string> = this.store$.select(fromAuth.getRegistrationEmail);
  selectedInsurance$: Observable<any> = this.store$.select(fromInsurance.getSelectedInsurance);

  content: Content;

  constructor(private store$: Store<fromAuth.State>, private contentConfig: ContentConfig) {
    this.store$.dispatch(new registration.ResetState());
    this.store$.dispatch(new registration.ResendResetState());
    this.content = this.contentConfig.getContent();
  }

  register(register: Authenticate) {
    this.store$.dispatch(new registration.Register({ emailaddress: register.username, password: register.password }));
  }

  registerWithAdvice(register: Authenticate) {
    this.store$.dispatch(new registration.RegisterWithAdvice({ emailaddress: register.username, password: register.password }));
  }

  redirectToLogin() {
    this.store$.dispatch(new auth.LoginRedirect());
  }

  sendActivationEmail(email: string) {
    this.store$.dispatch(new registration.ResendActivationEmail(email));
  }
}
