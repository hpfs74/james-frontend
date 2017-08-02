import { StoreModule, Action } from '@ngrx/store';
import { GoogleAnalytics, PageView } from 'redux-beacon/targets/google-analytics';
import { createMetaReducer } from 'redux-beacon';

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
