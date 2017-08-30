import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { AuthEffects } from './auth';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        // other providers
      ],
    });

    effects = TestBed.get(AuthEffects);
  });

  // TODO: implement effects test

  // it('should work', () => {
  //   actions = hot('--a-', { a: SomeAction, ... });

  //   const expected = cold('--b', { b: AnotherAction });

  //   expect(effects.init$).toBeObservable(expected);
  // });

  // it('should work also', () => {
  //   actions = new ReplaySubject(1);

  //   actions.next(SomeAction);

  //   effects.someSource$.subscribe(result => {
  //     expect(result).toBe(AnotherAction);
  //   });
  // });
});
