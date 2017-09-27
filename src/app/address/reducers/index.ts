import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAddress from './address';
import { Address } from '../models';

export interface AddressState {
  address: fromAddress.State;
}

export interface State extends fromRoot.State {
  'address': AddressState;
}

export const reducers = {
  address: fromAddress.reducer
};

export const selectAddressState = createFeatureSelector<AddressState>('address');

export const getAddressState = createSelector(selectAddressState, (state: AddressState) => state.address);
export const getAddressLoading = createSelector(getAddressState, fromAddress.getLoading);
export const getAddressLoaded = createSelector(getAddressState, fromAddress.getLoaded);
export const getAddressError = createSelector(getAddressState, fromAddress.getError);
export const getAddress = createSelector(getAddressState, fromAddress.getAddress);
export const getAddressFullname = createSelector(getAddressState, fromAddress.getAddressFullname);
