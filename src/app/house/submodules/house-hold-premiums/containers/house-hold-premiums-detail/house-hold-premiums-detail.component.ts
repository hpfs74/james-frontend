import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import * as assistant from '@core/actions/assistant';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import * as wizardActions from '@core/actions/wizard';

import * as fromHouseHold from '@app/house/reducers';
import { Subscription } from 'rxjs/Subscription';
import { KNXStepError, KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

@Component({
  selector: 'knx-house-hold-premiums-detail',
  templateUrl: './house-hold-premiums-detail.component.html',
  styleUrls: ['./house-hold-premiums-detail.component.scss']
})
export class HouseHoldPremiumsDetailComponent implements OnInit, OnDestroy {
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;

  selectedInsurance$: Observable<CalculatedPremium>;
  insurance: CalculatedPremium;
  subscriptions: Subscription[] = [];
  copies: any = {};

  constructor(private store$: Store<fromRoot.State>, private translateService: TranslateService) {
    this.translateService.get([
      'household.common.step.options.backButtonLabel',
      'household.premium.detail.step.options.nextButtonLabel'
    ]).subscribe(res => {
      this.copies = res;
    });
    this.currentStepOptions = {
      backButtonLabel: this.copies['household.common.step.options.backButtonLabel'],
      nextButtonLabel: this.copies['household.premium.detail.step.options.nextButtonLabel'],
      hideBackButton: false,
      hideNextButton: false,
      nextButtonClass: 'knx-button knx-button--3d knx-button--primary'
    };
  }

  ngOnInit() {

    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.detail', clear: true}));

    this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldSelectedAdvice);

    this.subscriptions.push(this.selectedInsurance$.subscribe(ins => {
      this.insurance = ins;
    }));
  }

  /**
   * unsubscribe all previously allocated subscriptions
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  goToPrevStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep() {
    this.store$.dispatch(new wizardActions.Forward());
  }
}

