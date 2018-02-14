import { Component, OnInit } from '@angular/core';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import * as assistant from '@core/actions/assistant';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Observable } from 'rxjs/Observable';

import * as fromHouseHold from '@app/house/reducers';

@Component({
  selector: 'knx-house-hold-premiums-buy',
  templateUrl: './house-hold-premiums-buy.component.html',
  styleUrls: ['./house-hold-premiums-buy.component.scss']
})
export class HouseHoldPremiumsBuyComponent implements OnInit {

  selectedInsurance$: Observable<CalculatedPremium>;
  insurance: CalculatedPremium;

  constructor(private store$: Store<fromRoot.State>) {
  }

  ngOnInit() {

    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.detail', clear: true}));

    // this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldDataAdvice());

  }
}
