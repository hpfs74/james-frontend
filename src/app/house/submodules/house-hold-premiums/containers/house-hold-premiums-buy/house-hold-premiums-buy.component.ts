import { Component, OnInit } from '@angular/core';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import * as assistant from '@core/actions/assistant';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Observable } from 'rxjs/Observable';

import * as fromHouseHold from '@app/house/reducers';
import { HouseHoldPremiumsBuyForm } from './house-hold-premiums-buy.form';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'knx-house-hold-premiums-buy',
  templateUrl: './house-hold-premiums-buy.component.html',
  styleUrls: ['./house-hold-premiums-buy.component.scss']
})
export class HouseHoldPremiumsBuyComponent implements OnInit {

  selectedInsurance$: Observable<CalculatedPremium>;
  insurance: CalculatedPremium;
  form: HouseHoldPremiumsBuyForm;

  constructor(private store$: Store<fromRoot.State>) {
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldPremiumsBuyForm(formBuilder);
  }

  ngOnInit() {

    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'household.buy',
      clear: true
    }));

    this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldSelectedAdvice);
  }
}
