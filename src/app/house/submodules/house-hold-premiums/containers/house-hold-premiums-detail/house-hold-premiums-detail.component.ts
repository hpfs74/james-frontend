import { Component, OnInit } from '@angular/core';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import * as assistant from '@core/actions/assistant';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Observable } from 'rxjs/Observable';

import * as fromHouseHold from '@app/house/reducers';

@Component({
  selector: 'knx-house-hold-premiums-detail',
  templateUrl: './house-hold-premiums-detail.component.html',
  styleUrls: ['./house-hold-premiums-detail.component.scss']
})
export class HouseHoldPremiumsDetailComponent implements OnInit {

  selectedInsurance$: Observable<CalculatedPremium>;
  insurance: CalculatedPremium;

  constructor(private store$: Store<fromRoot.State>) {
  }

  ngOnInit() {

    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.detail', clear: true}));

    this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldSelectedAdvice);

    this.selectedInsurance$.subscribe( ins => {
      this.insurance = ins;
    });

  }
}

