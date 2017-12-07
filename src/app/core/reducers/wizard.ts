

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
        currentStep: action.payload.stepIndex,
        error: null
      });
    }

    case wizardActions.FORWARD: {
      return Object.assign({}, state, {
        currentStep: state.currentStep + 1,
        error: null
      });
    }

    case wizardActions.BACK: {
      return Object.assign({}, state, {
        currentStep: state.currentStep - 1,
        error: null
      });

    }

    case wizardActions.ERROR: {
      return Object.assign({}, state, {
        ...state,
        error: action.payload.message
      });
    }

    default: {
      return state;
    }
  }
}

export const getWizardCurrentSTep = (state: State) => state.currentStep;
export const getWizardError = (state: State) => state.error;
