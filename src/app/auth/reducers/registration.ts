import * as registration from '../actions/registration';

export interface State {
  error: string | null;
  loading: boolean;
  registered: boolean;
}

export const initialState: State = {

  error: null,
  loading: false,
  registered: false
};

export function reducer(state = initialState, action: registration.Actions): State {
  switch (action.type) {
    case registration.REGISTER: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case registration.REGISTER_SUCCESS: {
      return {
        ...state,
        registered: true,
        error: null,
        loading: false,
      };
    }

    case registration.REGISTER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.loading;
