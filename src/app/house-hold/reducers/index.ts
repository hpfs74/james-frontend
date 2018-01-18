import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromHouseData from './house-data';

export interface HouseHoldState {
  houseData: fromHouseData.State;
}

export interface State extends fromRoot.State {
  'household': HouseHoldState;
}

export const reducers = {
  houseData: fromHouseData.reducer
};
