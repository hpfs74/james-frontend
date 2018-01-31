import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { KNXWizardRxService } from '../services/wizard.service';
import { Observable } from 'rxjs/Observable';
import { scrollToY } from '@app/utils/scroll-to-element.utils';

import * as wizardActions from '../actions/wizard';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class WizardEffects {
  @Effect({dispatch: false})
  navigate$ = this.actions$.ofType(wizardActions.GO)
    .do((action: wizardActions.Go) => this.knxWizardRxService.goToStep(action.payload.stepIndex));

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.ofType(wizardActions.BACK)
    .do(() => this.knxWizardRxService.goToPrevStep());

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.ofType(wizardActions.FORWARD)
    .do(() => this.knxWizardRxService.goToNextStep());

  @Effect({dispatch: false})
  onError$ = this.actions$.ofType(wizardActions.ERROR)
     /* use debounce time to allow view to update classes that
      *  are used to check for errors in scrollToY function
      */
    .debounceTime(1)
    .do(() => scrollToY());

  constructor(
    private actions$: Actions,
    public knxWizardRxService: KNXWizardRxService
  ) {}
}
