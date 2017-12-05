import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { KNXStepOptions, KNXWizardComponent } from '@knx/wizard';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import * as cuid from 'cuid';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromCore from '../../core/reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromCar from '../reducers';
import * as fromAddress from '../../address/reducers';

// Core actions
import * as router from '../../core/actions/router';
import * as layout from '../../core/actions/layout';
import * as assistant from '../../core/actions/assistant';

// Car actions
import * as car from '../actions/car';
import * as compare from '../actions/compare';
import * as coverage from '../actions/coverage';

// Other actions
import * as advice from '../../insurance/actions/advice';
import * as profile from '../../profile/actions/profile';

import { QaIdentifier } from './../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../shared/models/qa-identifiers';

import { AssistantConfig } from '../../core/models/assistant';
import { TagsService } from '../../core/services/tags.service';
import { Address } from '../../address/models';
import { AddressForm } from '../../address/components/address.form';
import { Car, CarCompare, CarCoverageRecommendation, CarInsurance } from '../models';
import { Price } from '../../shared/models/price';

import { CarDetailForm } from '../components/car-detail.form';
import { CarExtrasForm } from '../components/car-extras.form';

import * as FormUtils from '../../utils/base-form.utils';
import { createCarCoverages } from '../utils/coverage.utils';

import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { scrollToY } from '../../utils/scroll-to-element.utils';
import { InsuranceAdvice } from '../../insurance/models/insurance-advice';

enum carFormSteps {
  carDetails,
  compareResults
}

@Component({
  templateUrl: 'car-advice.component.html',
  styleUrls: ['./car-advice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarAdviceComponent implements OnInit, OnDestroy, AfterViewChecked, QaIdentifier {
  qaRootId = QaIdentifiers.carAdviceRoot;

  formSteps: Array<KNXStepOptions>;
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
  insurance$: Observable<any>;
  insurances$: Observable<Array<CarInsurance>>;
  isInsuranceLoading$: Observable<boolean>;
  selectedInsurance$: Observable<CarInsurance | InsuranceAdvice>;
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

  ngAfterViewChecked() {
    // bind async validator for car info
    let licenseControl = this.carDetailForm.formGroup.get('licensePlate');
    licenseControl.setAsyncValidators((formControl) => this.validateLicenseAsync(formControl));
  }

  ngOnInit() {
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
    this.insurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
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

    // Do actions if user has insurance saved in profile
    this.subscription$.push(
      this.purchasedInsurances$
        .filter(purchasedInsurances => purchasedInsurances !== null)
        .take(1)
        .subscribe(purchasedInsurances => {
          const insurances = purchasedInsurances.car.insurance;
          const advices = purchasedInsurances.car.insurance_advice;

          if (insurances.length && insurances.filter(insurance =>
            (!insurance.manually_added && insurance.request_status !== 'rejected')).length) {
            // redirect to purchased overview if there are any manually added insurances
            this.store$.dispatch(new router.Go({ path: ['/car/purchased'] }));
          } else if (insurances.length && insurances.filter(insurance => (insurance.status === 'draft')).length) {
            // Proceed to the buy flow for anonymous with advice
            this.proceedAnonymous(advices, insurances);
          } else {
            // Go to buy if user has advice in store (logged in after anonymous advice without registration)
            this.proceedToBuy();
          }
      })
    );

    // start new advice only if there is no current one
    this.advice$.take(1).subscribe(currentAdvice => {
      if (currentAdvice) {
      } else if (!currentAdvice) {
        this.store$.dispatch(new advice.Add({
          id: cuid()
        }));
      }
    });

    this.subscription$.push(
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
          this.store$.dispatch(new advice.Update(compareExtraOptions));
        })
    );

      // init wizard config
      this.currentStep = 0;
      this.formSteps = [
        {
          label: 'Je gegevens',
          nextButtonLabel: 'Naar resultaten',
          hideBackButton: true,
          onShowStep: this.onShowDetailsForm.bind(this),
          onBeforeNext: this.submitDetailForm.bind(this)
        },
        {
          label: 'Premies vergelijken',
          backButtonLabel: 'Terug',
          onBeforeShow: this.onShowResults.bind(this),
          onShowStep: this.onShowResults.bind(this),
          hideNextButton: true
        },
        {
          label: 'Aanvragen',
          backButtonLabel: 'Terug',
          nextButtonLabel: 'Verzekering aanvragen',
          nextButtonClass: 'knx-button knx-button--cta knx-button--extended knx-button--3d',
          onShowStep: this.onShowSummary.bind(this),
          onBeforeNext: this.startBuyFlow.bind(this)
        }
      ];
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  submitDetailForm(): Observable<any> {
    const detailForm = this.carDetailForm.formGroup;
    const addressForm = this.addressForm.formGroup;
    scrollToY();
    FormUtils.validateForm(detailForm);
    // FormUtils.validateForm(addressForm);

    if (!detailForm.valid || !addressForm.valid) {
      return Observable.throw(new Error(this.carDetailForm.validationSummaryError));
    }

    Observable.combineLatest(this.car$, this.address$, (car, address) => {
      return {
        request: {
          active_loan: !!detailForm.value.loan,
          coverage: detailForm.value.coverage,
          claim_free_years: +detailForm.value.claimFreeYears,
          household_status: detailForm.value.houseHold,
          license: car.license,
          gender: detailForm.value.gender.toUpperCase(),
          title: detailForm.value.gender === 'M' ? 'Dhr.' : 'Mw.',
          date_of_birth: FormUtils.toNicciDate(FormUtils.isMaskFormatted(detailForm.value.birthDate) ?
            FormUtils.dateDecode(detailForm.value.birthDate) : detailForm.value.birthDate),
          zipcode: address.postcode,
          house_number: address.number,
          city: address.city,
          country: 'NL',
          kilometers_per_year: detailForm.value.kmPerYear || 'KMR3',
          own_risk: detailForm.value.ownRisk === null || detailForm.value.ownRisk === undefined ? 135 : +detailForm.value.ownRisk,
          cover_occupants: false,
          legal_aid: 'LAN',
          no_claim_protection: false,
          road_assistance: 'RANO',
          insurance_id: ''
        } as CarCompare,
        address: address
      };
    })
      .take(1)
      .subscribe((compare) => {
        // add address in format for profile
        // TODO: is this really needed?
        this.store$.dispatch(new advice.Update(Object.assign({}, compare.request, {
          address: compare.address
        })));
      });

    return this.store$.select(fromInsurance.getSelectedAdvice)
      .filter(advice => advice !== undefined && Object.keys(advice).length > 1) // bit hackisch way to check for valid compare request
      .map(advice => this.store$.dispatch(new compare.LoadCarAction(advice)));
  }

  onSelectPremium(insurance) {
    scrollToY();
    this.store$.dispatch(new advice.SetInsurance(insurance));
    this.knxWizard.goToNextStep();
  }

  onStepChange(stepIndex) {
    this.currentStep = stepIndex;
  }

  openUnsupportedWebSite(insuranceUrl) {
    window.open(insuranceUrl, '_blank');
    this.knxWizard.isPendingNext = false; // force state to keep button enabled
  }

  startBuyFlow(): Observable<any> {
    return this.isLoggedIn$.take(1).flatMap((loggedIn) => {
      if (loggedIn) {
        this.proceedToBuy();
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

  updateSelectedCoverage(coverage: Price) {
    this.carDetailForm.formGroup.get('coverage').patchValue(coverage.id);
    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'car.info.' + coverage.id,
      clear: true
    }));
  }

  updateActiveLoan(activeLoan: boolean) {
    this.store$.dispatch(new coverage.CarCoverageSetActiveLoan(activeLoan));
  }

  getCarInfo(licensePlate) {
    this.store$.dispatch(new car.GetInfoAction(licensePlate));
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  getStepClass() {
    return {
      ['knx-car-advice--step-' + (this.currentStep + 1)]: true
    };
  }

  validateLicenseAsync(licenseControl: AbstractControl): Observable<any> {
    const debounceTime = 500;

    return Observable.timer(debounceTime).switchMap(() => {
      const validLength = 6;
      const license = licenseControl.value;

      if (!license || license.length !== validLength) {
        return new Observable(obs => obs.next(null));
      }

      const error = {licensePlateRDC: true};
      return this.store$.select(fromCar.getCarInfo)
        .map((car) => {
            if (car && car.license) {
              return null;
            } else {
              return error;
            }
          }, err => error
        );
    });
  }

  private onShowDetailsForm() {
    // Subscribe to car errors
    this.subscription$.push(
      this.store$.select(fromCar.getCarInfoError)
        .filter(() => this.currentStep === carFormSteps.carDetails)
        .subscribe((error) => {
          if (error) {
            this.carDetailForm.formGroup.get('licensePlate').updateValueAndValidity();
            this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.error.carNotFound', clear: true}));
          }
        })
    );

    // Subscribe to car info
    this.subscription$.push(
      this.store$.select(fromCar.getCarInfo)
        .filter(() => this.currentStep === carFormSteps.carDetails)
        .subscribe((car: Car) => {
          if (car && car.license) {
            this.carDetailForm.formGroup.get('licensePlate').updateValueAndValidity();
          }
        })
    );

    // Subscribe to coverage recommendation request
    this.subscription$.push(
      this.store$.select(fromCar.getCoverage)
        .filter(() => this.currentStep === carFormSteps.carDetails)
        .filter(coverage => coverage !== null)
        .subscribe(coverageAdvice => {
          this.coverages.forEach( item => { item.selected = false; });
          let coverageItem = this.coverages.filter(item => item.id === coverageAdvice.recommended_value)[0];
          if (coverageItem) {
            this.store$.dispatch(new assistant.AddCannedMessage({
              key: 'car.info.coverage.advice',
              value: coverageItem,
              clear: true
            }));

            coverageItem.selected = true;
            this.updateSelectedCoverage(coverageItem);
          }
        })
    );

    scrollToY();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.welcome', clear: true}));
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

  private proceedAnonymous(advices, insurances) {
    this.store$.dispatch(new advice.Get(insurances[0].advice_item_id));
    this.store$.dispatch(new advice.Update(Object.assign({}, advices[0])));
    this.subscription$.push(
      this.insurance$.subscribe(insurance => {
        if (insurance) {
          this.proceedToBuy();
        }
      })
    );
  }

  private proceedToBuy() {
    this.subscription$.push(this.store$.select(fromInsurance.getSelectedAdviceId).take(1).subscribe(
      id => {
        if (id) {
          this.store$.dispatch(new router.Go({
            path: ['/car/insurance', {adviceId: id}],
          }));
        }
      }));
  }
}
