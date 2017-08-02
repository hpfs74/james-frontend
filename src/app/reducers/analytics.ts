import { StoreModule, Action } from '@ngrx/store';
import { createMetaReducer } from 'redux-beacon';
import {
  GoogleAnalytics,
  PageView,
  Event,
  UserTiming,
  SocialInteraction,
  Exception
} from 'redux-beacon/targets/google-analytics';

// Define an analytics event
const pageView = (action: Action): PageView => ({
  hitType: 'pageview',
  page: action.payload.path,
});

// Map the analytics event to an ngrx/store action
const eventsMap = {
  '[Router] Update Location': pageView,
};

// Create the meta Reducer
export const analyticsMetaReducer = createMetaReducer(eventsMap, GoogleAnalytics);
