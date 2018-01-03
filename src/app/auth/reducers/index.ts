import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from './auth';
import * as fromLoginPage from './login-page';
import * as fromRegistration from './registration';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
  registration: fromRegistration.State;
}

export interface State extends fromRoot.State {
  'auth': AuthState;
}

export const reducers = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  registration: fromRegistration.reducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const getAnonymousState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status.anonymous
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);

export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);

export const getChangePasswordLoading = createSelector(
  selectAuthStatusState,
  fromAuth.getPasswordChangeLoading
);

export const getPasswordChangedStatus = createSelector(
  selectAuthStatusState,
  fromAuth.getPasswordChangedStatus
);

export const getPasswordChangedError = createSelector(
  selectAuthStatusState,
  fromAuth.getPasswordChangedError
);

/* Registration */

export const selectRegistrationState = createSelector(
  selectAuthState,
  (state: AuthState) => state.registration
);

export const getRegistrationPending = createSelector(
  selectRegistrationState,
  fromRegistration.getPending
);

export const getRegistrationError = createSelector(
  selectRegistrationState,
  fromRegistration.getError
);

export const getRegistrationSuccess = createSelector(
  selectRegistrationState,
  fromRegistration.getSuccess
);

export const getRegistrationResendActivationEmailPending = createSelector(
  selectRegistrationState,
  fromRegistration.getResendPending
);

export const getRegistrationResendActivationEmailSuccess = createSelector(
  selectRegistrationState,
  fromRegistration.getResendSuccess
);

export const getRegistrationResendActivationEmailError = createSelector(
  selectRegistrationState,
  fromRegistration.getResendError
);

export const getRegistrationEmail = createSelector(
  selectRegistrationState,
  fromRegistration.getRegistrationEmail
);

export const setRegistrationInitialState = createSelector(
  selectRegistrationState,
  fromRegistration.getRegistrationEmail
);
