import * as layout from '../actions/layout';

export type Action = layout.All;

export interface State {
  leftSideBarOpen: boolean;
  rightSideBarOpen: boolean;
  openedModalName: string;
}

const initialState: State = {
  leftSideBarOpen: false,
  rightSideBarOpen: false,
  openedModalName: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case layout.OPEN_LEFT_SIDENAV: {
      return Object.assign({}, state, {
        leftSideBarOpen: true
      });
    }

    case layout.CLOSE_LEFT_SIDENAV: {
      return Object.assign({}, state, {
        leftSideBarOpen: false
      });
    }

    case layout.OPEN_RIGHT_SIDENAV: {
      return Object.assign({}, state, {
        rightSideBarOpen: true
      });
    }

    case layout.CLOSE_RIGHT_SIDENAV: {
      return Object.assign({}, state, {
        rightSideBarOpen: false
      });
    }

    case layout.OPEN_MODAL: {
      const name = action.payload;
      return Object.assign({}, state, {
        openedModalName: name
      });
    }

    case layout.CLOSE_MODAL: {
      return Object.assign({}, state, {
        openedModalName: null
      });
    }

    default:
      return state;
  }
}

export const getLeftSidenavState = (state: State) => state.leftSideBarOpen;
export const getRightSidenavState = (state: State) => state.rightSideBarOpen;
export const getOpenedModalName = (state: State) => state.openedModalName;
