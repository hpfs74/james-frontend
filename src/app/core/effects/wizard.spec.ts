import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store, combineReducers, Action } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AssistantConfig } from '../models/assistant';
import { AssistantService } from '../services/assistant.service';
import { WizardEffects } from '@app/core/effects/wizard';
import { scrollToY } from '@app/utils/scroll-to-element.utils';
import { NavigationEnd } from '@angular/router';

import * as wizardActions from '../actions/wizard';
import * as carActions from '@app/car/actions/car';
import * as fromRoot from '../../reducers';
import * as fromApp from '../reducers';
import * as fromAssistant from '../reducers';
import * as layout from '@app/core/actions/layout';
import { KNXWizardRxService } from '@app/core/services/wizard.service';
import { KNXWizardServiceMock } from '@app/core/services/wizard.service.mock';


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

describe('WizzardEffects', () => {
  let effects: WizardEffects;
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
        WizardEffects,
        {
          provide: KNXWizardRxService,
          useValue: KNXWizardServiceMock
        },
        provideMockActions(() => actions)
      ],
    });

    effects = TestBed.get(WizardEffects);
    location = TestBed.get(Location);
    store = TestBed.get(Store);
  });

  describe('Wizard Events', () => {
    it('should go forward', () => {
      const action = new wizardActions.Forward();
      store.dispatch(action);
      spyOn(effects.knxWizardRxService, 'goToNextStep');
      effects.navigateForward$.subscribe(() => {
        expect(effects.knxWizardRxService.goToNextStep).toHaveBeenCalled();
      });
    });
    it('should go back', () => {
      const action = new wizardActions.Back();
      store.dispatch(action);
      spyOn(effects.knxWizardRxService, 'goToPrevStep');
      effects.navigateBack$.subscribe(() => {
        expect(effects.knxWizardRxService.goToPrevStep).toHaveBeenCalled();
      });
    });
    it('should go to specific step', () => {
      spyOn(effects.knxWizardRxService, 'goToStep');
      const action = new wizardActions.Go({stepIndex: 1});
      store.dispatch(action);
      effects.navigate$.subscribe(() => {
        expect(effects.knxWizardRxService.navigate).toHaveBeenCalledWith(action);
      });
    });
  });
});
