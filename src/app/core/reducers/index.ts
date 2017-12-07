import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from '../../utils/routersnapshot';

import * as fromRoot from '../../reducers';
import * as fromAnalytics from './analytics';
import * as fromAssistant from './assistant';
import * as fromLayout from './layout';
import * as fromWizard from './wizard';

import { environment } from '@env/environment';

export interface AppState {
  assistant: fromAssistant.State;
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  wizard: fromWizard.State;
}

export interface State extends fromRoot.State {
  'app': AppState;
}

export const reducers = {
  assistant: fromAssistant.reducer,
  layout: fromLayout.reducer,
  router: environment.enableAnalytics ? fromAnalytics.reducer : fromRouter.routerReducer,
  wizard: fromWizard.reducer
};


export const selectAppState = createFeatureSelector<AppState>('app');

/**
 * Router Reducers
 */
export const getRouterUrl = createSelector(selectAppState, (state: AppState) => state.router.state.url);

/**
 * Layout Reducers
 */
export const getLayoutState = createSelector(selectAppState, (state: AppState) => state.layout);
export const getLeftSidenavState = createSelector(getLayoutState, fromLayout.getLeftSidenavState);
export const getRightSidenavState = createSelector(getLayoutState, fromLayout.getRightSidenavState);
export const getOpenedModalNameState = createSelector(getLayoutState, fromLayout.getOpenedModalName);

/**
 * Chat Assistant Reducers
 */
export const getAsisstantState = createSelector(selectAppState, (state: AppState) => state.assistant);
export const getAssistantMessageState = createSelector(getAsisstantState, fromAssistant.getMessages);
export const getAssistantConfig = createSelector(getAsisstantState, fromAssistant.getConfig);

/**
 * Wizard Reducers
 */
export const getWizardState = createSelector(selectAppState, (state: AppState) => state.wizard);
export const getWizardCurrentStep = createSelector(getWizardState, fromWizard.getWizardCurrentSTep);
export const getWizardError = createSelector(getWizardState, fromWizard.getWizardError);

