import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { KNXWizardRxService } from '../services/wizard.service';
import { Observable } from 'rxjs/Observable';
import * as WizardActions from '../actions/wizard';

@Injectable()
export class WizardEffects {
  @Effect({dispatch: false})
  navigate$ = this.actions$.ofType(WizardActions.GO)
    .do((action: WizardActions.Go) => this.knxWizardRxService.goToStep(action.payload.stepIndex));

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.ofType(WizardActions.BACK)
    .do(() => this.knxWizardRxService.goToPrevStep());

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.ofType(WizardActions.FORWARD)
    .do(() => this.knxWizardRxService.goToNextStep());

  constructor(
    private actions$: Actions,
    private knxWizardRxService: KNXWizardRxService
  ) {}
}
