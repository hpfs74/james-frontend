import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';

import { AuthEffects } from './auth.effects';
import { AuthToken } from './../models/auth';
import { AuthService } from '@app/auth/services/auth.service';
import { LocalStorageService } from '@app/core/services/localstorage.service';
import { UserDialogService } from '@app/components/knx-modal/user-dialog.service';

import * as fromRoot from '@app/auth/reducers';
import * as authActions from '@app/auth/actions/auth';
import * as assistantActions from '@app/core/actions/assistant';
import * as profile from '@app/profile/actions/profile';
import * as insurance from '@app/insurance/actions/insurance';
import { Authenticate } from '@app/auth/models/auth';
import { AssistantConfig } from '@app/core/models';
import { AssistantService } from '@app/core/services';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderMock } from 'test.common.spec';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;
  let store: Store<fromRoot.State>;

  let authService: any;
  let localStorageService: any;
  let userDialogService: any;
  let routerStub: any;
  let router: any;

  const authPayload = {
    username: 'user@test.com',
    password: 'supers3cret@'
  } as Authenticate;

  const tokenResponse = {
    access_token: 'aaaaa',
    token_type: 'bearer',
    expires_in: 1200,
    refresh_token: 'x1'
  } as AuthToken;

  const refreshTokenResponse = {
    access_token: 'bbbbb',
    token_type: 'bearer',
    expires_in: 1200,
    refresh_token: 'x2'
  } as AuthToken;

  beforeEach(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate'),
      routerState: {}
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        })
      ],
      providers: [
        AuthEffects,
        AssistantService,
        provideMockActions(() => actions),
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login', 'loginAnonymous', 'logout', 'refreshToken', 'isLoggedIn']),
        },
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj('LocalStorageService', ['setToken', 'getToken']),
        },
        {
          provide: UserDialogService,
          useValue: jasmine.createSpyObj('UserDialogService', ['openDialog']),
        },
        {
          provide: Router,
          useValue: routerStub
        }
      ],
    });

    authService = TestBed.get(AuthService);
    localStorageService = TestBed.get(LocalStorageService);
    userDialogService = TestBed.get(UserDialogService);
    store = TestBed.get(Store);
    effects = TestBed.get(AuthEffects);
  });

  describe('login$', () => {
    it('should call authService with the payload', () => {
      const action = new authActions.Login(authPayload);
      const completion = [
        new authActions.LoginSuccess({ token: tokenResponse }),
        new authActions.ScheduleTokenRefresh(tokenResponse),
        new profile.LoadAction(),
        new insurance.GetInsurances()
      ];
      authService.login.and.returnValue(Observable.of(tokenResponse));

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      let performedActions = [];
      effects.login$.take(4).subscribe(
        result => performedActions.push(result),
        error => fail(error),
        () => {
          expect(performedActions.length).toBe(4);
          expect(performedActions).toEqual(completion);
          expect(authService.login).toHaveBeenCalledWith(authPayload);
        }
      );
    });

    xit('should fail on a service error', () => {
      const error = 'Error!';
      const action = new authActions.Login(authPayload);
      const completion = new authActions.LoginFailure(error);

      actions = hot('--a-', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });

      authService.login.and.returnValue(response);

      expect(effects.login$).toBeObservable(expected);
    });
  });


  describe('loginAnonymous$', () => {
    it('should login anonymous user', () => {
      const action = new authActions.LoginAnonymous();
      const completion = new authActions.ScheduleTokenRefresh(tokenResponse);

      authService.loginAnonymous.and.returnValue(Observable.of(tokenResponse));

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });
      expect(effects.loginAnonymous$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should redirect to / route', () => {
      const action = new authActions.LoginSuccess({ token: tokenResponse });
      actions = hot('--a-', { a: action });
      effects.loginSuccess$.subscribe(() => expect(routerStub.navigate).toHaveBeenCalledWith(['/']));
    });
  });

  describe('loginRedirect$', () => {
    xit('should redirect to /login route', () => {
      const action = new authActions.LoginRedirect();
      actions = hot('--a-', { a: action });
      effects.loginRedirect$.subscribe(() => expect(routerStub.navigate).toHaveBeenCalledWith(['/login']));
    });
  });

  describe('logout$', () => {
    it('should call logout on the authService', () => {
      spyOn(store, 'dispatch');
      const assistantConfig = new AssistantConfig();
      const action = new authActions.Logout();
      const resetAction = new authActions.ResetStates();
      const startAnonymousAction = new authActions.StartAnonymous();
      const loginAnonymousAction = new authActions.LoginAnonymous();
      const loadConfigAction = new assistantActions.LoadConfigAction(assistantConfig);
      store.dispatch(action);
      effects.logout$.subscribe(() => {
        expect(authService.logout).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(resetAction);
        expect(store.dispatch).toHaveBeenCalledWith(startAnonymousAction);
        expect(store.dispatch).toHaveBeenCalledWith(loginAnonymousAction);
        expect(store.dispatch).toHaveBeenCalledWith(loadConfigAction);
      });
    });
  });

  describe('scheduleRefresh$', () => {

  });

  describe('requestCredentials$', () => {

  });

  // describe('refreshToken$', () => {
  //   it('should get a refresh token', () => {
  //     const action = new auth.RefreshToken(tokenResponse.access_token);
  //     const completion = new auth.RefreshTokenSuccess(refreshTokenResponse);

  //     authService.login.and.returnValue(Observable.of(refreshTokenResponse));
  //   });
  // });

  describe('init$', () => {
    // expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
