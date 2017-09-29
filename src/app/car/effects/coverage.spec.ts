import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { hot, cold } from 'jasmine-marbles';

import { CoverageEffects } from './coverage';
import { CarService } from '../services/car.service';
import { CarCoverageRecommendation, CarCoverageDetails } from '../models/coverage';

import * as fromCar from '../reducers';
import * as coverage from '../actions/coverage';
import * as car from '../actions/car';

describe('CarEffects', () => {
  let effects: CoverageEffects;
  let actions: Observable<any>;
  let carService: any;
  let store: Store<fromCar.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          'car': combineReducers(fromCar.reducers)
        })
      ],
      providers: [
        CoverageEffects,
        provideMockActions(() => actions),
        {
          provide: CarService,
          useValue: jasmine.createSpyObj('CarService', ['getCoverageRecommendation']),
        },
      ],
    });

    carService = TestBed.get(CarService);
    effects = TestBed.get(CoverageEffects);
    store = TestBed.get(Store);
  });

  describe('carCoverage$', () => {
    it('should return coverage success action', () => {
      const action = new coverage.CarCoverageAction({ license: 'myValue', activeLoan: false });
      const completion = new coverage.CarCoverageCompleteAction({ recommended_value: 'CL', slug: []});

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      carService.getCoverageRecommendation.and.returnValue(Observable.of({ recommended_value: 'CL', slug: []}));
      expect(effects.carCoverage$).toBeObservable(expected);
    });

    it('should return coverage failure action', () => {
      const action = new coverage.CarCoverageAction({ license: 'myValue', activeLoan: false });
      const completion = new coverage.CarCoverageFailureAction({ b: 'error' });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      carService.getCoverageRecommendation.and.returnValue(Observable.throw({ b: 'error' }));
      expect(effects.carCoverage$).toBeObservable(expected);
    });
  });

  // describe('carCoverageFromInfo$', () => {
  //   it('should return a coverage action from car info success', () => {
  //     const action = new car.GetInfoCompleteAction({
  //       '_id': 'GK906T',
  //       'license': 'GK906T',
  //       'vin': null,
  //       'reporting_code': null,
  //       'year': '2012',
  //       'fuel': 'Benzine',
  //       'fuel_code': 'B',
  //       'secondary_fuel': null,
  //       'color': 'zwart',
  //       'color_code': null,
  //       'secondary_color': null,
  //       'secondary_color_code': null,
  //       'weight_empty_vehicle': 1125,
  //       'price_consumer_excl_vat': 29136,
  //       'price_consumer_incl_vat': 34003,
  //       'make': 'AUDI',
  //       'model': 'A1',
  //       'technical_type': '1.4 TFSI PRO LINE S',
  //       'wheels': 4,
  //       'top_speed': 203,
  //       'engine_capacity': 1390,
  //       'power_kw': 90,
  //       'edition': '1.4 TFSI PRO LINE S',
  //       'doors': 5,
  //       'current_value': 16326,
  //       'nicci_cartransmission_automatic_transmission': 'Automaat'
  //     });
  //     const completion = new coverage.CarCoverageAction({ license: 'GK906T', activeLoan: false });

  //     actions = hot('--a-', { a: action });
  //     const expected = cold('--b', { b: completion });

  //     expect(effects.carCoverageFromInfo$).toBeObservable(expected);
  //   });

  // });

});
