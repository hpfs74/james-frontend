import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { AsyncPipe } from '@angular/common';

import * as fromRoot from '@app/reducers';
import * as router from '@app/core/actions/router';
import * as assistant from '@app/core/actions/assistant';
import * as layout from '@app/core/actions/layout';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';
import { CalculatedPremium, HouseHoldPremiumResponse } from '@app/house/models/house-hold-premium';
import { getHouseHoldPremiumLoading, getHouseHoldPremiumResult } from '@app/house/reducers';

interface OrderItem {
  id: string;
  label: string;
  key: string;
  active: boolean;
}

@Component({
  providers: [ AsyncPipe ],
  selector: 'knx-house-hold-premiums-list',
  templateUrl: './house-hold-premiums-list.component.html',
  styleUrls: ['./house-hold-premiums-list.component.scss']
})
export class HouseHoldPremiumsListComponent implements OnInit {
  insurances: Array<CalculatedPremium> = [];
  title: string;
  totalTitle: number;
  initialAmount = 4;
  disableInsuranceBuy: boolean;
  isPremiumsLoading$: Observable<boolean>;
  total: number;
  orderBy: Array<OrderItem>;
  qaRootId = QaIdentifiers.carAdviceRoot;
  subscription$: Array<any>;

  constructor(private store$: Store<fromRoot.State>,
              private asyncPipe: AsyncPipe) {
    this.getCompareResultCopy();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.premiums', clear: true}));
    this.isPremiumsLoading$ = this.store$.select(getHouseHoldPremiumLoading);
    // this.error$ = this.store$.select(fromCore.getWizardError);
  }

  ngOnInit(): void {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.premiums', clear: true}));
    this.total = this.initialAmount;
  }

  showAll(): void {
    this.total = this.insurances.length;
  }

  trackInsurance(index, item): any {
    return item && item.insurance ? item.insurance.id : undefined;
  }

  selectInsurance(insurance): void {
    // this.store$.dispatch(new advice.SetInsurance(insurance));
  }

  noResult(): boolean {
    return this.insurances.length <= 0 && !this.asyncPipe.transform(this.isPremiumsLoading$);
  }

  private getCompareResultCopy() {
    // This is needed because the ngrx-datatable modifies the result to add an $$index to each
    // result item and modifies the source array order when sorting
    // this.store$.select(getHouseHoldPremiumResult)
    //   .map(obs => {
    //     return obs.map(v => JSON.parse(JSON.stringify(v)));
    //   }).subscribe(insurances => {
    //   this.insurances = insurances;
    // });

    // this.store$.select(fromInsurance.getSelectedAdvice)
    //   .filter(advice => advice !== undefined && Object.keys(advice).length > 1) // bit hackisch way to check for valid compare request
    //   .subscribe(advice => {
    //     this.store$.dispatch(new compare.LoadCarAction(advice));
    //   });
  }
}

