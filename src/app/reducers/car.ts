import { createSelector } from 'reselect';
import { Car } from '../models/car';
import * as car from '../actions/car';

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

export function reducer(state = initialState, action: car.Actions): State {
  switch (action.type) {
    case car.GET_INFO_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case car.GET_INFO_SUCCESS: {
      let car = action.payload;

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
