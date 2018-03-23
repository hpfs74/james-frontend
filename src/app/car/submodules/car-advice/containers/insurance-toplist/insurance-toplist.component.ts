import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { CarInsurance } from '@car/models';
import { AsyncPipe } from '@angular/common';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

import * as fromRoot from '../../../../reducers';
import * as fromCar from '../../../../reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as advice from '../../../../../insurance/actions/advice';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';

import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { FeatureConfigService } from '@app/core/services/feature-config.service';

interface OrderItem {
  id: string;
  label: string;
  key: string;
  active: boolean;
  data: string;
}

@Component({
  providers: [AsyncPipe],
  selector: 'knx-insurance-toplist',
  templateUrl: './insurance-toplist.component.html',
  styleUrls: ['./insurance-toplist.component.scss']
})
export class InsuranceTopListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('iframe') iframe: ElementRef;
  insurances: Array<CarInsurance> = [];
  title: string;
  iframeClass: string;
  iframeUrl: any;
  initialAmount = 4;
  disableInsuranceBuy: boolean;
  isInsuranceLoading$: Observable<boolean>;
  isInsuranceError$: Observable<boolean>;
  total: number;
  orderBy: Array<OrderItem>;
  qaRootId = QaIdentifiers.carAdviceRoot;
  isLoggedIn$: Observable<boolean>;
  subscription$: Subscription[] = [];
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;

  constructor(private store$: Store<fromRoot.State>,
              private asyncPipe: AsyncPipe,
              private sanitizer: DomSanitizer,
              private featureConfigService: FeatureConfigService) {
    this.total = this.initialAmount;
    this.getCompareResultCopy();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.advice.option', clear: true}));
    this.isLoggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.isInsuranceLoading$ = this.store$.select(fromCar.getCompareLoading);
    this.isInsuranceError$ = this.store$.select(fromCar.getCompareError);
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
    /**
     * this.featureConfigService.isOn('productOrder') will return false by default
     * for the purpose of this test we need to set productOrder property to true,
     * than the order will be switched and that will be variation 1
     */
    this.orderBy = [
      {
        id: 'priceQuality',
        label: 'prijs / kwaliteit',
        key: 'price_quality',
        active: !this.featureConfigService.isOn('productOrder'),
        data: 'prijs_kwaliteit'
      },
      {
        id: 'price',
        label: 'beste prijs',
        key: 'monthly_premium',
        active: this.featureConfigService.isOn('productOrder'),
        data: 'beste_prijs'
      }
    ];

    // Tune up the iframe settings
    let iframeIdUrl = 'dStdt194J8vCpRC5hXzy5fsGf0dlS6e_rihApiR7Xj51qWFK67%2BKYBA4obE5jioLgZCjc_ypUb6ddH';
    if (window.innerWidth < 1200) {
      iframeIdUrl = 'vHKtxx4CMz0J36bmsrkB0%2BbPPMBcj%2BeWHt899Uv8jwWbpveuosWR8KprfWzWN9%2BNHZmFmVERhhKvvS';
    }
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://email.knab.nl/optiext/optiextension.dll?ID=' + iframeIdUrl);
  }

  ngAfterViewInit() {
    // Because it is insecure to set up the iframe height with going inside the iframe with js we have to change it based on breakpoints
    switch (true) {
      case (window.innerWidth < 575):
        this.iframeClass = 'iframe-xs';
        break;
      case (window.innerWidth < 768):
        this.iframeClass = 'iframe-sm';
        break;
      case (window.innerWidth < 991):
        this.iframeClass = 'iframe-md';
        break;
      case (window.innerWidth < 1200):
        this.iframeClass = 'iframe-lg';
        break;
      default:
        this.iframeClass = 'iframe-xl';
    }
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
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
    return this.insurances.length <= 0 &&
      !this.asyncPipe.transform(this.isInsuranceLoading$) &&
      !this.asyncPipe.transform(this.isInsuranceError$);
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
    this.subscription$.push(
      this.store$.select(fromCar.getCompareResult)
        .map(obs => {
          return obs.map(v => JSON.parse(JSON.stringify(v)));
        }).subscribe(insurances => {
          // AB test to show all insurances vs only top 4
          if (this.featureConfigService.isOn('showAllResults')) {
            this.showAll();
          }
          this.insurances = insurances;
      })
    );
  }
}

