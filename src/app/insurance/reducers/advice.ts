import { createSelector } from '@ngrx/store';
import * as AdviceActions from '../actions/advice';

import { InsuranceAdvice } from '../models/insurance-advice';
import { CarInsurance } from '../../car/models/car-insurance';

export type Action = AdviceActions.All;

// TODO: make more clear what selected Id's are
export interface State {
  selectedId: string | null;
  ids: string[];
  advice: { [id: string]: any };
  selectedInsurance: InsuranceAdvice | CarInsurance;
}

export const initialState: State = {
  selectedId: null,
  ids: [],
  advice: {},
  selectedInsurance: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case AdviceActions.ADD_ADVICE: {
      const advice = action.payload;

      if (state.ids.indexOf(advice.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, advice.id],
        selectedId: advice.id,
        advice: Object.assign({}, state.advice, {
          [advice.id] : action.payload
        })
      });
    }

    case AdviceActions.GET_SUCCESS: {
      let advice = action.payload;

      return Object.assign({}, state, {
        ...state,
        selectedInsurance: advice.advice_item
      });
    }

    case AdviceActions.UPDATE_ADVICE: {
      const advice = action.payload;
      // Do nothing if no advice is selected as active
      if (!state.selectedId || !state.advice) {
        return state;
      }

      return Object.assign({}, state, {
        advice: Object.assign({}, state.advice, {
          [state.selectedId]: Object.assign({}, state.advice[state.selectedId], advice)
        }),
      });
    }

    case AdviceActions.SELECT_ADVICE: {
      return Object.assign({}, state, {
        selectedId: action.payload
      });
    }

    case AdviceActions.REMOVE_ADVICE: {
      const advice = action.payload;

      const updatedIds = state.ids.filter(id => id !== advice.id);

      let copy = Object.assign({}, state.advice);
      delete copy[advice.id];

      return {
        selectedId: state.selectedId === advice.id ? null : state.selectedId,
        ids: updatedIds,
        advice: Object.assign({}, copy),
        selectedInsurance: null
      };
    }

    case AdviceActions.SET_INSURANCE: {
      const insurance = action.payload;

      return Object.assign({}, state, {
        selectedInsurance: insurance
      });
    }

    case AdviceActions.REMOVE_INSURANCE: {
      return Object.assign({}, state, {
        selectedInsurance: null
      });
    }

    case AdviceActions.RESET_ADVICE: {
      return Object.assign({}, state, initialState);
    }

    case AdviceActions.REMOVE_LATEST_INSURANCE_ADVICE_SUCCESS: {
      return Object.assign({}, state, {
        advice: {},
        selectedInsurance: null
      });
    }

    default: {
      return state;
    }
  }
}

export const getAdvice = (state: State) => state.advice;
export const getIds = (state: State) => state.ids;
export const getSelectedId = (state: State) => state.selectedId;
export const getSelected = createSelector(getAdvice, getSelectedId, (advice, selectedId) => {
  return advice[selectedId];
});
export const getSelectedInsurance = (state: State) => state.selectedInsurance;
