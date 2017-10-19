import * as AuthUtils from './auth.utils';
import { TokenHelper, tokenNotExpired } from './auth.utils';

describe('Utils: AuthUtils', () => {

  describe('TokenHelper', () => {
    const tokenHelper = new TokenHelper();

    xit('should get expiration date', () => {
      const token = '{ "expires_in": "1200" }';
      let resToken = AuthUtils.setTokenExpirationDate(token);
      let res = tokenHelper.getTokenExpirationDate(resToken);
      const exp = new Date().setUTCSeconds(1200);

      expect(res).not.toBeNull();
      expect(res.toString()).toBe(exp.toString());
    });

    it('should say that token is expired if no expires_in present', () => {
      const token = '{ }';
      const res = tokenHelper.getTokenExpirationDate(token);
      expect(tokenHelper.isTokenExpired(token)).toBeFalsy();
    });

    it('should say that token is expired when token is expired', () => {
      const token = ' { "expires_in": "0" }';
      const resToken = AuthUtils.setTokenExpirationDate(token);

      expect(tokenHelper.isTokenExpired(resToken)).toBeTruthy();
    });

    it('should return false on empty token', () => {
      expect(tokenHelper.isTokenExpired('')).toBeFalsy();
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
      const token = '{ "expires_in": "0" }';
      const resToken = AuthUtils.setTokenExpirationDate(token);
      localStorage.setItem('token', resToken);
      const res = AuthUtils.tokenNotExpired('token');
      expect(res).toBeFalsy();
    });

    it('should return true if token is valid', () => {
      localStorage.setItem('token', ' { "expires_in": "12218018281" }');
      const res = AuthUtils.tokenNotExpired('token');
      expect(res).toBeTruthy();
    });
  });

  describe('tokenExists', () => {
    it('should return false if token not exist', () => {
      const res = AuthUtils.isTokenExists('not existing token');
      expect(res).toBeFalsy();
    });

    it('should return false if token exist', () => {
      localStorage.setItem('token', ' { "expires_in": "12218018281" }');
      const res = AuthUtils.isTokenExists('token');
      expect(res).toBeTruthy();
    });
  });
});



