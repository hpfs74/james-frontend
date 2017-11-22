import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { KNXStepOptions, KNXWizardComponent } from '@knx/wizard';
import { KNXWizardStepRxOptions } from '../../../../../components/knx-wizard-rx/knx-wizard-rx.options';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CarDetailComponent } from './../../components/car-detail/car-detail.component';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import * as cuid from 'cuid';

import * as fromRoot from '../../../../reducers';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromCore from '../../../../../core/reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromCar from '../../../../reducers';
import * as fromAddress from '../../../../../address/reducers';

// Core actions
import * as router from '../../../../../core/actions/router';
import * as layout from '../../../../../core/actions/layout';
import * as assistant from '../../../../../core/actions/assistant';

// Car actions
import * as car from '../../../../actions/car';
import * as compare from '../../../../actions/compare';
import * as coverage from '../../../../actions/coverage';

// Other actions
import * as advice from '../../../../../insurance/actions/advice';
import * as profile from '../../../../../profile/actions/profile';

import { QaIdentifier } from '../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from '../../../../../shared/models/qa-identifiers';

import { AssistantConfig } from '../../../../../core/models/assistant';
import { TagsService } from '../../../../../core/services/tags.service';
import { Address } from '../../../../../address/models';
import { AddressForm } from '../../../../../address/components/address.form';
import { Car, CarCompare, CarCoverageRecommendation, CarInsurance } from '../../../../models';
import { Price } from '../../../../../shared/models/price';

import { CarDetailForm } from '../../components/car-detail/car-detail.form';
import { CarExtrasForm } from '../../components/car-extras/car-extras.form';

import * as FormUtils from '../../../../../utils/base-form.utils';
import { createCarCoverages } from '../../../../utils/coverage.utils';

import { ChatMessage } from '../../../../../components/knx-chat-stream/chat-message';
import { scrollToY } from '../../../../../utils/scroll-to-element.utils';
import { InsuranceTopListComponent } from '../../components/knx-insurance-toplist/insurance-toplist.component';

enum carFormSteps {
  carDetails,
  compareResults
}
declare var window: any;
@Component({
  templateUrl: 'car-advice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarAdviceComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.carAdviceRoot;

  formSteps: Array<KNXWizardStepRxOptions>;
  formControlOptions: any;
  currentStep: number;
  coverages: Array<Price>;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  showStepBlock = false;

  // State of the advice forms data
  address$: Observable<Address>;
  car$: Observable<Car>;
  isCarLoading$: Observable<boolean>;
  isCarFailed$: Observable<boolean>;
  advice$: Observable<any>;
  insurances$: Observable<Array<CarInsurance>>;
  isInsuranceLoading$: Observable<boolean>;
  selectedInsurance$: Observable<CarInsurance>;
  isCoverageLoading$: Observable<boolean>;
  isCoverageError$: Observable<boolean>;
  coverageRecommendation$: Observable<CarCoverageRecommendation>;
  isLoggedIn$: Observable<boolean>;
  purchasedInsurances$: Observable<any>;
  purchasedInsurancesLoading$: Observable<any>;

  subscription$: Array<any>;

  // Forms
  carDetailForm: CarDetailForm;
  addressForm: AddressForm;
  carExtrasForm: CarExtrasForm;

  @ViewChild(KNXWizardComponent) knxWizard: KNXWizardComponent;

  constructor(private store$: Store<fromRoot.State>, private tagsService: TagsService) {}


  ngOnInit() {
    window.routes = this;
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert autoverzekeringen'
      }
    }));
    // bind observables
    this.subscription$ = [];
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.address$ = this.store$.select(fromAddress.getAddress);
    this.car$ = this.store$.select(fromCar.getCarInfo);
    this.isCarLoading$ = this.store$.select(fromCar.getCarInfoLoading);
    this.isCarFailed$ = this.store$.select(fromCar.getCarInfoError);
    this.insurances$ = this.getCompareResultCopy();
    this.isInsuranceLoading$ = this.store$.select(fromCar.getCompareLoading);
    this.selectedInsurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.isCoverageError$ = this.store$.select(fromCar.getCompareError);
    this.isCoverageLoading$ = this.store$.select(fromCar.getCompareLoading);
    this.coverageRecommendation$ = this.store$.select(fromCar.getCoverage);
    this.isLoggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.purchasedInsurances$ = this.store$.select(fromInsurance.getPurchasedInsurance);
    this.purchasedInsurancesLoading$ = this.store$.select(fromInsurance.getPurchasedInsuranceLoading);

    // initialize forms
    const formBuilder = new FormBuilder();
    this.addressForm = new AddressForm(formBuilder);

    this.carDetailForm = new CarDetailForm(formBuilder,
      this.tagsService.getAsLabelValue('insurance_flow_household'));

    this.carExtrasForm = new CarExtrasForm(formBuilder,
      this.tagsService.getAsLabelValue('car_flow_coverage'),
      this.tagsService.getAsLabelValue('car_flow_km_per_year'),
      this.tagsService.getAsLabelValue('car_flow_legal_aid'),
      this.tagsService.getAsLabelValue('car_flow_road_assistance'),
      this.tagsService.getAsLabelValue('car_own_risk'));

    this.coverages = createCarCoverages(this.tagsService.getByKey('car_flow_coverage'));

    this.purchasedInsurances$
      .filter(purchasedInsurances => purchasedInsurances !== null)
      .subscribe(purchasedInsurances => {
        // redirect to purchased overview if there are any manually added insurances
        if (purchasedInsurances && purchasedInsurances.filter(insurance => !insurance.manually_added ).length) {
          this.store$.dispatch(new router.Go({ path: ['/car/purchased'] }));
        }
    });

    this.carExtrasForm.formGroup.valueChanges
      .debounceTime(200)
      .filter(() => this.currentStep === carFormSteps.compareResults)
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
        this.store$.dispatch(new advice.UpdateAction(compareExtraOptions));
      });

      // init wizard config
      this.currentStep = 0;
      this.formSteps = [
        {
          label: 'Je gegevens',
          nextButtonLabel: 'Naar resultaten',
          hideBackButton: true,
          routeConfig: { path: '/car/detail/1', component: CarDetailComponent}
        },
        {
          label: 'Premies vergelijken',
          backButtonLabel: 'Terug',
          hideNextButton: true,
          hideBackButton: false,
          routeConfig: { path: '/car/extras/2', component: InsuranceTopListComponent}
        },
        {
          label: 'Aanvragen',
          backButtonLabel: 'Terug',
          nextButtonLabel: 'Verzekering aanvragen',
          nextButtonClass: 'knx-button knx-button--cta knx-button--extended knx-button--3d',
          onShowStep: this.onShowSummary.bind(this),
          onBeforeNext: this.startBuyFlow.bind(this),
          routeConfig: { path: '/car/car-detail', component: CarDetailComponent}
        }
      ];
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  onSelectPremium(insurance) {
    scrollToY();
    this.store$.dispatch(new advice.SetInsuranceAction(insurance));
    this.knxWizard.goToNextStep();
  }

  onStepChange(stepIndex) {
    this.currentStep = stepIndex;
  }

  openUnsupportedWebSite(insuranceUrl): Observable<any> {
    window.open(insuranceUrl, '_blank');
    return Observable.empty();
  }

  startBuyFlow(): Observable<any> {
    return this.isLoggedIn$.take(1).flatMap((loggedIn) => {
      if (loggedIn) {
        this.subscription$.push(this.store$.select(fromInsurance.getSelectedAdviceId).subscribe(
          id => {
            this.store$.dispatch(new router.Go({
              path: ['/car/insurance', {adviceId: id}],
            }));
          }));
        return Observable.empty();
      } else {
        // INS-600 Anonymous Flow Stage 1: integrate modal to redirect user
        // Instead of going into the buy flow the user clicks on the modal buttons
        // to be redirected either to /login or /register
        this.store$.dispatch(new layout.OpenModal('authRedirectModal'));
        return Observable.throw(new Error());
      }
    });
  }

  updateActiveLoan(activeLoan: boolean) {
    this.store$.dispatch(new coverage.CarCoverageSetActiveLoan(activeLoan));
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  getStepClass() {
    return {
      ['knx-car-advice--step-' + (this.currentStep + 1)]: true
    };
  }

  private onShowResults() {
    scrollToY();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.advice.option', clear: true}));
  }

  private onShowSummary() {
    scrollToY();
    this.store$.dispatch(new assistant.ClearAction);

    this.store$.select(fromInsurance.getSelectedInsurance).take(1)
      .subscribe(selectedInsurance => {
        this.showStepBlock = selectedInsurance.supported;
        if (selectedInsurance.supported) {
          this.formSteps[2].nextButtonLabel = 'Verzekering aanvragen';
          this.formSteps[2].nextButtonClass = 'knx-button knx-button--cta knx-button--extended knx-button--3d';
          this.formSteps[2].onBeforeNext = this.startBuyFlow.bind(this);
          this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.review.title'}));
          this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.review.steps'}));
        } else {
          this.formSteps[2].nextButtonLabel = 'Ga naar website';
          this.formSteps[2].nextButtonClass = 'knx-button knx-button--secondary';
          this.formSteps[2].onBeforeNext = this.openUnsupportedWebSite.bind(this, selectedInsurance._embedded.insurance.url);
          this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.review.unsupported', clear: true}));
        }
      });
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
