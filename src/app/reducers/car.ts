import { createSelector } from '@ngrx/store';
import { Car } from '../models/car';
import * as CarActions from '../actions/car';

export type Action = CarActions.All;

export interface State {
  status: string;
  licenses: string[];
  info: Car[];
}

export const initialState: State = {
  status: 'init',
  licenses: [],
  info: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case CarActions.GET_INFO_REQUEST: {
      return Object.assign({}, state, {
        status: 'loading'
      });
    }

    case CarActions.GET_INFO_SUCCESS: {
      const car = action.payload;

      return Object.assign({}, state, {
        status: 'loaded',
        licenses: [ ...state.licenses.filter(license => license !== car.license), car.license ],
        info: [ ...state.info.filter(el => el.license !== car.license), car ]
      });
    }

    case CarActions.GET_INFO_FAIL: {
      return Object.assign({}, state, {
        status: 'error',
        licenses: [],
        info: []
      });
    }

    default: {
      return state;
    }
  }
}

export const getInfo = (state: State) => state.info;
export const getLoading = (state: State) => state.status === 'loading';
export const getLoaded = (state: State) => state.status === 'loaded';
export const getError = (state: State) => state.status === 'error';
export const getCarInfo = license => {
  return createSelector(
    getCarInfo, (list) => list.get(license) || new Map()
  );
};
