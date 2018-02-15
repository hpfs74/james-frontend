import { Component, OnInit } from '@angular/core';
import { CalculatedPremium, HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';
import * as assistant from '@core/actions/assistant';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Observable } from 'rxjs/Observable';

import * as fromHouseHold from '@app/house/reducers';
import { KNXStepError, KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { getHouseHoldDataInfo } from '@app/house/reducers';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'knx-house-hold-premiums-thank-you',
  templateUrl: './house-hold-premiums-thank-you.component.html',
  styleUrls: ['./house-hold-premiums-thank-you.component.scss']
})
export class HouseHoldPremiumsThankYouComponent implements OnInit {

  request$: Observable<HouseHoldPremiumRequest>;
  selectedInsurance$: Observable<CalculatedPremium>;
  insurance: CalculatedPremium;
  customerName: string;
  customerEmail: string;

  constructor(private store$: Store<fromRoot.State>) {
  }

  ngOnInit() {

    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'household.thankYou',
      clear: true
    }));

    this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldSelectedAdvice);
    this.request$ = this.store$.select(fromHouseHold.getHouseHoldDataInfo);
    this.setInitialSubscriptions();
  }

  setInitialSubscriptions() {
    this.request$
      .filter(data => data !== null)
      .subscribe((data) => {
        this.customerEmail = data.customerEmail;
        this.customerName = data.customerName;
      });

    this.selectedInsurance$
      .filter(data => data !== null)
      .subscribe((data) => {
        this.insurance = data;
      });
  }

}
