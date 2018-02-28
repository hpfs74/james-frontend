import * as HouseHoldDataActions from '../actions/house-hold-data';
import * as cuid from 'cuid';
import { CalculatedPremium, HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';
import {
  HouseHoldStoredAdviceRequest,
  HouseHoldStoredAdviceResponse
} from '@app/house/models/house-hold-stored-advice';

export type Action = HouseHoldDataActions.All;

export interface State {
  id: string;
  info: HouseHoldPremiumRequest;
  advice: CalculatedPremium;
  store: HouseHoldStoredAdviceRequest;
  storeReference: HouseHoldStoredAdviceResponse;
  storeError: boolean;
  storeErrorMessage: string;
}

export const initialState: State = {
  id: null,
  info: null,
  advice: null,
  store: null,
  storeReference: null,
  storeError: false,
  storeErrorMessage: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case HouseHoldDataActions.STORE_ADVICE: {
      const payload = action.payload;

      return Object.assign({}, state, {
        store: payload
      });
    }

    case HouseHoldDataActions.STORE_ADVICE_COMPLETE: {
      const payload = action.payload;

      return Object.assign({}, state, {
        storeReference: payload,
        storeError: false,
        storeErrorMessage: null
      });
    }

    case HouseHoldDataActions.STORE_ADVICE_FAILURE: {
      const payload = action.payload;

      return Object.assign({}, state, {
        storeReference: null,
        storeError: true,
        storeErrorMessage: payload
      });
    }

    case HouseHoldDataActions.START: {
      return Object.assign({}, state, {id: cuid()});
    }

    case HouseHoldDataActions.GET_INFO: {
      return Object.assign({}, state);
    }

    case HouseHoldDataActions.UPDATE_INFO: {
      return Object.assign({}, state, {
        info: Object.assign({}, state.info, action.payload)
      });
    }

    case HouseHoldDataActions.UPDATE_ADVICE: {

      return Object.assign({}, state, {
        advice: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export const getAdviceId = (state: State) => state.id;
export const getInfo = (state: State) => state.info;
export const getSelectedAdvice = (state: State) => state.advice;
