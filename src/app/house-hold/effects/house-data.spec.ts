import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { hot, cold } from 'jasmine-marbles';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import * as fromAuth from '../../auth/reducers';
import * as houseData from '../actions/house-data';

import { HouseDataEffects } from '@app/house-hold/effects/house-data';
import { HouseHoldService } from '@app/house-hold/services/house-hold.service';
import { HouseDataRequest, HouseDataResponse } from '@app/house-hold/models/house-data';
import { ZipOperator } from 'rxjs/operators/zip';

describe('HouseDataEffects', () => {
  let effects: HouseDataEffects;
  let actions: Observable<any>;
  let houseHoldService: any;
  let store: Store<fromAuth.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          'auth': combineReducers(fromAuth.reducers)
        })
      ],
      providers: [
        HouseDataEffects,
        provideMockActions(() => actions),
        {
          provide: HouseHoldService,
          useValue: jasmine.createSpyObj('HouseHoldService', ['getHouseData']),
        }
      ],
    });

    houseHoldService = TestBed.get(HouseHoldService);
    effects = TestBed.get(HouseDataEffects);
  });

  describe('loadHouseDataInfo$', () => {
    it('should return HouseData success action', () => {
      const response = {} as HouseDataResponse;
      const req = {
        Zipcode: '2273DE',
        HouseNumber: 220
      } as HouseDataRequest;
      const action = new houseData.GetInfo(req);
      const completion = new houseData.GetInfoComplete(response);

      actions = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      houseHoldService.getHouseData.and.returnValue(Observable.of(response));
      expect(effects.loadHouseData$).toBeObservable(expected);
    });

    it('should return house data failure action', () => {
      const req = {
        Zipcode: '2273DE',
        HouseNumber: 1
      } as HouseDataRequest;
      const action = new houseData.GetInfo(req);
      const completion = new houseData.GetInfoFailure('Error');

      actions = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      houseHoldService.getHouseData.and.returnValue(Observable.throw('Error'));
      expect(effects.loadHouseData$).toBeObservable(expected);
    });
  });
});
