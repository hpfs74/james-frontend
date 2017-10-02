import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { hot, cold } from 'jasmine-marbles';

import { CompareEffects } from './compare';
import { CarService } from '../services/car.service';

import * as compare from '../actions/compare';

describe('CarEffects', () => {
  let effects: CompareEffects;
  let actions: Observable<any>;
  let carService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompareEffects,
        provideMockActions(() => actions),
        {
          provide: CarService,
          useValue: jasmine.createSpyObj('CarService', ['getInsurances']),
        },
      ],
    });

    carService = TestBed.get(CarService);
    effects = TestBed.get(CompareEffects);
  });

  describe('loadCarCompare$', () => {
    it('should return compare success action', () => {
      const action = new compare.LoadCarAction({ a: 'myValue'});
      const completion = new compare.LoadCarSuccessAction([ 'response' ]);

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      carService.getInsurances.and.returnValue(Observable.of([ 'response' ]));
      expect(effects.loadCarCompare$).toBeObservable(expected);
    });

    it('should return compare failure action', () => {
      const action = new compare.LoadCarAction({ a: 'myValue'});
      const completion = new compare.LoadCarFailAction({ b: 'error' });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      carService.getInsurances.and.returnValue(Observable.throw({ b: 'error' }));
      expect(effects.loadCarCompare$).toBeObservable(expected);
    });
  });

});
