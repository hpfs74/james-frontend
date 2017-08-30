import { Login, LoginSuccess, LoginFailure, LoginRedirect, Logout, RequestCredentials } from '../actions/auth';
import * as fromAuth from './auth';

describe('Auth reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromAuth.reducer(undefined, action);
      expect(result).toEqual(fromAuth.initialState);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should update the login state', () => {
      const token = {
        access_token: 'kCJl5Wnz4q|UPpY?DV3sv:v,$Na7/iC@ajAZW=$yOEaMv*/wi&3Dg^us[Xbh5Dvg',
        token_type: 'bearer',
        expires_in: 1200,
        refresh_token: 'kCJl5Wnz4q|UPpY?DV3sv:v,$Na7/iC@ajAZW=$yOEaMv*/wi&3Dg^us[Xbh5Dvg',
      };
      const loginAction = new LoginSuccess({ token: token });

      const expectedResult = {
        loggedIn: true,
        token: token
      };

      const result = fromAuth.reducer(fromAuth.initialState, loginAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGOUT', () => {
    it('should reset the state', () => {
      const logoutAction = new Logout();

      const expectedResult = {
        loggedIn: false,
        token: null,
      };

      const result = fromAuth.reducer(fromAuth.initialState, logoutAction);
      expect(result).toEqual(expectedResult);
    });
  });

});
