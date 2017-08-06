import * as AuthUtils from './auth.utils';
import { TokenHelper, tokenNotExpired } from './auth.utils';

describe('Utils: AuthUtils', () => {

  describe('encryptPassword', () => {
    it('should provide an encrypted password', () => {
      const result = AuthUtils.encryptPassword('test123', 'supersecret');

      expect(result).not.toBeNull();
    });

    it('should provide a valid three dot separated token', () => {
      const result = AuthUtils.encryptPassword('test123', 'supersecret');
    });
  });

  describe('TokenHelper', () => {
    const tokenHelper = new TokenHelper();

    it('should get expiration date', () => {

      const token = '{ "expires_in": "1200" }';
      const res = tokenHelper.getTokenExpirationDate(token);
      const exp = new Date(0);
      exp.setUTCSeconds(1200);

      expect(res).not.toBeNull();
      expect(typeof res).toBe('object');
      expect(res.toString()).toBe(exp.toString());
    });

    it('should say that token is expired if no expires_in present', () => {
      const token = '{ }';
      const res = tokenHelper.getTokenExpirationDate(token);
      expect(tokenHelper.isTokenExpired(token)).toBeFalsy();
    });

    it('should say that token is expired when token is expired', () => {
      const token = ' { "expires_in": "1200" }';
      const res = tokenHelper.isTokenExpired(token);

      expect(tokenHelper.isTokenExpired(token)).toBeTruthy();
    });

    it('should say that token is valid when token is not expired', () => {
      const token = ' { "expires_in": "12218018281" }';
      const res = tokenHelper.isTokenExpired(token);

      expect(res).toBeFalsy();
    });
  });

  describe('tokenNotExpired', () => {
    it('should return false if token not exist', () => {
      const res = AuthUtils.tokenNotExpired('not existing token');
      expect(res).toBeFalsy();
    });

    it('should return false if token is expired', () => {
      localStorage.setItem('token', ' { "expires_in": "1200" }');
      const res = AuthUtils.tokenNotExpired('token');
      expect(res).toBeFalsy();
    });

    it('should return true if token is valid', () => {
      localStorage.setItem('token', ' { "expires_in": "12218018281" }');
      const res = AuthUtils.tokenNotExpired('token');
      expect(res).toBeTruthy();
    });
  });
});



