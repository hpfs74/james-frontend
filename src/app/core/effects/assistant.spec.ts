import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Store, combineReducers, Action } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { hot, cold } from 'jasmine-marbles';
import 'rxjs/add/operator/take';

import { AssistantEffects } from './assistant';
import { AssistantConfig } from '../models/assistant';
import { AssistantService } from '../services/assistant.service';

import * as assistant from '../actions/assistant';

import * as fromRoot from '../../reducers';
import * as fromApp from '../reducers';
import * as fromAssistant from '../reducers';

export function getInitialState() {
  return {
    'app': {
      assistant: {
        config: new AssistantConfig(),
        messages: []
      },
      layout: null,
      router: null
    }
  };
}

describe('AssistantEffects', () => {
  let effects: AssistantEffects;
  let actions: Observable<any>;
  let assistantService: any;
  let config: AssistantConfig;
  let store: Store<fromAssistant.State>;

  beforeAll(() => {
    config = new AssistantConfig();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          'app': combineReducers(fromApp.reducers),
        }, {
          initialState: getInitialState
        })
      ],
      providers: [
        AssistantEffects,
        AssistantService,
        provideMockActions(() => actions)
      ],
    });

    effects = TestBed.get(AssistantEffects);
    assistantService = TestBed.get(AssistantService);
    store = TestBed.get(Store);
  });

  describe('init$', () => {

  });

  describe('cannedMessage$', () => {
    it('should return a canned message', () => {
      const action = new assistant.AddCannedMessage({key: 'car.buy.fill'});
      const completion = [new assistant.AddMessageAction(config.car.buy.fill)];

      let performedActions = [];
      effects.cannedMessage$.take(1).subscribe(
        result => performedActions.push(result),
        error => fail(error),
        () => {
          expect(performedActions.length).toBe(1);
          expect(performedActions).toEqual(completion);
        }
      );
    });

    it('should return a canned message & clear action', () => {
      const action = new assistant.AddCannedMessage({key: 'car.buy.fill', clear: true});
      const completion = [
        new assistant.ClearAction(),
        new assistant.AddMessageAction(config.car.buy.fill)
      ];

      let performedActions = [];
      effects.cannedMessage$.take(2).subscribe(
        result => performedActions.push(result),
        error => fail(error),
        () => {
          expect(performedActions.length).toBe(2);
          expect(performedActions).toEqual(completion);
        }
      );
    });

    it('should return NO_ACTION on unkown key', () => {
      const action = new assistant.AddCannedMessage({key: 'random.unkownkey.42'});
      const completion = [{ type: 'NO_ACTION' }];

      let performedActions = [];
      effects.cannedMessage$.take(1).subscribe(
        result => performedActions.push(result),
        error => fail(error),
        () => {
          expect(performedActions.length).toBe(1);
          expect(performedActions).toEqual(completion);
        }
      );
    });

  });

});
