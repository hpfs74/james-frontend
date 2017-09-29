import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { hot, cold } from 'jasmine-marbles';

import { CarEffects } from './car';
import { CarService } from '../services/car.service';
import { Car } from '../models';

import * as car from '../actions/car';

describe('CarEffects', () => {
  let effects: CarEffects;
  let actions: Observable<any>;
  let carService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CarEffects,
        provideMockActions(() => actions),
        {
          provide: CarService,
          useValue: jasmine.createSpyObj('CarService', ['getByLicense', 'buyStatic']),
        },
      ],
    });

    carService = TestBed.get(CarService);
    effects = TestBed.get(CarEffects);
  });

  describe('loadCarInfo$', () => {
    it('should return car success action', () => {
      const response = {
        '_id': 'GK906T',
        'license': 'GK906T',
        'vin': null,
        'reporting_code': null,
        'year': '2012',
        'fuel': 'Benzine',
        'fuel_code': 'B',
        'secondary_fuel': null,
        'color': 'zwart',
        'color_code': null,
        'secondary_color': null,
        'secondary_color_code': null,
        'weight_empty_vehicle': 1125,
        'price_consumer_excl_vat': 29136,
        'price_consumer_incl_vat': 34003,
        'make': 'AUDI',
        'model': 'A1',
        'technical_type': '1.4 TFSI PRO LINE S',
        'wheels': 4,
        'top_speed': 203,
        'engine_capacity': 1390,
        'power_kw': 90,
        'edition': '1.4 TFSI PRO LINE S',
        'doors': 5,
        'current_value': 16326,
        'nicci_cartransmission_automatic_transmission': 'Automaat'
      } as Car;

      const licensePlate = 'AABB22';
      const action = new car.GetInfoAction(licensePlate);
      const completion = new car.GetInfoCompleteAction(response);

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      carService.getByLicense.and.returnValue(Observable.of(response));
      expect(effects.loadCarInfo$).toBeObservable(expected);
    });

    it('should return car failure action', () => {
      const licensePlate = 'AABB22';
      const action = new car.GetInfoAction(licensePlate);
      const completion = new car.GetInfoFailureAction('Error');

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      carService.getByLicense.and.returnValue(Observable.throw('Error'));
      expect(effects.loadCarInfo$).toBeObservable(expected);
    });
  });

  describe('buyCarInsurance$', () => {
    it('should return a buy success action', () => {
      const action = new car.BuyAction({ a: 'someValue '});
      const completion = new car.BuyCompleteAction({ b: 'returnValue' });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      carService.buyStatic.and.returnValue(Observable.of({ b: 'returnValue' }));
      expect(effects.buyCarInsurance$).toBeObservable(expected);
    });

    it('should return a buy failure action', () => {
      const action = new car.BuyAction({ a: 'someValue '});
      const completion = new car.BuyFailureAction({ b: 'failed' });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      carService.buyStatic.and.returnValue(Observable.throw({ b: 'failed' }));
      expect(effects.buyCarInsurance$).toBeObservable(expected);
    });
  });
});
