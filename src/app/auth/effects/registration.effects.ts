import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { RegistrationPayload, RegistrationResult } from '../models/auth';
import { AuthService } from '../services/auth.service';
import * as fromAdvice from '../../insurance/reducers/advice';
import * as fromInsurance from '../../insurance/reducers/insurance';
import * as fromAuth from '../../auth/reducers/auth';

import * as fromRoot from '../reducers';
import * as registration from '../actions/registration';

@Injectable()
export class RegistrationEffects {

  @Effect()
  register$ = this.actions$
    .ofType(registration.REGISTER)
    .map((action: registration.Register) => (action.registration))
    .exhaustMap((payload) =>
      this.authService
        .register(payload)
        .mergeMap((result: RegistrationResult) => {
          return [new registration.RegisterSuccess({})];
        })
        .catch((error) => {
          let errorText = typeof(error.text) === 'function' ? JSON.parse(error.text()) : error;
          return Observable.of(new registration.RegisterFailure(errorText.error || errorText));
        })
  );

  @Effect()
  registerWithAdvice$ = this.actions$
    .ofType(registration.REGISTER_WITH_ADVICE)
    .map((action: registration.RegisterWithAdvice) => (action.registration))
    .withLatestFrom(this.store$, (payload, state: any) => {
      return {
        advice: state.insurance.advice,
        payload: payload
      };
    })
    .switchMap((combined: any) =>
      this.authService
        .registerWithAdvice(combined.payload, combined.advice)
        .mergeMap((result: RegistrationResult) => {
          return [new registration.RegisterWithAdviceSuccess({})];
        })
        .catch((error) => {
          let errorText = typeof(error.text) === 'function' ? JSON.parse(error.text()) : error;
          return Observable.of(new registration.RegisterWithAdviceFailure(errorText.error || errorText));
        })
    );

  @Effect()
  resendActivationEmail$ = this.actions$
    .ofType(registration.RESEND_ACTIVATION_EMAIL)
    .map((action: registration.ResendActivationEmail) => (action))
    .exhaustMap((payload) =>
      this.authService
        .resendActivation(payload)
        .mergeMap((result: RegistrationResult) => {
          return [new registration.ResendActivationEmailSuccess()];
        })
        .catch((error) => {
          let errorText = typeof(error.text) === 'function' ? JSON.parse(error.text()) : error;
          return Observable.of(new registration.RegisterFailure(errorText.error || errorText));
        })
    );

  constructor(private actions$: Actions, private authService: AuthService, private store$: Store<fromAdvice.State>) {
  }
}
