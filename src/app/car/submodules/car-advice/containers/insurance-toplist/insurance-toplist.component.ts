import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { CarInsurance } from '@car/models';
import { AsyncPipe } from '@angular/common';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { environment } from '@env/environment';

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
import * as overlayActions from '@core/actions/overlay-modal';
import { JamesTagPipe } from '@app/shared/pipes';

interface OrderItem {
  id: string;
  label: string;
  key: string;
  active: boolean;
  data: string;
}

@Component({
  providers: [AsyncPipe, JamesTagPipe],
  selector: 'knx-insurance-toplist',
  templateUrl: './insurance-toplist.component.html',
  styleUrls: ['./insurance-toplist.component.scss']
})
export class InsuranceTopListComponent implements OnInit, OnDestroy {
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
              private jamesTag: JamesTagPipe,
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
    let iframeIdUrl = environment.external.iframeWebappDesktop;
    if (window.innerWidth < 1200) {
      iframeIdUrl = environment.external.iframeWebappMobile;
    }
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(iframeIdUrl);

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

  mailMeAdvice() {
    this.store$.dispatch(new overlayActions.Open());
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
          const topFiveResults = this.getTopFiveResults();
          const data = btoa(JSON.stringify(topFiveResults));
          this.store$.dispatch(new overlayActions.SetData(data));
      })
    );
  }

  private getTopFiveResults(): AdviceResults[] {
    const result = this.insurances.map((insurance, index) => {
      return {
        ID: `${index + 1}`,
        PARAM: `ADVICE${index + 1}`,
        CONTENT: {
          insurance_image: insurance._embedded.insurance.insurance_logo,
          score: `${insurance.fit}`,
          own_risk: `${insurance.own_risk}`,
          price_quality: `${insurance.price_quality}`,
          coverage: `${this.jamesTag.transform(insurance.main_coverage, 'car_flow_coverage')}`,
          price: `${insurance.price}`,
          knab_discount: `${insurance['discount']}`,
        }
      };
    }).slice(0, 5);
    return result;
  }
}

export interface Content {
  insurance_image: string;
  score: string;
  own_risk: string;
  price_quality: string;
  coverage: string;
  price: string;
  knab_discount: string;
}

export interface AdviceResults {
  ID: string;
  PARAM: string;
  CONTENT: Content;
}
