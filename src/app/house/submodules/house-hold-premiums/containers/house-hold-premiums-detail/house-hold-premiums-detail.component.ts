import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalculatedPremium, HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { KNXStepError, KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

import * as houseHoldAction from '@app/house/actions/house-hold-data';
import * as assistant from '@core/actions/assistant';
import * as wizardActions from '@core/actions/wizard';
import * as fromRoot from '@app/reducers';
import * as fromHouseHold from '@app/house/reducers';
import * as layout from '@app/core/actions/layout';
import * as router from '@app/core/actions/router';
import { Address } from '@app/address/models';

@Component({
  selector: 'knx-house-hold-premiums-detail',
  templateUrl: './house-hold-premiums-detail.component.html',
  styleUrls: ['./house-hold-premiums-detail.component.scss']
})
export class HouseHoldPremiumsDetailComponent implements OnInit, OnDestroy {
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;

  selectedInsurance$: Observable<CalculatedPremium>;
  houseDataInfo$: Observable<HouseHoldPremiumRequest>;
  insurance: CalculatedPremium;
  houseDataInfo: HouseHoldPremiumRequest;
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

    this.houseDataInfo$ = this.store$.select(fromHouseHold.getHouseHoldDataInfo);
    this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldSelectedAdvice);

    this.subscriptions.push(
      this.selectedInsurance$.subscribe(ins => {
        this.insurance = ins;
      }),
      this.houseDataInfo$.subscribe(info => {
        this.houseDataInfo = info;
      }));
  }

  /**
   * unsubscribe all previously allocated subscriptions
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * remove html tags from RISK responce
   */
  cutOffHtmlTags(strInputCode) {
    return strInputCode.replace(/<\/?[^>]+(>|$)/g, '');
  }

  goToPrevStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep() {
    if (localStorage.getItem('testing')) {

      this.store$.dispatch(new houseHoldAction.NewFlowAdviceStore({
        contacts: {
          address: {
            postcode: this.houseDataInfo.Zipcode,
            number: this.houseDataInfo.HouseNumber.toString(),
            number_extended: {
              number_only: this.houseDataInfo.HouseNumber,
              number_addition: this.houseDataInfo.HouseNumberAddition
            }
          } as Address,
          sameAddress: true,
          dateOfBirth: this.houseDataInfo.BreadWinnerBirthdate,
          familySituation: this.houseDataInfo.FamilyComposition
        },
        houseHoldInsurance: {
          selectedPremium: this.insurance
        }
      }));
      this.store$.dispatch(new router.Go({path: ['/inboedel/buy-details']}));
    } else {
      this.store$.dispatch(new layout.OpenModal('houseHoldEndOftheLineModal'));
    }
  }
}
