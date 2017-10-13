import * as suggestion from '../actions/suggestion';
import { AddressSuggestion } from '../models';

export type Action = suggestion.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  suggestion: AddressSuggestion;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: false,
  suggestion: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case suggestion.GET_ADDRESS_SUGGESTION_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case suggestion.GET_ADDRESS_SUGGESTION_SUCCESS: {
      return Object.assign({}, state, <State>{
        loaded: true,
        loading: false,
        error: false,
        suggestion: Object.assign({}, state.suggestion, action.payload)
      });
    }

    case suggestion.GET_ADDRESS_SUGGESTION_FAILURE: {
      return Object.assign({}, state, <State>{
        loading: false,
        loaded: false,
        error: true,
        suggestion: null
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getAddressSuggestion = (state: State) => state;
