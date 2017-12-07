import { Component, OnInit } from '@angular/core';
import { KNXStepRxComponent } from '../../../../../components/knx-wizard-rx/knx-step-rx.component';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { QaIdentifiers } from '../../../../../shared/models/qa-identifiers';
import { CarInsurance } from '../../../../models/index';
import { AsyncPipe } from '@angular/common';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

import * as fromRoot from '../../../../reducers';
import * as router from '../../../../../core/actions/router';
import * as fromCar from '../../../../reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as advice from '../../../../../insurance/actions/advice';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as layout from '../../../../../core/actions/layout';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';

import 'rxjs/add/operator/map';

interface OrderItem {
  id: string;
  label: string;
  key: string;
  active: boolean;
}

@Component({
  providers: [ AsyncPipe ],
  selector: 'knx-insurance-toplist',
  templateUrl: './insurance-toplist.component.html',
  styleUrls: ['./insurance-toplist.component.scss']
})
export class InsuranceTopListComponent implements OnInit {
  insurances: Array<CarInsurance> = [];
  title: string;
  totalTitle: number;
  initialAmount = 4;
  disableInsuranceBuy: boolean;
  isInsuranceLoading$: Observable<boolean>;
  total: number;
  orderBy: Array<OrderItem>;
  qaRootId = QaIdentifiers.carAdviceRoot;
  isLoggedIn$: Observable<boolean>;
  subscription$: Array<any>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;

  constructor(private store$: Store<fromRoot.State>,
              private asyncPipe: AsyncPipe) {
    this.isInsuranceLoading$ = this.store$.select(fromCar.getCompareLoading);
    this.getCompareResultCopy();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.advice.option', clear: true}));
    this.isLoggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.currentStepOptions = {
      label: 'Premies vergelijken',
      backButtonLabel: 'Terug',
      hideNextButton: true,
      hideBackButton: false,
    };
  }

  ngOnInit(): void {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.advice.option', clear: true}));
    this.total = this.initialAmount;
    this.orderBy = [
      { id: 'priceQuality', label: 'prijs / kwaliteit', key: 'price_quality', active: true },
      { id: 'price', label: 'beste prijs', key: 'monthly_premium', active: false }
    ];
  }

  changeOrderBy(selected: OrderItem): void {
    this.orderBy.forEach(orderItem => {
      orderItem.active = orderItem.id === selected.id;
    });
    this.sortByKey(this.insurances, selected.key);
  }

  sortByKey(arr, key): number {
    return key ? arr.sort((i1, i2) => {
      if (key === 'price_quality') {
        // highest amount first
        if (i1[key] < i2[key]) {
          return 1;
        }
        if (i1[key] > i2[key]) {
          return -1;
        }
        return 0;
      } else {
        // lowest amount first
        if (i1[key] > i2[key]) {
          return 1;
        }
        if (i1[key] < i2[key]) {
          return -1;
        }
        return 0;
      }
    }) : arr;
  }

  showAll(): void {
    this.total = this.insurances.length;
  }

  trackInsurance(index, item): any {
    return item && item.insurance ? item.insurance.id : undefined;
  }

  selectInsurance(insurance): void {
    this.store$.dispatch(new advice.SetInsurance(insurance));
    this.goToNextStep();
  }

  noResult(): boolean {
    return this.insurances.length <= 0 && !this.asyncPipe.transform(this.isInsuranceLoading$);
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep() {
    this.store$.dispatch(new wizardActions.Forward());
  }

  private getCompareResultCopy() {
    // This is needed because the ngrx-datatable modifies the result to add an $$index to each
    // result item and modifies the source array order when sorting
    this.store$.select(fromCar.getCompareResult)
      .map(obs => {
        return obs.map(v => JSON.parse(JSON.stringify(v)));
      }).subscribe(insurances => {
        this.insurances = insurances;
      });
  }
}

