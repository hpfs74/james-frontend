import { Component, OnInit } from '@angular/core';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import * as assistant from '@core/actions/assistant';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Observable } from 'rxjs/Observable';

import * as fromHouseHold from '@app/house/reducers';

@Component({
  selector: 'knx-house-hold-premiums-thank-you',
  templateUrl: './house-hold-premiums-thank-you.component.html',
  styleUrls: ['./house-hold-premiums-thank-you.component.scss']
})
export class HouseHoldPremiumsThankYouComponent implements OnInit {

  selectedInsurance$: Observable<CalculatedPremium>;
  insurance: CalculatedPremium;
  customerName: string;
  customerEmail: string;

  constructor(private store$: Store<fromRoot.State>) {
    this.customerName = 'sarah';
    this.customerEmail = 'sarah@gmail.com';
  }

  ngOnInit() {

    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'household.thankYou',
      clear: true
    }));

    this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldSelectedAdvice);
  }
}
