import { Component, OnInit, OnDestroy, ViewChild, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { KNXStepOptions, StepError } from '../../../../../node_modules/@knx/wizard/src/knx-wizard.options';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as cuid from 'cuid';

import * as fromRoot from '../../../reducers';
import * as RouterActions from '../../../actions/router';
import * as layout from '../../../actions/layout';
import * as profile from '../../../actions/profile';
import * as assistant from '../../../actions/assistant';
import * as car from '../../../actions/car';
import * as insurance from '../../../actions/insurances';
import * as advice from '../../../actions/advice';
import * as compare from '../../../actions/compare';
import * as coverage from '../../../actions/coverage';

import { ContentService } from '../../../content.service';
import { InsuranceService } from '../../../services/insurance.service';
import { AssistantConfig } from '../../../models/assistant';
import { CarService } from '../car.service';
import { Car, Price, CarCompare, Profile, Address } from '../../../models';
import { CarDetailComponent } from './car-detail.component';
import { CarCoverageRecommendation } from '../../../models/coverage';
import { CarInsurance } from '../../../models/car-insurance';
import { CarDetailForm } from './car-detail.form';
import { CarExtrasForm } from './car-extras.form';
import * as FormUtils from '../../../utils/base-form.utils';

import { ChatMessage } from '../../../components/knx-chat-stream/chat-message';

@Component({
  selector: 'knx-car-advice',
  templateUrl: 'car-advice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarAdviceComponent implements OnInit, OnDestroy {
  formSteps: Array<KNXStepOptions>;
  formControlOptions: any;
  carDetailSubmitted = false;
  currentStep: number;
  coverages: Array<Price>;
  insurances: Observable<Array<CarInsurance>>;
  car: Car;
  address: Address;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;

  // State of the advice forms data
  advice$: Observable<any>;
  insurances$: Observable<Array<CarInsurance>>;
  isInsuranceLoading$: Observable<boolean>;
  selectedInsurance$: Observable<CarInsurance>;
  isCoverageLoading$: Observable<boolean>;
  isCoverageError$: Observable<boolean>;

  subscription$: Array<any>;

  // Forms
  carDetailForm: CarDetailForm;
  carExtrasForm: CarExtrasForm;

  constructor(
    private router: Router,
    private store$: Store<fromRoot.State>,
    private contentService: ContentService,
    private carService: CarService,
    private insuranceService: InsuranceService
  ) { }

  ngOnInit() {
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert autoverzekeringen'
      }
    }));
    this.subscription$ = [];
    this.chatConfig$ = this.store$.select(fromRoot.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromRoot.getAssistantMessageState);
    this.insurances$ = this.getCompareResultCopy();
    this.isInsuranceLoading$ = this.store$.select(fromRoot.getCompareLoading);
    this.selectedInsurance$ = this.store$.select(fromRoot.getSelectedInsurance);
    this.advice$ = this.store$.select(fromRoot.getSelectedAdvice);
    this.isCoverageLoading$ = this.store$.select(fromRoot.getCompareLoading);

    // start new advice only if there is no current one
    this.advice$.subscribe(currentAdvice => {
        if (currentAdvice && this.address) {
          this.store$.select(fromRoot.getProfile).subscribe(currentProfile => {
            this.address.postcode = currentProfile.postcode;
            this.address.number = currentProfile.number;
          });

        } else if (!currentAdvice) {
          this.store$.dispatch(new advice.AddAction({
            id: cuid()
          }));
        }
      });

    this.isCoverageError$ = this.store$.select(fromRoot.getCompareError);

    this.coverages = this.contentService.getContentObject().car.coverages;

    this.currentStep = 0;
    this.formSteps = [
      {
        label: 'Je gegevens',
        nextButtonLabel: 'Naar resultaten',
        hideBackButton: true,
        onShowStep: () => {
          FormUtils.scrollToForm('form');
          this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.welcome', clear: true }));
        },
        onBeforeNext: this.submitDetailForm.bind(this)
      },
      {
        label: 'Premies vergelijken',
        backButtonLabel: 'Terug',
        hideNextButton: true,
        onShowStep: () => {
          // this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.info.advice.result', clear: true }));
        }
      },
      {
        label: 'Aanvragen',
        backButtonLabel: 'Terug',
        nextButtonLabel: 'Verzekering aanvragen',
        onShowStep: () => {
          FormUtils.scrollToForm('knx-insurance-review');
          this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.info.review.title', clear: true }));
          this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.info.review.list' }));
        },
        onBeforeNext: this.startBuyFlow.bind(this)
      }
    ];
    const formBuilder = new FormBuilder();
    this.carDetailForm = new CarDetailForm(formBuilder);

    this.carExtrasForm = new CarExtrasForm(formBuilder);
    this.carExtrasForm.formGroup.valueChanges
      .debounceTime(200)
      .subscribe(data => {
        if (this.currentStep === 1) {
          const compareObj = {
            coverage: data.coverage,
            cover_occupants: data.extraOptionsOccupants || false,
            no_claim_protection: data.extraOptionsNoClaim || false,
            legal_aid: data.extraOptionsLegal ? 'LAY' : 'LAN',
            road_assistance: data.roadAssistance || 'RANO',
            kilometers_per_year: data.kmPerYear || 'KMR3',
            own_risk: +data.ownRisk || 0,
            insurance_id: ''
          };
          // this.store.dispatch(new advice.UpdateAction({ insurance: compareObj }));
          this.store$.dispatch(new advice.UpdateAction(compareObj));
        }
      });
    this.store$.select(fromRoot.getSelectedAdvice)
      .subscribe(advice => {
        if (advice && advice.coverage) {
          this.carExtrasForm.formGroup.get('coverage').patchValue(advice.coverage);
        }
      });


    this.store$.select(fromRoot.getCarInfoError)
      .subscribe((error) => {
        if (error) {
          this.triggerLicenseInvalid();
        }
      });

    this.store$.select(fromRoot.getCarInfo)
      .subscribe((res: Array<Car>) => {
        const lastFound = res.slice(-1)[0];
        if (lastFound && lastFound.license) {
          this.car = lastFound;
          this.store$.dispatch(new assistant.AddCannedMessage({
            key: 'car.info.niceCar',
            value: lastFound,
            clear: true
          }));
        }
      }, err => {
        // Treat server error as invalid to prevent continuing flow
        this.triggerLicenseInvalid();
      });

    // Subscribe to coverage recommendation request
    this.store$.select(fromRoot.getCoverage)
      .filter(coverage => Object.keys(coverage).length > 0)
      .take(1)
      .subscribe(coverageAdvice => {
        // Copy array here to trigger change detection in CarDetailComponent
        if (this.coverages) {
          let coverages = this.coverages.slice(0);
          const coverageItem = coverages.find(price => price.id === coverageAdvice.recommended_value);
          if (coverageItem) {
            coverageItem.highlight = true;
            this.coverages = coverages;
            this.store$.dispatch(new assistant.AddCannedMessage({
              key: 'car.info.coverage.advice',
              value: coverageItem,
              clear: true
            }));
          }
        }

    });
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  submitDetailForm(): Observable<any> {
    const detailForm = this.carDetailForm.formGroup;
    const addressForm = this.carDetailForm.addressForm;

    FormUtils.validateForm(detailForm);
    FormUtils.validateForm(addressForm);

    if (!detailForm.valid && !addressForm.valid) {
      this.carDetailSubmitted = true;
      return Observable.throw(new Error(this.carDetailForm.validationSummaryError));
    }

    // Hide error summary
    this.carDetailSubmitted = false;

    this.store$.dispatch(new profile.UpdateAction({
      gender: detailForm.value.gender,
      date_of_birth: detailForm.value.birthDate
    }));

    const compareObj: CarCompare = {
      active_loan: !!detailForm.value.loan,
      coverage: detailForm.value.coverage,
      claim_free_years: +detailForm.value.claimFreeYears,
      household_status: detailForm.value.houseHold,
      license: this.car.license,
      gender: detailForm.value.gender.toUpperCase(),
      title: detailForm.value.gender.toLowerCase() === 'm' ? 'Dhr.' : 'Mw.',
      date_of_birth: FormUtils.toNicciDate(detailForm.value.birthDate),
      zipcode: this.address.postcode,
      house_number: this.address.number,
      country: 'NL',
      kilometers_per_year: detailForm.value.kmPerYear,
      own_risk: +detailForm.value.ownRisk,
      cover_occupants: false,
      legal_aid: 'LAN',
      no_claim_protection: false,
      road_assistance: 'RANO',
      insurance_id: ''
    };

    // add address in format for profile
    this.store$.dispatch(new advice.UpdateAction(Object.assign({}, compareObj, {
      address: this.address
    })));

    return this.store$.select(fromRoot.getSelectedAdvice)
      .map(options => this.store$.dispatch(new compare.LoadCarAction(options)));
  }

  onSelectPremium(insurance) {
    this.store$.dispatch(new advice.UpdateAction({ insurance: insurance }));
  }

  onStepChange(stepIndex) {
    this.currentStep = stepIndex;
  }

  startBuyFlow(): Observable<any> {
    this.subscription$.push(this.store$.select(fromRoot.getSelectedAdviceId).subscribe(
      id => {
        this.store$.dispatch(new RouterActions.Go({
          path: ['/car/insurance', { adviceId: id }],
        }));
      }));
    return;
  }

  updateSelectedCoverage(coverage: Price) {
    this.carDetailForm.formGroup.get('coverage').patchValue(coverage.id);
    this.showHelperText(coverage.id);
  }

  showHelperText(key) {
    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'car.info.' + key,
      value: coverage,
      clear: true
    }));
  }

  getCarInfo(licensePlate: string) {
    if (licensePlate) {
      this.store$.dispatch(new car.GetInfoAction(licensePlate));
    }
  }

  triggerLicenseInvalid() {
    const c = this.carDetailForm.formGroup.get('licensePlate');
    c.setErrors({ 'licensePlateRDC': true });
    c.markAsTouched();
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.error.carNotFound', clear: true }));
    this.car = null;
  }

  onLicensePlateInvalid(licensePlate: string) {
    this.triggerLicenseInvalid();
  }

  onAddressChange(address: Address) {
    this.store$.dispatch(new profile.UpdateAction(address));

    // TODO: not in ngrx form should be this.store.select('address') something
    this.address = address;
  }

  getCoverages(event) {
    if (this.car) {
      this.store$.dispatch(new coverage.CarCoverageAction({ license: this.car.license, loan: event.loan }));
    }
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  private getCompareResultCopy(): Observable<CarInsurance[]> {
    // This is needed because the ngrx-datatable modifies the result to add an $$index to each
    // result item and modifies the source array order when sorting
    return this.store$.select(fromRoot.getCompareResult)
      .map(obs => {
        return obs.map(v => JSON.parse(JSON.stringify(v)));
      });
  }
}
