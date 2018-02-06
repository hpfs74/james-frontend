import * as HouseHoldDataActions from '../actions/house-hold-data';
import { HouseHoldData } from '@app/house/models/house-hold-data';
import * as cuid from 'cuid';

export type Action = HouseHoldDataActions.All;

export interface State {
  id: string;
  info: HouseHoldData;
}

export const initialState: State = {
  id: null,
  info: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case HouseHoldDataActions.START: {
      return Object.assign({}, state, { id: cuid() });
    }

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

export const getAdviceId = (state: State) => state.id;
export const getInfo = (state: State) => state.info;
