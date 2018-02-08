import * as AuthUtils from './auth.utils';
import { TokenHelper, tokenIsValid } from './auth.utils';
import { AuthToken } from '@app/auth/models/auth';

describe('Utils: AuthUtils', () => {

  describe('TokenHelper', () => {
    const tokenHelper = new TokenHelper();

    it('should get expiration date', () => {
      const token: AuthToken = {
        expires_in: 1200,
        access_token: '',
        anonymous: false,
        expiration_time: 1,
        iat: 3,
        refresh_token: '',
        token_type: ''
      };
      let resToken = AuthUtils.setTokenExpirationDate(token);
      let result = tokenHelper.getTokenExpirationDate(resToken);

      expect(result).toBe(resToken.expiration_time);
    });

    it('should say that token is expired if no expires_in present', () => {
      const token: AuthToken = {
        expires_in: null,
        access_token: '',
        anonymous: false,
        expiration_time: null,
        iat: 3,
        refresh_token: '',
        token_type: ''
      };
      const res = tokenHelper.getTokenExpirationDate(token);
      expect(tokenHelper.tokenIsExpired(token)).toBeFalsy();
    });

    it('should say that token is expired when token is expired', () => {
      const token: AuthToken = {
        expires_in: 0,
        access_token: '',
        anonymous: false,
        expiration_time: 1,
        iat: 3,
        refresh_token: '',
        token_type: ''
      };
      const resToken = AuthUtils.setTokenExpirationDate(token);

      expect(tokenHelper.tokenIsExpired(resToken)).toBeTruthy();
    });

    it('should say that token is valid when token is not expired', () => {
      const token: AuthToken = {
        expires_in: 12218018281,
        access_token: null,
        anonymous: false,
        expiration_time: null,
        iat: null,
        refresh_token: null,
        token_type: null
      };
      const res = tokenHelper.tokenIsExpired(token);

      expect(res).toBeFalsy();
    });
  });

  describe('tokenNotExpired', () => {
    it('should return false if token not exist', () => {
      const res = AuthUtils.tokenIsValid();
      expect(res).toBeFalsy();
    });

    it('should return false if token is expired', () => {
      const token: AuthToken = {
        expires_in: 0,
        access_token: '',
        anonymous: false,
        expiration_time: 1,
        iat: 3,
        refresh_token: '',
        token_type: ''
      };
      const resToken = AuthUtils.setTokenExpirationDate(token);
      localStorage.setItem('token', JSON.stringify(resToken));
      const res = AuthUtils.tokenIsValid();
      expect(res).toBeFalsy();
    });

    it('should return true if token is valid', () => {
      localStorage.setItem('token', ' { "expires_in": "12218018281" }');
      const res = AuthUtils.tokenIsValid();
      expect(res).toBeTruthy();
    });
  });

});



