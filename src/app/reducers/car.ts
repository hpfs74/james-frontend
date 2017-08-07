import { createSelector } from '@ngrx/store';
import { Car } from '../models/car';
import * as CarActions from '../actions/car';

export type Action = CarActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  licenses: string[];
  info: Car[];
}

export const initialState: State = {
  loading: false,
  loaded: false,
  licenses: [],
  info: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case CarActions.GET_INFO_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CarActions.GET_INFO_SUCCESS: {
      const car = action.payload;

      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        licenses: [ ...state.licenses.filter(license => license !== car.license), car.license ],
        info: [ ...state.info.filter(el => el.license !== car.license), car ]
      });
    }

    default: {
      return state;
    }
  }
}

export const getInfo = (state: State) => state.info;
export const getLoaded = (state: State) => state.loaded;
export const getCarInfo = license => {
  return createSelector(
    getCarInfo, (list) => list.get(license) || new Map()
  );
};
