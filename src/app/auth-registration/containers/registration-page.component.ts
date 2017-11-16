import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CXEmailValidator } from '@cx/form';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../../auth/reducers';
import * as auth from '../../auth/actions/auth';
import * as registration from '../../auth/actions/registration';
import { Authenticate } from '../../auth/models/auth';
import { ContentConfig, Content } from '../../content.config';
import { scrollToY } from '../../utils/scroll-to-element.utils';

@Component({
  selector: 'knx-password-reset',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  registrationError$: Observable<string> = this.store$.select(fromAuth.getRegistrationError).filter(error => error !== null);
  registrationPending$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationPending);
  registrationSuccess$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationSuccess);
  resendError$: Observable<string> = this.store$.select(fromAuth.getRegistrationResendActivationEmailError);
  resendPending$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationResendActivationEmailPending);
  resendSuccess$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationResendActivationEmailSuccess);
  registrationEmail$: Observable<string> = this.store$.select(fromAuth.getRegistrationEmail);

  content: Content;

  constructor(private store$: Store<fromAuth.State>, private contentConfig: ContentConfig) {
    this.store$.dispatch(new registration.ResetState());
    this.store$.dispatch(new registration.ResendResetState());
    this.content = this.contentConfig.getContent();
  }

  ngOnInit() {
    scrollToY();
  }

  register(register: Authenticate) {
    this.store$.dispatch(new registration.Register({ emailaddress: register.username, password: register.password }));
  }

  redirectToLogin() {
    this.store$.dispatch(new auth.LoginRedirect());
  }

  sendActivationEmail(email: string) {
    this.store$.dispatch(new registration.ResendActivationEmail(email));
  }
}