import { createSelector } from '@ngrx/store';
import * as cloneDeep from 'lodash.clonedeep';

import { AssistantConfig } from '../models/assistant';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { Profile } from '../../profile/models';
import * as AssistantActions from '../actions/assistant';

export type Action = AssistantActions.All;

export interface State {
  config: AssistantConfig;
  messages: Array<ChatMessage>;
}

/* if for any reason state becomes null or undefined the app will break
 * so we set it to initial config data
*/
export const initialState: State = {
  config: new AssistantConfig(),
  messages: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case AssistantActions.ADD_MESSAGE: {
      return Object.assign({}, state, {
        messages: [ ...state.messages, new ChatMessage(null, action.payload.message, action.payload.lookupKey) ]
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
      const sourceCpy = Object.assign({}, state.config);

      return Object.assign({}, state, {
        config: Object.assign({}, cloneDeep(sourceCpy, action.payload))
      });
    }

    default: {
      return state;
    }
  }
}

export const getMessages = (state: State) => state.messages;
export const getConfig = (state: State) => state.config;
