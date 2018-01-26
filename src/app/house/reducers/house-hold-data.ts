import * as HouseHoldDataActions from '../actions/house-hold-data';
import { HouseHoldData } from '@app/house/models/house-hold-data';

export type Action = HouseHoldDataActions.All;

export interface State {
  info: HouseHoldData;
}

export const initialState: State = {
  info: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case HouseHoldDataActions.GET_INFO: {
      return Object.assign({}, state);
    }

    case HouseHoldDataActions.UPDATE_INFO: {
      return Object.assign({}, state, {
        info: Object.assign( {}, state.info, action.payload )
      });
    }

    default: {
      return state;
    }
  }
}

export const getInfo = (state: State) => state.info;
