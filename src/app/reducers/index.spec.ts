import { Action, combineReducers } from '@ngrx/store';

import * as fromRoot from './index';

import * as fromAddress from '../address/reducers';
import * as fromInsurance from '../insurance/reducers';
import * as fromCar from '../car/reducers';

import * as auth from '../auth/actions/auth';

describe('Root reducer', () => {
  interface State {
    myTest: string;
  }

  let testState = {
    myTest: 'test'
  };

  let testReducer = (state = testState, action: Action): State => {
    return testState;
  };

  describe('Logout metareducer', () => {
    it('should reset the state on LOGOUT action', () => {
      const action = new auth.Logout;
      const expected = testReducer({
        ...testState,
        ...fromAddress.reducers,
        ...fromInsurance.reducers,
        ...fromCar.reducers
      }, action);

      const metaReducer = fromRoot.logout(testReducer);
      const result = metaReducer(testState, action);
      expect(result).toEqual(expected);
    });
  });

  describe('Logger metareducer', () => {
    it('should return the reducer without changes', () => {
      const action = new auth.Logout;
      const expected = testReducer({
        ...testState,
        ...fromAddress.reducers,
        ...fromInsurance.reducers,
        ...fromCar.reducers
      }, action);

      const metaReducer = fromRoot.logger(testReducer);
      const result = metaReducer(testState, action);
      expect(result).toEqual(expected);
    });
  });
});
