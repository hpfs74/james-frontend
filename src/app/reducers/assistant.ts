import { createSelector } from '@ngrx/store';
import { AssistantConfig } from '../models/assistant';
import { ChatMessage } from '../components/knx-chat-stream/chat-message';
import { Profile } from '../models/profile';
import * as AssistantActions from '../actions/assistant';

import * as ObjUtils from '../utils/obj.util';

export type Action = AssistantActions.All;

export interface State {
  config: AssistantConfig;
  messages: Array<ChatMessage>;
}

export const initialState: State = {
  config: null,
  messages: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case AssistantActions.ADD_MESSAGE: {
      return Object.assign({}, state, {
        messages: [ ...state.messages, new ChatMessage(null, action.payload) ]
      });
    }

    case AssistantActions.CLEAR_MESSAGES: {
      return Object.assign({}, state, {
        messages: []
      });
    }

    case AssistantActions.LOAD_CONFIG: {
      return Object.assign({}, state, {
        config: action.payload
      });
    }

    case AssistantActions.UPDATE_CONFIG: {
      return Object.assign({}, state, {
        config: Object.assign({}, ObjUtils.clone(state.config, action.payload))
      });
    }

    default: {
      return state;
    }
  }
}

export const getMessages = (state: State) => state.messages;
export const getConfig = (state: State) => state.config;
