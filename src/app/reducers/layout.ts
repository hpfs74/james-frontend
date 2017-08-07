import * as LayoutActions from '../actions/layout';

export type Action = LayoutActions.All;

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case LayoutActions.CLOSE_SIDENAV:
      return {
        showSidenav: false
      };

    case LayoutActions.OPEN_SIDENAV:
      return {
        showSidenav: true
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
