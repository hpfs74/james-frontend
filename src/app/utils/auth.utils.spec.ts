import * as crypto from 'crypto-js';
import * as AuthUtils from './auth.utils';

describe('Utils: Auth', () => {

  var tokenName = 'TEST_TOKEN';
  var token = {
    access_token: '',
    token_type: 'bearer',
    expires_in: 1200,
    refresh_token: ''
  };

  var tokenHelper;

  beforeEach(() => {
    tokenHelper = new AuthUtils.TokenHelper();

    // Mock localStorage
    var store = {};
    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });

  describe('TokenHelper:', () => {
    it('should return the token expiration date', () => {
      let res = tokenHelper.getTokenExpirationDate(JSON.stringify(token));
      let wrongToken = delete token.expires_in;
      let nullRes = tokenHelper.getTokenExpirationDate(JSON.stringify(wrongToken));
      expect(res).toBeDefined;
      expect(wrongToken).toBeNull;
    });

    it('should return if a token is expired', () => {
      expect(token).toBeDefined;

      let res = tokenHelper.isTokenExpired(JSON.stringify(token));
    });
  });

  it('should return if a token is not expired', () => {
    localStorage.setItem(tokenName, JSON.stringify(token));
    expect(AuthUtils.tokenNotExpired(tokenName)).toBeNull;
  });

  xit('should base64 encode data', () => {
    const expected = 'aHR0cHM6Ly93d3cuZ29vZ2xlLm5s';
    let result = AuthUtils.base64url(token);
    expect(result).toEqual(expected);
  });

  it('should encrypt a password', () => {
    const data = 'superAwes0meP4ssword';
    const secret = 'mysecret';

    let result = AuthUtils.encryptPassword(data, secret);

    const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'; //{'alg': 'HS256', 'typ': 'JWT'}
    const expected = header + '.' + 'InN1cGVyQXdlczBtZVA0c3N3b3JkIg' + '.' + 'cTaZ2sYfJi4jFAHKoRphBycyuB1DQA9PIB6qsjHGmoI';

    expect(result).toBeDefined;
    expect(result).toEqual(expected);
  });

});
