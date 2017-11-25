import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InsuranceAdvice } from '../../../../../insurance/models';
import { KNXStepRxComponent } from '../../../../../components/knx-wizard-rx/knx-step-rx.component';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as router from '../../../../../core/actions/router';
import * as fromCar from '../../../../reducers';
import * as assistant from '../../../../../core/actions/assistant';

import { QaIdentifiers } from '../../../../../shared/models/qa-identifiers';
import { CarInsurance } from '../../../../models/index';
import { AsyncPipe } from '@angular/common';
declare var window: any;
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
export class InsuranceTopListComponent implements OnInit, KNXStepRxComponent {
  insurances$: Observable<Array<CarInsurance>>;
  title: string;
  totalTitle: number;
  initialAmount = 4;
  disableInsuranceBuy: boolean;
  isInsuranceLoading$: Observable<boolean>;
  @Output() insuranceSelected$: EventEmitter<InsuranceAdvice> = new EventEmitter();

  total: number;
  orderBy: Array<OrderItem>;
  qaRootId = QaIdentifiers.carAdviceRoot;

  constructor(private store$: Store<fromRoot.State>, private asyncPipe: AsyncPipe) {
    this.isInsuranceLoading$ = this.store$.select(fromCar.getCompareLoading);
    this.insurances$ = this.getCompareResultCopy();
    window.toplist = this;
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.advice.option', clear: true}));
  }

  ngOnInit(): void {
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
    this.sortByKey(this.asyncPipe.transform(this.insurances$), selected.key);
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
    this.total = this.asyncPipe.transform(this.insurances$).length;
  }

  trackInsurance(index, item): any {
    return item && item.insurance ? item.insurance.id : undefined;
  }

  selectInsurance(insurance): void {
    // this.store$.dispatch(new advice.SetInsuranceAction(insurance));
  }

  noResult(): boolean {
    return this.asyncPipe.transform(this.insurances$).length <= 0 && !this.asyncPipe.transform(this.isInsuranceLoading$);
  }

  onShow(): Observable<any> {
    return Observable.of(true);
  }

  onBack(): Observable<any> {
    return Observable.of(this.store$.dispatch(new router.Back()));
  }

  onNext(): Observable<any> {
    return Observable.of(true);
  }

  private getCompareResultCopy(): Observable<CarInsurance[]> {
    // This is needed because the ngrx-datatable modifies the result to add an $$index to each
    // result item and modifies the source array order when sorting
    return this.store$.select(fromCar.getCompareResult)
      .map(obs => {
        return obs.map(v => JSON.parse(JSON.stringify(v)));
      });
  }

}

