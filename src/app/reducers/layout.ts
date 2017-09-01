import * as LayoutActions from '../actions/layout';

export type Action = LayoutActions.All;

export interface State {
  leftSideBarOpen: boolean;
  rightSideBarOpen: boolean;
  openModalName: string;
}

const initialState: State = {
  leftSideBarOpen: false,
  rightSideBarOpen: false,
  openModalName: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case LayoutActions.OPEN_LEFT_SIDENAV: {
      return Object.assign({}, state, {
        leftSideBarOpen: true
      });
    }

    case LayoutActions.CLOSE_LEFT_SIDENAV: {
      return Object.assign({}, state, {
        leftSideBarOpen: false
      });
    }

    case LayoutActions.OPEN_RIGHT_SIDENAV: {
      return Object.assign({}, state, {
        rightSideBarOpen: true
      });
    }

    case LayoutActions.CLOSE_RIGHT_SIDENAV: {
      return Object.assign({}, state, {
        rightSideBarOpen: false
      });
    }

    default:
      return state;
  }
}

export const getLeftSidenavState = (state: State) => state.leftSideBarOpen;
export const getRightSidenavState = (state: State) => state.rightSideBarOpen;
