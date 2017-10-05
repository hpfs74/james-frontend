import { RouterStateSnapshot } from '@angular/router';
import { StoreModule, Action } from '@ngrx/store';
import { RouterNavigationAction } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { createMetaReducer } from 'redux-beacon';
import { GoogleAnalytics, PageView, Event, UserTiming, SocialInteraction, Exception } from 'redux-beacon/targets/google-analytics';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';
import { logger } from 'redux-beacon/extensions/logger';

import { environment } from '../../../environments/environment';
import { AnalyticsAction } from '../actions/analytics';

export function pageView(action: RouterNavigationAction<RouterStateSnapshot>): PageView {
  return {
    hitType: 'pageview',
    page: action.payload.routerState.url
  };
}

// Map the event to an ngrx/store action
export const eventsMap = {
  'ROUTER_NAVIGATION': pageView,
};

// Optionally rename the datalayer object
// const options = {
//   dataLayerName: 'exampleName'
// };

// const gaReducer = createMetaReducer(eventsMap, GoogleAnalytics);

// Create Google Tag Manager reducer
// Console log analytics event in development environment
const gtmReducer = createMetaReducer(eventsMap, GoogleTagManager(), !environment.production ? { logger } : { logger: null });

const finalReducer = gtmReducer(fromRouter.routerReducer);

export function reducer(state: any, action: any) {
   return finalReducer(state, action);
}
