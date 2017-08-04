import { createSelector } from '@ngrx/store';
import { ChatMessage } from '../components/knx-chat-stream/chat-message';
import { Profile } from '../models/profile';
import * as AssistantActions from '../actions/assistant';

export type Action = AssistantActions.All;

export interface State {
  messages: Array<ChatMessage>;
}

export const initialState: State = {
  messages: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case AssistantActions.ADD_MESSAGE: {
      return Object.assign({}, state, {
        messages: [ ...state.messages, new ChatMessage(null, action.payload, false) ]
      });
    }

    case AssistantActions.CLEAR_MESSAGES: {
      return Object.assign({}, state, {
        messages: []
      });
    }

    default: {
      return state;
    }
  }
}

export const getMessages = (state: State) => state.messages;
