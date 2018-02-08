import { Profile, ProfileMock } from '@app/profile/models';
import * as profileActions from '@app/profile/actions/profile';
import * as profileReducer from '@app/profile/reducers/profile';

describe('Profile reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = profileReducer.reducer(undefined, action);
      expect(result).toEqual(profileReducer.initialState);
    });
  });

  describe('SAVE_PROFILE_REQUEST', () => {
    it('should set state to loading', () => {
      const saveAction = new profileActions.SaveAction(new ProfileMock());

      const expectedResult = {
        loading: true,
        loaded: false,
        profile: {},
        error: null,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false
      };

      const result = profileReducer.reducer(profileReducer.initialState, saveAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_ADDRESS_REQUEST', () => {
    it('should set state to loading', () => {
      const updateAction = new profileActions.UpdateAddressAction(new ProfileMock());

      const expectedResult = {
        loading: true,
        loaded: false,
        profile: {},
        error: null,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false
      };

      const result = profileReducer.reducer(profileReducer.initialState, updateAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_PROFILE_REQUEST', () => {
    it('should set state to loading', () => {
      const loadAction = new profileActions.SaveAction(new ProfileMock());

      const expectedResult = {
        loading: true,
        loaded: false,
        profile: {},
        error: null,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false
      };

      const result = profileReducer.reducer(profileReducer.initialState, loadAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_PROFILE', () => {
    it('should set state to loading and update profile', () => {
      const updateAction = new profileActions.UpdateAction(new ProfileMock());
      const expectedResult = {
        loading: true,
        loaded: false,
        profile: new ProfileMock(),
        error: null,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false
      };

      const result = profileReducer.reducer(profileReducer.initialState, updateAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_ADDRESS_SUCCESS', () => {
    it('should set state to loading and update profile', () => {
      const saveAction = new profileActions.UpdateAddressSuccessAction(new ProfileMock());

      const expectedResult = {
        loading: false,
        loaded: true,
        profile: new ProfileMock(),
        error: null,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false
      };

      const result = profileReducer.reducer(profileReducer.initialState, saveAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SAVE_PROFILE_SUCCESS', () => {
    it('should set state to loading and update profile', () => {
      const saveAction = new profileActions.SaveSuccessAction(new ProfileMock());

      const expectedResult = {
        loading: false,
        loaded: true,
        profile: new ProfileMock(),
        error: null,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false
      };

      const result = profileReducer.reducer(profileReducer.initialState, saveAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_PROFILE_SUCCESS', () => {
    it('should set state to loading and update profile', () => {
      const saveAction = new profileActions.LoadSuccessAction(new ProfileMock());

      const expectedResult = {
        loading: false,
        loaded: true,
        profile: new ProfileMock(),
        error: null,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false
      };

      const result = profileReducer.reducer(profileReducer.initialState, saveAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('DELETE_PROFILE', () => {
    it('should set state to loading and update profile', () => {
      const deleteAction = new profileActions.DeleteAction();

      const expectedResult = {
        loading: false,
        loaded: false,
        profile: {},
        error: null,
        deleteStatus: false,
        deleteLoading: true,
        deleteLoaded: false
      };

      const result = profileReducer.reducer(profileReducer.initialState, deleteAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('DELETE_FAIL_PROFILE', () => {
    it('should set state to loading and update profile', () => {
      const deleteError = {
        error: 'some error'
      };
      const deleteFailAction = new profileActions.DeleteFailAction(deleteError);
      const expectedResult = {
        loading: false,
        loaded: false,
        profile: {},
        error: deleteError.error,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: true
      };

      const result = profileReducer.reducer(profileReducer.initialState, deleteFailAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('DELETE_SUCCESS_PROFILE', () => {
    it('should set state to loading and update profile', () => {
      const deleteSuccessAction = new profileActions.DeleteSuccessAction(new ProfileMock());

      const expectedResult = {
        loading: false,
        loaded: false,
        profile: {},
        error: null,
        deleteLoading: false,
        deleteLoaded: true,
        deleteStatus: true
      };

      const result = profileReducer.reducer(profileReducer.initialState, deleteSuccessAction);
      expect(result).toEqual(expectedResult);
    });
  });
});
