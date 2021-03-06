import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { ProfileEffects } from './profile';
import { ProfileService } from '../services/profile.service';

import * as profile from '../actions/profile';
import * as profileReducer from '../reducers/profile';
import { AuthService } from '../../auth/services/auth.service';
import { LocalStorageService } from '../../core/services/localstorage.service';

describe('ProfileEffects', () => {
  let effects: ProfileEffects;
  let actions: Observable<any>;
  let addressService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login', 'loginAnonymous', 'logout', 'refreshToken', 'isLoggedIn']),
        },
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj('LocalStorageService', ['setToken', 'getToken']),
        },
        ProfileEffects,
        provideMockActions(() => actions),
        {
          provide: ProfileService,
          useValue: jasmine.createSpyObj('ProfileService', ['lookupAddress']),
        },
      ],
    });

    this.profileExample = {
      firstname: 'test',
      infix: 'test',
      lastname: 'test',
      name: 'test',
      gender: 'test',
      anonymous: true,
      id: 100,
      emailaddress: 'test',
      birthday: 'test',
      nickname: 'test',
      profile_image: 'test',
      needs: 'test',
      household: 'test',
      active: true,
      enabled: true,
      phone: 'test',
      age: 100,
      bsn: 'test',
      initials: 'test',
      birthplace: 'test',
      maritalstatus: 'test',
      maritaldistribution: 'test',
      education: 'test',
      smoking: true,
      testament: 'test',
      yearsabroad: 100,
      postcode: 'test',
      number: 'test',
      number_extended: {
        number_only: 100,
        number_letter: 'A',
        number_addition: 'A',
        number_extension: 'A',
      },
      street: 'test',
      city: 'test',
      county: 'test',
      province: 'test',
      fullname: 'test',
      location: {
        lat: 100,
        lng: 100,
      },
      built: 100,
      size: 100,
      house_size: 100,
      house_value: 100,
      house_info_roof_condition_text: 'test',
      house_info_house_type_text: 'test',
      house_info_house_use_text: 'test',
      rooms: 100,
      build_type: 'test',
      isolation_glass: true,
      house_type: 'test',
      house_subtype: 'test',
      _id: 'test',
      _deleted: true,
      _embedded: 'test',
      filled_data_percentage: 100,
      outdated_data_percentage: 100
    };

    addressService = TestBed.get(ProfileService);
    effects = TestBed.get(ProfileEffects);
  });


  describe('LOAD_PROFILE_REQUEST', () => {
    it('should return profile status', () => {
      const expectedResult = {
        loading: true,
        loaded: false,
        profile: {},
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const loadAction = new profile.LoadAction();

      const result = profileReducer.reducer(profileReducer.initialState, loadAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_PROFILE_SUCCESS', () => {
    it('should return loaded profile', () => {
      const expectedResult = {
        loading: false,
        loaded: true,
        profile: this.profileExample,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const loadSuccessAction = new profile.LoadSuccessAction(this.profileExample);

      const result = profileReducer.reducer(profileReducer.initialState, loadSuccessAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_PROFILE_FAILURE', () => {
    it('should fail the request', () => {
      const expectedResult = {
        loading: false,
        loaded: false,
        profile: {},
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const loadFailAction = new profile.LoadFailAction(this.profileExample);

      const result = profileReducer.reducer(profileReducer.initialState, loadFailAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_PROFILE', () => {
    it('should update the profile', () => {
      const expectedResult = {
        loading: true,
        loaded: false,
        profile: this.profileExample,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const updateAction = new profile.UpdateAction(this.profileExample);

      const result = profileReducer.reducer(profileReducer.initialState, updateAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SAVE_PROFILE_REQUEST', () => {
    it('should save profile', () => {
      const expectedResult = {
        loading: true,
        loaded: false,
        profile: {},
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const saveAction = new profile.SaveAction(this.profileExample);

      const result = profileReducer.reducer(profileReducer.initialState, saveAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SAVE_PROFILE_SUCCESS', () => {
    it('should return saved profile', () => {
      const expectedResult = {
        loading: false,
        loaded: true,
        profile: this.profileExample,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const saveSuccessAction = new profile.SaveSuccessAction(this.profileExample);

      const result = profileReducer.reducer(profileReducer.initialState, saveSuccessAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SAVE_PROFILE_FAILURE', () => {
    it('should ', () => {
      const expectedResult = {
        loading: false,
        loaded: false,
        profile: {},
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const saveFailAction = new profile.SaveFailAction(this.profileExample);

      const result = profileReducer.reducer(profileReducer.initialState, saveFailAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_ADDRESS_REQUEST', () => {
    it('should ', () => {
      const expectedResult = {
        loading: true,
        loaded: false,
        profile: {},
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const updateAddressAction = new profile.UpdateAddressAction(this.profileExample);

      const result = profileReducer.reducer(profileReducer.initialState, updateAddressAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_ADDRESS_SUCCESS', () => {
    it('should ', () => {
      const expectedResult = {
        loading: false,
        loaded: true,
        profile: this.profileExample,
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const updateAddressSuccessAction = new profile.UpdateAddressSuccessAction(this.profileExample);

      const result = profileReducer.reducer(profileReducer.initialState, updateAddressSuccessAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_ADDRESS_FAILURE', () => {
    it('should ', () => {
      const expectedResult = {
        loading: false,
        loaded: false,
        profile: {},
        deleteStatus: false,
        deleteLoading: false,
        deleteLoaded: false,
        error: null
      };

      const updateAddressFailAction = new profile.UpdateAddressFailAction(this.profileExample);

      const result = profileReducer.reducer(profileReducer.initialState, updateAddressFailAction);
      expect(result).toEqual(expectedResult);
    });
  });
});
