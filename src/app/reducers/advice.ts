import { createSelector } from 'reselect';
import * as advice from '../actions/advice';

export interface State {
  ids: string[];
  advice: any[];
}

export const initialState: State = {
  ids: [],
  advice: []
};

export function reducer(state = initialState, action: advice.Actions): State {
  switch (action.type) {
    case advice.ADD_ADVICE: {
      const advice = action.payload;

      if (state.ids.indexOf(advice.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, advice.id ],
        advice: [ ...state.advice, action.payload ]
      });
    }

    case advice.REMOVE_ADVICE: {
      const advice = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== advice.id),
        advice: state.advice.filter(el => el.id !== advice.id)
      });
    }

    default: {
      return state;
    }
  }
}

export const getAdvice = (state: State) => state.advice;
