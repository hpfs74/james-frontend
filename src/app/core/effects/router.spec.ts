import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store, combineReducers, Action } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AssistantConfig } from '../models/assistant';
import { AssistantService } from '../services/assistant.service';
import { RouterEffects } from '@app/core/effects/router';
import { scrollToY } from '@app/utils/scroll-to-element.utils';
import { NavigationEnd } from '@angular/router';

import * as routerActions from '../actions/router';
import * as carActions from '@app/car/actions/car';
import * as fromRoot from '../../reducers';
import * as fromApp from '../reducers';
import * as fromAssistant from '../reducers';
import * as layout from '@app/core/actions/layout';

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

describe('RouterEWffects', () => {
  let effects: RouterEffects;
  let location: Location;
  let actions: Observable<any>;
  let store: Store<fromAssistant.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          'app': combineReducers(fromApp.reducers),
        }, {
          initialState: getInitialState
        })
      ],
      providers: [
        RouterEffects,
        provideMockActions(() => actions)
      ],
    });

    effects = TestBed.get(RouterEffects);
    location = TestBed.get(Location);
    store = TestBed.get(Store);
  });

  describe('Router Events', () => {
    it('should go forward', () => {
      const action = new routerActions.Forward();
      store.dispatch(action);
      effects.navigate$.subscribe(() => {
        expect(location.forward).toHaveBeenCalled();
      });
    });
    it('should go back', () => {
      const action = new routerActions.Back();
      store.dispatch(action);
      effects.navigateBack$.subscribe(() => {
        expect(location.back).toHaveBeenCalled();
      });
    });
    it('should go to a path', () => {
      spyOn(effects.router, 'navigate');
      const action = new routerActions.Go({path: ['/car']});
      store.dispatch(action);
      effects.navigate$.subscribe(() => {
        expect(effects.router.navigate).toHaveBeenCalledWith(action);
      });
    });
  });

  describe('NavigationEnd', () => {
    it('should clear all car errors', () => {
      const action = new routerActions.Back();
      const expectedAction = new carActions.ClearErrors();
      spyOn(store, 'dispatch');
      store.dispatch(action);
        effects.router.events.subscribe(event => {
          if ( event instanceof NavigationEnd ) {
            expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
          }
        });
    });
  });
});
