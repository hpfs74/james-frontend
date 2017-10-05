import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from '../../utils/routersnapshot';

import * as fromRoot from '../../reducers';
import * as fromAnalytics from './analytics';
import * as fromAssistant from './assistant';
import * as fromLayout from './layout';

import { environment } from '../../../environments/environment';

export interface CoreState {
  assistant: fromAssistant.State;
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export interface State extends fromRoot.State {
  'core': CoreState;
}

export const reducers = {
  assistant: fromAssistant.reducer,
  layout: fromLayout.reducer,
  router: environment.enableAnalytics ? fromAnalytics.reducer : fromRouter.routerReducer
};


export const selectCoreState = createFeatureSelector<CoreState>('core');

/**
 * Layout Reducers
 */
export const getLayoutState = createSelector(selectCoreState, (state: CoreState) => state.layout);
export const getLeftSidenavState = createSelector(getLayoutState, fromLayout.getLeftSidenavState);
export const getRightSidenavState = createSelector(getLayoutState, fromLayout.getRightSidenavState);
export const getOpenedModalNameState = createSelector(getLayoutState, fromLayout.getOpenedModalName);

/**
 * Chat Assistant Reducers
 */
export const getAsisstantState = createSelector(selectCoreState, (state: CoreState) => state.assistant);
export const getAssistantMessageState = createSelector(getAsisstantState, fromAssistant.getMessages);
export const getAssistantConfig = createSelector(getAsisstantState, fromAssistant.getConfig);

