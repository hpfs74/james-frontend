import { Component, OnInit, ViewChild, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { KNXStepOptions, StepError } from '../../../../../node_modules/@knx/wizard/src/knx-wizard.options';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';

import * as fromRoot from '../../../reducers';
import * as profile from '../../../actions/profile';
import * as assistant from '../../../actions/assistant';
import * as car from '../../../actions/car';
import * as insurance from '../../../actions/insurances';
import * as advice from '../../../actions/advice';

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

  //TODO: refactor
  // selectedInsurance: CarInsurance;
  car: Car;
  // profile: any | Profile;
  // address: Address;

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

    this.store.dispatch(new advice.AddAction({
      id: UUID.UUID()
    }));

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
          //this.insurances = this.store.select(fromRoot.getInsurances);

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


    // On car info found
    // TODO: refactor to be more reactive
    this.store.select(fromRoot.getCarInfoLoaded)
      .switchMap(isLoaded => {
        if (isLoaded) {
          return this.store.select(fromRoot.getCarInfo);
        } else {
          return Observable.empty();
        }
      }).subscribe((res: Array<Car>) => {
        let lastFound = res.slice(-1)[0];
        if (lastFound && lastFound.license) {
          this.car = lastFound;
          this.store.dispatch(new assistant.ClearAction);
          this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.info.niceCar(lastFound)));
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

  submitDetailForm(): Observable<any> {
    this.store.dispatch(new assistant.ClearAction);

    let detailForm = this.carDetailForm.formGroup;
    let addressForm = this.carDetailForm.addressForm;

    FormUtils.validateForm(detailForm);
    FormUtils.validateForm(addressForm);

    if (!detailForm.valid && !addressForm.valid) {
      this.carDetailSubmitted = true;
      return Observable.throw(new Error(this.carDetailForm.validationSummaryError));
    }

    // Hide error summary
    this.carDetailSubmitted = false;

    this.store.dispatch(new profile.UpdateAction({
      gender: detailForm.value.gender,
      date_of_birth: detailForm.value.birthDate
    }));

      // this.formData[0] = requestObj;
    // this.carExtrasForm.formGroup.get('coverage').patchValue(requestObj.coverage);
    this.store.select(fromRoot.getSelectedAdvice)
      .subscribe(x => {
        console.log(x);
        //return this.insurances = this.carService.getInsurances(x);
    });

    this.store.select(fromRoot.getProfile)
      .subscribe((profile: Profile) => {

        let compareObj: CarCompare = {
          active_loan: detailForm.value.loan,
          coverage: detailForm.value.coverage,
          claim_free_years: +detailForm.value.claimFreeYears,
          household_status: detailForm.value.houseHold,
          license: this.car.license,
          gender: detailForm.value.gender.toUpperCase(),
          title: detailForm.value.gender.toLowerCase() === 'm' ? 'Dhr.' : 'Mw.',
          date_of_birth: moment(detailForm.value.birthDate).format('YYYY-MM-DD'),
          house_number: profile.address.number,
          zipcode: profile.address.postcode,
          country: 'NL'
        };

        this.store.dispatch(new advice.UpdateAction(compareObj));
      });
  }

  onSelectPremium(insurance) {
    //this.store.dispatch(new advice.UpdateAction({ insurance: insurance }));
  }

  onStepChange(stepIndex) {
    this.currentStep = stepIndex;
  }

  startBuyFlow(): Observable<any> {
    //TODO: store all data in profile store here

    this.router.navigate(['/car/insurance']);
    return;
  }

  updateSelectedCoverage(coverage: Price) {
    this.carDetailForm.formGroup.get('coverage').patchValue(coverage.id);
    this.showHelperText(coverage.id);
  }

  showHelperText(key) {
    let messageToShow = this.chatConfig.car.info[key];
    this.store.dispatch(new assistant.ClearAction);
    this.store.dispatch(new assistant.AddMessageAction(messageToShow));
  }

  getCarInfo(licensePlate: string) {
    if (licensePlate) {
      this.store.dispatch(new car.GetInfoAction(licensePlate));
    }
  }

  triggerLicenseInValid() {
    let c = this.carDetailForm.formGroup.get('licensePlate');
    c.setErrors({ 'licensePlateRDC': true });
    c.markAsTouched();
    this.store.dispatch(new assistant.ClearAction);
    this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.error.carNotFound));
  }

  onAddressChange(address: Address) {
    this.store.dispatch(new profile.UpdateAction({
      address: address
    }));
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
            this.store.dispatch(new assistant.ClearAction);
            this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.info.coverage.advice(coverage)));
          }

        }, error => {
          this.isCoverageLoading = false;
        });
    }
  }
}
