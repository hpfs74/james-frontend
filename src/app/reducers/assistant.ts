import { createSelector } from 'reselect';
import { ChatMessage } from '../components/knx-chat-stream/chat-message';
import { Profile } from '../models/profile';
import * as assistant from '../actions/assistant';

export interface State {
  messages: Array<ChatMessage>;
}

export const initialState: State = {
  messages: []
};

export function reducer(state = initialState, action: assistant.Actions): State {
  switch (action.type) {

    case assistant.ADD_MESSAGE: {
      return Object.assign({}, state, {
        messages: [ ...state.messages, new ChatMessage(null, action.payload, false) ]
      });
    }

    case assistant.CLEAR_MESSAGES: {
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
