import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalculatedPremium, HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';
import * as assistant from '@core/actions/assistant';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Observable } from 'rxjs/Observable';

import * as fromHouseHold from '@app/house/reducers';
import { KNXStepError, KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { getHouseHoldDataInfo } from '@app/house/reducers';
import 'rxjs/add/operator/filter';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs/Subscription';
import { Content, ContentConfig } from '@app/content.config';
import { AsyncPipe } from '@angular/common';

@Component({
  providers: [ AsyncPipe ],
  selector: 'knx-house-hold-premiums-thank-you',
  templateUrl: './house-hold-premiums-thank-you.component.html'
})
export class HouseHoldPremiumsThankYouComponent implements OnInit, OnDestroy {

  request$: Observable<HouseHoldPremiumRequest>;
  selectedInsurance$: Observable<CalculatedPremium>;
  insurance: CalculatedPremium;

  subscriptions: Subscription[] = [];
  customerName: string;
  customerEmail: string;
  content: Content;

  constructor(private store$: Store<fromRoot.State>,
              public asyncPipe: AsyncPipe,
              private contentConfig: ContentConfig) {
    this.content = this.contentConfig.getContent();
  }

  /**
   * events that happens after constructor
   */
  ngOnInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'household.thankYou',
      clear: true
    }));

    this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldSelectedAdvice);
    this.request$ = this.store$.select(fromHouseHold.getHouseHoldDataInfo);
    this.setInitialSubscriptions();
  }

  /**
   * run unsubscripton
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * it is a place where all subscription happens and
   * get stored in subscription array for later unsubscribtion
   */
  setInitialSubscriptions() {
    this.subscriptions.push(this.request$
        .filter(data => data !== null)
        .subscribe((data) => {
          this.customerEmail = data.customerEmail;
          this.customerName = data.customerName;
        }),

      this.selectedInsurance$
        .filter(data => data !== null)
        .subscribe((data) => {
          this.insurance = data;
        }));
  }

}
