import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { AnalyticsEvent } from '@app/core/models/analytics';
import { Router } from '@angular/router';

import * as fromRoot from '@app/car/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromAuth from '@app/auth/reducers';
import * as router from '@app/core/actions/router';
import * as assistant from '@app/core/actions/assistant';
import * as analytics from '@app/core/actions/analytics';

import { CarService } from '@app/car/services/car.service';

@Component({
  providers: [ AsyncPipe ],
  selector: 'knx-car-review',
  templateUrl: './car-review.component.html',
})
export class CarReviewComponent implements OnInit, OnDestroy {
  qaRootId = QaIdentifiers.carAdviceRoot;
  selectedInsurance$: Observable<any>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  subscription$: Subscription[] = [];
  showStepBlock = false;
  loggedIn$: Observable<any>;
  constructor(private store$: Store<fromRoot.State>,
              private asyncPipe: AsyncPipe,
              private router: Router,
              public carService: CarService) {
    this.selectedInsurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    this.loggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.currentStepOptions = {
      label: 'Aanvragen',
      backButtonLabel: 'Terug',
      hideNextButton: true,
    };
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.ClearAction);
    let selectedInsurance = this.asyncPipe.transform(this.selectedInsurance$);
    this.showStepBlock = selectedInsurance.supported;
    if (selectedInsurance.supported) {
      this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.review.title'}));
      this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.review.steps'}));
    } else {
      this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.review.unsupported', clear: true}));
    }
  }

  ngOnDestroy() {
    this.subscription$.forEach(subscription => subscription.unsubscribe());
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }
}
