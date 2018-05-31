import * as overlayActions from '../actions/overlay-modal';

export type Action = overlayActions.All;

export interface State {
  openModal: boolean;
  data: string;
}

export const initialState: State = {
  openModal: false,
  data: ''
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case overlayActions.OPEN_MODAL: {
      return Object.assign({}, state, {
        openModal: true,
      });
    }
    case overlayActions.CLOSE_MODAL: {
      return Object.assign({}, state, {
        openModal: false,
        data: ''
      });
    }
    case overlayActions.SET_DATA: {
      return Object.assign({}, state, {
        openModal: false,
        data: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}

export const openModal = (state: State) => state.openModal;
export const data = (state: State) => state.data;
