import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceAdvice } from '../../../../../insurance/models';
import { KNXStepRxComponent } from '../../../../../components/knx-wizard-rx/knx-step-rx.component';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as router from '../../../../../core/actions/router';

interface OrderItem {
  id: string;
  label: string;
  key: string;
  active: boolean;
}

@Component({
  selector: 'knx-insurance-toplist',
  templateUrl: './knx-insurance-toplist.component.html',
  styleUrls: ['./insurance-toplist.component.scss']
})
export class InsuranceTopListComponent implements OnInit, KNXStepRxComponent {
  // @Input() insurances: Array<InsuranceAdvice>;
  // @Input() isLoading: boolean;
  // @Input() title: string;
  // @Input() totalTitle: number;
  // @Input() initialAmount: number;
  // @Input() disableInsuranceBuy: boolean;

  @Output() insuranceSelected$: EventEmitter<InsuranceAdvice> = new EventEmitter();

  total: number;
  orderBy: Array<OrderItem>;

  constructor(private store$: Store<fromRoot.State>) {}

  ngOnInit() {
    // this.total = this.initialAmount;
    this.orderBy = [
      { id: 'priceQuality', label: 'prijs / kwaliteit', key: 'price_quality', active: true },
      { id: 'price', label: 'beste prijs', key: 'monthly_premium', active: false }
    ];
  }

  changeOrderBy(selected: OrderItem) {
    this.orderBy.forEach(orderItem => {
      orderItem.active = orderItem.id === selected.id;
    });
    // this.sortByKey(this.insurances, selected.key);
  }

  sortByKey(arr, key) {
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
    // this.total = this.insurances.length;
  }

  trackInsurance(index, item) {
    return item && item.insurance ? item.insurance.id : undefined;
  }

  selectInsurance(event) {
    this.insuranceSelected$.emit(event);
  }

  noResult() {
    // return (this.insurances && this.insurances.length <= 0) && !this.isLoading;
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

}

