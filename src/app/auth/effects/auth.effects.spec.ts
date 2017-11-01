import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { AuthEffects } from './auth.effects';
import { AuthToken } from './../models/auth';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../../core/services/localstorage.service';
import { UserDialogService } from '../../components/knx-modal/user-dialog.service';

import * as fromRoot from '../reducers';
import * as auth from '../actions/auth';
import * as profile from '../../profile/actions/profile';
import * as insurance from '../../insurance/actions/insurance';
import { Authenticate } from '../models/auth';

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
      ],
      providers: [
        AuthEffects,
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

    effects = TestBed.get(AuthEffects);
  });

  describe('login$', () => {
    it('should call authService with the payload', () => {
      const action = new auth.Login(authPayload);
      const completion = [
        new auth.LoginSuccess({ token: tokenResponse }),
        new auth.ScheduleTokenRefresh(tokenResponse),
        new profile.LoadAction(),
        new insurance.GetPurchasedCarInsurances()
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
      const action = new auth.Login(authPayload);
      const completion = new auth.LoginFailure(error);

      actions = hot('--a-', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });

      authService.login.and.returnValue(response);

      expect(effects.login$).toBeObservable(expected);
    });
  });


  describe('loginAnonymous$', () => {
    it('should login anonymous user', () => {
      const action = new auth.LoginAnonymous(authPayload);
      const completion = [
        new auth.ScheduleTokenRefresh(tokenResponse)
      ];
      authService.loginAnonymous.and.returnValue(Observable.of(tokenResponse));

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      let performedActions = [];
      effects.loginAnonymous$.take(3).subscribe(
        result => performedActions.push(result),
        error => fail(error),
        () => {
          expect(performedActions.length).toBe(3);
          expect(performedActions).toEqual(completion);
          expect(authService.login).toHaveBeenCalledWith(authPayload);
        }
      );
    });
  });

  describe('loginSuccess$', () => {
    it('should redirect to / route', () => {
      const action = new auth.LoginSuccess({ token: tokenResponse });
      actions = hot('--a-', { a: action });
      effects.loginSuccess$.subscribe(() => expect(routerStub.navigate).toHaveBeenCalledWith(['/']));
    });
  });

  describe('loginRedirect$', () => {
    xit('should redirect to /login route', () => {
      const action = new auth.LoginRedirect();
      actions = hot('--a-', { a: action });
      effects.loginRedirect$.subscribe(() => expect(routerStub.navigate).toHaveBeenCalledWith(['/login']));
    });
  });

  describe('logout$', () => {
    it('should call logout on the authService', () => {
      const action = new auth.Logout();
      actions = hot('--a-', { a: action });
      effects.logout$.subscribe(() => expect(authService.logout).toHaveBeenCalled());
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
