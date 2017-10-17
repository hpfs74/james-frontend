import { Register, RegisterSuccess, RegisterFailure, } from '../actions/registration';
import * as fromRegistration from './registration';

describe('Registration reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromRegistration.reducer(undefined, action);
      expect(result).toEqual(fromRegistration.initialState);
    });
  });

  describe('REGISTER_SUCCESS', () => {
    it('should update the registration state', () => {
      const payload = {
        emailAddress: 'testuser@testdomain.com'
      };
      const registerAction = new RegisterSuccess({});

      const result = fromRegistration.reducer(fromRegistration.initialState, registerAction);
      expect(result.registered).toBeTruthy();
    });
  });

  describe('REGISTER_FAILURE', () => {
    it('should update the registration state', () => {
      const payload = {
        emailAddress: 'testuser@testdomain.com'
      };
      const registerAction = new RegisterFailure('user is already registered');

      const result = fromRegistration.reducer(fromRegistration.initialState, registerAction);
      expect(result.registered).toBeFalsy();
      expect(result.error).toBeDefined();
      expect(result.error).toBe('user is already registered');
    });
  });
});
