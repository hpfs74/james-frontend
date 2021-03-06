

import * as wizardActions from '../actions/wizard';
import { KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

export type Action = wizardActions.All;

export interface State {
  currentStep: number;
  error: KNXStepError;
}

export const initialState: State = {
  currentStep: 0,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case wizardActions.GO: {
      return Object.assign({}, state, {
        error: null
      });
    }

    case wizardActions.FORWARD: {
      return Object.assign({}, state, {
        error: null
      });
    }

    case wizardActions.BACK: {
      return Object.assign({}, state, {
        error: null
      });
    }

    case wizardActions.ERROR: {
      return Object.assign({}, state, {
        ...state,
        error: action.payload.message
      });
    }

    case wizardActions.RESET_ERROR: {
      return Object.assign({}, state, {
        error: null
      });
    }

    default: {
      return state;
    }
  }
}

export const getWizardError = (state: State) => state.error;
