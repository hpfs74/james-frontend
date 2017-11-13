
import { LocalStorageService, TOKEN_NAME, TOKEN_OBJECT_NAME, NICCI_KEY, NICCI_ID } from './localstorage.service';
import { AuthKey, AuthToken } from '../../auth/models/auth';

describe('Service: LocalStorageService', function () {
  let service: LocalStorageService;
  let testToken: AuthToken = {
    access_token: 'abCDE',
    token_type: 'bearer',
    expires_in: 1200,
    refresh_token: 'zzAABB',
    expiration_time: 1503914460734
  };

  beforeAll(() => {
    service = new LocalStorageService();
  });

  beforeEach( () => {
    localStorage.clear();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('should set a token', () => {
    service.setToken(testToken);
    expect(localStorage.getItem(TOKEN_NAME)).toEqual(testToken.access_token);
  });

  it('should return a stored token', () => {
    service.setToken(testToken);
    expect(service.getToken()).toBeDefined();
  });


  it('should return the refresh token', () => {
    service.setToken(testToken);
    expect(service.getRefreshToken()).toEqual(testToken.refresh_token);
  });

  it('should return the access token', () => {
    service.setToken(testToken);
    expect(service.getAccessToken()).toEqual(testToken.access_token);
  });

  it('should clear stored tokens and keys', () => {
    service.setToken(testToken);
    expect(service.getToken()).toBeDefined();
    service.clearToken();
    expect(localStorage.getItem(TOKEN_NAME)).toBeNull();
    expect(localStorage.getItem(TOKEN_OBJECT_NAME)).toBeNull();
    expect(localStorage.getItem(NICCI_KEY)).toBeNull();
    expect(localStorage.getItem(NICCI_ID)).toBeNull();
  });
});
