import {
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAddress from './address';
import * as fromSuggestion from './suggestion';
import { Address } from '../models';

export interface AddressState {
  address: fromAddress.State;
  suggestions: fromSuggestion.State;
}

export interface State extends fromRoot.State {
  'address': AddressState;
}

export const reducers = {
  address: fromAddress.reducer,
  suggestions: fromSuggestion.reducer
};

/**
 * address reducers
 */
export const selectAddressState = createFeatureSelector<AddressState>('address');

export const getAddressState = createSelector(selectAddressState, (state: AddressState) => state.address);
export const getAddressLoading = createSelector(getAddressState, fromAddress.getLoading);
export const getAddressLoaded = createSelector(getAddressState, fromAddress.getLoaded);
export const getAddressError = createSelector(getAddressState, fromAddress.getError);
export const getAddress = createSelector(getAddressState, fromAddress.getAddress);
export const getAddressFullname = createSelector(getAddressState, fromAddress.getAddressFullname);

/**
 * suggestion reducers
 */

export const getSuggestionState = createSelector(selectAddressState, (state: AddressState) => state.suggestions);
export const getSuggestionLoading = createSelector(getSuggestionState, fromSuggestion.getLoading);
export const getSuggestionLoaded = createSelector(getSuggestionState, fromSuggestion.getLoaded);
export const getSuggestionError = createSelector(getSuggestionState, fromSuggestion.getError);
export const getSuggestion = createSelector(getSuggestionState, fromSuggestion.getAddressSuggestion);
