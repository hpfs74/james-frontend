import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { hot, cold, getTestScheduler } from 'jasmine-marbles';

import { SuggestionEffects } from './suggestion.effect';
import { SuggestionService } from '../services/suggestion.service';
import { AddressSuggestion } from '../models';

import * as suggestion from '../actions/suggestion';

describe('SuggestionEffects', () => {
  let effects: SuggestionEffects;
  let actions: Observable<any>;
  let suggestionService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SuggestionEffects,
        provideMockActions(() => actions),
        {
          provide: SuggestionService,
          useValue: jasmine.createSpyObj('SuggestionService', ['lookupSuggestions']),
        },
      ],
    });

    spyOn(Observable.prototype, 'debounceTime').and.callFake(function () {
      return this;
    });

    suggestionService = TestBed.get(SuggestionService);
    effects = TestBed.get(SuggestionEffects);
  });

  describe('loadAddressSuggestion$', () => {
    it('should return address suggestion success action', () => {
      const response = {
        additions: ['12', '34'],
        house_number: '2'
      } as AddressSuggestion;

      const action = new suggestion.GetAddressSuggestion({
        zipcode: '2212CB',
        house_number: '21'
      });
      const completion = new suggestion.GetAddressSuggestionSuccess(response);

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      suggestionService.lookupSuggestions.and.returnValue(Observable.of(response));
      expect(effects.loadAddressSuggestion$).toBeObservable(expected);
    });

    it('should return address failure action', () => {
      const action = new suggestion.GetAddressSuggestion({
        zipcode: '2212CB',
        house_number: '21'
      });
      const completion = new suggestion.GetAddressSuggestionFailure('Error');

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      suggestionService.lookupSuggestions.and.returnValue(Observable.throw('Error'));
      expect(effects.loadAddressSuggestion$).toBeObservable(expected);
    });
  });
});
