import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit,
          ViewChild, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { KNXStepOptions, StepError } from '@knx/wizard';
import { KNXWizardComponent } from '@knx/wizard';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as cuid from 'cuid';

import * as fromRoot from '../../reducers';
import * as fromCore from '../../core/reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromCar from '../reducers';
import * as fromAddress from '../../address/reducers';
import * as fromProfile from '../../profile/reducers';

// Core actions
import * as router from '../../core/actions/router';
import * as layout from '../../core/actions/layout';
import * as assistant from '../../core/actions/assistant';

// Car actions
import * as car from '../actions/car';
import * as compare from '../actions/compare';
import * as coverage from '../actions/coverage';
import * as address from '../../address/actions/address';

// Other actions
import * as insurance from '../../insurance/actions/insurance';
import * as advice from '../../insurance/actions/advice';
import * as profile from '../../profile/actions/profile';


import { AssistantConfig } from '../../core/models/assistant';
import { Profile } from '../../profile/models';
import { Address } from '../../address/models';
import { DefaultCoverages } from '../models/coverage-items';
import { AddressForm } from '../../address/components/address.form';
import { Car, CarCompare, CarCoverageRecommendation, CarInsurance } from '../models';
import { Price } from '../../shared/models/price';

import { CarDetailComponent } from '../components/advice/car-detail.component';
import { CarDetailForm } from '../components/advice/car-detail.form';
import { CarExtrasForm } from '../components/advice/car-extras.form';
import * as FormUtils from '../../utils/base-form.utils';

import { ChatMessage } from '../../components/knx-chat-stream/chat-message';

@Component({
  templateUrl: 'car-advice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarAdviceComponent implements OnInit, OnDestroy, AfterViewChecked {
  formSteps: Array<KNXStepOptions>;
  formControlOptions: any;
  carDetailSubmitted = false;
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

  subscription$: Array<any>;

  // Forms
  carDetailForm: CarDetailForm;
  addressForm: AddressForm;
  carExtrasForm: CarExtrasForm;

  @ViewChild(KNXWizardComponent) knxWizard: KNXWizardComponent;

  constructor(private store$: Store<fromRoot.State>) { }

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
    this.isCoverageLoading$ = this.store$.select(fromCar.getCompareLoading);
    this.coverageRecommendation$ = this.store$.select(fromCar.getCoverage);

    // initialize forms
    const formBuilder = new FormBuilder();
    this.carDetailForm = new CarDetailForm(formBuilder);
    this.addressForm = new AddressForm(formBuilder);
    this.carExtrasForm = new CarExtrasForm(formBuilder);

    // start new advice only if there is no current one
    this.advice$.subscribe(currentAdvice => {
        if (currentAdvice) {
          // do not pre-fill address
          // this.store$.select(fromProfile.getProfile).subscribe(currentProfile => {
          //   this.address.postcode = currentProfile.postcode;
          //   this.address.number = currentProfile.number;
          // });

        } else if (!currentAdvice) {
          this.store$.dispatch(new advice.AddAction({
            id: cuid()
          }));
        }
      });

    this.carExtrasForm.formGroup.valueChanges
      .debounceTime(200)
      .subscribe(data => {
        let compareObj = {
          coverage: data.coverage,
          cover_occupants: data.extraOptionsOccupants || false,
          no_claim_protection: data.extraOptionsNoClaim || false,
          legal_aid: data.extraOptionsLegal ? 'LAY' : 'LAN',
          road_assistance: data.roadAssistance || 'RANO',
          kilometers_per_year: data.kmPerYear || 'KMR3',
          own_risk: +data.ownRisk || 0,
          insurance_id: ''
        };
        this.store$.dispatch(new advice.UpdateAction(compareObj));
      });

    this.isCoverageError$ = this.store$.select(fromCar.getCompareError);
    this.coverages = DefaultCoverages;

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

    FormUtils.validateForm(detailForm);
    FormUtils.validateForm(addressForm);

    if (!detailForm.valid || !addressForm.valid) {
      return Observable.throw(new Error(this.carDetailForm.validationSummaryError));
    }

    // no implicit updating of profile
    // this.store$.dispatch(new profile.UpdateAction({
    //   gender: detailForm.value.gender,
    //   date_of_birth: detailForm.value.birthDate
    // }));

    Observable.combineLatest(this.car$, this.address$, (car, address) => {
      return {
        request: {
          active_loan: !!detailForm.value.loan,
          coverage: detailForm.value.coverage,
          claim_free_years: +detailForm.value.claimFreeYears,
          household_status: detailForm.value.houseHold,
          license: car.license,
          gender: detailForm.value.gender,
          title: detailForm.value.gender === 'M' ? 'Dhr.' : 'Mw.',
          date_of_birth: FormUtils.toNicciDate(FormUtils.isMaskFormatted(detailForm.value.birthDate) ?
            FormUtils.dateDecode(detailForm.value.birthDate) : detailForm.value.birthDate),
          zipcode: address.postcode,
          house_number: address.number,
          city: address.city,
          country: 'NL',
          kilometers_per_year: detailForm.value.kmPerYear || 'KMR3',
          own_risk: +detailForm.value.ownRisk || 0,
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
      this.store$.dispatch(new advice.UpdateAction(Object.assign({}, compare.request, {
        address: compare.address
      })));
    });

    return this.store$.select(fromInsurance.getSelectedAdvice)
      .map((advice) => {
        this.store$.dispatch(new compare.LoadCarAction(advice));
      });
  }

  onSelectPremium(insurance) {
    this.store$.dispatch(new advice.SetInsuranceAction(insurance));
    this.knxWizard.goToNextStep();
  }

  onStepChange(stepIndex) {
    this.currentStep = stepIndex;
  }

  startBuyFlow(): Observable<any> {

    this.store$.dispatch(new layout.OpenModal('authRedirectModal'));

    // this.subscription$.push(this.store$.select(fromInsurance.getSelectedAdviceId).subscribe(
    //   id => {
    //     this.store$.dispatch(new router.Go({
    //       path: ['/car/insurance', { adviceId: id }],
    //     }));
    //   }));
    return;
  }

  updateSelectedCoverage(coverage: Price) {
    this.carDetailForm.formGroup.get('coverage').patchValue(coverage.id);
    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'car.info.' + coverage.id,
      clear: true
    }));
  }

  updateActiveLoan(event: boolean) {
    this.store$.dispatch(new coverage.CarCoverageSetActiveLoan(event));
  }

  getCarInfo(licensePlate) {
    this.store$.dispatch(new car.GetInfoAction(licensePlate));
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  validateLicenseAsync(licenseControl: AbstractControl): Observable<any> {
    const debounceTime = 500;

    return Observable.timer(debounceTime).switchMap(() => {
      const validLength = 6;
      const license = licenseControl.value;

      if (!license || license.length !== validLength) {
        return new Observable(obs => obs.next(null));
      }

      const error = { licensePlateRDC: true };
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
    this.store$.select(fromCar.getCarInfoError)
      .filter(() => this.currentStep === 0)
      .subscribe((error) => {
        if (error) {
          this.carDetailForm.formGroup.get('licensePlate').updateValueAndValidity();
          this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.error.carNotFound', clear: true }));
        }
      });

    // Subscribe to car info
    this.store$.select(fromCar.getCarInfo)
      .filter(() => this.currentStep === 0)
      .subscribe((car: Car) => {
        if (car && car.license) {
          this.carDetailForm.formGroup.get('licensePlate').updateValueAndValidity();
          this.store$.dispatch(new assistant.AddCannedMessage({
            key: 'car.info.niceCar',
            value: car,
            clear: true
          }));
        }
      });

    // Subscribe to coverage recommendation request
    this.store$.select(fromCar.getCoverage)
      .filter(() => this.currentStep === 0)
      .filter(coverage => coverage !== null)
      .subscribe(coverageAdvice => {
        let coverageItem = this.coverages.filter(item => item.id === coverageAdvice.recommended_value)[0];
        if (coverageItem) {
          this.store$.dispatch(new assistant.AddCannedMessage({
            key: 'car.info.coverage.advice',
            value: coverageItem,
            clear: true
          }));
        }
      });

    FormUtils.scrollToElement('knx-car-detail-form');
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.welcome', clear: true }));
  }

  private onShowResults() {
    FormUtils.scrollToElement('knx-insurance-toplist');
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.info.advice.option', clear: true }));
  }

  private onShowSummary() {
    FormUtils.scrollToElement('knx-insurance-review');
    this.store$.dispatch(new assistant.ClearAction);

    this.store$.select(fromInsurance.getSelectedInsurance).take(1)
      .subscribe(selectedInsurance => {
        this.formSteps[2].hideNextButton = !selectedInsurance.supported;
        this.showStepBlock = selectedInsurance.supported;

        if (selectedInsurance.supported) {
          this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.info.review.title' }));
          this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.info.review.steps' }));
        } else {
          this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.info.review.unsupported', clear: true }));
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
