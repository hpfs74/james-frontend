import { createSelector } from '@ngrx/store';
import * as AdviceActions from '../actions/advice';

import { InsuranceAdvice } from '../models/insurance-advice';
import { CarInsurance } from '../models/car-insurance';

export type Action = AdviceActions.All;

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

    case AdviceActions.SET_INSURANCE: {
      const insurance = action.payload;

      return Object.assign({}, state, {
        selectedInsurance: Object.assign({}, state.selectedInsurance, insurance)
      });
    }

    case AdviceActions.REMOVE_ADVICE: {
      return Object.assign({}, state, {
        selectedInsurance: null
      });
    }

    case AdviceActions.UPDATE_ADVICE: {
      const advice = action.payload;

      return Object.assign({}, state, {
        advice: Object.assign({}, state.advice, {
          [state.selectedId]: Object.assign({}, state.advice[state.selectedId], advice)
        }),
      });
    }

    case AdviceActions.SELECT_ADVICE: {
      return {
        ids: state.ids,
        advice: state.advice,
        selectedId: action.payload,
        selectedInsurance: state.selectedInsurance
      };
    }

    case AdviceActions.REMOVE_ADVICE: {
      const advice = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== advice.id),
        advice: Object.assign({}, Object.keys(state.advice).filter(id => id !== advice.id))
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
// export const getSelectedInsurance = createSelector(getAdvice, getSelectedId, (advice, selectedId) => {
//   return advice[selectedId] ? advice[selectedId].insurance : null;
// });
export const getSelectedInsurance = (state: State) => state.selectedInsurance;
