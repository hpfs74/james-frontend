import {
  CarCoverageAction,
  CarCoverageCompleteAction,
  CarCoverageFailureAction,
  CarCoverageSetActiveLoan
} from '../actions/coverage';
import * as fromCoverage from './coverage';

describe('Car coverage reducer', () => {
  describe('undefined action', () => {
    it('should return the initial state on unknown action', () => {
      const action = {} as any;
      const result = fromCoverage.reducer(fromCoverage.initialState, action);
      expect(result).toEqual(fromCoverage.initialState);
    });
  });

  describe('CAR_COVERAGE_REQUEST', () => {
    it('should set loading to true', () => {
      const action = new CarCoverageAction({
        license: 'ZZTT00',
        activeLoan: true
      });
      const expectedResult = {
        loading: true,
        loaded: false,
        activeLoan: null,
        error: false,
        coverage: null
      };
      const result = fromCoverage.reducer(fromCoverage.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('CAR_COVERAGE_SUCCESS', () => {
    it('should set the coverage', () => {
      const action = new CarCoverageCompleteAction({
        recommended_value: 'CL',
        slug: []
      });
      const expectedResult = {
        loading: false,
        loaded: true,
        activeLoan: null,
        error: false,
        coverage: {
          recommended_value: 'CL',
          slug: []
        }
      };
      const result = fromCoverage.reducer(fromCoverage.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('CAR_COVERAGE_SET_ACTIVE_LOAN', () => {
    it('should set the active loan', () => {
      const action = new CarCoverageSetActiveLoan(true);
      const expectedResult = {
        loading: false,
        loaded: false,
        activeLoan: true,
        error: false,
        coverage: null
      };
      const result = fromCoverage.reducer(fromCoverage.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });
});
