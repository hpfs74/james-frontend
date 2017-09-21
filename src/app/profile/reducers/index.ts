import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromProfile from './profile';
import * as fromSettings from './settings';

export interface ProfileState {
  profile: fromProfile.State;
  settings: fromSettings.State;
}

export interface State extends fromRoot.State {
  'profile': ProfileState;
}

export const reducers = {
  profile: fromProfile.reducer,
  settings: fromSettings.reducer
};


export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const getProfileState = createSelector(
  selectProfileState,
  (state: ProfileState) => state.profile
);

export const getProfile = createSelector(
  getProfileState,
  fromProfile.getProfile
);

export const getProfileLoading = createSelector(
  getProfileState,
  fromProfile.getLoading
);

export const getProfileLoaded = createSelector(
  getProfileState,
  fromProfile.getLoaded
);


export const getSettingsState = createSelector(
  selectProfileState,
  (state: ProfileState) => state.settings
);

export const getSettings = createSelector(
  getSettingsState,
  fromSettings.getCurrent
);

export const getSettingsLoading = createSelector(
  getSettingsState,
  fromSettings.getLoading
);
