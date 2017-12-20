import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { QaIdentifiers } from '../../../../../shared/models/qa-identifiers';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { AsyncPipe } from '@angular/common';

import * as fromRoot from '../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';
import * as layout from '../../../../../core/actions/layout';
import * as fromAuth from '../../../../../auth/reducers';
import * as router from '../../../../../core/actions/router';
import * as assistant from '../../../../../core/actions/assistant';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

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
              private asyncPipe: AsyncPipe) {
    this.selectedInsurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    this.loggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.currentStepOptions = {
      label: 'Aanvragen',
      backButtonLabel: 'Terug',
      nextButtonLabel: 'Verzekering aanvragen',
      nextButtonClass: 'knx-button knx-button--cta knx-button--extended knx-button--3d knx-button--float-bottom',
    };
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.ClearAction);
    let selectedInsurance = this.asyncPipe.transform(this.selectedInsurance$);
    this.showStepBlock = selectedInsurance.supported;
    if (selectedInsurance.supported) {
      this.currentStepOptions.nextButtonLabel = 'Verzekering aanvragen';
      this.currentStepOptions.nextButtonClass = 'knx-button knx-button--cta knx-button--extended knx-button--3d knx-button--float-bottom';
      // this.currentStepOptions.onBeforeNext = this.startBuyFlow.bind(this);
      this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.review.title'}));
      this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.review.steps'}));
    } else {
      this.currentStepOptions.nextButtonLabel = 'Ga naar website';
      this.currentStepOptions.nextButtonClass = 'knx-button knx-button--secondary knx-button--float-bottom';
      this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.review.unsupported', clear: true}));
    }
  }

  ngOnDestroy() {
    this.subscription$.forEach(subscription => subscription.unsubscribe());
  }

  goToNextStep() {
    if (!this.showStepBlock) {
      window.open(this.asyncPipe.transform(this.selectedInsurance$)._embedded.insurance.url, '_blank');
    } else {
      let loggedIn = this.asyncPipe.transform(this.loggedIn$);
      if (loggedIn) {
        this.subscription$.push(this.store$.select(fromInsurance.getSelectedAdviceId).subscribe(
          id => {
            this.store$.dispatch(new router.Go({
              path: ['/car/insurance/contact-detail'],
            }));
          }));
      } else {
        // INS-600 Anonymous Flow Stage 1: integrate modal to redirect user
        // Instead of going into the buy flow the user clicks on the modal buttons
        // to be redirected either to /login or /register
        this.store$.dispatch(new layout.OpenModal('authRedirectModal'));
      }
    }
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }
}
