import * as registration from '../actions/registration';

export interface State {
  error: string | null;
  pending: boolean;
  registered: boolean;
}

export const initialState: State = {

  error: null,
  pending: false,
  registered: false
};

export function reducer(state = initialState, action: registration.Actions): State {
  switch (action.type) {
    case registration.REGISTER: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case registration.REGISTER_SUCCESS: {
      return {
        ...state,
        registered: true,
        error: null,
        pending: false,
      };
    }

    case registration.REGISTER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
