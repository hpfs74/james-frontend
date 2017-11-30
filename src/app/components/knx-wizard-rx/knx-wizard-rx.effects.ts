import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { KNXWizardRxService } from '@app/components/knx-wizard-rx/knx-wizard-rx.service';
import { Observable } from 'rxjs/Observable';
import * as WizardActions from './knx-wizard-rx.actions';

@Injectable()
export class WizardEffects {
  @Effect()
  navigate$ = this.actions$.ofType(WizardActions.GO)
    .do((action: WizardActions.Go) => this.knxWizardRxService.goToStep(action.payload.stepIndex));

  @Effect()
  navigateBack$ = this.actions$.ofType(WizardActions.BACK)
    .do(() => this.knxWizardRxService.prevStep());

  @Effect()
  navigateForward$ = this.actions$.ofType(WizardActions.FORWARD)
    .do(() => this.knxWizardRxService.nextStep());

  constructor(
    private actions$: Actions,
    private router: Router,
    private knxWizardRxService: KNXWizardRxService
  ) {}
}
