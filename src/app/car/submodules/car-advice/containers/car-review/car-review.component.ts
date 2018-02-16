import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { AnalyticsEvent } from '@app/core/models/analytics';
import { Router } from '@angular/router';

import * as fromRoot from '../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromAuth from '../../../../../auth/reducers';
import * as router from '../../../../../core/actions/router';
import * as assistant from '../../../../../core/actions/assistant';
import * as analytics from '@app/core/actions/analytics';

import 'rxjs/add/operator/take';

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
              private router: Router) {
    this.selectedInsurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    this.loggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.currentStepOptions = {
      label: 'Aanvragen',
      backButtonLabel: 'Terug',
      nextButtonLabel: 'Verzekering aanvragen',
      nextButtonClass: 'knx-button knx-button--primary knx-button--3d knx-button--float-bottom',
    };
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.ClearAction);
    let selectedInsurance = this.asyncPipe.transform(this.selectedInsurance$);
    this.showStepBlock = selectedInsurance.supported;
    if (selectedInsurance.supported) {
      this.currentStepOptions.nextButtonLabel = 'Verzekering aanvragen';
      this.currentStepOptions.nextButtonData = 'verzekering_aanvragen_advies';
      this.currentStepOptions.nextButtonClass = 'knx-button knx-button--primary knx-button--3d knx-button--float-bottom';
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
      const selectedInsurance = this.asyncPipe.transform(this.selectedInsurance$);
      const isLoggedIn = this.asyncPipe.transform(this.loggedIn$);
      const analyticsEvent: AnalyticsEvent = {
        event: 'clickout',
        page: this.router.url,
        event_label: 'car insurance application',
        loggedIn_Verzekeren: isLoggedIn ? 'y' : 'n',
        product_id: selectedInsurance.id,
        product_name: selectedInsurance.product_name
      };

      this.store$.dispatch(new analytics.EventAction(analyticsEvent));
      window.open(selectedInsurance._embedded.insurance.url, '_blank');
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
        // this.store$.dispatch(new layout.OpenModal('authRedirectModal'));
        this.store$.select(fromInsurance.getSelectedAdvice).take(1).subscribe(
          advice => {
            if (advice && advice.id) {
              this.store$.dispatch(new router.Go({
                path: ['/car/insurance', {adviceId: advice.id}],
              }));
            }
          });
      }
    }
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }
}
