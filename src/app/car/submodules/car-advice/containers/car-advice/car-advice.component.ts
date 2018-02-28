import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { KNXStepOptions } from '@knx/wizard';
import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CarDetailComponent } from './../../containers/car-detail/car-detail.component';
import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { AssistantConfig } from '@app/core/models/assistant';
import { TagsService } from '@app/core/services/tags.service';
import { Car, CarCompare, CarCoverageRecommendation, CarInsurance } from '@app/car/models';
import { Price } from '@app/shared/models/price';
import { CarDetailForm } from '@app/car/submodules/car-advice/containers/car-detail/car-detail.form';
import { CarExtrasForm } from '@app/car/submodules/car-advice/containers/car-extras/car-extras.form';
import { createCarCoverages } from '@app/car/utils/coverage.utils';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { InsuranceTopListComponent } from '../insurance-toplist/insurance-toplist.component';
import { KNXWizardRxComponent } from '@app/components/knx-wizard-rx/knx-wizard-rx.component';
import { CarReviewComponent } from '@app/car/submodules/car-advice/containers/car-review/car-review.component';

import * as FormUtils from '@app/utils/base-form.utils';
import * as cuid from 'cuid';
import * as fromRoot from '@app/car/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromCar from '@app/car/reducers';
import { TranslateService } from '@ngx-translate/core';
// Core actions
import * as router from '@app/core/actions/router';
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';

// Car actions
import * as car from '@app/car/actions/car';
import * as compare from '@app/car/actions/compare';
import * as coverage from '@app/car/actions/coverage';

// Other actions
import * as advice from '@app/insurance/actions/advice';
import * as profile from '@app/profile/actions/profile';
import * as wizardActions from '@app/core/actions/wizard';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { Router } from '@angular/router';
import { KNXWizardRxService } from '@app/core/services/wizard.service';

import { KNXFinalAdviceOptions } from '@app/components/knx-final-advice/knx-final-advice.options';
import { InsuranceAdvice } from '@app/insurance/models';
import { JamesTagPipe } from '@app/shared/pipes';
import { CurrencyPipe } from '@angular/common';
import { CarService } from '@app/car/services/car.service';


enum carFormSteps {
  carDetails,
  compareResults
}

@Component({
  providers: [JamesTagPipe, CurrencyPipe],
  templateUrl: 'car-advice.component.html',
  styleUrls: ['./car-advice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarAdviceComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.carAdviceRoot;

  formSteps: Array<KNXWizardStepRxOptions> = [];
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;

  // State of the advice forms data
  isLoggedIn$: Observable<boolean>;
  selectedInsurance$: Observable<any>;
  savedInsurances$: Observable<any>;
  savedInsurancesLoading$: Observable<any>;
  subscription$: Array<any> = [];
  selectedAdvice$: Observable<any>;

  // Forms
  carExtrasForm: CarExtrasForm;
  knxFinalAdviceOptions: KNXFinalAdviceOptions;
  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              private translateService: TranslateService,
              public router: Router,
              public knxWizardService: KNXWizardRxService,
              private jamesTag: JamesTagPipe,
              private currencyPipe: CurrencyPipe,
              public carService: CarService) {


    this.translateService
      .get([
        'car.advice.steps.step1.title',
        'car.advice.steps.step2.title',
        'car.advice.steps.step3.title'])
      .subscribe(data => {
        this.formSteps = Object
          .keys(data)
          .map(key => data[key])
          .map(v => ({label: v}));
      });

    this.setFinalAdviceOptions();

  }

  ngOnInit() {

    this.translateService
      .get('car.advice.avatar.message.start')
      .subscribe((res: string) => {
        this.store$.dispatch(new assistant.UpdateConfigAction({
          avatar: {
            title: res
          }
        }));
      });


    // bind observables
    this.subscription$ = [];
    this.selectedAdvice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.isLoggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.savedInsurances$ = this.store$.select(fromInsurance.getSavedInsurances);
    this.savedInsurancesLoading$ = this.store$.select(fromInsurance.getSavedInsuranceLoading);
    this.selectedInsurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    // initialize forms
    const formBuilder = new FormBuilder();

    this.carExtrasForm = new CarExtrasForm(formBuilder,
      this.tagsService.getAsLabelValue('car_flow_coverage'),
      this.tagsService.getAsLabelValue('car_flow_km_per_year'),
      this.tagsService.getAsLabelValue('car_flow_legal_aid'),
      this.tagsService.getAsLabelValue('car_flow_road_assistance'),
      this.tagsService.getAsLabelValue('car_own_risk'));

    this.subscription$.push(
      this.savedInsurances$
        .filter(purchasedInsurances => purchasedInsurances !== null)
        .take(1)
        .subscribe(purchasedInsurances => {
          const insurances = purchasedInsurances.car.insurance;
          const advices = purchasedInsurances.car.insurance_advice;
          if (advices.length && insurances.length && insurances.filter(insurance => (insurance.status === 'draft')).length) {
            // Proceed to the buy flow for anonymous with advice
            this.proceedWithAdvice(advices, insurances);
          } else if (insurances.length && insurances.filter(insurance =>
              (!insurance.manually_added && insurance.request_status !== 'rejected')).length) {
            // redirect to purchased overview if there are any manually added insurances
            this.store$.dispatch(new router.Go({path: ['/car/purchased']}));
          }
        })
    );

    this.subscription$.push(
      this.selectedInsurance$
        .take(1)
        .filter(selectedInsurance => selectedInsurance)
        .subscribe(selectedInsurance => {
          this.subscription$.push(
            this.selectedAdvice$.take(1).subscribe(selectedAdvice => {
              if (selectedInsurance && selectedAdvice && selectedAdvice.iban) {
                this.proceedToBuyResults();
              }
            })
          );
        })
    );

    this.subscription$.push(
      this.carExtrasForm.formGroup.valueChanges
        .debounceTime(200)
        .filter(() => this.knxWizardService.currentStepIndex === carFormSteps.compareResults)
        .subscribe(data => {

          let compareExtraOptions = {
            coverage: data.coverage,
            cover_occupants: data.extraOptionsOccupants || false,
            no_claim_protection: data.extraOptionsNoClaim || false,
            legal_aid: data.extraOptionsLegal ? 'LAY' : 'LAN',
            road_assistance: data.roadAssistance || 'RANO',
            kilometers_per_year: data.kmPerYear || 'KMR3',
            own_risk: data.ownRisk === null || data.ownRisk === undefined ? 135 : +data.ownRisk,
            insurance_id: ''
          };
          this.store$.dispatch(new advice.Update(compareExtraOptions));
        }),
      this.store$.select(fromInsurance.getSelectedAdvice)
        .filter(advice => advice !== undefined && Object.keys(advice).length > 1)
        .subscribe(advice => {
          this.store$.dispatch(new compare.LoadCarAction(advice));
        })
    );
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  updateActiveLoan(activeLoan: boolean) {
    this.store$.dispatch(new coverage.CarCoverageSetActiveLoan(activeLoan));
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  getStepClass(step) {
    return {
      ['knx-car-advice--step-' + (step + 1)]: true
    };
  }

  private onShowResults() {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.advice.option', clear: true}));
  }

  private proceedWithAdvice(advices, insurances) {
    this.store$.dispatch(new advice.Get(insurances[insurances.length - 1].advice_item_id));
    this.store$.dispatch(new advice.Update(Object.assign({}, advices[advices.length - 1])));

    this.subscription$.push(
      this.selectedInsurance$.subscribe(insurance => {
        if (insurance) {
          this.subscription$.push(this.store$.select(fromInsurance.getSelectedInsurance)
            .filter(selectedInsurance => selectedInsurance !== null).subscribe(
              selectedInsurance => {
                if (selectedInsurance.advice_expires_at * 1000 > new Date().getTime()) {
                  this.proceedToBuy();
                } else {
                  this.store$.dispatch(new router.Go({path: ['/car/extras']}));
                  this.store$.dispatch(new advice.RemoveLatestInsuranceAdvice());
                }
              }));
        }
      })
    );
  }

  private proceedToBuy() {
    this.subscription$.push(this.store$.select(fromInsurance.getSelectedAdvice).take(1).subscribe(
      advice => {
        if (advice && advice.id) {
          this.store$.dispatch(new router.Go({
            path: ['/car/insurance/contact-detail', {adviceId: advice.id}],
          }));
        }
      }));
  }

  private proceedToBuyResults() {
    this.subscription$.push(this.store$.select(fromInsurance.getSelectedAdvice).take(1).subscribe(
      advice => {
        if (advice && advice.id) {
          this.store$.dispatch(new router.Go({
            path: ['/car/insurance/summary', {adviceId: advice.id}],
          }));
        }
      }));
  }

  goToStep(stepIndex: number) {
    this.store$.dispatch(new wizardActions.Go({stepIndex: stepIndex}));
  }

  private setFinalAdviceOptions() {
    this.subscription$.push(
      this.store$.select(fromInsurance.getSelectedInsurance)
        .filter(selectedInsurance => !!selectedInsurance)
        .subscribe((selectedInsurance: InsuranceAdvice) => {
          this.knxFinalAdviceOptions = {
            sections: [
              {
                logoUrl: selectedInsurance._embedded.insurance.insurance_logo,
                divider: true
              },
              {
                heading: selectedInsurance['product_name'],
                key: this.jamesTag.transform(selectedInsurance['main_coverage'], 'car_flow_coverage'),
                divider: true
              },
              {
                key: 'Eenmalige afsluitkosten',
                value: this.currencyPipe.transform(selectedInsurance['one_off_premium'], 'EUR', true)
              },
              {
                key: 'Per maand',
                value: this.currencyPipe.transform(selectedInsurance.monthly_premium, 'EUR', true),
                divider: true
              }
            ],
            button: {
              text: selectedInsurance.supported ? 'vraag direct aan' : 'Ga naar website',
              pending: false,
              onClick: () => this.carService.startBuyFlow(),
              classes: ['knx-button', 'knx-button--primary', 'knx-button--3d', 'knx-button--float-bottom']
            }
          };
        })
    );
  }
}
