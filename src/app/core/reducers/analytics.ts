import { RouterStateSnapshot } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { RouterNavigationAction } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { createMetaReducer } from 'redux-beacon';
import { GoogleAnalytics, PageView, Event, UserTiming, SocialInteraction, Exception } from 'redux-beacon/targets/google-analytics';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';
import { logger } from 'redux-beacon/extensions/logger';

import { environment } from '@env/environment';
import { EventAction } from '@app/core/actions/analytics';
import { AnalyticsEvent } from '@app/core/models/analytics';

export function pageView(action: RouterNavigationAction<RouterStateSnapshot>): AnalyticsEvent {
  // Custom value included in routersnapshot
  const loggedIn = action.payload.event.state['data'].isLoggedIn || false;
  const product_id = action.payload.event.state['data'].product_id || null;
  const product_name = action.payload.event.state['data'].product_name || null;
  const external = action.payload.event.state['data'].external || null;
  const standardValues = {
    event: 'pageview',
    page: action.payload.routerState.url,
    loggedIn_Verzekeren: loggedIn ? 'y' : 'n'
  };
  if (product_id) {
    Object.assign(standardValues, {product_id: product_id});
  }
  if (product_name) {
    Object.assign(standardValues, {product_name: product_name});
  }
  if (external) {
    Object.assign(standardValues, {external: external});
  }
  return standardValues;
}

export function analyticsEvent(action: EventAction): AnalyticsEvent {
  const standardValues = {
    event: 'clickout',
    event_label: action.payload.event_label,
    page: action.payload.page,
    loggedIn_Verzekeren: action.payload.loggedIn_Verzekeren,
    product_id: action.payload.product_id,
    product_name: action.payload.product_name,
  };
  return standardValues;
}

// Map the event to an ngrx/store action
export const eventsMap = {
  'ROUTER_NAVIGATION': pageView,
  '[Analytics] Event': analyticsEvent
};

// Optionally rename the datalayer object
// const options = {
//   dataLayerName: 'exampleName'
// };

// const gaReducer = createMetaReducer(eventsMap, GoogleAnalytics);

// Create Google Tag Manager reducer
// Console log analytics event in development environment
const gtmReducer = createMetaReducer(eventsMap, GoogleTagManager(),
  !environment.production || environment.featureToggles.enableAnalyticsLogging ? { logger } : { logger: null });

const finalReducer = gtmReducer(fromRouter.routerReducer);

export function reducer(state: any, action: any) {
   return finalReducer(state, action);
}
