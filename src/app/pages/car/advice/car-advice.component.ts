import { Component, OnInit, ViewChild, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { KNXStepOptions, StepError } from '../../../../../node_modules/@knx/wizard/src/knx-wizard.options';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import * as fromRoot from '../../../reducers';
import * as assistant from '../../../actions/assistant';

import { ConfigService } from '../../../config.service';
import { ContentService } from '../../../content.service';
import { InsuranceService } from '../../../services/insurance.service';
import { AssistantService } from './../../../services/assistant.service';
import { AssistantConfig } from '../../../models/assistant';
import { CarService } from '../car.service';
import { Car, Price, CarCompare, Profile, Address } from '../../../models';
import { CarDetailComponent } from './car-detail.component';
import { CarCoverageRecommendation } from './../../../models/coverage';
import { CarInsurance } from '../../../models/car-insurance';
import { CarInsuranceOptions } from './../../../models/car-compare';
import { CarDetailForm } from './car-detail.form';
import { CarExtrasForm } from './car-extras.form';
import * as FormUtils from '../../../utils/base-form.utils';

import { ChatMessage } from '../../../components/knx-chat-stream/chat-message';
import { AuthService } from '../../../services/auth.service';

@Component({
  templateUrl: 'car-advice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarAdviceComponent implements OnInit {
  formSteps: Array<KNXStepOptions>;
  formControlOptions: any;
  formData: Array<any>;
  carDetailSubmitted: boolean = false;
  currentStep: number;

  coverages: Array<Price>;
  insurances: Observable<Array<CarInsurance>>;
  selectedInsurance: CarInsurance;
  car: Car;
  profile: any | Profile;
  address: Address;

  chatConfig: AssistantConfig;
  chatMessages$: Observable<Array<ChatMessage>>;

  isCoverageLoading: boolean = false;
  isInsuranceLoading: boolean = false;

  // Forms
  carDetailForm: CarDetailForm;
  carExtrasForm: CarExtrasForm;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private configService: ConfigService,
    private contentService: ContentService,
    private assistantService: AssistantService,
    private carService: CarService,
    private insuranceService: InsuranceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.chatConfig = this.assistantService.config;
    this.chatConfig.avatar.title = 'Expert autoverzekeringen';
    this.chatMessages$ = this.store.select(fromRoot.getAssistantMessageState);

    this.currentStep = 0;
    this.formSteps = [
      {
        label: 'Je gegevens',
        nextButtonLabel: 'Naar resultaten',
        hideBackButton: true,
        onShowStep: () => {
          FormUtils.scrollToForm('form');
          this.store.dispatch(new assistant.ClearAction);
          this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.welcome));
        },
        onBeforeNext: this.submitDetailForm.bind(this)
      },
      {
        label: 'Premies vergelijken',
        backButtonLabel: 'Terug',
        hideNextButton: true,
        onShowStep: () => {
          FormUtils.scrollToForm('.knx-insurance-toplist');
          this.store.dispatch(new assistant.ClearAction);
          this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.info.advice.result));
        }
      },
      {
        label: 'Besparen',
        backButtonLabel: 'Terug',
        nextButtonLabel: 'Koop verzekering',
        onShowStep: () => {
          this.store.dispatch(new assistant.ClearAction);
          this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.info.review.title));
          this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.info.review.list));
        },
        onBeforeNext: this.startBuyFlow.bind(this)
      }
    ];
    this.formData = new Array(this.formSteps.length);

    let formBuilder = new FormBuilder();
    this.carDetailForm = new CarDetailForm(formBuilder);

    this.carExtrasForm = new CarExtrasForm(formBuilder);
    this.carExtrasForm.formGroup.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(data => {
        if (this.formData[0]) {
          //console.log(data);
          this.insurances = this.carService.getInsurances(
            Object.assign(
              this.formData[0], {
                coverage: data.coverage,
                cover_occupants: data.extraOptions.cover_occupants || false,
                kilometers_per_year: data.kmPerYear,
                no_claim_protection: data.extraOptions.noclaim || false,
                own_risk: data.ownRisk,
              })
          );
        }
      });
  }

  submitDetailForm(): Observable<any> {
    this.store.dispatch(new assistant.ClearAction);

    let detailForm = this.carDetailForm.formGroup;
    let address = this.carDetailForm.addressForm;

    FormUtils.validateForm(detailForm);
    FormUtils.validateForm(address);

    if (!detailForm.valid && !address.valid) {
      this.carDetailSubmitted = true;
      return Observable.throw(new Error(this.carDetailForm.validationSummaryError));
    }

    // Hide error summary
    this.carDetailSubmitted = false;

    this.profile = {
      gender: detailForm.value.gender,
      dateOfBirth: detailForm.value.birthDate
    };

    let options: CarInsuranceOptions = {
      active_loan: detailForm.value.loan,
      coverage: detailForm.value.coverage,
      claim_free_years: +detailForm.value.claimFreeYears,
      household_status: detailForm.value.houseHold
    };
    let requestObj = new CarCompare(this.profile, this.car, this.address, options);


    this.formData[0] = requestObj;
    this.carExtrasForm.formGroup.get('coverage').patchValue(requestObj.coverage);

    return this.insurances = this.carService.getInsurances(requestObj);
  }

  onSelectPremium(insurance) {
    this.selectedInsurance = insurance;
  }

  onStepChange(stepIndex) {
    this.currentStep = stepIndex;
  }

  startBuyFlow(): Observable<any> {
    this.router.navigate(['/car/insurance']);
    return;
  }

  updateSelectedCoverage(coverage: Price) {
    this.carDetailForm.formGroup.get('coverage').patchValue(coverage.id);
  }

  getCarInfo(licensePlate: string) {
    if (!licensePlate) {
      return;
    }

    this.carService.getByLicense(licensePlate)
      .subscribe(res => {
        if (res.license) {
          this.car = res;
          this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.info.niceCar(res)));
        } else {
          // Car not found in RDC
          let c = this.carDetailForm.formGroup.get('licensePlate');
          this.triggerLicenseInValid();
        }
      }, err => {
        // Treat server error as invalid to prevent continuing flow
        this.triggerLicenseInValid();
      });
  }

  triggerLicenseInValid() {
    let c = this.carDetailForm.formGroup.get('licensePlate');
    c.setErrors({ 'licensePlateRDC': true });
    c.markAsTouched();
    this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.error.carNotFound));
  }

  updateAddress(address: Address) {
    if (address.street && address.city) {
      if (!this.address || !this.isObjectEqual<Address>(this.address, address)) {
        this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.generic.address(address)));
      }
      this.address = address;
    }

    if (!address.street && !address.city) {
      this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.generic.addressNotFound));
    }
  }

  getCoverages(event) {
    if (this.car) {
      this.isCoverageLoading = true;

      // get default coverage types
      this.coverages = this.contentService.getContentObject().car.coverages;

      // fetch recommendation
      this.carService.getCoverageRecommendation(this.car.license, event.loan)
        .subscribe(res => {
          this.isCoverageLoading = false;

          let coverage = this.coverages.find(price => price.id === res.recommended_value);
          if (coverage) {
            coverage.highlight = true;
            this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.info.coverage.advice(coverage)));
          }

        }, error => {
          this.isCoverageLoading = false;
        });
    }
  }

  private isObjectEqual<T>(prev: T, cur: T): boolean {
    return JSON.stringify(prev) === JSON.stringify(cur);
  }
}
